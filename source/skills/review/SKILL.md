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
- [Review Personas reference](../product-management/reference/review-personas.md) for persona-based review perspectives

---

This skill is deliberately adversarial. Its job is to find everything wrong with a spec, brief, or PRD before engineering does. Better to get hard questions now than clarification requests mid-sprint.

This review uses **persona-based perspectives** from the Review Personas reference. Each persona catches different gaps. You review from each perspective independently - finish one persona's full assessment before starting the next. No cross-contamination between perspectives.

**Check for preferences**: If `.pmcontext.md` has a **Ways of Working** section with specific checklists or quality criteria the user always checks, incorporate those into the review alongside the standard checks below.

## Step 1: Read the Document

Read the entire document. Note your first impressions:
- What's clear immediately?
- Where did you get confused?
- What's missing that you expected to see?
- What feels like filler vs substance?

## Step 2: Run the Slop Test

Apply every check from the PM Slop Test in the product-management skill:

### Substance Slop Detection
- [ ] **Generic preamble**: Does it open with filler that could apply to any product? ("In order to improve the user experience...")
- [ ] **Vague audience**: Does it say "users" instead of specifying which users in what context?
- [ ] **Unmeasurable success**: Are success metrics vague or missing? ("Improve satisfaction")
- [ ] **Happy path only**: Does it only describe what happens when everything works?
- [ ] **Unbounded scope**: Is there no "out of scope" section, or is it empty?
- [ ] **Hidden assumptions**: Are there unstated assumptions baked into the solution?
- [ ] **Missing trade-offs**: Is the proposed solution presented as obviously correct with no alternatives considered?
- [ ] **Buzzword density**: Could sentences be simplified to half their length without losing meaning?

### Voice Slop Detection
- [ ] **AI vocabulary**: Scan for: delve, tapestry, landscape, realm, beacon, nuanced, multifaceted, robust, meticulous, pivotal, underscore, intricate, foster, bolster, harness, illuminate, facilitate, streamline, showcase, vibrant, enduring. Flag every instance.
- [ ] **Sentence patterns**: Check for "It's not X, it's Y" constructions, verb inflation ("serves as"/"stands as"/"represents" instead of "is"), and uniform sentence length throughout.
- [ ] **Structural tells**: Opening paragraphs that restate the problem instead of adding new information. Closing paragraphs that are upbeat summaries adding no substance. Headers every 2-3 paragraphs when the content doesn't warrant them.
- [ ] **Formatting tells**: Em dashes (banned - rephrase or use commas), excessive colon-into-list patterns, bold phrases mid-sentence for emphasis, overuse of qualifiers like "arguably", "it's worth noting", "importantly".

Flag every instance with the specific text that triggers it.

## Step 3: Persona-Based Gap Analysis

Select 3-4 personas from the Review Personas reference based on the document type (use the Persona Selection Table). For each persona, adopt their perspective INDEPENDENTLY. Complete each persona's full review before moving to the next. The value is in independent assessment - do not let one persona's findings influence another's.

For each selected persona:

1. **State which persona** you are reviewing as (e.g., "Reviewing as Dev (Senior Engineer)")
2. **Walk through the document** from their perspective, using their test questions and red flags from the reference
3. **List every gap, concern, and question** that persona would raise
4. **Rank each finding** by severity: P0 (blocking), P1 (important), P2 (minor)

After completing all persona reviews independently, **synthesize**:
- Where do multiple personas flag the same issue? (High confidence - this is a real gap)
- Where does only one persona flag an issue? (Still valid - may be a specialised concern)
- What did the persona-based review surface that a single-perspective review would miss?

## Step 4: Consolidated Questions by Priority

Merge all persona findings into a single ranked list. Each question is attributed to the persona(s) that raised it, so the reader understands the perspective behind it.

**P0 - Blocking** (Can't start work without an answer):
Questions about fundamental ambiguity, missing requirements, or contradictory instructions. Include which persona(s) raised each question.

**P1 - Important** (Can start but will need answers soon):
Questions about edge cases, technical approach, dependencies, evidence gaps. Include which persona(s) raised each question.

**P2 - Nice to Know** (Can probably figure it out, but would be faster with an answer):
Questions about preference, style, or non-critical details. Include which persona(s) raised each question.

Questions flagged by multiple personas should be ranked higher than single-persona findings at the same severity level.

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

### Persona Findings
For each persona used in the review, list their 2-3 most critical findings. Keep it compact - the detail is in the consolidated questions below.

**Dev (Senior Engineer)**: [top findings about buildability and technical clarity]
**Tester (QA Lead)**: [top findings about testability and missing states]
**Exec (VP Stakeholder)**: [top findings about strategic clarity and ROI]
**Customer (End User)**: [top findings about user value and workflow fit]
**Critic (Skeptical PM)**: [top findings about evidence quality and rigor]

Only include the personas you selected for this review.

### Engineering Questions
The full ranked list of questions from Step 4, with persona attribution.

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

## What's Next

- Fix the issues found, then run `/pm:review` again to verify.
- Run `/pm:stories` to break the reviewed spec into sprint-sized user stories.
- Run `/pm:translate` to adapt the reviewed document for a different audience.
