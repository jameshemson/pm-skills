---
name: decide
description: Structure a decision with options, weighted criteria, trade-offs, and bias checks. Uses Thinking in Bets framework.
user-invokable: true
args:
  - name: decision
    description: The decision to structure (optional)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read the [decision-making reference](../product-management/reference/decision-making.md) for the Thinking in Bets framework, cognitive biases, and strategy choice cascade.

---

Structure a product decision. This skill pushes back if you haven't done enough thinking. It doesn't produce a decision doc from a one-liner - it forces you to articulate the trade-offs you're actually making.

**Check for preferences**: If `.pmcontext.md` has a **Ways of Working** section with a preferred decision framework, use that as the primary structure. Layer in bias checks and pre-mortem from the steps below regardless - those always apply.

## Step 1: Challenge the Decision

Before structuring anything, interrogate the decision:

**What exactly are you deciding?** Frame it precisely. "Should we build feature X?" is different from "Should we build X now, or after Y?" which is different from "Should we solve problem Z, and if so, how?"

**Why is this a decision?** What are the competing options? If there's only one option, you're not deciding - you're justifying. Name at least three genuinely different approaches (including "do nothing").

**What's the constraint?** Every real decision has a constraint - time, money, people, strategy, technical debt. Name it. If there's no constraint, there's no decision.

**What did you rule out and why?** If you haven't ruled anything out, you haven't thought about it enough.

**What's reversible?** A reversible decision (feature flag, soft launch) needs less rigour than an irreversible one (architecture change, public commitment). Don't over-process reversible decisions.

If the user provides a vague decision ("should we do X?"), push back:
- "What's the constraint that makes this hard?"
- "What are the options you've considered?"
- "Why not the simpler option?"
- "What would change your mind?"

## Step 2: Define the Options

For each option (minimum three, including "do nothing"):
- **Description**: What this option looks like in practice
- **What it optimises for**: What's the primary benefit?
- **What it costs**: What you give up, in concrete terms
- **Assumptions**: What must be true for this option to work?
- **Reversibility**: How easy is it to change course if this doesn't work?

### The "Do Nothing" Option
Always include it. Often it's the right answer. What happens if you don't make this decision at all? Sometimes the answer is "nothing bad" - which means it's not actually a decision that needs making right now.

## Step 3: Define and Weight Criteria

List the criteria for evaluating options. Then weight them - not all criteria are equal.

Common criteria for product decisions:
- **User impact**: How much does this improve the target user's life?
- **Strategic alignment**: Does this move us toward our stated strategy?
- **Feasibility**: Can we build this with current resources and constraints?
- **Time to value**: How quickly do users see benefit?
- **Reversibility**: How easy to undo if wrong?
- **Opportunity cost**: What else could we do with these resources?

**Weight assignment**: The user must assign weights. If they won't, push back: "If all criteria are equally important, you haven't prioritised. Which two matter most and why?"

## Step 4: Evaluate

For each option against each criterion, score and justify:

| Criteria (weight) | Option A | Option B | Option C (Do Nothing) |
|---|---|---|---|
| User impact (40%) | Score + 1-sentence justification | ... | ... |
| Strategic fit (25%) | ... | ... | ... |
| Feasibility (20%) | ... | ... | ... |
| Time to value (15%) | ... | ... | ... |

Calculate weighted scores, but don't pretend the math makes the decision. The scores structure the conversation - the judgment is human.

## Step 5: Check for Bias

Using the cognitive biases from the decision-making reference, flag potential distortions:

- **Anchoring**: Is the first option unfairly advantaged because it was proposed first?
- **Sunk cost**: Are you favouring an option because of past investment?
- **Availability**: Is a recent event making one risk feel larger than it is?
- **WYSIATI**: What information are you missing? Who haven't you talked to?
- **Loss aversion**: Are you avoiding a better option because it feels riskier?
- **Framing**: Would you evaluate differently if the options were presented in a different order or with different framing?
- **Confirmation bias**: Have you sought evidence that contradicts your preferred option?

For each bias detected: name it, explain how it might be distorting the decision, and suggest a corrective action.

## Step 6: Pre-Mortem

For the leading option: imagine it's six months later and it failed. Why?

List the top 3-5 failure modes:
1. What went wrong?
2. How likely is this? (percentage)
3. What's the early warning signal?
4. What's the mitigation?

## Step 7: Make the Recommendation

Structure the recommendation:

### Decision
[Clear statement of what to do]

### Why
[The 2-3 strongest reasons, connected to the highest-weighted criteria]

### What We're Giving Up
[Explicit trade-offs. What's the cost of this decision? What would the alternative have given us?]

### What Must Be True
[Assumptions that underpin this decision. If any prove false, revisit the decision.]

### Confidence Level
[Express as a percentage range. "I'm 65-75% confident this is the right call because..." Not "I'm confident."]

### Reversibility and Checkpoints
[When and how to evaluate whether this was the right decision. What would trigger a course correction?]

### Dissenting View
[The strongest argument against this recommendation. Who would disagree and why? What are they right about?]

## Output Format

Deliver the full decision structure. Tables for evaluation. Clear headers. The recommendation should be readable independently from the analysis - someone should be able to read just the recommendation section and understand the decision, the trade-offs, and the confidence level.

**Remember**: A decision document that presents the chosen option as obviously correct isn't a decision document - it's a justification. The value is in making the trade-offs visible, not in making the choice feel inevitable.

## What's Next

- Run `/pm:brief` or `/pm:spec` to turn the chosen option into an actionable engineering document.
- Run `/pm:translate` to present this decision to a different audience (exec summary, team announcement, etc.).
