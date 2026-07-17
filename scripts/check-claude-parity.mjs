#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_BASE = 'b820b43b6aa4f54afd23c17858ba7a135ea37b86';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PM_ROOT = join(ROOT, '.claude/skills/pm');
const REFERENCES = [
  'foundations.md', 'knowledge-communication.md', 'knowledge-craft-score.md',
  'knowledge-decision-making.md', 'knowledge-discovery.md', 'knowledge-leadership.md',
  'knowledge-metrics.md', 'knowledge-positioning.md', 'knowledge-prioritisation.md',
  'knowledge-review-personas.md', 'knowledge-specification.md', 'mode-brief.md',
  'mode-decide.md', 'mode-discover.md', 'mode-metrics.md', 'mode-review.md',
  'mode-setup.md', 'mode-spec.md', 'mode-stories.md', 'mode-teach.md',
];
const EXPECTED = ['SKILL.md', ...REFERENCES.map((name) => `reference/${name}`)];
const SEMANTIC = new Set([
  'SKILL.md', 'reference/mode-teach.md', 'reference/mode-setup.md',
  'reference/mode-decide.md', 'reference/mode-review.md',
]);
const EXACT_ALLOWED = new Set([
  'reference/knowledge-craft-score.md', 'reference/knowledge-review-personas.md',
]);
const ALLOWED = new Set([...SEMANTIC, ...EXACT_ALLOWED]);

function parseArgs(argv) {
  let base = DEFAULT_BASE;
  let selfTest = false;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--self-test') selfTest = true;
    else if (argv[i] === '--base' && argv[i + 1]) base = argv[++i];
    else throw new Error(`Unknown or incomplete argument: ${argv[i]}`);
  }
  return { base, selfTest };
}

function filesUnder(root, prefix = '') {
  if (!existsSync(root)) return [];
  const result = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) result.push(...filesUnder(join(root, entry.name), rel));
    else result.push(rel);
  }
  return result.sort();
}

function baseBytes(base, path) {
  const repoPath = `.claude/skills/pm/${path}`;
  return execFileSync('git', ['show', `${base}:${repoPath}`], { cwd: ROOT, encoding: null, stdio: ['ignore', 'pipe', 'pipe'] });
}

function semanticFailures(path, content) {
  const issues = [];
  const need = (condition, message) => { if (!condition) issues.push(`${path}: ${message}`); };
  need(!/\{\{[A-Z_]+\}\}|<!-- \/?provider|AGENTS\.md|request_user_input|structured user-input tool/i.test(content), 'unresolved or Codex-only syntax leaked into Claude output');

  if (path === 'SKILL.md') {
    need(content.includes('/pm teach'), 'missing /pm invocation');
    need(content.includes('CLAUDE.md'), 'missing CLAUDE.md target');
    need(content.includes('AskUserQuestion'), 'missing AskUserQuestion fork');
    need(/at most four questions|up to 4 questions/i.test(content), 'AskUserQuestion is not capped at four');
    need(/Ask exactly three questions/i.test(content), 'session-only router is not exactly three questions');
  } else if (path === 'reference/mode-teach.md' || path === 'reference/mode-setup.md') {
    need(content.includes('CLAUDE.md'), 'missing CLAUDE.md target');
    need(content.includes('AskUserQuestion'), 'missing AskUserQuestion behavior');
    need(/at most 4 questions|at most four questions|up to 4/i.test(content), 'AskUserQuestion is not capped at four');
    need(content.includes('/pm'), 'missing /pm continuation');
  } else if (path === 'reference/mode-review.md') {
    need(content.includes('AskUserQuestion'), 'missing AskUserQuestion behavior');
    need(/at most four questions|up to 4/i.test(content), 'AskUserQuestion is not capped at four');
    need(/session-only/i.test(content), 'missing session-only review behavior');
  } else if (path === 'reference/mode-decide.md') {
    const session = content.match(/## Session-only execution\n([\s\S]*?)(?=\n## Step 0:)/i)?.[1] ?? '';
    need(Boolean(session), 'missing bounded session-only section');
    need(/skip Step 0 and Step 8/i.test(session), 'session-only does not skip Steps 0 and 8');
    need(/Run Steps 1-7/i.test(session), 'session-only does not run Steps 1-7');
    need(/Do not read[^\n]*(?:history|settings)/i.test(session), 'session-only does not prohibit persistent reads');
    need(/do not write[^\n]*(?:files|settings)|do not[^\n]*log/i.test(session), 'session-only does not prohibit persistent writes');
    need(content.includes('AskUserQuestion'), 'missing AskUserQuestion behavior');
    need(/at most four questions|up to 4/i.test(content), 'AskUserQuestion is not capped at four');
    need(content.includes('/pm brief') && content.includes('/pm spec'), 'missing /pm continuations');
  }
  return issues;
}

function exactByteFailures(path, current, baseline) {
  return current.equals(baseline) ? [] : [`${path}: bytes differ from base`];
}

function runSelfTest(base) {
  const fixtures = {
    'SKILL.md': 'Use /pm teach. Read CLAUDE.md. Use AskUserQuestion with at most four questions. Ask exactly three questions.\n',
    'reference/mode-teach.md': 'Read CLAUDE.md. Use AskUserQuestion with at most 4 questions. Continue with /pm setup.\n',
    'reference/mode-setup.md': 'Write CLAUDE.md. Use AskUserQuestion with up to 4 questions. Continue with /pm teach.\n',
    'reference/mode-decide.md': '## Session-only execution\nSkip Step 0 and Step 8. Run Steps 1-7. Do not read prior history or settings. Do not write files or settings and do not log.\n\n## Step 0: Read prior\nUse AskUserQuestion with at most four questions. Then /pm brief or /pm spec.\n',
    'reference/mode-review.md': 'Use AskUserQuestion with at most four questions. Session-only review differs only in persistence.\n',
  };
  const mutations = {
    'SKILL.md': (value) => value.replace('CLAUDE.md', 'AGENTS.md'),
    'reference/mode-teach.md': (value) => value.replace('at most 4', 'at most 5'),
    'reference/mode-setup.md': (value) => value.replace('AskUserQuestion', 'ask somehow'),
    'reference/mode-decide.md': (value) => value.replace('Do not read', 'Read'),
    'reference/mode-review.md': (value) => value.replace('at most four', 'at most five'),
  };
  const problems = [];
  for (const path of SEMANTIC) {
    if (semanticFailures(path, fixtures[path]).length) problems.push(`self-test fixture is invalid: ${path}`);
    if (!semanticFailures(path, mutations[path](fixtures[path])).length) problems.push(`self-test mutation escaped detection: ${path}`);
  }
  for (const path of EXACT_ALLOWED) {
    const original = baseBytes(base, path);
    const mutated = Buffer.concat([original, Buffer.from('\nmutation\n')]);
    if (exactByteFailures(path, original, original).length) problems.push(`self-test exact-byte baseline is invalid: ${path}`);
    if (!exactByteFailures(path, mutated, original).length) problems.push(`self-test exact-byte mutation escaped detection: ${path}`);
  }
  if (problems.length) throw new Error(problems.join('; '));
  console.log('PASS: Claude parity self-test rejected mutations for all seven allowlisted paths.');
}

const failures = [];
try {
  const { base, selfTest } = parseArgs(process.argv.slice(2));
  if (selfTest) {
    runSelfTest(base);
  } else {
    const actual = filesUnder(PM_ROOT);
    for (const path of EXPECTED.filter((path) => !actual.includes(path))) failures.push(`missing current Claude path: .claude/skills/pm/${path}`);
    for (const path of actual.filter((path) => !EXPECTED.includes(path))) failures.push(`unexpected current Claude path: .claude/skills/pm/${path}`);

    for (const path of EXPECTED) {
      const repoPath = `.claude/skills/pm/${path}`;
      let baseline;
      try { baseline = baseBytes(base, path); }
      catch (error) { failures.push(`cannot read base path ${repoPath} from ${base}: ${error.stderr?.toString().trim() || error.message}`); continue; }
      if (!existsSync(join(PM_ROOT, path))) continue;
      const current = readFileSync(join(PM_ROOT, path));
      const changed = !current.equals(baseline);
      if (changed && !ALLOWED.has(path)) failures.push(`unapproved Claude change: ${repoPath}`);
      if (EXACT_ALLOWED.has(path)) failures.push(...exactByteFailures(path, current, baseline).map(() => `Claude path must remain byte-identical to base: ${repoPath}`));
      if (SEMANTIC.has(path) && changed) failures.push(...semanticFailures(path, current.toString('utf8')).map((issue) => `changed Claude semantics invalid: ${issue}`));
    }

    if (!failures.length) console.log(`PASS: Claude parity matches ${base}; changed allowlisted paths satisfy Claude semantics.`);
  }
} catch (error) {
  failures.push(error.message);
}

if (failures.length) {
  console.error(`FAIL: Claude parity found ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exitCode = 1;
}
