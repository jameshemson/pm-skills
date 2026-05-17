# PM Skills

The product expertise your AI is missing. 1 core skill, 16 commands, and curated frameworks for product managers who ship substance.

> **Quick start:** Visit [pmskills.co](https://pmskills.co) or jump to [Installation](#installation).

## Why PM Skills?

Ask AI to write a PRD and you get a 10000 word dissertation that says nothing. Generic preambles, vague success metrics, happy-path specs. Engineering reads it and sends back a bunch of questions in the first hour.

PM Skills fights that with:
- **A core knowledge skill** with established PM frameworks ([view source](source/skills/product-management/))
- **16 command skills** that push back on your thinking before producing output
- **The PM Slop Test** that catches vague specs before engineering does

## What's Included

### The Skill: product-management

A comprehensive PM knowledge base with 8 domain-specific references ([view skill](source/skills/product-management/SKILL.md)):

| Reference | Covers |
|-----------|--------|
| [discovery](source/skills/product-management/reference/discovery.md) | Customer interviews, jobs-to-be-done, rapid validation |
| [decision-making](source/skills/product-management/reference/decision-making.md) | Cognitive biases, strategy cascades, decision quality |
| [specification](source/skills/product-management/reference/specification.md) | Writing specs engineering trusts, the PM Slop Test |
| [communication](source/skills/product-management/reference/communication.md) | Making ideas stick, audience translation, clarity |
| [prioritisation](source/skills/product-management/reference/prioritisation.md) | Outcome thinking, avoiding the build trap, four risks |
| [leadership](source/skills/product-management/reference/leadership.md) | Team empowerment, trust, change management |
| [positioning](source/skills/product-management/reference/positioning.md) | Product positioning, smallest viable audience |
| [prompting](source/skills/product-management/reference/prompting.md) | Working with AI as a PM, anti-slop patterns |

### 16 Commands

**Get started**

| Command | What it does |
|---------|--------------|
| `/teach-pm` | One-time setup: gather product context, save for all skills |
| `/setup` | Generate a CLAUDE.md for your product team |

**Discover**

| Command | What it does |
|---------|--------------|
| `/discover` | Plan customer conversations + debrief with forces analysis |
| `/position` | Define what your product is, who it's for, and why it wins |
| `/strategy` | Define where to play and how to win using the choice cascade |
| `/prioritise` | Stack-rank work against outcomes and strategy |

**Create**

| Command | What it does |
|---------|--------------|
| `/brief` | Engineering brief from a feature description or screenshot |
| `/spec` | Full spec with metrics, risks, rollout plan |
| `/metrics` | Define success metrics: primary, secondary, guardrail |
| `/stories` | JTBD-framed user stories with testable acceptance criteria |

**Sharpen**

| Command | What it does |
|---------|--------------|
| `/review` | Adversarial review: finds gaps, contradictions, slop |
| `/decide` | Structured decision with weighted criteria and bias checks |
| `/translate` | Rewrite for any audience: exec, engineering, customer, sales |
| `/stakeholders` | Craft the right message for the right person |

**Assess**

| Command | What it does |
|---------|--------------|
| `/audit` | Challenge whether you're doing the right work. Evidence, alignment, drift |
| `/retro` | Evaluate what shipped against what you expected. Close the learning loop |

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

In Claude Code, run:

```
/plugin marketplace add jameshemson/pm-skills
/plugin install pm@pm-skills
```

To get updates automatically, enable auto-update for the marketplace:

`/plugin` → Marketplaces → select `pm-skills` → Update Marketplace → Enable auto-update

Then set up product context once per project:

```
/pm:teach-pm
```

After that, use any skill:

```
/pm:brief "User can filter dashboard by date range"
/pm:review path/to/spec.md
/pm:decide "Should we build SSO or focus on onboarding?"
```

## Usage

Every skill checks for product context before generating. Run `/pm:teach-pm` once per project. After that, skills inherit your product context automatically.

```
/pm:discover        # Plan or debrief customer conversations
/pm:position        # Define product positioning
/pm:strategy        # Define where to play and how to win
/pm:prioritise      # Stack-rank against outcomes
/pm:stakeholders    # Build stakeholder map
/pm:brief           # Generate engineering brief
/pm:spec            # Write full specification
/pm:metrics         # Define success metrics
/pm:review          # Adversarial review of any doc
/pm:retro           # Evaluate what shipped vs. expected
/pm:translate       # Rewrite for different audience
```

## License

Apache 2.0. See [LICENSE](LICENSE).
