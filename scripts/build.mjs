#!/usr/bin/env node
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { TARGETS, transformMarkdown } from './transform.mjs';

const SCRIPT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const REAL_OUTPUT_ROOTS = Object.freeze([
  Object.freeze({ root: '.claude/skills/pm', target: 'claude' }),
  Object.freeze({ root: '.agents/skills/pm', target: 'codexRepository' }),
  Object.freeze({ root: 'plugins/pm/skills/pm', target: 'codexPlugin' }),
]);

function toPosix(path) {
  return path.split(sep).join('/');
}

function fail(message) {
  throw new Error(message);
}

function lstatIfPresent(path) {
  try {
    return lstatSync(path);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function safeSegments(path, label) {
  if (typeof path !== 'string' || path.length === 0) fail(`${label} path is empty`);
  if (isAbsolute(path)) fail(`${label} path must not be absolute: ${path}`);
  if (path.includes('\\') || path.includes('\0')) fail(`${label} path contains an unsafe separator: ${path}`);
  const segments = path.split('/');
  if (segments.some((segment) => segment === '' || segment === '.' || segment === '..')) {
    fail(`${label} path contains an empty, dot, or traversal segment: ${path}`);
  }
  return segments;
}

function containedBy(root, candidate, allowRoot = false) {
  const rel = relative(root, candidate);
  if (rel === '') return allowRoot;
  return rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}

function repositoryRoot(path) {
  const resolved = resolve(path);
  if (!existsSync(resolved)) fail(`repository root does not exist: ${resolved}`);
  const stat = lstatSync(resolved);
  if (!stat.isDirectory() || stat.isSymbolicLink()) fail(`repository root must be a real directory: ${resolved}`);
  return realpathSync(resolved);
}

function ensureDirectory(root, relativePath, { create, label }) {
  const segments = safeSegments(relativePath, label);
  let current = root;

  for (const segment of segments) {
    current = join(current, segment);
    if (!containedBy(root, current)) fail(`${label} escapes the repository: ${relativePath}`);

    let stat = lstatIfPresent(current);
    if (!stat) {
      if (!create) fail(`${label} directory does not exist: ${relativePath}`);
      mkdirSync(current);
      stat = lstatSync(current);
    }
    if (stat.isSymbolicLink()) fail(`${label} contains a symlink: ${toPosix(relative(root, current))}`);
    if (!stat.isDirectory()) fail(`${label} component is not a directory: ${toPosix(relative(root, current))}`);

    const real = realpathSync(current);
    if (!containedBy(root, real)) fail(`${label} resolves outside the repository: ${relativePath}`);
  }
  return current;
}

function preflightDirectory(root, relativePath, label) {
  const segments = safeSegments(relativePath, label);
  const absolute = join(root, ...segments);
  if (!containedBy(root, absolute)) fail(`${label} escapes the repository: ${relativePath}`);

  let current = root;
  let missingAncestor = false;
  for (const segment of segments) {
    current = join(current, segment);
    if (missingAncestor) continue;
    const stat = lstatIfPresent(current);
    if (!stat) {
      missingAncestor = true;
      continue;
    }
    if (stat.isSymbolicLink()) fail(`${label} contains a symlink: ${toPosix(relative(root, current))}`);
    if (!stat.isDirectory()) fail(`${label} component is not a directory: ${toPosix(relative(root, current))}`);
    const real = realpathSync(current);
    if (!containedBy(root, real)) fail(`${label} resolves outside the repository: ${relativePath}`);
  }
  return absolute;
}

function walkRegularFiles(root, directory, label, prefix = '') {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) fail(`${label} contains a symlink: ${rel}`);
    if (stat.isDirectory()) files.push(...walkRegularFiles(root, path, label, rel));
    else if (stat.isFile()) files.push(rel);
    else fail(`${label} contains a non-regular entry: ${rel}`);
  }
  return files;
}

function readInventory(root, inventoryPath, outputRoots) {
  const inventorySegments = safeSegments(inventoryPath, 'inventory');
  if (inventorySegments.length > 1) {
    ensureDirectory(root, inventorySegments.slice(0, -1).join('/'), { create: false, label: 'inventory parent' });
  }
  const absolute = join(root, ...inventoryPath.split('/'));
  if (!containedBy(root, absolute)) fail(`inventory path escapes the repository: ${inventoryPath}`);
  const stat = lstatIfPresent(absolute);
  if (!stat) fail(`inventory file does not exist: ${inventoryPath}`);
  if (stat.isSymbolicLink() || !stat.isFile()) fail(`inventory must be a regular file: ${inventoryPath}`);

  let inventory;
  try {
    inventory = JSON.parse(readFileSync(absolute, 'utf8'));
  } catch (error) {
    fail(`inventory is invalid JSON: ${error.message}`);
  }
  if (inventory?.version !== 1 || !Array.isArray(inventory.files)) fail('inventory must have version 1 and a files array');

  const roots = outputRoots.map(({ root: outputRoot }) => outputRoot);
  const seen = new Set();
  for (const file of inventory.files) {
    safeSegments(file, 'inventory file');
    if (seen.has(file)) fail(`inventory contains a duplicate file: ${file}`);
    if (!roots.some((outputRoot) => file.startsWith(`${outputRoot}/`))) {
      fail(`inventory file is outside the configured output roots: ${file}`);
    }
    seen.add(file);
  }
  return { absolute, files: seen };
}

function validateOutputRoots(root, outputRoots) {
  if (!Array.isArray(outputRoots) || outputRoots.length === 0) fail('outputRoots must be a non-empty array');
  const seen = new Set();
  const preflight = outputRoots.map((entry) => {
    if (!entry || typeof entry !== 'object') fail('each output root must be an object');
    const { root: outputRoot, target } = entry;
    safeSegments(outputRoot, 'output');
    if (!TARGETS[target]) fail(`unknown output target: ${String(target)}`);
    if (seen.has(outputRoot)) fail(`duplicate output root: ${outputRoot}`);
    seen.add(outputRoot);
    const absolute = join(root, ...outputRoot.split('/'));
    if (!containedBy(root, absolute)) fail(`output escapes the repository: ${outputRoot}`);
    return { root: outputRoot, target, absolute };
  });

  for (let i = 0; i < preflight.length; i += 1) {
    for (let j = i + 1; j < preflight.length; j += 1) {
      const a = preflight[i].absolute;
      const b = preflight[j].absolute;
      if (containedBy(a, b) || containedBy(b, a)) fail('output roots must not overlap');
    }
  }

  for (const output of preflight) {
    preflightDirectory(root, output.root, `output ${output.root}`);
  }

  const validated = preflight.map((output) => ({
    ...output,
    absolute: ensureDirectory(root, output.root, { create: true, label: `output ${output.root}` }),
  }));
  return validated;
}

function renderOutputs(root, sourceRoot, sourceAbsolute, outputs) {
  const sourceFiles = walkRegularFiles(root, sourceAbsolute, `source ${sourceRoot}`);
  const rendered = [];
  for (const output of outputs) {
    for (const sourceFile of sourceFiles) {
      const sourcePath = join(sourceAbsolute, ...sourceFile.split('/'));
      const destination = `${output.root}/${sourceFile}`;
      const bytes = sourceFile.endsWith('.md')
        ? Buffer.from(transformMarkdown(readFileSync(sourcePath, 'utf8'), {
          target: output.target,
          filePath: `${sourceRoot}/${sourceFile}`,
        }))
        : readFileSync(sourcePath);
      rendered.push({ ...output, sourceFile, destination, bytes });
    }
  }
  return rendered;
}

function assertNoUnexpectedFiles(root, outputs, prior) {
  const unexpected = [];
  for (const output of outputs) {
    ensureDirectory(root, output.root, { create: false, label: `output ${output.root}` });
    for (const file of walkRegularFiles(root, output.absolute, `output ${output.root}`)) {
      const repositoryPath = `${output.root}/${file}`;
      if (!prior.has(repositoryPath)) unexpected.push(repositoryPath);
    }
  }
  if (unexpected.length) fail(`unexpected file(s) in generated outputs: ${unexpected.sort().join(', ')}`);
}

function checkedFile(root, repositoryPath, outputRoot) {
  const segments = safeSegments(repositoryPath, 'generated file');
  const absolute = join(root, ...segments);
  if (!containedBy(root, absolute) || !repositoryPath.startsWith(`${outputRoot}/`)) {
    fail(`generated file is outside its output root: ${repositoryPath}`);
  }
  return absolute;
}

function pruneEmptyParents(path, outputRoot) {
  let parent = dirname(path);
  while (parent !== outputRoot) {
    try {
      rmdirSync(parent);
    } catch (error) {
      if (error.code === 'ENOTEMPTY' || error.code === 'EEXIST') return;
      throw error;
    }
    parent = dirname(parent);
  }
}

function removeStaleFiles(root, outputs, stale) {
  for (const repositoryPath of [...stale].sort()) {
    const output = outputs.find(({ root: outputRoot }) => repositoryPath.startsWith(`${outputRoot}/`));
    if (!output) fail(`stale inventory file has no configured output root: ${repositoryPath}`);
    ensureDirectory(root, output.root, { create: false, label: `output ${output.root}` });
    const absolute = checkedFile(root, repositoryPath, output.root);
    if (!lstatIfPresent(absolute)) continue;
    const parentRelative = repositoryPath.slice(0, repositoryPath.lastIndexOf('/'));
    ensureDirectory(root, parentRelative, { create: false, label: `stale parent for ${repositoryPath}` });
    const stat = lstatSync(absolute);
    if (stat.isSymbolicLink() || !stat.isFile()) fail(`stale inventory entry is not a regular file: ${repositoryPath}`);
    unlinkSync(absolute);
    pruneEmptyParents(absolute, output.absolute);
  }
}

function writeRenderedFiles(root, rendered) {
  for (const file of rendered) {
    ensureDirectory(root, file.root, { create: false, label: `output ${file.root}` });
    const parentRelative = file.destination.slice(0, file.destination.lastIndexOf('/'));
    ensureDirectory(root, parentRelative, { create: true, label: `generated parent for ${file.destination}` });
    const absolute = checkedFile(root, file.destination, file.root);
    const stat = lstatIfPresent(absolute);
    if (stat) {
      if (stat.isSymbolicLink() || !stat.isFile()) fail(`generated destination is not a regular file: ${file.destination}`);
    }
    writeFileSync(absolute, file.bytes);
  }
}

function replaceInventory(inventoryPath, files) {
  const parent = dirname(inventoryPath);
  const temporary = join(parent, `.${basename(inventoryPath)}.${process.pid}.${Date.now()}.tmp`);
  try {
    writeFileSync(temporary, `${JSON.stringify({ version: 1, files: [...files].sort() }, null, 2)}\n`, { flag: 'wx' });
    renameSync(temporary, inventoryPath);
  } finally {
    if (existsSync(temporary)) unlinkSync(temporary);
  }
}

export async function buildGeneratedTrees({ repositoryRoot: rootPath, sourceRoot, outputRoots, inventoryPath }) {
  const root = repositoryRoot(rootPath);
  safeSegments(sourceRoot, 'source');
  const sourceAbsolute = ensureDirectory(root, sourceRoot, { create: false, label: `source ${sourceRoot}` });
  const outputs = validateOutputRoots(root, outputRoots);
  const inventory = readInventory(root, inventoryPath, outputs);
  const rendered = renderOutputs(root, sourceRoot, sourceAbsolute, outputs);
  const expected = new Set(rendered.map(({ destination }) => destination));

  assertNoUnexpectedFiles(root, outputs, inventory.files);

  const stale = new Set([...inventory.files].filter((file) => !expected.has(file)));
  removeStaleFiles(root, outputs, stale);
  writeRenderedFiles(root, rendered);
  replaceInventory(inventory.absolute, expected);

  return { files: [...expected].sort(), outputs: outputs.map(({ root: outputRoot }) => outputRoot) };
}

async function main() {
  const result = await buildGeneratedTrees({
    repositoryRoot: SCRIPT_ROOT,
    sourceRoot: 'source/skills/pm',
    outputRoots: REAL_OUTPUT_ROOTS,
    inventoryPath: 'scripts/generated-inventory.json',
  });
  console.log(`Built ${result.files.length} generated files across ${result.outputs.length} outputs.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(`FAIL: ${error.message}`);
    process.exitCode = 1;
  });
}
