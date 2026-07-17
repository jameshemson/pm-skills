import test from 'node:test';
import assert from 'node:assert/strict';
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { buildGeneratedTrees } from './build.mjs';

const skill = `---
name: pm
user-invokable: true
description: Product critique.
argument-hint: "[mode]"
---

Use {{PM_INVOCATION}}.
`;

function fixture() {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'pm-build-test-'));
  mkdirSync(join(repositoryRoot, 'source/skills/pm'), { recursive: true });
  writeFileSync(join(repositoryRoot, 'source/skills/pm/SKILL.md'), skill);
  mkdirSync(join(repositoryRoot, 'scripts'), { recursive: true });
  const inventoryPath = 'scripts/generated-inventory.json';
  writeFileSync(join(repositoryRoot, inventoryPath), '{"version":1,"files":[]}\n');
  return {
    repositoryRoot,
    inventoryPath,
    cleanup: () => rmSync(repositoryRoot, { recursive: true, force: true }),
  };
}

function run(fx, outputRoots = [{ root: 'generated/pm', target: 'claude' }]) {
  return buildGeneratedTrees({
    repositoryRoot: fx.repositoryRoot,
    sourceRoot: 'source/skills/pm',
    outputRoots,
    inventoryPath: fx.inventoryPath,
  });
}

function setInventory(fx, files) {
  writeFileSync(join(fx.repositoryRoot, fx.inventoryPath), `${JSON.stringify({ version: 1, files }, null, 2)}\n`);
}

function withFixture(fn) {
  return async () => {
    const fx = fixture();
    try {
      await fn(fx);
    } finally {
      fx.cleanup();
    }
  };
}

test('first build creates an output root from its nearest validated parent', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'generated'));
  await run(fx);
  assert.ok(lstatSync(join(fx.repositoryRoot, 'generated/pm')).isDirectory());
  assert.ok(existsSync(join(fx.repositoryRoot, 'generated/pm/SKILL.md')));
}));

test('rejects a symlinked output root', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'real'), { recursive: true });
  mkdirSync(join(fx.repositoryRoot, 'generated'), { recursive: true });
  symlinkSync(join(fx.repositoryRoot, 'real'), join(fx.repositoryRoot, 'generated/pm'));
  await assert.rejects(() => run(fx), /symlink|generated\/pm/i);
}));

test('rejects a symlinked existing ancestor during first-build creation', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'real'), { recursive: true });
  mkdirSync(join(fx.repositoryRoot, 'generated'), { recursive: true });
  symlinkSync(join(fx.repositoryRoot, 'real'), join(fx.repositoryRoot, 'generated/link'));
  await assert.rejects(() => run(fx, [{ root: 'generated/link/pm', target: 'claude' }]), /symlink|generated\/link/i);
}));

test('preflights a bad second symlinked root before creating the first output', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'bad'), { recursive: true });
  mkdirSync(join(fx.repositoryRoot, 'outside'), { recursive: true });
  symlinkSync(join(fx.repositoryRoot, 'outside'), join(fx.repositoryRoot, 'bad/link'));
  await assert.rejects(() => run(fx, [
    { root: 'first/pm', target: 'claude' },
    { root: 'bad/link/pm', target: 'codexRepository' },
  ]), /symlink|bad\/link/i);
  assert.equal(existsSync(join(fx.repositoryRoot, 'first')), false);
}));

test('preflights a bad third unsafe root before creating earlier outputs', withFixture(async (fx) => {
  await assert.rejects(() => run(fx, [
    { root: 'first/pm', target: 'claude' },
    { root: 'second/pm', target: 'codexRepository' },
    { root: '../outside', target: 'codexPlugin' },
  ]), /segment|traversal|unsafe/i);
  assert.equal(existsSync(join(fx.repositoryRoot, 'first')), false);
  assert.equal(existsSync(join(fx.repositoryRoot, 'second')), false);
}));

test('preflights a third overlapping root before creating any output', withFixture(async (fx) => {
  await assert.rejects(() => run(fx, [
    { root: 'first/pm', target: 'claude' },
    { root: 'second/pm', target: 'codexRepository' },
    { root: 'first/pm/nested', target: 'codexPlugin' },
  ]), /overlap/i);
  assert.equal(existsSync(join(fx.repositoryRoot, 'first')), false);
  assert.equal(existsSync(join(fx.repositoryRoot, 'second')), false);
}));

test('rejects a nested symlink and never follows it', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'generated/pm/reference'), { recursive: true });
  mkdirSync(join(fx.repositoryRoot, 'outside'), { recursive: true });
  symlinkSync(join(fx.repositoryRoot, 'outside'), join(fx.repositoryRoot, 'generated/pm/reference/link'));
  await assert.rejects(() => run(fx), /symlink|reference\/link/i);
  assert.deepEqual(readFileSync(join(fx.repositoryRoot, fx.inventoryPath), 'utf8'), '{"version":1,"files":[]}\n');
}));

for (const root of ['/tmp/pm-output', '../outside', '', '.', 'generated/./pm', 'generated/../pm']) {
  test(`rejects unsafe output root ${JSON.stringify(root)}`, withFixture(async (fx) => {
    await assert.rejects(() => run(fx, [{ root, target: 'claude' }]), /absolute|empty|segment|traversal|output|unsafe/i);
  }));
}

test('preserves an unexpected file, exits nonzero, and leaves inventory unchanged', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'generated/pm'), { recursive: true });
  writeFileSync(join(fx.repositoryRoot, 'generated/pm/user-notes.md'), 'mine\n');
  const before = readFileSync(join(fx.repositoryRoot, fx.inventoryPath), 'utf8');
  await assert.rejects(() => run(fx), /unexpected|user-notes\.md/i);
  assert.equal(readFileSync(join(fx.repositoryRoot, 'generated/pm/user-notes.md'), 'utf8'), 'mine\n');
  assert.equal(readFileSync(join(fx.repositoryRoot, fx.inventoryPath), 'utf8'), before);
}));

test('preserves an uninventoried file at an expected destination and leaves inventory unchanged', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'generated/pm'), { recursive: true });
  const destination = join(fx.repositoryRoot, 'generated/pm/SKILL.md');
  const original = Buffer.from('user-owned bytes\n');
  writeFileSync(destination, original);
  const inventoryBefore = readFileSync(join(fx.repositoryRoot, fx.inventoryPath));

  await assert.rejects(() => run(fx), /unexpected file.*generated\/pm\/SKILL\.md/i);

  assert.deepEqual(readFileSync(destination), original);
  assert.deepEqual(readFileSync(join(fx.repositoryRoot, fx.inventoryPath)), inventoryBefore);
}));

test('removes only a stale prior-inventory regular file', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'generated/pm'), { recursive: true });
  writeFileSync(join(fx.repositoryRoot, 'generated/pm/stale.md'), 'generated\n');
  setInventory(fx, ['generated/pm/stale.md']);
  await run(fx);
  assert.equal(existsSync(join(fx.repositoryRoot, 'generated/pm/stale.md')), false);
  assert.ok(existsSync(join(fx.repositoryRoot, 'generated/pm/SKILL.md')));
}));

test('prunes only known-empty stale parent directories, non-recursively', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'generated/pm/dead/nested'), { recursive: true });
  writeFileSync(join(fx.repositoryRoot, 'generated/pm/dead/nested/stale.md'), 'generated\n');
  setInventory(fx, ['generated/pm/dead/nested/stale.md']);
  await run(fx);
  assert.equal(existsSync(join(fx.repositoryRoot, 'generated/pm/dead')), false);
}));

test('preserves non-empty parents after stale cleanup', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'source/skills/pm/shared'), { recursive: true });
  writeFileSync(join(fx.repositoryRoot, 'source/skills/pm/shared/current.txt'), 'current\n');
  mkdirSync(join(fx.repositoryRoot, 'generated/pm/shared'), { recursive: true });
  writeFileSync(join(fx.repositoryRoot, 'generated/pm/shared/stale.txt'), 'stale\n');
  setInventory(fx, ['generated/pm/shared/stale.txt']);
  await run(fx);
  assert.equal(existsSync(join(fx.repositoryRoot, 'generated/pm/shared/stale.txt')), false);
  assert.equal(readFileSync(join(fx.repositoryRoot, 'generated/pm/shared/current.txt'), 'utf8'), 'current\n');
  assert.ok(lstatSync(join(fx.repositoryRoot, 'generated/pm/shared')).isDirectory());
}));

test('never removes the output root', withFixture(async (fx) => {
  mkdirSync(join(fx.repositoryRoot, 'generated/pm/dead'), { recursive: true });
  writeFileSync(join(fx.repositoryRoot, 'generated/pm/dead/stale.md'), 'generated\n');
  setInventory(fx, ['generated/pm/dead/stale.md']);
  await run(fx);
  assert.ok(lstatSync(join(fx.repositoryRoot, 'generated/pm')).isDirectory());
}));

test('replaces inventory atomically only after every output succeeds', withFixture(async (fx) => {
  const sentinel = '{\n  "version": 1,\n  "files": []\n}\n';
  writeFileSync(join(fx.repositoryRoot, fx.inventoryPath), sentinel);
  mkdirSync(join(fx.repositoryRoot, 'bad/pm'), { recursive: true });
  writeFileSync(join(fx.repositoryRoot, 'bad/pm/user.md'), 'mine\n');
  await assert.rejects(() => run(fx, [
    { root: 'good/pm', target: 'claude' },
    { root: 'bad/pm', target: 'codexRepository' },
  ]), /unexpected|user\.md/i);
  assert.equal(readFileSync(join(fx.repositoryRoot, fx.inventoryPath), 'utf8'), sentinel);
}));
