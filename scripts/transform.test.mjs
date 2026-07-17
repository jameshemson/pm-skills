import test from 'node:test';
import assert from 'node:assert/strict';

import { TARGETS, transformMarkdown } from './transform.mjs';

const canonical = `---
name: pm
user-invokable: true
description: Product critique.
argument-hint: "[mode] [target]"
---

Run {{PM_INVOCATION}}. Read {{INSTRUCTIONS_FILE}}. {{ASSISTANT_NAME}} acts.
<!-- provider:claude -->
Claude only.
<!-- /provider -->
<!-- provider:codex -->
Codex only.
<!-- /provider -->
`;

const render = (input, target = 'claude') =>
  transformMarkdown(input, { target, filePath: 'fixture/SKILL.md' });

const referenceBody = `# Review mode

Run {{PM_INVOCATION}}. Read {{INSTRUCTIONS_FILE}}. {{ASSISTANT_NAME}} acts.
<!-- provider:claude -->
Use AskUserQuestion.
<!-- /provider -->
<!-- provider:codex -->
Use structured input when available.
<!-- /provider -->
`;

test('TARGETS exposes only the three frozen distribution configurations', () => {
  assert.deepEqual(Object.keys(TARGETS).sort(), ['claude', 'codexPlugin', 'codexRepository']);
  assert.ok(Object.isFrozen(TARGETS));
  for (const config of Object.values(TARGETS)) assert.ok(Object.isFrozen(config));
});

test('the exhaustive token map resolves exactly for Claude', () => {
  const output = render(canonical);
  assert.match(output, /Run \/pm\. Read CLAUDE\.md\. Claude acts\./);
  assert.doesNotMatch(output, /\{\{[A-Z_]+\}\}/);
});

test('the exhaustive token map resolves exactly for Codex', () => {
  const output = render(canonical, 'codexRepository');
  assert.match(output, /Run pm\. Read AGENTS\.md\. the assistant acts\./);
  assert.doesNotMatch(output, /\{\{[A-Z_]+\}\}/);
});

test('provider blocks include only the exact selected provider and remove markers', () => {
  const claude = render(canonical);
  assert.match(claude, /Claude only\./);
  assert.doesNotMatch(claude, /Codex only\.|provider:/);

  const codex = render(canonical, 'codexPlugin');
  assert.match(codex, /Codex only\./);
  assert.doesNotMatch(codex, /Claude only\.|provider:/);
});

test('Claude rendering preserves canonical frontmatter byte-for-byte', () => {
  const output = render(canonical);
  assert.equal(output.slice(0, output.indexOf('---', 4) + 3), canonical.slice(0, canonical.indexOf('---', 4) + 3));
});

test('Codex frontmatter allowlists exactly name and description', () => {
  const output = render(canonical, 'codexRepository');
  const frontmatter = output.slice(4, output.indexOf('\n---', 4));
  assert.equal(frontmatter, 'name: pm\ndescription: Product critique.');
  assert.deepEqual(frontmatter.split('\n').map((line) => line.split(':', 1)[0]), ['name', 'description']);
});

test('Codex repository and plugin configurations and bytes are identical', () => {
  assert.deepEqual(TARGETS.codexRepository, TARGETS.codexPlugin);
  assert.equal(render(canonical, 'codexRepository'), render(canonical, 'codexPlugin'));
});

for (const [target, expectedLine, selectedBlock, excludedBlock] of [
  ['claude', 'Run /pm. Read CLAUDE.md. Claude acts.', 'Use AskUserQuestion.', 'Use structured input when available.'],
  ['codexRepository', 'Run pm. Read AGENTS.md. the assistant acts.', 'Use structured input when available.', 'Use AskUserQuestion.'],
  ['codexPlugin', 'Run pm. Read AGENTS.md. the assistant acts.', 'Use structured input when available.', 'Use AskUserQuestion.'],
]) {
  test(`accepts and transforms body-only reference Markdown for ${target}`, () => {
    const output = transformMarkdown(referenceBody, {
      target,
      filePath: 'fixture/reference/mode-review.md',
    });

    assert.ok(output.startsWith('# Review mode\n'));
    assert.doesNotMatch(output, /^---\n/);
    assert.match(output, new RegExp(expectedLine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.ok(output.includes(selectedBlock));
    assert.ok(!output.includes(excludedBlock));
    assert.doesNotMatch(output, /\{\{[A-Z_]+\}\}|provider:/);
  });
}

test('still rejects missing or malformed frontmatter when filePath ends in SKILL.md', () => {
  for (const input of [
    referenceBody,
    '---\nname: pm\ndescription: Product critique.\n\nBody without a closing fence.\n',
  ]) {
    assert.throws(
      () => transformMarkdown(input, { target: 'claude', filePath: 'nested/pm/SKILL.md' }),
      /SKILL\.md.*frontmatter|frontmatter.*SKILL\.md/i,
    );
  }
});

for (const [label, input] of [
  ['unknown provider', canonical.replace('provider:claude', 'provider:other')],
  ['case-varied provider markers', canonical.replace('<!-- provider:claude -->\nClaude only.\n<!-- /provider -->', '<!-- Provider:claude -->\nClaude only.\n<!-- /Provider -->')],
  ['nested provider block', canonical.replace('Claude only.', '<!-- provider:codex -->\nnested\n<!-- /provider -->')],
  ['unclosed provider block', canonical.replace('\n<!-- /provider -->', '')],
  ['orphan provider close', canonical.replace('<!-- provider:claude -->\n', '')],
  ['non-exact provider marker', canonical.replace('<!-- provider:claude -->', '<!--provider:claude-->')],
]) {
  test(`rejects ${label}`, () => {
    assert.throws(() => render(input), /fixture\/SKILL\.md|provider/i);
  });
}

test('rejects missing frontmatter', () => {
  assert.throws(() => render('name: pm\ndescription: nope'), /frontmatter/i);
});

test('rejects a missing required frontmatter key', () => {
  assert.throws(() => render(canonical.replace('description: Product critique.\n', '')), /description|frontmatter/i);
});

test('rejects duplicate frontmatter keys', () => {
  assert.throws(() => render(canonical.replace('name: pm\n', 'name: pm\nname: duplicate\n')), /duplicate|name/i);
});

test('rejects unknown targets', () => {
  assert.throws(() => render(canonical, 'other'), /target|provider|other/i);
});

test('rejects unknown or unresolved tokens', () => {
  assert.throws(() => render(canonical.replace('{{PM_INVOCATION}}', '{{UNKNOWN_TOKEN}}')), /UNKNOWN_TOKEN|token/i);
});

for (const malformedToken of ['{{{PM_INVOCATION}}}', '{{PM_INVOCATION}}}', '{{PM_INVOCATION}}{{INSTRUCTIONS_FILE}}}']) {
  test(`rejects adjacent or over-braced token ${malformedToken}`, () => {
    assert.throws(
      () => render(canonical.replace('{{PM_INVOCATION}}', malformedToken)),
      /token|unresolved|malformed/i,
    );
  });
}
