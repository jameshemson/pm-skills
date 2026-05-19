#!/usr/bin/env node
/**
 * check-structure.mjs
 * Validates the source/skills/pm/ structure for the pm-v2 rebuild.
 * Uses only Node built-ins (fs, path, url). Exit 0 = PASS, exit 1 = FAIL.
 */
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PM_DIR = join(ROOT, '.claude', 'skills', 'pm');
const SKILL_MD = join(PM_DIR, 'SKILL.md');
const REF_DIR = join(PM_DIR, 'reference');

const failures = [];
const fail = (msg) => failures.push(msg);

// ── 1. Parse mode names from the commands table in SKILL.md ─────────────────
let modesFromTable = [];
if (!existsSync(SKILL_MD)) {
  fail('source/skills/pm/SKILL.md does not exist');
} else {
  const content = readFileSync(SKILL_MD, 'utf8');
  const lines = content.split('\n');

  // Size check: SKILL.md <= 200 lines
  if (lines.length > 200) {
    fail(`SKILL.md is ${lines.length} lines (limit: 200)`);
  }

  // Extract mode names from table rows like: | teach | ... | reference/mode-teach.md |
  // or: | teach | ... (any pipe-delimited row where first cell is a plain word)
  // The plan says the table has columns: mode | category | description | reference
  // We look for rows where the first cell is a single word (the mode name).
  for (const line of lines) {
    const match = line.match(/^\|\s*`?([a-z][a-z-]*)`?\s*\|/);
    if (match && match[1] !== 'mode') {
      modesFromTable.push(match[1]);
    }
  }

  if (modesFromTable.length === 0) {
    fail('SKILL.md: no mode rows found in commands table (expected rows like | teach | ...)');
  }
}

// ── 2. Assert each mode has a reference/mode-<mode>.md ──────────────────────
for (const mode of modesFromTable) {
  const expected = join(REF_DIR, `mode-${mode}.md`);
  if (!existsSync(expected)) {
    fail(`Missing file for mode '${mode}': reference/mode-${mode}.md`);
  }
}

// ── 3. Assert the set of reference/mode-*.md files exactly matches ──────────
let modeFilesOnDisk = [];
if (existsSync(REF_DIR)) {
  modeFilesOnDisk = readdirSync(REF_DIR)
    .filter((f) => f.match(/^mode-.+\.md$/))
    .map((f) => f.replace(/^mode-/, '').replace(/\.md$/, ''));
}

const tableSet = new Set(modesFromTable);
for (const diskMode of modeFilesOnDisk) {
  if (!tableSet.has(diskMode)) {
    fail(`Extra mode file with no table entry: reference/mode-${diskMode}.md`);
  }
}

// ── 4. Resolve relative markdown links in every .md under source/skills/pm/ ─
function collectMdFiles(dir) {
  if (!existsSync(dir)) return [];
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectMdFiles(full));
    else if (entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

const linkPattern = /\]\(([^)]+)\)/g;

for (const mdFile of collectMdFiles(PM_DIR)) {
  const content = readFileSync(mdFile, 'utf8');
  const fileDir = dirname(mdFile);
  let match;
  while ((match = linkPattern.exec(content)) !== null) {
    const href = match[1];
    // Skip absolute URLs and anchor-only links
    if (href.startsWith('http') || href.startsWith('#')) continue;
    // Strip any fragment from the path
    const target = href.split('#')[0];
    if (!target) continue;
    const resolved = resolve(fileDir, target);
    if (!existsSync(resolved)) {
      const relFile = mdFile.replace(ROOT + '/', '');
      fail(`Broken link in ${relFile}: ](${href}) -> target not found`);
    }
  }
}

// ── 5. Assert mode-review.md <= 150 lines ───────────────────────────────────
const reviewMd = join(REF_DIR, 'mode-review.md');
if (existsSync(reviewMd)) {
  const lines = readFileSync(reviewMd, 'utf8').split('\n');
  if (lines.length > 150) {
    fail(`mode-review.md is ${lines.length} lines (limit: 150)`);
  }
} else {
  // Not a failure here — absence is already caught by check 2 if 'review' is in the table.
  // If the table doesn't exist yet either, we avoid double-reporting.
}

// ── 6. Print summary and exit ────────────────────────────────────────────────
if (failures.length === 0) {
  console.log('PASS: all structure checks passed.');
  process.exit(0);
} else {
  console.log(`FAIL: ${failures.length} issue(s) found:\n`);
  for (const f of failures) {
    console.log(`  - ${f}`);
  }
  process.exit(1);
}
