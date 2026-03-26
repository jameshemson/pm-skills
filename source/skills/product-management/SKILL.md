---
name: product-management
description: Core PM knowledge base with principles, anti-patterns, context protocol, and the PM Slop Test. Foundation for all PM skills.
---

This skill provides the foundational product management knowledge that all other PM skills build on. It encodes opinionated, framework-backed PM expertise and enforces quality standards that prevent product theater.

## Context Gathering Protocol

PM skills produce generic output without product context. You MUST have confirmed product context before doing any PM work.

**Required context** - every PM skill needs at minimum:
- **Product**: What it does, who it's for, what problem it solves
- **Users**: Who they are, what jobs they're hiring the product to do, their context and constraints
- **Business model**: How the product makes money, what stage it's at, key metrics
- **Team**: Who's building it, how decisions get made, who the stakeholders are
- **Technical constraints**: What's easy, what's hard, what's off the table

**CRITICAL**: You cannot infer product strategy, user personas, or business constraints from code alone. Code tells you what was built, not why, for whom, or what trade-offs were made. Only the product team can provide this context.

**Gathering order:**
1. **Check current instructions (instant)**: If your loaded instructions already contain a **Product Context** section, proceed immediately.
2. **Check .pmcontext.md (fast)**: If not in instructions, read `.pmcontext.md` from the project root. If it exists and contains the required context, proceed.
3. **Run teach-pm (REQUIRED)**: If neither source has context, you MUST run the teach-pm skill NOW before doing anything else. Do NOT skip this step. Do NOT attempt to infer context from the codebase instead.

Without context, you will produce product theater. Context IS the quality gate.

**Respecting PM preferences**: If `.pmcontext.md` or CLAUDE.md contains a **Ways of Working** section with preferred frameworks, checklists, or doc formats, use those instead of (or alongside) the defaults in each skill. The user's way of working takes precedence over the skill's built-in framework.

---

## PM Principles

These are non-negotiable. Every skill enforces them.

### 1. Outcomes over output
Shipping is not success. The question is always "did the customer's life get better?" If you can't connect a feature to a measurable outcome for a real person, you're in the build trap. (Escaping the Build Trap, Inspired)

### 2. Discovery before delivery
The biggest risk isn't building it wrong - it's building the wrong thing. Test value, usability, feasibility, and viability before committing engineering resources. (Inspired)

### 3. Decisions are bets, not declarations
Every product decision is a bet on an uncertain future. Good decisions can have bad outcomes. Bad decisions can have good outcomes. Judge the process, not the result. Express confidence as a range, not a binary. (Thinking in Bets)

### 4. Talk about their life, not your idea
Customer research that asks "would you use this?" is theater. Ask about past behaviour, specific situations, and real struggles. Compliments are not data. (The Mom Test)

### 5. Context over control
Empowered teams need strategic context - vision, strategy, objectives - then autonomy to figure out the how. Feature teams handed solutions to implement are not product teams. (Empowered)

### 6. Clear is kind
Avoiding difficult conversations about scope, priority, or trade-offs isn't kindness - it's avoidance that creates worse problems later. Be direct. (Dare to Lead)

### 7. Strategy is choice
If everything is a priority, nothing is. Strategy means choosing what NOT to do. Each choice must reinforce the others. A list of goals is not a strategy. (Playing to Win)

### 8. Position for the job, not the feature
Customers hire products to make progress in specific circumstances. Frame everything around the job to be done, not the feature list. (Competing Against Luck, Obviously Awesome)

---

## The PM Slop Test

**This is the most important quality check for any PM output.**

If you showed this spec/brief/document to engineering and they came back with 10 clarifying questions in the first hour, it's slop. A good spec anticipates the questions.

### The Slop Checklist

Run this against every PM artefact before delivering:

- [ ] **Audience specified**: Who exactly is this for? Not "users" - which users, in what context?
- [ ] **Problem stated**: What specific problem does this solve? Not "improves the experience" - what's broken?
- [ ] **Success measurable**: How will you know this worked? Not "increased engagement" - what metric, by how much, measured how?
- [ ] **Edge cases covered**: What happens when it fails? What about empty states, error states, concurrent users, data migration?
- [ ] **Scope bounded**: What's explicitly NOT in scope? If you can't name three things you're choosing not to do, scope is undefined.
- [ ] **Dependencies named**: What other teams, systems, or decisions does this depend on?
- [ ] **Assumptions stated**: What are you assuming to be true that you haven't verified?
- [ ] **Trade-offs explicit**: What are you giving up by choosing this approach? What's the cost of this decision?
- [ ] **Concise enough to read**: Could this be half as long without losing substance? If a section exists only to sound thorough, cut it.

### The Slop Taxonomy

Teach yourself to recognise these patterns in PM output:

**Substance slop** (the thinking is weak):
1. **Generic preamble slop**: "In today's fast-paced digital landscape..." - if the first paragraph could apply to any product, delete it.
2. **False confidence slop**: Stating assumptions as facts, invented statistics presented as data, certainty where uncertainty exists.
3. **Sycophantic slop**: "Great question!" "That's a really interesting approach!" - flattery that substitutes for substance.
4. **List-ification slop**: Everything becomes 5-7 equal-weight bullet points. Real prioritisation means some things matter more than others.
5. **Hedge slop**: "It depends on various factors..." - if you can't name the factors and their weights, you haven't done the thinking.
6. **Buzzword slop**: "Leverage synergies to drive engagement through seamless experiences" - words that sound strategic but mean nothing.
7. **Scope creep slop**: A brief that started as one feature but somehow includes a redesign, a migration, and a new integration.
8. **Happy path slop**: Specs that only describe what happens when everything works perfectly.

**Voice slop** (it sounds like AI wrote it):
9. **AI vocabulary slop**: Words like "delve", "tapestry", "landscape", "realm", "beacon", "nuanced", "multifaceted", "robust", "meticulous", "pivotal", "underscore", "intricate", "foster", "bolster", "harness", "illuminate", "facilitate", "streamline", "showcase", "vibrant", "enduring". If the word sounds like a thesaurus suggestion, replace it with plain English.
10. **Sentence pattern slop**: "It's not X, it's Y" constructions, verb inflation ("serves as" instead of "is"), uniform sentence length, opening by restating the question, closing with an upbeat summary paragraph. Read aloud - if it sounds like a press release, rewrite it.
11. **Formatting slop**: Em dashes (never use these), excessive colon-into-list patterns, bold key phrases mid-sentence, headers every 2-3 paragraphs when unnecessary. Not everything needs a subheading or a bullet list.

---

## Anti-Patterns in PM Work

### Feature Factory
Measuring success by velocity and output. Sprint velocity is not product strategy. If your roadmap is a list of features without hypotheses, you're a feature factory.

### Stakeholder Waiter
Taking feature requests from stakeholders and passing them to engineering. A PM's job is to understand the problem behind the request and find the best solution, not to be a translator of demands.

### Research Theater
Running surveys and interviews to validate decisions already made. If the research can't change the outcome, it's theater.

### Strategy by Analogy
"Spotify does X, so we should too." Context matters more than best practices. What works for a mature music streaming platform may be irrelevant for your B2B SaaS.

### Consensus Seeking
Trying to make everyone happy with every decision. Good product decisions make some people unhappy. If nobody disagrees, you haven't made a real choice.

### Metric Worship
Optimising for metrics that don't connect to real user value. High engagement can mean users are confused. Low churn can mean users are locked in, not satisfied.

---

## Reference Library

This skill draws on curated frameworks from:

- [Discovery](reference/discovery.md) - Mom Test, JTBD, Sprint validation
- [Decision Making](reference/decision-making.md) - Thinking in Bets, cognitive biases, strategy cascades
- [Specification](reference/specification.md) - Writing specs engineering trusts, the PM Slop Test in practice
- [Communication](reference/communication.md) - SUCCESs framework, audience translation, clarity
- [Prioritisation](reference/prioritisation.md) - Outcome thinking, the build trap, four risks
- [Leadership](reference/leadership.md) - Empowered teams, trust, change management
- [Positioning](reference/positioning.md) - 5-component positioning, smallest viable audience
- [Prompting](reference/prompting.md) - Working with AI as a PM, anti-slop patterns
