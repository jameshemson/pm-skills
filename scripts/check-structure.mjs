#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, lstatSync, readFileSync, readlinkSync, readdirSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VERSION = '2.17.0';
const REPOSITORY = 'https://github.com/jameshemson/pm-skills';
const MODES = ['teach', 'setup', 'brief', 'spec', 'stories', 'metrics', 'review', 'decide', 'discover'];
const REFERENCES = [
  'foundations.md', 'knowledge-communication.md', 'knowledge-craft-score.md',
  'knowledge-decision-making.md', 'knowledge-discovery.md', 'knowledge-leadership.md',
  'knowledge-metrics.md', 'knowledge-positioning.md', 'knowledge-prioritisation.md',
  'knowledge-review-personas.md', 'knowledge-specification.md', 'mode-brief.md',
  'mode-decide.md', 'mode-discover.md', 'mode-metrics.md', 'mode-review.md',
  'mode-setup.md', 'mode-spec.md', 'mode-stories.md', 'mode-teach.md',
];
const EXPECTED_SKILL_FILES = ['SKILL.md', ...REFERENCES.map((name) => `reference/${name}`)].sort();
const TREES = {
  source: 'source/skills/pm',
  claude: '.claude/skills/pm',
  codexRepository: '.agents/skills/pm',
  codexPlugin: 'plugins/pm/skills/pm',
};
const LINE_LIMITS = {
  router: 200,
  review: 150,
};
const QUESTION_CAP_PATTERNS = {
  claude: /(?:one (?:through|to) four|at most four|up to four) questions/i,
  codex: /(?:one (?:through|to) three|at most three|up to three) questions/i,
};
const SESSION_EXECUTION_RANGE_PATTERN = /Steps? 1(?:-| through )7/i;
const SESSION_ONLY_SKIPPED_STEPS = ['0', '8'];
const GIT_SYMLINK_MODE = '120000';
const failures = [];
const fail = (message) => failures.push(message);

function parseArgs(argv) {
  const modes = new Set(['--source-only', '--manifests-only', '--site-only', '--copy-only', '--excluded-paths-only']);
  let mode = 'full';
  let site;
  let base;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (modes.has(arg)) {
      if (mode !== 'full') throw new Error('Choose exactly one check mode');
      mode = arg.slice(2);
      if (arg === '--site-only') site = argv[++i];
    } else if (arg === '--base') {
      base = argv[++i];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (mode === 'site-only' && (!site || !isAbsolute(site))) throw new Error('--site-only requires an absolute index.html path');
  if ((mode === 'copy-only' || mode === 'excluded-paths-only') && !base) throw new Error(`--${mode} requires --base <sha>`);
  if (base && mode !== 'copy-only' && mode !== 'excluded-paths-only') throw new Error('--base is valid only with --copy-only or --excluded-paths-only');
  return { mode, site, base };
}

function listFiles(root, prefix = '') {
  if (!existsSync(root)) return [];
  const result = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) result.push(...listFiles(join(root, entry.name), rel));
    else result.push(rel);
  }
  return result.sort();
}

function text(path) {
  if (!existsSync(path)) {
    fail(`missing file: ${relative(ROOT, path) || path}`);
    return '';
  }
  return readFileSync(path, 'utf8');
}

function assertExactTree(label, relRoot) {
  const root = join(ROOT, relRoot);
  const actual = listFiles(root);
  for (const path of EXPECTED_SKILL_FILES.filter((path) => !actual.includes(path))) fail(`${label}: missing ${relRoot}/${path}`);
  for (const path of actual.filter((path) => !EXPECTED_SKILL_FILES.includes(path))) fail(`${label}: unexpected ${relRoot}/${path}`);
  return root;
}

function lineCount(content) {
  return content === '' ? 0 : content.replace(/\n$/, '').split('\n').length;
}

function assertLinks(label, root) {
  for (const rel of EXPECTED_SKILL_FILES) {
    const path = join(root, rel);
    if (!existsSync(path)) continue;
    const content = readFileSync(path, 'utf8');
    for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
      const href = match[1].trim();
      if (/^(?:[a-z]+:|#)/i.test(href)) continue;
      const target = href.split('#', 1)[0];
      if (target && !existsSync(resolve(dirname(path), target))) fail(`${label}: broken link in ${relative(ROOT, path)}: ${href}`);
    }
  }
}

function frontmatterKeys(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return null;
  return match[1].split('\n').filter((line) => /^[A-Za-z][\w-]*:/.test(line)).map((line) => line.slice(0, line.indexOf(':')));
}

function assertCommonTree(label, root) {
  assertLinks(label, root);
  const router = text(join(root, 'SKILL.md'));
  const review = text(join(root, 'reference/mode-review.md'));
  const routerLineCount = lineCount(router);
  const reviewLineCount = lineCount(review);
  if (routerLineCount > LINE_LIMITS.router) fail(`${label}: SKILL.md is ${routerLineCount} lines (limit ${LINE_LIMITS.router})`);
  if (reviewLineCount > LINE_LIMITS.review) fail(`${label}: mode-review.md is ${reviewLineCount} lines (limit ${LINE_LIMITS.review})`);
  for (const mode of MODES) {
    if (!new RegExp(`^\\|\\s*\`?${mode}\`?\\s*\\|`, 'm').test(router)) fail(`${label}: commands table is missing mode ${mode}`);
  }
}

function stripProviderBlocks(content, providerToStrip) {
  return content.replace(new RegExp(`<!-- provider:${providerToStrip} -->[\\s\\S]*?<!-- \\/provider -->`, 'g'), '');
}

function assertSymlinkContract(label, root) {
  for (const rel of ['reference/mode-teach.md', 'reference/mode-setup.md']) {
    const content = text(join(root, rel));
    for (const [name, pattern] of [
      ['symlink', /symlink/i], ['resolved target', /resolved target|resolve[^\n]*target/i],
      ['preserve link', /preserv[^\n]*link/i], ['project containment', /inside|within|external|outside/i],
      ['broken target refusal', /broken[^\n]*(?:stop|refus|choice)|(?:stop|refus)[^\n]*broken/i],
    ]) if (!pattern.test(content)) fail(`${label}: ${rel} lacks ${name} safety wording`);
  }
}

function assertDecisionContract(label, root) {
  const decide = text(join(root, 'reference/mode-decide.md'));
  const sessionMatch = decide.match(/## Session-only execution\n([\s\S]*?)(?=\n## Step 0:)/i);
  if (!sessionMatch) fail(`${label}: decide lacks a bounded session-only section before Step 0`);
  const session = sessionMatch?.[1] ?? '';
  if (!SESSION_EXECUTION_RANGE_PATTERN.test(session)) fail(`${label}: decide must include the complete session-only execution range`);
  for (const step of SESSION_ONLY_SKIPPED_STEPS) if (!new RegExp(`skip[^\\n]*Step ${step}|Step ${step}[^\\n]*skip`, 'i').test(session)) fail(`${label}: decide must skip Step ${step} for session-only context`);
  if (!/(?:do not|never)[^\n]*(?:read|write|log)/i.test(session)) fail(`${label}: decide must prohibit session-only persistent reads and writes`);
  const persistent = decide.slice(decide.search(/## Step 0:/i));
  if (!/Read `pmdecisions\.md`|read prior decision history/i.test(persistent) || !/Read `\.pmcontext\.md`|persistent settings/i.test(persistent)) fail(`${label}: persistent decision reads must live outside the session-only section`);
  const router = text(join(root, 'SKILL.md'));
  if (!/persistent[^\n]*(?:decide|decision)[^\n]*(?:read|history)/i.test(router)) fail(`${label}: router must scope decision-history reads explicitly to persistent context`);
}

function assertSource() {
  const root = assertExactTree('source', TREES.source);
  assertCommonTree('source', root);
  const sourceKeys = frontmatterKeys(text(join(root, 'SKILL.md')));
  const expectedKeys = ['name', 'user-invokable', 'description', 'argument-hint'];
  if (!sourceKeys || JSON.stringify(sourceKeys) !== JSON.stringify(expectedKeys)) fail(`source: frontmatter keys must be exactly ${expectedKeys.join(', ')}`);
  const all = EXPECTED_SKILL_FILES.map((rel) => text(join(root, rel))).join('\n');
  for (const token of ['PM_INVOCATION', 'INSTRUCTIONS_FILE', 'ASSISTANT_NAME']) if (!all.includes(`{{${token}}}`)) fail(`source: missing token {{${token}}}`);
  for (const match of all.matchAll(/\{\{([A-Z_]+)\}\}/g)) if (!['PM_INVOCATION', 'INSTRUCTIONS_FILE', 'ASSISTANT_NAME'].includes(match[1])) fail(`source: unknown token {{${match[1]}}}`);
  if (!all.includes('<!-- provider:claude -->') || !all.includes('<!-- provider:codex -->')) fail('source: both exact provider block types are required');
  const withoutClaude = stripProviderBlocks(all, 'claude');
  if (/AskUserQuestion/.test(withoutClaude)) fail('source: AskUserQuestion appears outside a Claude provider block');
  const claudeBlocks = [...all.matchAll(/<!-- provider:claude -->([\s\S]*?)<!-- \/provider -->/g)].map((match) => match[1]).join('\n');
  if (!QUESTION_CAP_PATTERNS.claude.test(claudeBlocks)) fail('source: Claude structured input is not capped at four questions');
  const codexBlocks = [...all.matchAll(/<!-- provider:codex -->([\s\S]*?)<!-- \/provider -->/g)].map((match) => match[1]).join('\n');
  if (!QUESTION_CAP_PATTERNS.codex.test(codexBlocks)) fail('source: Codex structured input is not capped at three questions');
  if (!/(?:fallback|unavailable)[^\n]*(?:conversation|ask directly)|(?:conversation|ask directly)[^\n]*(?:fallback|unavailable)/i.test(codexBlocks)) fail('source: Codex structured-input conversational fallback is missing');
  if (!all.includes('{{INSTRUCTIONS_FILE}}')) fail('source: instruction-file target is not tokenized');
  assertSymlinkContract('source', root);
  assertDecisionContract('source', root);
}

function assertRenderedTree(label, relRoot, kind) {
  const root = assertExactTree(label, relRoot);
  assertCommonTree(label, root);
  const router = text(join(root, 'SKILL.md'));
  const keys = frontmatterKeys(router);
  const expected = kind === 'claude' ? ['name', 'user-invokable', 'description', 'argument-hint'] : ['name', 'description'];
  if (!keys || JSON.stringify(keys) !== JSON.stringify(expected)) fail(`${label}: frontmatter keys must be exactly ${expected.join(', ')}`);
  const all = EXPECTED_SKILL_FILES.map((rel) => text(join(root, rel))).join('\n');
  if (/\{\{[A-Z_]+\}\}|<!-- \/?provider/.test(all)) fail(`${label}: unresolved transform syntax remains`);
  if (kind === 'claude') {
    if (!all.includes('AskUserQuestion')) fail(`${label}: AskUserQuestion behavior is missing`);
    if (!QUESTION_CAP_PATTERNS.claude.test(all)) fail(`${label}: structured question cap of four is missing`);
    if (!all.includes('CLAUDE.md') || all.includes('AGENTS.md')) fail(`${label}: instruction target must be CLAUDE.md only`);
    if (!router.includes('/pm')) fail(`${label}: /pm invocation is missing`);
  } else {
    if (all.includes('AskUserQuestion')) fail(`${label}: Claude question tool leaked into Codex output`);
    if (!QUESTION_CAP_PATTERNS.codex.test(all)) fail(`${label}: structured question cap of three is missing`);
    if (!/(?:fallback|unavailable)[^\n]*(?:conversation|ask directly)|(?:conversation|ask directly)[^\n]*(?:fallback|unavailable)/i.test(all)) fail(`${label}: conversational fallback is missing`);
    if (!all.includes('AGENTS.md') || all.includes('CLAUDE.md')) fail(`${label}: instruction target must be AGENTS.md only`);
    assertSymlinkContract(label, root);
  }
  assertDecisionContract(label, root);
}

function readJson(rel) {
  const path = join(ROOT, rel);
  if (!existsSync(path)) {
    fail(`manifest: missing ${rel}`);
    return {};
  }
  try { return JSON.parse(readFileSync(path, 'utf8')); }
  catch (error) { fail(`manifest: invalid JSON in ${rel}: ${error.message}`); return {}; }
}

function assertDescription(label, value, codex = false) {
  if (typeof value !== 'string') { fail(`${label}: description is missing`); return; }
  for (const term of ['critique', 'nine modes', ...MODES, 'SLOP', 'ROUGH', 'SOLID', 'SHIP']) if (!value.toLowerCase().includes(term.toLowerCase())) fail(`${label}: description lacks ${term}`);
  if (codex && /Claude Code|for Claude|Claude generates/i.test(value)) fail(`${label}: Codex metadata claims a Claude-only runtime`);
}

function assertManifests() {
  const claudePlugin = readJson('.claude-plugin/plugin.json');
  const claudeMarket = readJson('.claude-plugin/marketplace.json');
  const codexMarket = readJson('.agents/plugins/marketplace.json');
  const codexPlugin = readJson('plugins/pm/.codex-plugin/plugin.json');
  for (const [label, manifest] of [['Claude plugin', claudePlugin], ['Codex plugin', codexPlugin]]) {
    if (manifest.name !== 'pm') fail(`${label}: name must be pm`);
    if (manifest.version !== VERSION) fail(`${label}: version must be ${VERSION}`);
    if (manifest.homepage !== REPOSITORY || manifest.repository !== REPOSITORY) fail(`${label}: homepage and repository must be ${REPOSITORY}`);
    assertDescription(label, manifest.description, label.startsWith('Codex'));
  }
  if (claudePlugin.skills !== './.claude/skills') fail('Claude plugin: skills must be ./.claude/skills');
  if (claudeMarket.name !== 'pm-skills') fail('Claude marketplace: name must be pm-skills');
  const claudeEntry = claudeMarket.plugins?.find((entry) => entry.name === 'pm');
  if (!claudeEntry) fail('Claude marketplace: pm plugin is missing');
  else {
    if (claudeEntry.version !== VERSION) fail(`Claude marketplace: version must be ${VERSION}`);
    if (claudeEntry.source !== './') fail('Claude marketplace: source must be ./');
    assertDescription('Claude marketplace', claudeEntry.description);
  }
  if (codexMarket.name !== 'pm-skills') fail('Codex marketplace: name must be pm-skills');
  const codexEntry = codexMarket.plugins?.find((entry) => entry.name === 'pm');
  if (!codexEntry) fail('Codex marketplace: pm plugin is missing');
  else {
    if (codexEntry.source?.source !== 'local' || codexEntry.source?.path !== './plugins/pm') fail('Codex marketplace: source must be local ./plugins/pm');
    if (codexEntry.policy?.installation !== 'AVAILABLE' || codexEntry.policy?.authentication !== 'ON_INSTALL') fail('Codex marketplace: policy must be AVAILABLE and ON_INSTALL');
    if (codexEntry.category !== 'Productivity') fail('Codex marketplace: category must be Productivity');
    assertDescription('Codex marketplace', codexEntry.description ?? codexEntry.interface?.longDescription, true);
  }
  if (codexPlugin.skills !== './skills/') fail('Codex plugin: skills must be ./skills/');
  for (const key of ['apps', 'mcpServers', 'hooks', 'agents']) if (Object.hasOwn(codexPlugin, key)) fail(`Codex plugin: optional ${key} metadata is forbidden`);
}

function assertRepositoryShape() {
  for (const path of ['.codex/skills', '.opencode', 'plugins/pm/agents/openai.yaml']) if (existsSync(join(ROOT, path))) fail(`forbidden path exists: ${path}`);
  const agents = join(ROOT, 'AGENTS.md');
  if (!existsSync(agents)) fail('AGENTS.md is missing');
  else {
    const stat = lstatSync(agents);
    if (!stat.isSymbolicLink()) fail(`AGENTS.md must remain a symlink (git mode ${GIT_SYMLINK_MODE})`);
    else if (readlinkSync(agents) !== 'CLAUDE.md' || readFileSync(agents, 'utf8') !== readFileSync(join(ROOT, 'CLAUDE.md'), 'utf8') || realpathSync(agents) !== realpathSync(join(ROOT, 'CLAUDE.md'))) fail('AGENTS.md must target CLAUDE.md');
    const indexLine = gitLines(['ls-files', '-s', '--', 'AGENTS.md'])[0] ?? '';
    if (!indexLine.startsWith(`${GIT_SYMLINK_MODE} `)) fail(`AGENTS.md must remain git mode ${GIT_SYMLINK_MODE}`);
  }
}

function assertCodexEquality() {
  for (const rel of EXPECTED_SKILL_FILES) {
    const a = join(ROOT, TREES.codexRepository, rel);
    const b = join(ROOT, TREES.codexPlugin, rel);
    if (existsSync(a) && existsSync(b) && !readFileSync(a).equals(readFileSync(b))) fail(`Codex outputs differ: ${rel}`);
  }
}

function assertSite(path) {
  const content = text(path);
  for (const command of [
    '/plugin marketplace add jameshemson/pm-skills', '/plugin install pm@pm-skills', '/pm',
    'codex plugin marketplace add jameshemson/pm-skills', 'codex plugin add pm@pm-skills', '$pm:pm',
    '.agents/skills/pm', '$pm', 'pm-skills v2.17.0',
  ]) if (!content.includes(command)) fail(`site: missing ${command}`);
  if (!/AI skill pack|skill pack for product managers/i.test(content)) fail('site: provider-neutral AI skill-pack positioning is missing');
  if (/Claude Code skill pack|skill pack for Claude/i.test(content)) fail('site: positioning still claims a Claude-only skill pack');
  if (content.includes('\u2014')) fail('site: Unicode em dash is forbidden');
}

function gitLines(args) {
  try { return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).split('\n').filter(Boolean); }
  catch (error) { fail(`git ${args.join(' ')} failed: ${error.stderr?.trim() || error.message}`); return []; }
}

function changedPaths(base) {
  return [...new Set([
    ...gitLines(['diff', '--name-only', '--diff-filter=ACMRTUXB', base, '--']),
    ...gitLines(['ls-files', '--others', '--exclude-standard']),
  ])].sort();
}

function assertNoAddedEmDash(base, paths) {
  const tracked = new Set(gitLines(['ls-files']));
  const trackedPaths = paths.filter((path) => tracked.has(path));
  if (trackedPaths.length) {
    let diff = '';
    try { diff = execFileSync('git', ['diff', '--unified=0', base, '--', ...trackedPaths], { cwd: ROOT, encoding: 'utf8' }); }
    catch (error) { fail(`copy: cannot inspect added lines: ${error.message}`); }
    if (diff.split('\n').some((line) => line.startsWith('+') && !line.startsWith('+++') && line.includes('\u2014'))) fail('copy: changed tracked content adds a Unicode em dash');
  }
  for (const path of paths.filter((path) => !tracked.has(path))) {
    const absolute = join(ROOT, path);
    if (existsSync(absolute) && lstatSync(absolute).isFile() && readFileSync(absolute, 'utf8').includes('\u2014')) fail(`copy: untracked file adds a Unicode em dash: ${path}`);
  }
}

function assertSharedClaudeAllowlist() {
  const sourceRoot = join(ROOT, TREES.source);
  for (const rel of EXPECTED_SKILL_FILES) {
    const path = join(sourceRoot, rel);
    if (!existsSync(path)) continue;
    const shared = stripProviderBlocks(readFileSync(path, 'utf8'), 'claude');
    for (const [index, line] of shared.split('\n').entries()) {
      if (!/Claude/i.test(line)) continue;
      const allowed = rel === 'reference/foundations.md' && /Claude (?:analytical voice|analytical register|favourite|word-hoard)|Claudism Catalogue/i.test(line);
      if (!allowed) fail(`copy: shared Claude term outside allowlist at ${TREES.source}/${rel}:${index + 1}`);
    }
  }
}

function assertInvocationCopy() {
  const readme = text(join(ROOT, 'README.md'));
  for (const value of [
    '/plugin marketplace add jameshemson/pm-skills', '/plugin install pm@pm-skills', '/pm',
    'codex plugin marketplace add jameshemson/pm-skills', 'codex plugin add pm@pm-skills', '$pm:pm',
    '.agents/skills/pm', '$pm',
  ]) if (!readme.includes(value)) fail(`copy: README.md is missing ${value}`);
}

function assertCopy(base) {
  const paths = changedPaths(base);
  assertNoAddedEmDash(base, paths);
  assertSharedClaudeAllowlist();
  assertInvocationCopy();
}

function assertExcluded(base) {
  const prefixes = ['plans/', 'eval/', '.build/', '.codex/skills', '.opencode'];
  for (const path of changedPaths(base)) if (prefixes.some((prefix) => path === prefix.replace(/\/$/, '') || path.startsWith(prefix))) fail(`excluded release path changed: ${path}`);
}

try {
  const { mode, site, base } = parseArgs(process.argv.slice(2));
  if (mode === 'source-only') assertSource();
  else if (mode === 'manifests-only') assertManifests();
  else if (mode === 'site-only') assertSite(site);
  else if (mode === 'copy-only') assertCopy(base);
  else if (mode === 'excluded-paths-only') assertExcluded(base);
  else {
    assertSource();
    assertRenderedTree('Claude output', TREES.claude, 'claude');
    assertRenderedTree('Codex repository output', TREES.codexRepository, 'codex');
    assertRenderedTree('Codex plugin output', TREES.codexPlugin, 'codex');
    assertCodexEquality();
    assertManifests();
    assertRepositoryShape();
  }
} catch (error) {
  fail(error.message);
}

if (failures.length) {
  console.error(`FAIL: ${failures.length} issue(s) found:`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exitCode = 1;
} else {
  console.log('PASS: requested structure checks passed.');
}
