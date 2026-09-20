#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Guards the generated Claude tree's provider semantics. The Codex build must never
// leak Codex-only syntax into Claude output, and the Claude-specific contracts
// (/pm, CLAUDE.md, AskUserQuestion capped at four, session-only decide) must survive
// every regeneration. Byte parity with a frozen pre-Codex commit was the original
// migration check; check:sync now proves the trees match the canonical source, so
// this script checks meaning, not bytes, and content edits to the source stay legal.

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
const CLAUDE_QUESTION_CAP_PATTERN = /(?:at most|up to) (?:four questions|4(?: questions)?)/i;

function parseArgs(argv) {
  let selfTest = false;
  for (const arg of argv) {
    if (arg === '--self-test') selfTest = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return { selfTest };
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

function semanticFailures(path, content) {
  const issues = [];
  const need = (condition, message) => { if (!condition) issues.push(`${path}: ${message}`); };
  need(!/\{\{[A-Z_]+\}\}|<!-- \/?provider|AGENTS\.md|request_user_input|structured user-input tool/i.test(content), 'unresolved or Codex-only syntax leaked into Claude output');

  if (path === 'SKILL.md') {
    need(content.includes('/pm teach'), 'missing /pm invocation');
    need(content.includes('CLAUDE.md'), 'missing CLAUDE.md target');
    need(content.includes('AskUserQuestion'), 'missing AskUserQuestion fork');
    need(CLAUDE_QUESTION_CAP_PATTERN.test(content), 'AskUserQuestion is not capped at four');
    need(/Ask exactly three questions/i.test(content), 'session-only router is not exactly three questions');
  } else if (path === 'reference/mode-teach.md' || path === 'reference/mode-setup.md') {
    need(content.includes('CLAUDE.md'), 'missing CLAUDE.md target');
    need(content.includes('AskUserQuestion'), 'missing AskUserQuestion behavior');
    need(CLAUDE_QUESTION_CAP_PATTERN.test(content), 'AskUserQuestion is not capped at four');
    need(content.includes('/pm'), 'missing /pm continuation');
  } else if (path === 'reference/mode-review.md') {
    need(content.includes('AskUserQuestion'), 'missing AskUserQuestion behavior');
    need(CLAUDE_QUESTION_CAP_PATTERN.test(content), 'AskUserQuestion is not capped at four');
    need(/session-only/i.test(content), 'missing session-only review behavior');
  } else if (path === 'reference/mode-decide.md') {
    const session = content.match(/## Session-only execution\n([\s\S]*?)(?=\n## Step 0:)/i)?.[1] ?? '';
    need(Boolean(session), 'missing bounded session-only section');
    need(/skip Step 0 and Step 8/i.test(session), 'session-only skip contract is missing');
    need(/Run Steps 1-7/i.test(session), 'session-only execution range is missing');
    need(/Do not read[^\n]*(?:history|settings)/i.test(session), 'session-only does not prohibit persistent reads');
    need(/do not write[^\n]*(?:files|settings)|do not[^\n]*log/i.test(session), 'session-only does not prohibit persistent writes');
    need(content.includes('AskUserQuestion'), 'missing AskUserQuestion behavior');
    need(CLAUDE_QUESTION_CAP_PATTERN.test(content), 'AskUserQuestion is not capped at four');
    need(content.includes('/pm brief') && content.includes('/pm spec'), 'missing /pm continuations');
  }
  return issues;
}

function runSelfTest() {
  const fixtures = {
    'SKILL.md': 'Use /pm teach. Read CLAUDE.md. Use AskUserQuestion with at most four questions. Ask exactly three questions.\n',
    'reference/mode-teach.md': 'Read CLAUDE.md. Use AskUserQuestion with at most four questions. Continue with /pm setup.\n',
    'reference/mode-setup.md': 'Write CLAUDE.md. Use AskUserQuestion with up to four questions. Continue with /pm teach.\n',
    'reference/mode-decide.md': '## Session-only execution\nSkip Step 0 and Step 8. Run Steps 1-7. Do not read prior history or settings. Do not write files or settings and do not log.\n\n## Step 0: Read prior\nUse AskUserQuestion with at most four questions. Then /pm brief or /pm spec.\n',
    'reference/mode-review.md': 'Use AskUserQuestion with at most four questions. Session-only review differs only in persistence.\n',
  };
  const mutations = {
    'SKILL.md': (value) => value.replace('CLAUDE.md', 'AGENTS.md'),
    'reference/mode-teach.md': (value) => value.replace('at most four', 'at most five'),
    'reference/mode-setup.md': (value) => value.replace('AskUserQuestion', 'ask somehow'),
    'reference/mode-decide.md': (value) => value.replace('Do not read', 'Read'),
    'reference/mode-review.md': (value) => value.replace('at most four', 'at most five'),
  };
  const problems = [];
  for (const path of SEMANTIC) {
    if (semanticFailures(path, fixtures[path]).length) problems.push(`self-test fixture is invalid: ${path}`);
    if (!semanticFailures(path, mutations[path](fixtures[path])).length) problems.push(`self-test mutation escaped detection: ${path}`);
  }
  const leak = 'Plain reference text.\nUse request_user_input when available.\n';
  if (!semanticFailures('reference/foundations.md', leak).length) problems.push('self-test Codex-only leak escaped detection');
  if (problems.length) throw new Error(problems.join('; '));
  console.log('PASS: Claude parity self-test rejected mutations for all five semantic paths and a Codex-only leak.');
}

const failures = [];
try {
  const { selfTest } = parseArgs(process.argv.slice(2));
  if (selfTest) {
    runSelfTest();
  } else {
    const actual = filesUnder(PM_ROOT);
    for (const path of EXPECTED.filter((path) => !actual.includes(path))) failures.push(`missing current Claude path: .claude/skills/pm/${path}`);
    for (const path of actual.filter((path) => !EXPECTED.includes(path))) failures.push(`unexpected current Claude path: .claude/skills/pm/${path}`);

    for (const path of EXPECTED) {
      const absolute = join(PM_ROOT, path);
      if (!existsSync(absolute)) continue;
      failures.push(...semanticFailures(path, readFileSync(absolute, 'utf8')).map((issue) => `Claude semantics invalid: ${issue}`));
    }

    if (!failures.length) console.log(`PASS: all ${EXPECTED.length} Claude paths are present and keep their Claude semantics.`);
  }
} catch (error) {
  failures.push(error.message);
}

if (failures.length) {
  console.error(`FAIL: Claude parity found ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exitCode = 1;
}
