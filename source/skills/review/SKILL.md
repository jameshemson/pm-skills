---
name: review
description: Adversarial review of a spec, PRD, or brief. Finds gaps, contradictions, and slop. Deliberately tough.
user-invokable: true
args:
  - name: document
    description: Path to the document to review, or paste content directly (optional)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Specification reference](../product-management/reference/specification.md) for spec quality standards and the PM Slop Test
- [Discovery reference](../product-management/reference/discovery.md) for validating customer evidence
- [Prioritisation reference](../product-management/reference/prioritisation.md) for the four risks framework
- [Communication reference](../product-management/reference/communication.md) for clarity standards

---

This skill is deliberately adversarial. Its job is to find everything wrong with a spec, brief, or PRD before engineering does. Better to get hard questions now than clarification requests mid-sprint.

Think like a skeptical senior engineer, a demanding VP, and a confused new user - all at once.

## Step 1: Read the Document

Read the entire document. Note your first impressions:
- What's clear immediately?
- Where did you get confused?
- What's missing that you expected to see?
- What feels like filler vs substance?

## Step 2: Run the Slop Test

Apply every check from the PM Slop Test in the product-management skill:

### Slop Detection
- [ ] **Generic preamble**: Does it open with filler that could apply to any product? ("In order to improve the user experience...")
- [ ] **Vague audience**: Does it say "users" instead of specifying which users in what context?
- [ ] **Unmeasurable success**: Are success metrics vague or missing? ("Improve satisfaction")
- [ ] **Happy path only**: Does it only describe what happens when everything works?
- [ ] **Unbounded scope**: Is there no "out of scope" section, or is it empty?
- [ ] **Hidden assumptions**: Are there unstated assumptions baked into the solution?
- [ ] **Missing trade-offs**: Is the proposed solution presented as obviously correct with no alternatives considered?
- [ ] **Buzzword density**: Could sentences be simplified to half their length without losing meaning?

Flag every instance with the specific text that triggers it.

## Step 3: Check for Gaps

### Requirements Gaps
- Are acceptance criteria testable? Could a QA engineer write tests from them without asking questions?
- Are error states specified? What happens when things fail?
- Are boundary conditions addressed? (Maximum data, minimum data, empty states)
- Are permission models covered? (Who can do what? What about edge permission cases?)
- Is data migration addressed? (If changing existing behaviour, what happens to existing data/users?)

### Logic Gaps
- Are there contradictions between sections?
- Does the proposed solution actually solve the stated problem?
- Are there circular dependencies?
- Do the success metrics measure what the problem statement describes?

### Context Gaps
- Is the problem grounded in evidence or just assumed?
- Are competitive alternatives acknowledged?
- Is strategic alignment explained?
- Are dependencies identified with owners and timelines?

### Risk Gaps
- Are all four risks addressed? (Value, usability, feasibility, viability)
- Is there a rollback plan?
- What's the worst case scenario and how would you know it's happening?
- Has a pre-mortem been done?

## Step 4: Generate Engineering Questions

Put yourself in the shoes of an engineer who just received this document. Write every question they'd ask before starting work, ranked by severity:

**P0 - Blocking** (Can't start work without an answer):
Questions about fundamental ambiguity, missing requirements, or contradictory instructions.

**P1 - Important** (Can start but will need answers soon):
Questions about edge cases, technical approach, dependencies.

**P2 - Nice to Know** (Can probably figure it out, but would be faster with an answer):
Questions about preference, style, or non-critical details.

## Step 5: Assess Against Product Context

If product context is available (.pmcontext.md or CLAUDE.md), check:
- Does this align with the stated strategy?
- Does it serve the target users?
- Does it fit the team's definition of done?
- Does it account for known technical constraints?
- Is it consistent with how this team makes decisions?

## Step 6: Deliver the Review

### Slop Verdict
Pass or fail. List every instance of slop found, with the specific text and what should replace it.

### Critical Gaps
The top 3-5 issues that would cause the most problems if unaddressed. For each:
- **What's missing or wrong**
- **Why it matters** (concrete consequence, not abstract concern)
- **Suggested fix** (specific, not "add more detail")

### Engineering Questions
The full ranked list of questions from Step 4.

### Contradiction Report
Any places where the document contradicts itself or where requirements conflict.

### Strengths
What's done well. Specific, genuine strengths - not filler praise.

### Severity Summary
- Blocking issues: [count]
- Important gaps: [count]
- Minor issues: [count]
- Overall readiness: Ready / Needs Work / Not Ready

**Remember**: This review exists to make the document better, not to make the author feel bad. Be specific about what's wrong, concrete about how to fix it, and honest about what's good. But don't pull punches - a polite review that misses real problems is worse than a tough one that catches them.
