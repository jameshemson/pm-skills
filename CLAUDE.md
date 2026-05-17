# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

There is no build system. Skills are markdown files used directly by Claude Code.

**Source/compiled sync**: `source/skills/` is the authoritative source. `.claude/skills/` is an identical copy used at runtime (referenced by `.claude-plugin/plugin.json`). When editing any skill, always update both locations. After editing source files, copy them to `.claude/skills/` to keep them in sync.

**Skill invocation**: All user-invokable skills use the `pm:` prefix (e.g. `/pm:brief`, `/pm:review`). The core `product-management` skill is NOT user-invokable - it's loaded as a dependency by other skills.

**Plugin config**: `.claude-plugin/plugin.json` (metadata, version) and `.claude-plugin/marketplace.json` (marketplace listing). Update skill counts and descriptions in both when adding/removing skills.

**Versioning**: Bump the version in both `plugin.json` and `marketplace.json` with every release. Use semver: patch for fixes, minor for new/changed skills, major for breaking changes.

---

# PM Skills - Claude Code Skill Pack for Product Managers

## What This Project Is

A Claude Code skill pack for product managers — the PM equivalent of impeccable.style (design skill pack). It packages PM workflows as slash commands that run inside Claude Code, inheriting project context automatically.

**Tagline:** "Stop adding tools. Start adding skills."
**Positioning:** "Skip the theater, do the work."

This is NOT another PM tool. It's opinionated PM expertise encoded as AI skills. The skills force real thinking, not polished output.

## Two Deliverables

### 1. The Skill Pack (Primary)

A Claude Code plugin containing markdown-based skills. Follow the impeccable.style structure exactly.

### 2. The Marketing Website

A landing page for the skill pack. **Use `/impeccable:frontend-design` to build this.** Run `/impeccable:teach-impeccable` first if prompted for design context. The website should be striking, opinionated, and anti-generic. The tone should match the product: direct, no-bullshit, anti-theater.

**Tech:** Single-page site. HTML/CSS/JS or a simple framework. No backend needed. Must be deployable to Cloudflare Pages or similar.

---

## Build Order

1. Run `/impl-plan` to create the implementation plan
2. Run `/review-plan` to review it as a skeptical senior engineer
3. Build the skill pack (core skill → reference files → command skills → onboarding → plugin config)
4. Build the website using `/impeccable:frontend-design`

---

## Skill Pack Architecture

Follow impeccable.style's structure exactly. Reference files are at:
`~/.claude/plugins/cache/impeccable/impeccable/1.5.0/.claude/skills/`

### File Structure

```
source/skills/
├── product-management/              # Core knowledge skill (NOT user-invokable)
│   ├── SKILL.md                     # PM principles, anti-patterns, context protocol, PM Slop Test
│   └── reference/
│       ├── discovery.md             # Mom Test, JTBD, Sprint frameworks
│       ├── decision-making.md       # Thinking in Bets, Fast & Slow, Playing to Win
│       ├── specification.md         # Writing specs, stories, acceptance criteria
│       ├── communication.md         # Made to Stick, Everybody Writes, audience translation
│       ├── prioritisation.md        # Escaping the Build Trap, outcome thinking, frameworks
│       ├── leadership.md            # Empowered, Dare to Lead, stakeholder management
│       ├── positioning.md           # Obviously Awesome, This Is Marketing
│       └── prompting.md            # How to work with AI effectively as a PM
├── teach-pm/                        # Onboarding — gathers product context → writes .pmcontext.md
│   └── SKILL.md
├── brief/                           # /pm:brief
│   └── SKILL.md
├── spec/                            # /pm:spec
│   └── SKILL.md
├── stories/                         # /pm:stories
│   └── SKILL.md
├── translate/                       # /pm:translate
│   └── SKILL.md
├── review/                          # /pm:review (adversarial)
│   └── SKILL.md
├── decide/                          # /pm:decide
│   └── SKILL.md
├── setup/                           # /pm:setup (CLAUDE.md generator)
│   └── SKILL.md
├── discover/                        # /pm:discover (customer conversations)
│   └── SKILL.md
├── prioritise/                      # /pm:prioritise (stack-rank work)
│   └── SKILL.md
├── audit/                           # /pm:audit (product thinking audit)
│   └── SKILL.md
├── strategy/                        # /pm:strategy (choice cascade)
│   └── SKILL.md
├── position/                        # /pm:position (five-component positioning)
│   └── SKILL.md
├── metrics/                         # /pm:metrics (success metrics)
│   └── SKILL.md
├── retro/                           # /pm:retro (product retrospective)
│   └── SKILL.md
└── stakeholders/                    # /pm:stakeholders (stakeholder map)
    └── SKILL.md
```

Also generate the Claude Code plugin config:
```
.claude-plugin/
├── plugin.json          # Plugin metadata
└── marketplace.json     # Marketplace registration
.claude/
└── skills/              # Compiled skills for Claude Code (copy of source/skills/)
```

### SKILL.md Format

```yaml
---
name: skill-name
description: One-line description
user-invokable: true  # false for core skill only
args:                   # optional
  - name: arg-name
    description: What this arg does
    required: false
---

[Markdown body with instructions]
```

---

## Anti-Theater Design Principles

THIS IS CRITICAL. Every skill must follow these principles:

- **Ask hard questions before generating** — `/pm:decide` shouldn't produce a decision doc from a one-liner. It pushes back: "What's the constraint? What did you rule out? Why not the simpler option?"
- **Challenge, not just produce** — `/pm:review` is adversarial. "Your spec doesn't cover what happens when X fails."
- **Require context** — `/pm:brief` with a loaded context file catches real edge cases. Without context, it produces theater. Context IS the quality gate.
- **Output substance over polish** — bullet points and trade-offs, not formatted slide-ready prose.
- **The PM Slop Test** — "If you showed this spec to engineering and they came back with 10 clarifying questions in the first hour, it's slop. A good spec anticipates the questions."

### Context Gathering Protocol (like impeccable's)

Every skill should check for product context before generating:
1. Check CLAUDE.md for a **Product Context** section
2. Check `.pmcontext.md` in project root
3. If neither exists, run `/pm:teach-pm` first
4. NEVER attempt to infer product strategy, user personas, or business constraints from code alone

---

## Reference File Content Sources

Read the book summaries at `/Users/jameshemson/repos/noodle/vault/notes/books/` to build each reference file. These are detailed summaries with key frameworks already extracted.

| Reference File | Books to Read | What to Encode |
|---|---|---|
| discovery.md | `the-mom-test.md`, `competing-against-luck.md`, `sprint.md` | JTBD theory, conversation design for truth-seeking (ask about past behaviour not hypotheticals), 5-day validation sprint |
| decision-making.md | `thinking-in-bets.md`, `thinking-fast-and-slow.md`, `playing-to-win.md` | Decision quality ≠ outcome quality, cognitive biases (anchoring, availability, WYSIATI, planning fallacy), strategy choice cascade |
| specification.md | (Original content) | How to write specs that anticipate engineering questions. Structure, acceptance criteria, edge cases, dependencies. The PM Slop Test lives here. |
| communication.md | `made-to-stick.md`, `everybody-writes.md` | SUCCESs framework (Simple, Unexpected, Concrete, Credible, Emotional, Stories), clarity through empathy, audience-specific adaptation |
| prioritisation.md | `escaping-the-build-trap.md`, `inspired.md` | Output vs outcome, Product Kata, four risks (value, usability, feasibility, viability), discovery vs delivery |
| leadership.md | `empowered.md`, `dare-to-lead.md`, `switch.md` | Context > control, BRAVING trust framework, Rider-Elephant-Path change management |
| positioning.md | `obviously-awesome.md`, `this-is-marketing.md` | 5-component positioning, smallest viable audience, identity marketing |
| prompting.md | (Original content - see below) | How to work with AI as a PM. Anti-slop patterns, context stacking, prompt templates |

### prompting.md Content

**Core techniques:**
- Chain of thought for tradeoff analysis and prioritisation
- Few-shot examples to set quality bar
- Structured prompts: context, objective, constraints, output format
- Self-critique: "review what you wrote, identify weakest assumptions"
- Negative prompting: specify what you DON'T want

**Anti-slop rules:**
- Never accept first output. Iterate.
- Always specify audience. Generic output = no audience specified.
- Demand specificity. Numbers, names, examples. State assumptions.
- AI is a collaborator not an oracle. "Stress-test this" not "what should I do?"

**The slop taxonomy (substance + voice):**

Substance slop (1-8): generic preambles, false confidence, sycophantic filler, list-ification, hedge language, buzzwords, scope creep, happy-path-only.

Voice slop (9-11): AI vocabulary (delve, tapestry, landscape, robust, etc.), sentence patterns ("It's not X, it's Y", verb inflation, uniform length), formatting tells (em dashes, colon-into-list, mid-sentence bold, unnecessary headers).

See `prompting.md` for the full taxonomy with detection rules and fixes.

**PM-specific prompt patterns for each workflow:**
- Specs: problem + personas + constraints → structure + edge cases
- Decisions: options + weighted criteria → evaluation + tradeoffs
- Feedback analysis: raw feedback → themes + underlying needs + contradictions
- Stakeholder comms: their context + your context + the ask + their likely concerns

---

## Skill Descriptions

### /pm:teach-pm (Onboarding)
Runs once per project. Explores codebase, asks clarifying questions about product, users, business model, team structure, technical constraints. Writes `.pmcontext.md` to project root for all other skills to reference. Model on impeccable's `teach-impeccable`.

### /pm:brief
Generate an engineering brief from a design, screenshot, or feature description. Output: structured brief with problem context, user stories, acceptance criteria, edge cases, dependencies, out-of-scope. Must reference product context. Must anticipate engineering questions. Run the PM Slop Test on output.

### /pm:spec
Write a full product specification. Deeper than brief - includes success metrics, rollback plan, phased delivery, risks. Forces the user to specify what's NOT in scope. Uses the four risks framework from Inspired.

### /pm:stories
Break a feature into user stories with acceptance criteria. Each story must be independently valuable, testable, and small enough for one sprint. Uses JTBD framing. Acceptance criteria must be testable (not vague). Flags hidden dependencies between stories.

### /pm:translate
Rewrite content for a different audience. Takes existing content + target audience (exec, engineering, customer, sales, support). Uses Made to Stick principles. Strips jargon for non-technical audiences. Adds technical specificity for engineering. Leads with what matters to THEM, not you.

### /pm:review (Adversarial)
Review a spec, PRD, or brief for gaps, contradictions, and slop. This skill is deliberately adversarial. It checks for: missing edge cases, unstated assumptions, vague acceptance criteria, missing success metrics, scope creep, dependencies not called out, the PM Slop Test. Output is a list of questions engineering would ask, ranked by severity.

### /pm:decide
Structure a decision. Requires: what you're deciding, options considered, evaluation criteria (weighted), constraints, timeline. Pushes back if the user hasn't considered enough options or hasn't articulated tradeoffs. Uses Thinking in Bets framework - separates decision quality from outcome quality. Flags cognitive biases. Output: recommendation with explicit tradeoffs and what you're accepting by choosing this path.

### /pm:setup
Generate a CLAUDE.md for a product team. Interviews about team structure, product domain, tech stack, communication norms, definition of done, stakeholder expectations. Produces a tailored CLAUDE.md that makes AI useful for the whole team. This IS the CLAUDE.md generator tool.

### /pm:discover
Plan customer conversations that get truth, not politeness. Uses Mom Test and Demand-Side Sales forces. Can also debrief after conversations to extract real signal.

### /pm:prioritise
Stack-rank work against outcomes and strategy. Forces trade-offs, checks for drift, and connects decisions to what actually matters.

### /pm:audit
Challenge whether you're doing the right work. Checks evidence, strategic alignment, discovery gaps, and priority drift. The product thinking audit.

### /pm:strategy
Walk through the Playing to Win choice cascade to define or pressure-test product strategy. Forces integrated choices across winning aspiration, where to play, how to win, capabilities, and management systems. Tests for coherence and flags broken links in the cascade. Requires explicit "what we're NOT doing" for every dimension.

### /pm:position
Define product positioning using the five-component framework from Obviously Awesome. Walks through competitive alternatives, unique attributes, value, target customers, and market category in order. Tests positioning for differentiation, clarity, and pitfalls. Checks for repositioning signals.

### /pm:metrics
Define success metrics that measure whether something actually worked. Structures metrics as primary (one only), secondary (2-3), guardrail (things that must not get worse), and counter-metrics (gaming detection). Forces baselines, specific targets, measurement plans, and confounding factor analysis. Pushes back on vanity metrics.

### /pm:retro
Product retrospective that compares what you expected with what actually happened. Reconstructs the original hypothesis before looking at results (prevents hindsight bias). Uses outcome fielding from Thinking in Bets to separate decision quality from outcome quality. Produces specific learnings and next actions: double down, pivot, investigate, or kill.

### /pm:stakeholders
Build a stakeholder map for an initiative or product area. Maps each stakeholder's priorities, constraints, communication preferences, decision style, trust level, and current stance. Identifies power dynamics, alliances, and decision paths. Creates engagement plans using BRAVING trust framework and Rider-Elephant-Path change management.

---

## Website Requirements

### Content
- Hero: tagline + one-line value prop
- Problem section: product theater, tool fatigue, AI slop (use the Reddit quotes)
- Solution: what the skill pack does differently (anti-theater, opinionated, framework-backed)
- Skills showcase: list of skills with descriptions
- How it works: install command, example workflow
- Install CTA: `/plugin marketplace add jameshemson/pm-skills` then `/plugin install pm@pm-skills`
- Social proof section (placeholder for now)
- Footer with GitHub link

### Tone
- Direct, no-bullshit, slightly provocative
- Speaks to senior PMs who are frustrated with the state of the craft
- Anti-corporate. Anti-slop. Pro-thinking.
- Think: the copy equivalent of a well-written README, not a marketing page

### Design Direction (for impeccable)
- NOT the typical SaaS landing page. No gradient hero, no floating cards, no generic illustrations.
- Editorial feel. Magazine-like. Typography-led.
- Light mode preferred. Clean, confident, sparse.
- The design should feel as opinionated as the product.

---

## Do NOT

- Do not use em dashes (—) in any user-facing copy. Use regular dashes or rephrase.
- Do not produce generic marketing copy. Every sentence should be specific and earned.
- Do not over-engineer. Skills are markdown files. The website is a single page. Keep it simple.
- Do not invent frameworks. Use the ones from the book summaries. The value is curation and opinionation, not invention.
