# PM Skills

The product expertise your AI is missing. 1 core skill, 8 commands, and curated frameworks for product managers who ship substance.

> **Quick start:** Visit [skillsfor.pm](https://skillsfor.pm) or jump to [Installation](#installation).

## Why PM Skills?

Ask AI to write a PRD and you get a 10000 word dissertation that says nothing. Generic preambles, vague success metrics, happy-path specs. Engineering reads it and sends back a bunch of questions in the first hour.

PM Skills fights that with:
- **A core knowledge skill** built on 15 established PM books ([view source](source/skills/product-management/))
- **8 command skills** that push back on your thinking before producing output
- **The PM Slop Test** that catches vague specs before engineering does

## What's Included

### The Skill: product-management

A comprehensive PM knowledge base with 8 domain-specific references ([view skill](source/skills/product-management/SKILL.md)):

| Reference | Covers |
|-----------|--------|
| [discovery](source/skills/product-management/reference/discovery.md) | Mom Test, JTBD, Sprint validation |
| [decision-making](source/skills/product-management/reference/decision-making.md) | Thinking in Bets, cognitive biases, strategy cascades |
| [specification](source/skills/product-management/reference/specification.md) | Writing specs engineering trusts, the PM Slop Test |
| [communication](source/skills/product-management/reference/communication.md) | SUCCESs framework, audience translation, clarity |
| [prioritisation](source/skills/product-management/reference/prioritisation.md) | Outcome thinking, the build trap, four risks |
| [leadership](source/skills/product-management/reference/leadership.md) | Empowered teams, trust, change management |
| [positioning](source/skills/product-management/reference/positioning.md) | 5-component positioning, smallest viable audience |
| [prompting](source/skills/product-management/reference/prompting.md) | Working with AI as a PM, anti-slop patterns |

### 8 Commands

| Command | What it does |
|---------|--------------|
| `/teach-pm` | One-time setup: gather product context, save for all skills |
| `/brief` | Engineering brief from a feature description or screenshot |
| `/spec` | Full spec with metrics, risks, rollout plan |
| `/stories` | JTBD-framed user stories with testable acceptance criteria |
| `/review` | Adversarial review: finds gaps, contradictions, slop |
| `/decide` | Structured decision with weighted criteria and bias checks |
| `/translate` | Rewrite for any audience: exec, engineering, customer, sales |
| `/setup` | Generate a CLAUDE.md for your product team |
| `/audit` | Assess project AI readiness across docs, tests, onboarding |

### The PM Slop Test

Every skill runs this before delivering:

- **Audience specified** - not "users," which users in what context?
- **Problem stated** - not "better experience," what's broken?
- **Success measurable** - not "positive feedback," what metric, what target?
- **Edge cases covered** - not just the happy path
- **Scope bounded** - at least three things explicitly not in scope
- **Trade-offs explicit** - what are you giving up?
- **Concise enough to read** - could this be half as long?

## Installation

```bash
# Claude Code plugin
/plugin marketplace add jameshemson/pm-skills

# Or copy directly
cp -r .claude/skills your-project/.claude/

# Run once to set up product context
/pm:teach-pm

# Then use any skill
/pm:brief "User can filter dashboard by date range"
/pm:review path/to/spec.md
/pm:decide "Should we build SSO or focus on onboarding?"
```

## Usage

Every skill checks for product context before generating. Run `/pm:teach-pm` once per project. After that, skills inherit your product context automatically.

```
/pm:brief           # Generate engineering brief
/pm:spec            # Write full specification
/pm:review          # Adversarial review of any doc
/pm:translate       # Rewrite for different audience
```

## License

Apache 2.0. See [LICENSE](LICENSE).
