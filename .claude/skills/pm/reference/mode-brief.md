# Mode: brief

Generate a brief that anticipates questions, covers edge cases, and connects to real user value. A brief is lighter than a full spec but must still be rigorous enough to estimate and plan from.

**Slop test and anti-patterns**: [foundations.md](foundations.md)
**Specification standards and JTBD framing**: [knowledge-specification.md](knowledge-specification.md)

**Check for preferences**: If `.pmcontext.md` has a Ways of Working section with preferred brief formats, use those. Otherwise use the structure below.

## Step 1: Clarify Audience and Feature

Ask the user two questions before generating anything:

1. **Who is this brief for?** Engineering? Design? An exec? A cross-functional team? The audience determines depth, jargon, and which sections matter most.
2. **What is the feature or change to brief?** If they've already described it, confirm you have what you need; if not, ask.

Do not assume an engineering audience. A brief for an exec omits implementation detail and leads with business impact. A brief for design leads with the user problem and open UX questions. A brief for engineering covers edge cases, dependencies, and acceptance criteria in full.

If the input is vague ("we need better search"), push back: "Better for whom? What is failing about current search? What does success look like?"

## Step 2: Understand the Feature

Before generating, gather:
- What specific problem does this solve?
- Who experiences this problem, in what context?
- What is the job-to-be-done? (The underlying need, not the feature request)
- What exists today? What are users doing instead?

## Step 3: Generate the Brief

### Problem Context
The specific problem, for whom, in what context. Include evidence where available (support tickets, usage data, customer quotes). Connect to product strategy and current objectives.

### User Stories
Frame using JTBD: "When [situation], I want to [motivation], so I can [outcome]."
Each story must be specific enough to be testable. No vague outcomes.

### Acceptance Criteria
For each story:
- Happy path with specific, observable outcomes
- Error states and system responses
- Performance requirements (response times, limits)
- Permission and access considerations

Test: could a QA engineer write test cases from these criteria without asking questions?

### Edge Cases
- Empty states (no data, first-time user)
- Boundary conditions (maximum/minimum data)
- Failure modes (network failure, dependency unavailable, timeout)
- Concurrent users (race conditions, conflicts)
- Data migration (if changing existing behaviour)
- Permission edge cases (read-only, admin, external)

### Dependencies
Other teams or systems, APIs, services, infrastructure, design decisions not yet made, timeline dependencies.

### Out of Scope
Name at least three things explicitly. If you cannot, scope is undefined.

### Open Questions
Questions that need answers before work starts. Flag who should answer each.

## Step 4: Run the Slop Test

Before delivering, check:

- [ ] Audience specified (not "users" - which users, for whom is this written?)
- [ ] Problem stated (not "better experience" - what is broken?)
- [ ] Success measurable (not "positive feedback" - what metric?)
- [ ] Edge cases covered (not just the happy path)
- [ ] Scope bounded (at least 3 things explicitly out of scope)
- [ ] Dependencies named
- [ ] Assumptions stated

If any check fails, fix it before delivering. State which assumptions you made and what you could not verify.

**Voice pass.** Then scan every prose section against the Slop Taxonomy and the Claudism Catalogue in [foundations.md](foundations.md), the same gate the `review` mode runs on drafts. Rewrite any AI-register tell: performative pushback, the false universal ("the question every X turns on"), the clean-mental-model setup ("the cleanest way to think about this is..."), structural metaphor, the validation stamp. A brief that reads as generated loses authority with the team. If a fix introduces a new tell, fix the fix.

## Output Format

Structured document with clear headers. Bullets and tables over prose. Every section must earn its place; if a section has nothing meaningful, drop it rather than filling with generic content.

A brief that generates 10 engineering questions in the first hour is slop. Anticipate the questions.

---

If the user wants to expand this brief into a full specification, point them to `spec` mode.
