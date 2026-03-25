---
name: spec
description: Write a full product specification with success metrics, risks, rollout plan, and the PM Slop Test. Deeper than a brief.
user-invokable: true
args:
  - name: feature
    description: The feature or initiative to specify (optional)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Specification reference](../product-management/reference/specification.md) for structure and quality standards
- [Discovery reference](../product-management/reference/discovery.md) for JTBD and validation
- [Decision-making reference](../product-management/reference/decision-making.md) for risk assessment and pre-mortem
- [Prioritisation reference](../product-management/reference/prioritisation.md) for the four risks framework

---

Write a full product specification. This is deeper than a brief - it's the contract between product and engineering about what "done" means, why it matters, and how we'll know it worked.

## Step 1: Challenge the Premise

Before writing anything, interrogate the feature:

- **Why this, why now?** What changed that makes this important? What's the cost of NOT doing it?
- **Who asked for this?** Is this coming from a stakeholder request, user research, data, or intuition? How strong is the evidence?
- **What's the job-to-be-done?** Not the feature request - the underlying struggle. What progress is the user trying to make?
- **What have we already tried?** Previous approaches and why they didn't work.
- **What's NOT in scope?** Force the user to draw a boundary. If they can't, the scope is undefined and the spec isn't ready.

Push back on vague inputs. "We need a better dashboard" is not spec-ready. "Enterprise customers can't find the metrics they need to justify renewal" is getting there.

## Step 2: Write the Specification

### 1. Problem Statement
The specific problem, for whom, in what context. Must be observable in the wild - not a restated feature request.

### 2. Context and Background
- Evidence the problem exists (data, research, support tickets)
- Previous attempts and outcomes
- Strategic context (connection to current objectives)
- Competitive context (how alternatives handle this)

### 3. Proposed Solution
For each component:
- User-facing behaviour (what the user sees and does)
- System behaviour (what happens behind the scenes)
- Happy path walkthrough (step by step)
- Error handling (every failure mode and the system's response)
- Data model changes (if any)
- API changes (if any)

### 4. User Stories and Acceptance Criteria
Each story: As a [specific user type], I want to [specific action], so that [specific, measurable outcome connected to their JTBD].

Acceptance criteria must be testable. For each criterion, a QA engineer should be able to write a test case without asking questions.

### 5. Edge Cases and Error Handling
Systematically address:
- Empty states, first-time states
- Maximum and minimum data boundaries
- Network failures, timeouts, partial failures
- Concurrent users, race conditions
- Permission variations (admin, member, guest, external)
- Data migration from existing behaviour
- Accessibility considerations
- Internationalisation implications (if applicable)

### 6. Out of Scope
Minimum three items. For each: what it is, why it's out of scope, and where it's tracked for future consideration.

### 7. Dependencies
Each dependency: what it is, who owns it, current status, timeline, and fallback if it's not ready.

### 8. Success Metrics
- **Primary metric**: The one number that tells you if this solved the problem. Include target value and measurement method.
- **Secondary metrics**: Supporting indicators.
- **Guardrail metrics**: Things that must NOT get worse (with thresholds).
- **Measurement plan**: How you'll collect the data, when you'll evaluate, what constitutes success vs failure.

### 9. Risks and Mitigations
Assess all four risks:
- **Value risk**: Will users actually want this? Evidence and remaining uncertainty.
- **Usability risk**: Can users figure it out? What's been tested?
- **Feasibility risk**: Can we build it? Technical unknowns, complexity, dependencies.
- **Viability risk**: Does it work for the business? Legal, operational, financial considerations.

For each risk: severity (high/medium/low), likelihood, mitigation plan.

### 10. Rollout Plan
- Feature flag strategy (who sees it first?)
- Phased rollout plan (stages, criteria for advancing)
- Rollback criteria (specific thresholds that trigger rollback)
- Rollback process (how to roll back, who decides)
- Communication plan (changelog, notifications, documentation updates)

### 11. Open Questions
Questions that need answers, ordered by urgency. For each: who should answer it, what's blocked if it stays unanswered, and any proposed default answer.

## Step 3: Run the Pre-Mortem

Using the Thinking in Bets framework: Imagine it's three months after launch and this feature has failed. Why?

List the top 5 reasons for failure. For each, assess:
- How likely is this? (percentage)
- What's our mitigation?
- What early warning signal would we see?

## Step 4: Run the PM Slop Test

Check every section against the PM Slop Test from the product-management skill. The spec must pass ALL checks:

- [ ] Audience specified with context
- [ ] Problem stated with evidence
- [ ] Success measurable with specific targets
- [ ] Edge cases comprehensively covered
- [ ] Scope bounded with explicit exclusions
- [ ] Dependencies named with owners and timelines
- [ ] Assumptions stated explicitly
- [ ] Trade-offs documented

### The Engineering Read-Through Test
State: "An engineer reading this spec should be able to start work with no more than 3 clarifying questions. If they'd have more, the following gaps exist: [list them]."

## Output Format

Structured document with numbered sections, clear headers, and scannable formatting. Tables for comparisons. Bullet points for lists. Prose only where narrative is genuinely needed.

Every section must contain substance. If a section would only contain generic content, drop it and note why in Open Questions.

## What's Next

- Run `/pm:review` to get an adversarial review of this spec before it goes to engineering.
- Run `/pm:stories` to break this spec into sprint-sized user stories with acceptance criteria.
- Run `/pm:translate` to rewrite the spec for a different audience (exec summary, customer-facing, etc.).
