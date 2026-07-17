# Repository instructions

This file is shared guidance for coding agents working in this repository. `AGENTS.md` is a tracked mode-`120000` symlink to this file so Claude Code and Codex read the same rules. Preserve that symlink and edit `CLAUDE.md`, not `AGENTS.md`, when the shared guidance changes.

## Development

There is no application build or runtime dependency. The product is a set of Markdown skill files plus a small Node-based generation and validation pipeline.

**Canonical skill source**: Edit `source/skills/pm/` only. It contains `SKILL.md` and the 20 files under `reference/`.

**Generated distributions**: `npm run build` renders the canonical source to all three committed runtime trees:

- `.claude/skills/pm/` for Claude Code
- `.agents/skills/pm/` for Codex repository discovery
- `plugins/pm/skills/pm/` for the Codex plugin payload

Never hand-edit a generated runtime tree. `scripts/generated-inventory.json` records files owned by the generator. The builder may remove only stale regular files recorded in that inventory and refuses unexpected files or symlinks.

**Invocation**: The single user-invokable skill is `pm`. Claude Code invokes it as `/pm`. Codex invokes the installed plugin as `$pm:pm` and the repository skill as `$pm`. The skill routes to nine modes by keyword; there are no separate per-mode skills.

**Plugin configuration**:

- Claude: `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`
- Codex marketplace: `.agents/plugins/marketplace.json`
- Codex plugin: `plugins/pm/.codex-plugin/plugin.json`

Keep plugin and marketplace descriptions semantically aligned when the skill changes.

**Build and validation**:

```sh
npm run build
npm test
npm run check:sync
npm run check:structure
npm run check:claude-parity
ANTHROPIC_API_KEY=dry-run-placeholder node eval/run.js --dry-run
uv run --isolated --with PyYAML python /Users/jameshemson/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/pm
uv run --isolated --with PyYAML python /Users/jameshemson/.codex/skills/.system/skill-creator/scripts/quick_validate.py plugins/pm/skills/pm
node scripts/smoke-codex-plugin.mjs
```

`npm run verify` runs the unit, sync, structure, and Claude parity checks. Run the full command set above before a release. The existing eval remains Anthropic-only and must read the generated Claude output.

**Versioning**: Use semver. Bump `package.json`, `.claude-plugin/plugin.json`, the plugin entry in `.claude-plugin/marketplace.json`, and `plugins/pm/.codex-plugin/plugin.json` together. Every bump also requires a `CHANGELOG.md` entry and the same version in the website footer at `~/repos/skillsfor-pm-site/public/index.html`. The footer once went five versions stale; check it every release.

## Provider seams

Shared behavior belongs in the canonical source. Provider differences use only the exact provider blocks and fixed tokens supported by `scripts/transform.mjs`; do not add another provider abstraction casually.

- Claude output keeps `/pm`, `CLAUDE.md`, Claude-compatible frontmatter, and structured interview batches of at most four questions.
- Codex output keeps `$pm` or `$pm:pm` in documentation, targets `AGENTS.md`, allows at most three structured questions when structured input is available, and uses direct conversation for free text or fallback.
- Codex setup and teach preserve an existing `AGENTS.md` symlink. They resolve and report its target, write through only when that target is inside the project, and stop on a broken or project-external target.
- Session-only `decide` runs Steps 1-7. It skips prior-decision reads and all settings or decision-log writes.

The tracked `AGENTS.md -> CLAUDE.md` symlink in this repository is intentional. Do not replace it with a copied file.

## What this project is

pm-skills is an opinionated PM skill pack for Claude Code and Codex. One skill routes to nine modes. The positioning is: "AI generates, pm-skills critiques."

**Tagline:** "Stop adding tools. Start adding skills."

This is not another PM tool. It encodes curated PM expertise and forces explicit thinking instead of polished, generic output.

## Marketing website

The landing page lives in the separate `~/repos/skillsfor-pm-site` repository. Use the `impeccable` skill for website work. Keep its direct, anti-theater tone and existing warm-paper, red-pencil visual system. Release work in this repository does not authorize committing or publishing the website repository.

## Skill pack architecture

```text
source/skills/pm/
├── SKILL.md
└── reference/
    ├── foundations.md
    ├── mode-teach.md
    ├── mode-setup.md
    ├── mode-brief.md
    ├── mode-spec.md
    ├── mode-stories.md
    ├── mode-metrics.md
    ├── mode-review.md
    ├── mode-decide.md
    ├── mode-discover.md
    ├── knowledge-discovery.md
    ├── knowledge-decision-making.md
    ├── knowledge-specification.md
    ├── knowledge-communication.md
    ├── knowledge-craft-score.md
    ├── knowledge-prioritisation.md
    ├── knowledge-leadership.md
    ├── knowledge-positioning.md
    ├── knowledge-review-personas.md
    └── knowledge-metrics.md
```

The exact file set is a release contract. Update structural checks deliberately if the inventory changes.

Canonical `SKILL.md` frontmatter is:

```yaml
---
name: pm
user-invokable: true
description: One-line description
argument-hint: "[mode] [target]"
---
```

The transform preserves this frontmatter for Claude and emits only `name` and `description` for Codex.

## Anti-theater design principles

Every mode follows these principles:

- **Ask hard questions before generating.** A one-line request is not enough context for a defensible decision.
- **Challenge, not just produce.** Review should find the missing failure path before engineering does.
- **Require context.** Context is the quality gate for product strategy, users, and business constraints.
- **Output substance over polish.** Prefer trade-offs and concrete bullets to slide-ready prose.
- **Run the PM Slop Test.** If engineering returns ten clarifying questions in the first hour, the artifact was not ready.

### Context gathering protocol

Every generated runtime checks for product context before generating:

1. Check the provider instruction file for a **Product Context** section: `CLAUDE.md` for Claude, `AGENTS.md` for Codex.
2. Check `.pmcontext.md` in the project root.
3. If neither exists, offer persistent `teach` or the bounded session-only path.
4. Never infer product strategy, personas, or business constraints from code alone.

## Mode descriptions

### teach

Capture product context once per project. Explore the codebase, ask about product, users, business model, team structure, and technical constraints, then write `.pmcontext.md`.

### setup

Generate repository instructions for a product team from its structure, domain, stack, communication norms, definition of done, and stakeholder expectations.

### brief

Write an audience-aware brief with problem context, user stories, acceptance criteria, edge cases, dependencies, and explicit exclusions. Run the PM Slop Test before delivery.

### spec

Write a full product specification with success metrics, rollback, phased delivery, risks, and explicit out-of-scope items. Use the four risks framework.

### stories

Break a feature into independently valuable, testable, sprint-sized user stories. Use JTBD framing and flag hidden dependencies.

### metrics

Define one primary metric, two or three secondary metrics, guardrails, and counter-metrics. Require baselines, targets, measurement plans, and confounding-factor analysis.

### review

Adversarially critique a PM artifact through Frame, Critique, and Refine. Route by document type to the relevant knowledge file. End with SLOP, ROUGH, SOLID, or SHIP; keep the numeric score internal.

### decide

Structure options, weighted criteria, trade-offs, and bias checks using Thinking in Bets. Separate decision quality from outcome quality and state what the recommendation accepts.

### discover

Plan or debrief customer conversations using Mom Test and Demand-Side Sales principles. Extract observed signal instead of politeness.

## Project-root artifacts and naming

Modes that write working files use a lowercase `pm` prefix with no hyphen before the root, such as `pmdecisions.md`. Modifier suffixes use one hyphen, such as `pmdecisions-archive.md`.

`.pmcontext.md` remains a dotfile because it is project configuration, not a working artifact. The `decisions_log: enabled | disabled` key under `## Settings` controls persistent decision logging. Any mode that updates `.pmcontext.md` must preserve sections it does not own.

## Do not

- Do not commit planning documents, roadmaps, or strategy notes. This repository is public. Private planning material stays in ignored `plans/` and `.build/` paths. Treat `eval/` as an excluded release path unless a task explicitly targets the evaluator.
- Do not add release changes under `.codex/skills` or OpenCode paths.
- Do not use Unicode em dashes in user-facing copy. Use a regular dash or rewrite the sentence.
- Do not produce generic marketing copy. Every sentence must be specific and earned.
- Do not over-engineer. The product is Markdown plus a small generation pipeline.
- Do not invent frameworks. Use the curated frameworks in the reference files.
- Do not add modes, MCP servers, telemetry, automated updates, or review memory unless the user explicitly expands scope.

## Working style

- Read relevant files before making claims about the repository.
- Act directly on clear, reversible work. Investigate or ask before hard-to-reverse or shared-system changes.
- State assumptions so they can be corrected.
- If there is a clearly better approach, explain it in two to four bullets, then proceed unless it requires a decision.
- Use the `build` workflow for substantial features.
- Preserve unrelated user changes in a dirty worktree.

## Writing plans

- Be explicit and scoped. Name files, acceptance criteria, edge cases, and exclusions.
- Keep plans minimal. Do not add abstractions, files, configurability, or defensive work beyond the task.
