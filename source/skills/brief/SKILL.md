---
name: brief
description: Generate an engineering brief from a feature description, design, or screenshot. Structured, gap-free, and slop-tested.
user-invokable: true
args:
  - name: feature
    description: The feature or change to brief (optional - can also describe interactively)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read the [specification reference](../product-management/reference/specification.md) for spec structure and quality standards, and the [discovery reference](../product-management/reference/discovery.md) for JTBD framing.

---

Generate an engineering brief that anticipates questions, covers edge cases, and connects to real user value. A brief is lighter than a full spec but must still be rigorous enough that engineering can estimate and plan from it.

## Step 1: Understand the Feature

If the user provided a feature description, design, or screenshot, analyse it thoroughly. If not, ask what they want to brief.

Before generating anything, gather what you need:
- What specific problem does this solve?
- Who experiences this problem and in what context?
- What's the job-to-be-done? (Not the feature request - the underlying need)
- What exists today? What are users doing instead?

If the input is vague, push back. Don't generate a brief from "we need better search." Ask: "Better for whom? What's failing about the current search? What does success look like?"

## Step 2: Generate the Brief

### Problem Context
What specific problem exists, for whom, in what context. Include evidence if available (support tickets, usage data, customer quotes). Connect to the product strategy and current objectives.

### User Stories
Frame using JTBD: "When [situation], I want to [motivation], so I can [outcome]."
Each story must be specific enough to be testable. No vague outcomes like "have a better experience."

### Acceptance Criteria
For each user story, write testable acceptance criteria:
- Happy path behaviour with specific, observable outcomes
- Error states and how the system responds
- Performance requirements (response times, limits)
- Permission and access considerations

**Test**: Could a QA engineer write test cases directly from these criteria? If not, they're too vague.

### Edge Cases
Systematically consider:
- Empty states (no data, first-time user)
- Boundary conditions (maximum data, minimum data)
- Failure modes (network failure, dependency unavailable, timeout)
- Concurrent users (race conditions, conflicts)
- Data migration (if changing existing behaviour)
- Permission edge cases (what about read-only users, admins, external guests?)

### Dependencies
- Other teams or systems this depends on
- APIs, services, or infrastructure requirements
- Design decisions not yet made
- Timeline dependencies (what must ship first?)

### Out of Scope
Explicitly list what this brief does NOT cover. Name at least three things. If you can't name things that are out of scope, scope is undefined.

### Open Questions
Questions that need answers before engineering starts. Flag who should answer each one.

## Step 3: Run the PM Slop Test

Before delivering, check the brief against the PM Slop Test from the product-management skill:

- [ ] Audience specified (not "users" - which users?)
- [ ] Problem stated (not "better experience" - what's broken?)
- [ ] Success measurable (not "positive feedback" - what metric?)
- [ ] Edge cases covered (not just the happy path)
- [ ] Scope bounded (at least 3 things explicitly out of scope)
- [ ] Dependencies named
- [ ] Assumptions stated

If any check fails, fix it before delivering. Call out which assumptions you've made and what you couldn't verify without more information.

## Output Format

Deliver as a structured document with clear headers. Bullet points and tables over prose. Every section must earn its place - if a section has nothing meaningful, drop it rather than filling it with generic content.

**Remember**: A brief that generates 10 engineering questions in the first hour is slop. Anticipate the questions.

## What's Next

- Run `/pm:spec` to expand this brief into a full product specification with success metrics, risks, and rollout plan.
- Or run `/pm:review` to get an adversarial review of this brief before sharing it with engineering.
