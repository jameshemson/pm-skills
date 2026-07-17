#!/usr/bin/env node
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildGeneratedTrees, REAL_OUTPUT_ROOTS } from './build.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function listFiles(root, prefix = '') {
  if (!existsSync(root)) return [];
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(root, entry.name);
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const stat = lstatSync(path);
    if (stat.isDirectory() && !stat.isSymbolicLink()) files.push(...listFiles(path, rel));
    else files.push(rel);
  }
  return files;
}

function compareRoot(expectedRoot, actualRoot, label) {
  const expected = new Set(listFiles(expectedRoot));
  const actual = new Set(listFiles(actualRoot));
  const failures = [];

  for (const file of [...expected].sort()) {
    if (!actual.has(file)) {
      failures.push(`missing: ${label}/${file}`);
      continue;
    }
    const expectedPath = join(expectedRoot, ...file.split('/'));
    const actualPath = join(actualRoot, ...file.split('/'));
    const expectedStat = lstatSync(expectedPath);
    const actualStat = lstatSync(actualPath);
    if (!expectedStat.isFile() || expectedStat.isSymbolicLink() || !actualStat.isFile() || actualStat.isSymbolicLink()) {
      failures.push(`changed: ${label}/${file} (entry type differs)`);
    } else if (!readFileSync(expectedPath).equals(readFileSync(actualPath))) {
      failures.push(`changed: ${label}/${file}`);
    }
  }
  for (const file of [...actual].sort()) {
    if (!expected.has(file)) failures.push(`extra: ${label}/${file}`);
  }
  return failures;
}

async function main() {
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'pm-skills-sync-'));
  try {
    const source = join(ROOT, 'source/skills/pm');
    if (!existsSync(source)) throw new Error('canonical source is missing: source/skills/pm');
    const temporarySource = join(temporaryRoot, 'source/skills/pm');
    mkdirSync(dirname(temporarySource), { recursive: true });
    cpSync(source, temporarySource, { recursive: true, dereference: false, errorOnExist: true });
    mkdirSync(join(temporaryRoot, 'scripts'));
    writeFileSync(join(temporaryRoot, 'scripts/generated-inventory.json'), '{\n  "version": 1,\n  "files": []\n}\n');

    await buildGeneratedTrees({
      repositoryRoot: temporaryRoot,
      sourceRoot: 'source/skills/pm',
      outputRoots: REAL_OUTPUT_ROOTS,
      inventoryPath: 'scripts/generated-inventory.json',
    });

    const failures = REAL_OUTPUT_ROOTS.flatMap(({ root }) => compareRoot(
      join(temporaryRoot, ...root.split('/')),
      join(ROOT, ...root.split('/')),
      root,
    ));

    if (failures.length) {
      console.error(`FAIL: generated outputs are out of sync (${failures.length} difference(s)):`);
      for (const failure of failures) console.error(`  - ${failure}`);
      process.exitCode = 1;
    } else {
      console.log(`PASS: all ${REAL_OUTPUT_ROOTS.length} generated output trees match a temporary render.`);
    }
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
});
