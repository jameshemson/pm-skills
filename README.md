# pm-skills

Claude can draft your PRD. It can't tell you it's slop.

pm-skills can. One skill, nine modes that critique and sharpen the product docs your AI generates.

> **Quick start:** Visit [pmskills.co](https://pmskills.co) or jump to [Installation](#installation).

## Why pm-skills?

Ask AI to write a PRD and you get a ten-thousand word dissertation that says nothing. Generic preambles, vague success metrics, happy-path specs. Engineering reads it and sends back questions in the first hour.

pm-skills fights that with:
- **One skill, nine modes** covering every core PM workflow
- **Framework-backed critique** that pushes back before producing output
- **The PM Slop Test** that catches vague artifacts before engineering does

## The Skill: pm

One user-invokable skill that routes to nine modes by keyword. Invoke it as `/pm`, describe your task, and the router finds the right mode. Or name the mode directly: `/pm review my-spec.md`.

Reference files at [.claude/skills/pm/](.claude/skills/pm/).

## The Nine Modes

**Get started**

| Mode | What it does |
|------|--------------|
| `teach` | Capture product context once per project, write `.pmcontext.md` |
| `setup` | Generate a tailored team CLAUDE.md from team norms and domain |

**Create**

| Mode | What it does |
|------|--------------|
| `brief` | Audience-aware brief from a feature description or design |
| `spec` | Full spec with metrics, risks, and rollout plan |
| `stories` | JTBD-framed user stories with testable acceptance criteria |
| `metrics` | Define primary, secondary, guardrail, and counter-metrics |

**Sharpen**

| Mode | What it does |
|------|--------------|
| `review` | Adversarial critique of any doc, plan, strategy, or message |
| `decide` | Structured decision with weighted criteria and bias checks |
| `discover` | Plan customer conversations for truth, or debrief them |

## The PM Slop Test

Every mode runs this before delivering:

- **Audience specified** - not "users," which users in what context?
- **Problem stated** - not "better experience," what's broken?
- **Success measurable** - not "positive feedback," what metric, what target?
- **Edge cases covered** - not just the happy path
- **Scope bounded** - at least three things explicitly not in scope
- **Trade-offs explicit** - what are you giving up?
- **Concise enough to read** - could this be half as long?

## Installation

In Claude Code, run:

```
/plugin marketplace add jameshemson/pm-skills
/plugin install pm@pm-skills
```

To get updates automatically, enable auto-update for the marketplace:

`/plugin` > Marketplaces > select `pm-skills` > Update Marketplace > Enable auto-update

Then set up product context once per project:

```
/pm teach
```

After that, use any mode:

```
/pm brief "User can filter dashboard by date range"
/pm review path/to/spec.md
/pm decide "Should we build SSO or focus on onboarding?"
```

## Usage

Every mode checks for product context before generating. Run `/pm teach` once per project. After that, modes inherit your product context automatically.

```
/pm teach          # Capture product context
/pm setup          # Generate team CLAUDE.md
/pm brief          # Write an audience-aware brief
/pm spec           # Write a full specification
/pm stories        # Break a feature into user stories
/pm metrics        # Define success metrics
/pm review         # Critique any PM artifact
/pm decide         # Structure a decision
/pm discover       # Plan or debrief customer conversations
```

Or just describe what you want and the router finds the mode:

```
/pm I need to review this spec for gaps
/pm help me decide between these two approaches
```

## License

Apache 2.0. See [LICENSE](LICENSE).
