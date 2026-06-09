# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

There is no build system. Skills are markdown files used directly by Claude Code.

**Skill location**: the skill lives at `.claude/skills/pm/` and is edited there directly. `.claude-plugin/plugin.json` references `./.claude/skills`. There is one copy; there is no source-to-runtime sync step.

**Skill invocation**: The single user-invokable skill is `pm` (invoked as `/pm`). It routes to nine modes via keyword matching. There are no separate per-mode commands.

**Plugin config**: `.claude-plugin/plugin.json` (metadata, version) and `.claude-plugin/marketplace.json` (marketplace listing). Update the description in both when the skill changes.

**Versioning**: Bump the version in both `plugin.json` and `marketplace.json` with every release. Use semver: patch for fixes, minor for new/changed modes or reference content, major for breaking changes. Every bump also gets a `CHANGELOG.md` entry and an update to the version in the website footer (`~/repos/skillsfor-pm-site/public/index.html`) - the footer went five versions stale once; do not let it drift again.

---

# PM Skills - Claude Code Skill Pack for Product Managers

## What This Project Is

A Claude Code skill pack for product managers. One skill, nine modes. Opinionated PM expertise encoded as a single AI skill that routes to the right workflow by keyword. The positioning: "Claude generates, pm-skills critiques."

**Tagline:** "Stop adding tools. Start adding skills."

This is NOT another PM tool. It encodes opinionated PM expertise as one AI skill. Every mode forces real thinking and rejects polished, generic output.

## The Marketing Website

A landing page lives in a separate repo (`~/repos/skillsfor-pm-site`). Use `/impeccable:frontend-design` to build or update it. The tone matches the product: direct, no-bullshit, anti-theater.

---

## Skill Pack Architecture

The architecture mirrors impeccable 3.1.1. Reference files are at:
`~/.claude/plugins/cache/impeccable/impeccable/3.1.1/.claude/skills/`

### File Structure

```
.claude/skills/pm/
├── SKILL.md                      # Router: shared context, commands table, routing rules
└── reference/
    ├── foundations.md            # PM Reflex Rejection, slop taxonomy, anti-patterns
    ├── mode-teach.md             # teach mode: product-context capture
    ├── mode-setup.md             # setup mode: team CLAUDE.md generator
    ├── mode-brief.md             # brief mode: audience-aware brief
    ├── mode-spec.md              # spec mode: full product specification
    ├── mode-stories.md           # stories mode: JTBD-framed user stories
    ├── mode-metrics.md           # metrics mode: primary/secondary/guardrail/counter
    ├── mode-review.md            # review mode: Frame -> Critique -> Refine
    ├── mode-decide.md            # decide mode: structured decision with bias checks
    ├── mode-discover.md          # discover mode: customer-conversation planning and debrief
    ├── knowledge-discovery.md
    ├── knowledge-decision-making.md
    ├── knowledge-specification.md
    ├── knowledge-communication.md
    ├── knowledge-prioritisation.md
    ├── knowledge-leadership.md
    ├── knowledge-positioning.md
    ├── knowledge-prompting.md
    ├── knowledge-review-personas.md
    └── knowledge-metrics.md
```

Plugin config:

```
.claude-plugin/
├── plugin.json          # Plugin metadata
└── marketplace.json     # Marketplace registration
```

### SKILL.md Format

```yaml
---
name: skill-name
description: One-line description
user-invokable: true
argument-hint: "[mode] [target]"
---

[Markdown body]
```

---

## Anti-Theater Design Principles

Every mode must follow these principles:

- **Ask hard questions before generating.** The `decide` mode should not produce a decision doc from a one-liner. It pushes back: "What's the constraint? What did you rule out? Why not the simpler option?"
- **Challenge, not just produce.** The `review` mode is adversarial: "Your spec doesn't cover what happens when X fails."
- **Require context.** The `brief` mode with a loaded context file catches real edge cases. Without context, it produces theater. Context is the quality gate.
- **Output substance over polish.** Bullet points and trade-offs, not formatted slide-ready prose.
- **The PM Slop Test.** "If you showed this artifact to engineering and they came back with 10 clarifying questions in the first hour, it is slop. A good artifact anticipates the questions."

### Context Gathering Protocol

Every mode checks for product context before generating:
1. Check CLAUDE.md for a **Product Context** section
2. Check `.pmcontext.md` in the project root
3. If neither exists, route into the `teach` mode first
4. NEVER attempt to infer product strategy, user personas, or business constraints from code alone

---

## Mode Descriptions

### teach
Capture product context once per project. Explores codebase and asks clarifying questions about product, users, business model, team structure, and technical constraints. Writes `.pmcontext.md` to the project root for all modes to reference.

### setup
Generate a CLAUDE.md for a product team. Interviews about team structure, product domain, tech stack, communication norms, definition of done, and stakeholder expectations.

### brief
Write an audience-aware brief from a design, screenshot, or feature description. Asks for the target audience rather than assuming engineering. Output: problem context, user stories, acceptance criteria, edge cases, dependencies, out-of-scope. Runs the PM Slop Test on output.

### spec
Write a full product specification. Deeper than brief: includes success metrics, rollback plan, phased delivery, and risks. Forces explicit out-of-scope items. Uses the four risks framework.

### stories
Break a feature into user stories with acceptance criteria. Each story must be independently valuable, testable, and sprint-sized. Uses JTBD framing. Flags hidden dependencies.

### metrics
Define success metrics: primary (one only), secondary (2-3), guardrail (must not get worse), and counter-metrics (gaming detection). Forces baselines, specific targets, measurement plans, and confounding factor analysis.

### review
Adversarially critique a doc, plan, strategy, stakeholder message, or any PM artifact. Runs a Frame, Critique, Refine loop. Document-type-aware: routes to the relevant knowledge file for specification, strategy, positioning, metrics, retro, stakeholder comms, or roadmap artifacts. Absorbs the function of the former translate, stakeholders, audit, and retro skills.

### decide
Structure a decision: options, weighted criteria, trade-offs, bias checks. Uses the Thinking in Bets framework. Separates decision quality from outcome quality. Flags cognitive biases. Output: recommendation with explicit trade-offs and what you are accepting by choosing this path.

### discover
Plan customer conversations that get truth, not politeness. Uses Mom Test and Demand-Side Sales forces. Can also debrief after conversations to extract real signal.

---

## Project-root artifacts and naming

Modes that write working files to the user's project root use the `pm`-prefix-no-hyphen root: `pmdecisions.md`. This matches the existing `.pmcontext.md` convention. Modifier suffixes use a single hyphen: `pmdecisions-archive.md`.

The `.pmcontext.md` file keeps its dotfile form because it is configuration set up once via `teach` mode and rarely edited, not a working file.

The `decisions_log: enabled | disabled` key under a `## Settings` section in `.pmcontext.md` controls whether `decide` mode writes to `pmdecisions.md` in this repo. The key is set on first `decide` run via the AskUserQuestion tool and persists across sessions.

Future modes that produce project-root artifacts should follow this pattern: lowercase `pm` prefix, no hyphen between prefix and root, single hyphen separating modifier suffixes. Any mode that updates `.pmcontext.md` must preserve sections it does not own (for example, `## Settings`).

## Do NOT

- Do not commit planning docs, roadmaps, or strategy notes. This repo is public. All planning material lives in the gitignored `plans/` folder (current plan: `plans/next-steps.md`). A NEXT-STEPS.md was once committed to the root from another machine; the gitignore now blocks the common names, but the rule is the point.
- Do not use em dashes in any user-facing copy. Use regular dashes or rephrase.
- Do not produce generic marketing copy. Every sentence should be specific and earned.
- Do not over-engineer. Skills are markdown files. Keep it simple.
- Do not invent frameworks. Use the ones from the reference files. The value is curation and opinionation, not invention.
