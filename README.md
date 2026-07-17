# pm-skills

AI can draft your PRD. It cannot tell you it is slop.

pm-skills can. One skill, nine modes that critique and sharpen product work in Claude Code and Codex.

Already using [Anthropic's official PM plugin](https://claude.com/plugins/product-management)? It generates PRDs, roadmaps, and stakeholder updates. pm-skills reviews them. There is no dependency between the two, and pm-skills critiques any PM artifact regardless of who or what wrote it.

> **Quick start:** Visit [pmskills.co](https://pmskills.co) or jump to [Installation](#installation).

## Why pm-skills?

Ask AI to write a PRD and you get a ten-thousand word dissertation that says nothing. Generic preambles, vague success metrics, happy-path specs. Engineering reads it and sends back questions in the first hour.

pm-skills fights that with:

- **Adversarial critique at the core**: `review` finds the gaps in any document before your audience does
- **Drafting modes that critique their own output**: `brief`, `spec`, `stories`, and `metrics` all end with the same review pass
- **The PM Slop Test**: catches vague artifacts before engineering does

## The Skill: pm

One user-invokable skill routes to nine modes by keyword. Name a mode directly or describe the work and let the router choose.

Invocation depends on where the skill is running:

| Runtime | Invocation | Example |
|---|---|---|
| Claude Code plugin | `/pm` | `/pm review my-spec.md` |
| Codex plugin | `$pm:pm` | `$pm:pm review my-spec.md` |
| Codex repository skill | `$pm` | `$pm review my-spec.md` |

## The Nine Modes

**Get started**

| Mode | What it does |
|---|---|
| `teach` | Capture product context once per project and write `.pmcontext.md` |
| `setup` | Generate tailored repository instructions from team norms and product context |

**Create**

| Mode | What it does |
|---|---|
| `brief` | Write an audience-aware brief from a feature description or design |
| `spec` | Write a full specification with metrics, risks, and rollout plan |
| `stories` | Create JTBD-framed user stories with testable acceptance criteria |
| `metrics` | Define primary, secondary, guardrail, and counter-metrics |

**Sharpen**

| Mode | What it does |
|---|---|
| `review` | Adversarially critique any document, plan, strategy, or message |
| `decide` | Structure a decision with weighted criteria and bias checks |
| `discover` | Plan customer conversations for truth, or debrief them |

## The PM Slop Test

Every mode runs this before delivering:

- **Audience specified** - not "users", but which users in what context?
- **Problem stated** - not "better experience", but what is broken?
- **Success measurable** - not "positive feedback", but what metric and target?
- **Edge cases covered** - not just the happy path
- **Scope bounded** - at least three things explicitly not in scope
- **Trade-offs explicit** - what are you giving up?
- **Concise enough to read** - could this be half as long?

## Installation

### Claude Code

Run:

```text
/plugin marketplace add jameshemson/pm-skills
/plugin install pm@pm-skills
```

Invoke the installed skill with `/pm`:

```text
/pm teach
/pm brief "User can filter dashboard by date range"
/pm review path/to/spec.md
```

To receive updates automatically, open `/plugin`, choose **Marketplaces**, select `pm-skills`, then enable marketplace auto-update.

### Codex plugin

Run:

```sh
codex plugin marketplace add jameshemson/pm-skills
codex plugin add pm@pm-skills
```

Invoke the installed plugin skill with `$pm:pm`:

```text
$pm:pm teach
$pm:pm review path/to/spec.md
$pm:pm decide "Should we build SSO or focus on onboarding?"
```

### Codex repository skill

This repository also commits the skill at [`.agents/skills/pm`](.agents/skills/pm) for Codex repository discovery. In a checkout of this repository, invoke it with `$pm`:

```text
$pm teach
$pm review path/to/spec.md
```

## Usage

Run `teach` once per project to capture product context. After that, every mode reads that context before working. You can name a mode or describe the outcome you need:

```text
/pm I need to review this spec for gaps
$pm:pm help me decide between these two approaches
$pm plan customer interviews for a new onboarding flow
```

The first form is for Claude Code, the second for the installed Codex plugin, and the third for Codex repository discovery.

## Development

The canonical skill lives at [`source/skills/pm`](source/skills/pm). Edit that tree only. The build renders and commits three distributions:

```text
source/skills/pm
  -> .claude/skills/pm
  -> .agents/skills/pm
  -> plugins/pm/skills/pm
```

Do not hand-edit those generated trees. After changing the canonical source, run:

```sh
npm run build
npm test
npm run check:sync
npm run check:structure
npm run check:claude-parity
```

`npm run verify` runs the test, sync, structure, and Claude parity checks together. Before a release, also validate the Codex plugin and skill payloads and run `node scripts/smoke-codex-plugin.mjs`; the exact commands live in [`CLAUDE.md`](CLAUDE.md).

## License

Apache 2.0. See [LICENSE](LICENSE).
