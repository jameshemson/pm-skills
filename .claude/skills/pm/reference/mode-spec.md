# Mode: spec

Write a full product specification: the contract between product and engineering about what "done" means, why it matters, and how you will know it worked.

**Slop test and anti-patterns**: [foundations.md](foundations.md)
**Specification standards, JTBD framing, and acceptance criteria**: [knowledge-specification.md](knowledge-specification.md)

**Check for preferences**: If `.pmcontext.md` has a Ways of Working section with preferred spec formats or checklists, use those. Otherwise use the structure below.

## Step 1: Challenge the Premise

Before writing anything, interrogate the feature:

- **Why this, why now?** What changed? What is the cost of NOT doing it?
- **Who asked for this?** Stakeholder request, user research, data, or intuition? How strong is the evidence?
- **What is the job-to-be-done?** Not the feature request - the underlying struggle. What progress is the user trying to make?
- **What have we already tried?** Previous approaches and why they did not work.
- **What is NOT in scope?** Force the boundary. If it cannot be drawn, the spec is not ready.

Push back on vague inputs. "We need a better dashboard" is not spec-ready. "Enterprise customers cannot find the metrics they need to justify renewal" is getting there.

## Step 2: Write the Specification

Write plainly from the first draft: apply the **Prevention** rules in [foundations.md](foundations.md) as you write, not only the Voice pass afterward.

### 1. Problem Statement
The specific problem, for whom, in what context. Observable in the wild - not a restated feature request.

### 2. Context and Background
Evidence the problem exists (data, research, support tickets), previous attempts and outcomes, strategic context (connection to current objectives), competitive context.

### 3. Proposed Solution
For each component: user-facing behaviour, system behaviour, happy path walkthrough (step by step), error handling (every failure mode and the system's response), data model changes, API changes.

### 4. User Stories and Acceptance Criteria
Each story: As a [specific user type], I want to [specific action], so that [specific, measurable outcome connected to their JTBD].

Acceptance criteria must be testable. A QA engineer should be able to write a test case from each criterion without asking questions.

### 5. Edge Cases and Error Handling
- Empty states, first-time states
- Maximum and minimum data boundaries
- Network failures, timeouts, partial failures
- Concurrent users, race conditions
- Permission variations (admin, member, guest, external)
- Data migration from existing behaviour
- Accessibility considerations
- Internationalisation implications (if applicable)

### 6. Out of Scope
Minimum three items. For each: what it is, why it is out of scope, where it is tracked for future consideration.

### 7. Dependencies
Each dependency: what it is, who owns it, current status, timeline, and fallback if it is not ready.

### 8. Success Metrics
- **Primary metric**: The one number that tells you whether this solved the problem. Include target value and measurement method.
- **Secondary metrics**: Supporting indicators.
- **Guardrail metrics**: Things that must NOT get worse, with thresholds.
- **Measurement plan**: How data will be collected, when you will evaluate, what constitutes success vs failure.

### 9. Risks and Mitigations
Assess all four risks from the four-risks framework:
- **Value risk**: Will users actually want this?
- **Usability risk**: Can users figure it out?
- **Feasibility risk**: Can it be built? Technical unknowns, dependencies.
- **Viability risk**: Does it work for the business? Legal, operational, financial.

For each risk: severity (high/medium/low), likelihood, mitigation plan.

### 10. Rollout Plan
Feature flag strategy, phased rollout criteria, rollback thresholds (specific numbers), rollback process (who decides), communication plan.

### 11. Open Questions
Ordered by urgency. For each: who should answer it, what is blocked if it stays unanswered, any proposed default.

## Step 3: Run the Pre-Mortem

Imagine it is three months after launch and the feature has failed. Why?

List the top 5 reasons for failure. For each: likelihood (percentage), mitigation, early warning signal.

## Step 4: Run the Slop Test

The spec must pass ALL checks:

- [ ] Audience specified with context
- [ ] Problem stated with evidence
- [ ] Success measurable with specific targets
- [ ] Edge cases comprehensively covered
- [ ] Scope bounded with explicit exclusions
- [ ] Dependencies named with owners and timelines
- [ ] Assumptions stated explicitly
- [ ] Trade-offs documented

**Engineering read-through test**: "An engineer reading this spec should be able to start work with no more than 3 clarifying questions. If they would have more, the following gaps exist: [list them]."

**Voice pass.** Then scan every prose section (problem statement, context, rationale, risks) against the Slop Taxonomy and the Claudism Catalogue in [foundations.md](foundations.md), the same gate the `review` mode runs on drafts. Rewrite any AI-register tell: performative pushback, the false universal ("the question every X turns on"), the clean-mental-model setup ("the cleanest way to think about this is..."), structural metaphor, the validation stamp. A spec that reads as generated loses authority with engineering. If a fix introduces a new tell, fix the fix.

## Output Format

Structured document with numbered sections, clear headers, scannable formatting. Tables for comparisons. Bullets for lists. Prose only where narrative is genuinely needed. Every section must contain substance; if a section would be generic, drop it and note why in Open Questions.

---

If the user wants stories broken out from this spec, point them to `stories` mode.
