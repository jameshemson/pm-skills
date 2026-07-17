#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rm,
  rmdir,
} from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MARKETPLACE_NAME = "pm-skills";
const PLUGIN_NAME = "pm";
const PLUGIN_ID = `${PLUGIN_NAME}@${MARKETPLACE_NAME}`;
const FIXTURE_PREFIX = "pm-codex-plugin-smoke-";
const EXPECTED_SKILL_FILES = [
  "SKILL.md",
  "reference/foundations.md",
  "reference/knowledge-communication.md",
  "reference/knowledge-craft-score.md",
  "reference/knowledge-decision-making.md",
  "reference/knowledge-discovery.md",
  "reference/knowledge-leadership.md",
  "reference/knowledge-metrics.md",
  "reference/knowledge-positioning.md",
  "reference/knowledge-prioritisation.md",
  "reference/knowledge-review-personas.md",
  "reference/knowledge-specification.md",
  "reference/mode-brief.md",
  "reference/mode-decide.md",
  "reference/mode-discover.md",
  "reference/mode-metrics.md",
  "reference/mode-review.md",
  "reference/mode-setup.md",
  "reference/mode-spec.md",
  "reference/mode-stories.md",
  "reference/mode-teach.md",
].sort();

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
let fixtureRoot;
let cleanupStarted = false;
let cleanupFinished = false;

function fail(message) {
  throw new Error(message);
}

function requireObject(value, label) {
  assert(value !== null && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
  return value;
}

function requireArray(value, label) {
  assert(Array.isArray(value), `${label} must be an array`);
  return value;
}

function samePath(actual, expected, label) {
  assert.equal(path.resolve(actual), path.resolve(expected), label);
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative !== "" && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function parseJsonOutput(command, stdout) {
  try {
    return JSON.parse(stdout.trim());
  } catch (error) {
    fail(`${command} did not return valid JSON: ${error.message}\nstdout:\n${stdout}`);
  }
}

function runCodex(args, context) {
  assert.equal(context.childEnvironment.CODEX_HOME, context.codexHome, "child CODEX_HOME changed unexpectedly");
  assert.notEqual(
    path.resolve(context.childEnvironment.CODEX_HOME),
    context.normalCodexHome,
    "child command would use the normal CODEX_HOME",
  );
  context.usedCodexHomes.push(context.childEnvironment.CODEX_HOME);

  const printableCommand = `codex ${args.join(" ")}`;
  const result = spawnSync("codex", args, {
    cwd: context.projectRoot,
    env: context.childEnvironment,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.error) {
    fail(`${printableCommand} could not start: ${result.error.message}`);
  }
  if (result.status !== 0) {
    fail(
      `${printableCommand} exited ${result.status ?? `from signal ${result.signal}`}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
  }

  return parseJsonOutput(printableCommand, result.stdout);
}

async function listTree(root) {
  const rootStat = await lstat(root);
  assert(rootStat.isDirectory() && !rootStat.isSymbolicLink(), `${root} must be a real directory`);

  const files = [];
  const directories = [];

  async function walk(directory, prefix = "") {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      const absolutePath = path.join(directory, entry.name);
      assert(!entry.isSymbolicLink(), `symlink is not allowed in installed plugin: ${relativePath}`);
      if (entry.isDirectory()) {
        directories.push(relativePath);
        await walk(absolutePath, relativePath);
      } else if (entry.isFile()) {
        files.push(relativePath);
      } else {
        fail(`unsupported installed plugin entry: ${relativePath}`);
      }
    }
  }

  await walk(root);
  return { directories: directories.sort(), files: files.sort() };
}

function assertCodexFrontmatter(skillText) {
  const match = skillText.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  assert(match, "Codex SKILL.md must start with YAML frontmatter");
  const lines = match[1].split("\n");
  assert.equal(lines.length, 2, "Codex SKILL.md frontmatter must contain exactly two fields");

  const keys = lines.map((line) => {
    const field = line.match(/^([A-Za-z0-9_-]+):\s+(.+)$/);
    assert(field, `invalid Codex SKILL.md frontmatter line: ${line}`);
    assert(field[2].trim(), `empty Codex SKILL.md frontmatter value: ${field[1]}`);
    return field[1];
  });
  assert.deepEqual([...keys].sort(), ["description", "name"], "Codex frontmatter keys must be name and description only");
  assert.equal(lines.find((line) => line.startsWith("name:"))?.slice("name:".length).trim(), PLUGIN_NAME);
}

function assertNoUnresolvedSeams(relativePath, content) {
  const text = content.toString("utf8");
  assert(!text.includes("{{") && !text.includes("}}"), `unresolved template token in ${relativePath}`);
  assert(!/<!--\s*(?:provider:|\/\s*provider\s*-->)/i.test(text), `unresolved provider block in ${relativePath}`);
}

async function validateInstalledPlugin(installedPath, repositoryPluginRoot, expectedVersion, codexHome) {
  const installedStat = await lstat(installedPath);
  assert(installedStat.isDirectory() && !installedStat.isSymbolicLink(), "installed plugin root must be a real directory");
  const installedRealPath = await realpath(installedPath);
  const codexHomeRealPath = await realpath(codexHome);
  assert(isInside(codexHomeRealPath, installedRealPath), "installed plugin escaped isolated CODEX_HOME");

  const repositorySkillRoot = path.join(repositoryPluginRoot, "skills", PLUGIN_NAME);
  const repositorySkillTree = await listTree(repositorySkillRoot);
  assert.deepEqual(repositorySkillTree.files, EXPECTED_SKILL_FILES, "repository Codex skill must contain exactly 21 files");
  assert.equal(repositorySkillTree.files.length, 21, "repository Codex skill file count changed");

  const installedTree = await listTree(installedPath);
  const expectedInstalledFiles = [
    ".codex-plugin/plugin.json",
    ...EXPECTED_SKILL_FILES.map((relativePath) => `skills/${PLUGIN_NAME}/${relativePath}`),
  ].sort();
  assert.deepEqual(installedTree.files, expectedInstalledFiles, "installed plugin file inventory is not self-contained and exact");
  assert.deepEqual(
    installedTree.directories,
    [".codex-plugin", "skills", `skills/${PLUGIN_NAME}`, `skills/${PLUGIN_NAME}/reference`].sort(),
    "installed plugin contains unexpected optional directories",
  );

  const forbiddenEntries = installedTree.files.filter((relativePath) =>
    /(^|\/)(agents\/openai\.yaml|openai\.yaml|apps(?:\/|$)|mcp(?:\/|$)|mcp\.json|\.mcp\.json|hooks(?:\/|$)|hooks\.json)/i.test(relativePath),
  );
  assert.deepEqual(forbiddenEntries, [], "installed plugin contains forbidden agents/openai.yaml, apps, MCP, or hooks content");

  for (const relativePath of expectedInstalledFiles) {
    const installedContent = await readFile(path.join(installedPath, ...relativePath.split("/")));
    const repositoryContent = await readFile(path.join(repositoryPluginRoot, ...relativePath.split("/")));
    assert(installedContent.equals(repositoryContent), `installed bytes differ from repository: ${relativePath}`);
    if (relativePath.startsWith(`skills/${PLUGIN_NAME}/`)) {
      assertNoUnresolvedSeams(relativePath, installedContent);
    }
  }

  const installedSkillText = await readFile(path.join(installedPath, "skills", PLUGIN_NAME, "SKILL.md"), "utf8");
  assertCodexFrontmatter(installedSkillText);

  const installedManifest = requireObject(
    JSON.parse(await readFile(path.join(installedPath, ".codex-plugin", "plugin.json"), "utf8")),
    "installed plugin manifest",
  );
  assert.equal(installedManifest.name, PLUGIN_NAME);
  assert.equal(installedManifest.version, expectedVersion);
  for (const forbiddenKey of ["agents", "apps", "mcp", "mcpServers", "hooks"]) {
    assert(!(forbiddenKey in installedManifest), `installed plugin manifest must omit ${forbiddenKey}`);
  }
}

async function validateCleanupBoundary(root, stateRoot, projectRoot) {
  const temporaryRoot = await realpath(tmpdir());
  const fixtureRealPath = await realpath(root);
  assert.equal(path.dirname(fixtureRealPath), temporaryRoot, "fixture root is not a direct child of the system temp directory");
  assert(path.basename(fixtureRealPath).startsWith(FIXTURE_PREFIX), "fixture root has an unexpected prefix");

  for (const child of [stateRoot, projectRoot]) {
    const childStat = await lstat(child);
    assert(childStat.isDirectory() && !childStat.isSymbolicLink(), `cleanup target must be a real directory: ${child}`);
    const childRealPath = await realpath(child);
    assert.equal(path.dirname(childRealPath), fixtureRealPath, `cleanup target escaped fixture root: ${child}`);
  }
}

async function removeSuccessfulFixtures(root, stateRoot, projectRoot) {
  await validateCleanupBoundary(root, stateRoot, projectRoot);
  await rm(stateRoot, { recursive: true, force: false });
  await rm(projectRoot, { recursive: true, force: false });
  assert.deepEqual(await readdir(root), [], "fixture root contains unexpected entries after fixture cleanup");
  await rmdir(root);
}

try {
  fixtureRoot = await mkdtemp(path.join(tmpdir(), FIXTURE_PREFIX));
  const stateRoot = path.join(fixtureRoot, "state");
  const projectRoot = path.join(fixtureRoot, "project");
  const codexHome = path.join(stateRoot, "codex-home");
  const isolatedHome = path.join(stateRoot, "os-home");
  const xdgRoot = path.join(stateRoot, "xdg");

  await Promise.all([
    mkdir(codexHome, { recursive: true }),
    mkdir(isolatedHome, { recursive: true }),
    mkdir(path.join(xdgRoot, "cache"), { recursive: true }),
    mkdir(path.join(xdgRoot, "config"), { recursive: true }),
    mkdir(path.join(xdgRoot, "data"), { recursive: true }),
    mkdir(path.join(xdgRoot, "state"), { recursive: true }),
    mkdir(projectRoot, { recursive: true }),
  ]);

  const repositoryRealPath = await realpath(repositoryRoot);
  const repositoryPluginRoot = path.join(repositoryRealPath, "plugins", PLUGIN_NAME);
  const marketplaceManifest = requireObject(
    JSON.parse(await readFile(path.join(repositoryRealPath, ".agents", "plugins", "marketplace.json"), "utf8")),
    "marketplace manifest",
  );
  assert.equal(marketplaceManifest.name, MARKETPLACE_NAME);
  const marketplacePlugin = requireArray(marketplaceManifest.plugins, "marketplace plugins").find(
    (plugin) => plugin?.name === PLUGIN_NAME,
  );
  assert(marketplacePlugin, `marketplace must contain ${PLUGIN_NAME}`);

  const repositoryPluginManifest = requireObject(
    JSON.parse(await readFile(path.join(repositoryPluginRoot, ".codex-plugin", "plugin.json"), "utf8")),
    "repository plugin manifest",
  );
  assert.equal(repositoryPluginManifest.name, PLUGIN_NAME);
  assert.match(repositoryPluginManifest.version, /^\d+\.\d+\.\d+$/);

  const normalCodexHome = path.resolve(process.env.CODEX_HOME ?? path.join(homedir(), ".codex"));
  assert.notEqual(path.resolve(codexHome), normalCodexHome, "isolated CODEX_HOME matches normal Codex state");
  assert.notEqual(path.resolve(isolatedHome), path.resolve(homedir()), "isolated HOME matches the normal user home");

  const childEnvironment = {
    ...process.env,
    CI: "1",
    CODEX_HOME: codexHome,
    HOME: isolatedHome,
    USERPROFILE: isolatedHome,
    XDG_CACHE_HOME: path.join(xdgRoot, "cache"),
    XDG_CONFIG_HOME: path.join(xdgRoot, "config"),
    XDG_DATA_HOME: path.join(xdgRoot, "data"),
    XDG_STATE_HOME: path.join(xdgRoot, "state"),
  };
  const commandContext = {
    childEnvironment,
    codexHome,
    normalCodexHome,
    projectRoot,
    usedCodexHomes: [],
  };

  const addMarketplace = requireObject(
    runCodex(["plugin", "marketplace", "add", repositoryRealPath, "--json"], commandContext),
    "marketplace add result",
  );
  assert.equal(addMarketplace.marketplaceName, MARKETPLACE_NAME);
  samePath(addMarketplace.installedRoot, repositoryRealPath, "marketplace add used the wrong local root");

  const marketplaceList = requireObject(
    runCodex(["plugin", "marketplace", "list", "--json"], commandContext),
    "marketplace list result",
  );
  const listedMarketplace = requireArray(marketplaceList.marketplaces, "listed marketplaces").find(
    (marketplace) => marketplace?.name === MARKETPLACE_NAME,
  );
  assert(listedMarketplace, `marketplace list must include ${MARKETPLACE_NAME}`);
  samePath(listedMarketplace.root, repositoryRealPath, "marketplace list returned the wrong root");
  assert.equal(listedMarketplace.marketplaceSource?.sourceType, "local");
  samePath(listedMarketplace.marketplaceSource.source, repositoryRealPath, "marketplace source is not the local repository");

  const availablePlugins = requireObject(
    runCodex(["plugin", "list", "--available", "--marketplace", MARKETPLACE_NAME, "--json"], commandContext),
    "available plugin list",
  );
  assert.deepEqual(requireArray(availablePlugins.installed, "installed plugins before add"), []);
  const availablePlugin = requireArray(availablePlugins.available, "available plugins").find(
    (plugin) => plugin?.pluginId === PLUGIN_ID,
  );
  assert(availablePlugin, `available plugin list must include ${PLUGIN_ID}`);
  assert.equal(availablePlugin.name, PLUGIN_NAME);
  assert.equal(availablePlugin.marketplaceName, MARKETPLACE_NAME);
  assert.equal(availablePlugin.version, repositoryPluginManifest.version);
  assert.equal(availablePlugin.installed, false);
  samePath(availablePlugin.source?.path, repositoryPluginRoot, "available plugin source path is wrong");

  const addPlugin = requireObject(
    runCodex(["plugin", "add", PLUGIN_ID, "--json"], commandContext),
    "plugin add result",
  );
  assert.equal(addPlugin.pluginId, PLUGIN_ID);
  assert.equal(addPlugin.name, PLUGIN_NAME);
  assert.equal(addPlugin.marketplaceName, MARKETPLACE_NAME);
  assert.equal(addPlugin.version, repositoryPluginManifest.version);
  assert.equal(typeof addPlugin.installedPath, "string");

  const installedPlugins = requireObject(
    runCodex(["plugin", "list", "--marketplace", MARKETPLACE_NAME, "--json"], commandContext),
    "installed plugin list",
  );
  const installedPlugin = requireArray(installedPlugins.installed, "installed plugins").find(
    (plugin) => plugin?.pluginId === PLUGIN_ID,
  );
  assert(installedPlugin, `installed plugin list must include ${PLUGIN_ID}`);
  assert.equal(installedPlugin.name, PLUGIN_NAME);
  assert.equal(installedPlugin.marketplaceName, MARKETPLACE_NAME);
  assert.equal(installedPlugin.version, repositoryPluginManifest.version);
  assert.equal(installedPlugin.installed, true);
  assert.equal(installedPlugin.enabled, true);

  assert.equal(commandContext.usedCodexHomes.length, 5, "unexpected number of Codex commands in smoke test");
  assert(
    commandContext.usedCodexHomes.every(
      (usedHome) => path.resolve(usedHome) === path.resolve(codexHome) && path.resolve(usedHome) !== normalCodexHome,
    ),
    "a Codex command used normal user state",
  );

  await validateInstalledPlugin(
    path.resolve(addPlugin.installedPath),
    repositoryPluginRoot,
    repositoryPluginManifest.version,
    codexHome,
  );

  cleanupStarted = true;
  await removeSuccessfulFixtures(fixtureRoot, stateRoot, projectRoot);
  cleanupFinished = true;
  console.log(`PASS: isolated marketplace ${MARKETPLACE_NAME} discovered from ${repositoryRealPath}`);
  console.log(`PASS: installed and listed ${PLUGIN_ID} ${repositoryPluginManifest.version} in isolated CODEX_HOME`);
  console.log("PASS: installed manifest and exact 21-file Codex skill are self-contained and byte-identical");
  console.log("PASS: successful isolated state and project fixtures removed");
} catch (error) {
  console.error(`FAIL: ${error.stack ?? error.message}`);
  if (fixtureRoot && cleanupStarted && !cleanupFinished) {
    console.error(`Cleanup failed after validation; fixture root may be partially retained: ${fixtureRoot}`);
  } else if (fixtureRoot) {
    console.error(`Retained fixture root: ${fixtureRoot}`);
  } else {
    console.error("Retained fixture root: unavailable because fixture creation failed");
  }
  process.exitCode = 1;
}
