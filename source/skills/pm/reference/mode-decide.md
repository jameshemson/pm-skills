# Mode: decide

Structure a product decision. This mode pushes back if you have not done enough thinking. It does not produce a decision doc from a one-liner - it forces you to articulate the trade-offs you are actually making.

Consult [knowledge-decision-making.md](knowledge-decision-making.md) for the Thinking in Bets framework, cognitive biases, and the Playing to Win choice cascade.

If `.pmcontext.md` has a **Ways of Working** section with a preferred decision framework, use that as the primary structure. Layer in bias checks and pre-mortem regardless - those always apply.

## Step 1: Challenge the Decision

Before structuring anything, interrogate the decision:

**What exactly are you deciding?** Frame it precisely. "Should we build feature X?" is different from "Should we build X now, or after Y?" which is different from "Should we solve problem Z, and if so, how?"

**Why is this a decision?** What are the competing options? If there is only one option, you are not deciding - you are justifying. Name at least three genuinely different approaches, including "do nothing."

**What is the constraint?** Every real decision has one: time, money, people, strategy, or technical debt. Name it. If there is no constraint, there is no decision.

**What did you rule out and why?** If you have not ruled anything out, you have not thought about it enough.

**What is reversible?** A reversible decision (feature flag, soft launch) needs less rigour than an irreversible one (architecture change, public commitment). Do not over-process reversible decisions.

If the user provides a vague decision, push back:
- "What is the constraint that makes this hard?"
- "What are the options you have considered?"
- "Why not the simpler option?"
- "What would change your mind?"

## Step 2: Define the Options

For each option (minimum three, including "do nothing"):
- **Description**: What this option looks like in practice
- **What it optimises for**: The primary benefit
- **What it costs**: What you give up, in concrete terms
- **Assumptions**: What must be true for this to work?
- **Reversibility**: How easy to change course if this fails?

Always include the "do nothing" option. Often it is the right answer.

## Step 3: Define and Weight Criteria

List evaluation criteria and weight them. Not all criteria are equal.

Common criteria:
- **User impact**: How much does this improve the target user's life?
- **Strategic alignment**: Does this move toward the stated strategy?
- **Feasibility**: Can we build this with current resources and constraints?
- **Time to value**: How quickly do users see benefit?
- **Reversibility**: How easy to undo if wrong?
- **Opportunity cost**: What else could we do with these resources?

The user must assign weights. If they will not, push back: "If all criteria are equally important, you have not prioritised. Which two matter most and why?"

## Step 4: Evaluate

Score each option against each criterion with a one-sentence justification:

| Criteria (weight) | Option A | Option B | Option C (Do Nothing) |
|---|---|---|---|
| User impact (40%) | Score + justification | ... | ... |
| Strategic fit (25%) | ... | ... | ... |
| Feasibility (20%) | ... | ... | ... |
| Time to value (15%) | ... | ... | ... |

Calculate weighted scores, but do not pretend the math makes the decision. Scores structure the conversation - the judgment is human.

## Step 5: Check for Bias

Using the cognitive biases from [knowledge-decision-making.md](knowledge-decision-making.md), flag potential distortions:

- **Anchoring**: Is the first option unfairly advantaged because it was proposed first?
- **Sunk cost**: Are you favouring an option because of past investment?
- **Availability**: Is a recent event making one risk feel larger than it is?
- **WYSIATI**: What information are you missing? Who have you not talked to?
- **Loss aversion**: Are you avoiding a better option because it feels riskier?
- **Confirmation bias**: Have you sought evidence that contradicts your preferred option?

For each bias detected: name it, explain how it distorts the decision, suggest a corrective action.

## Step 6: Pre-Mortem

For the leading option: imagine it is six months later and it failed. Why?

For each failure mode (top 3-5):
1. What went wrong?
2. How likely is this? (percentage)
3. What is the early warning signal?
4. What is the mitigation?

## Step 7: Make the Recommendation

### Decision
[Clear statement of what to do]

### Why
[The 2-3 strongest reasons, connected to the highest-weighted criteria]

### What We Are Giving Up
[Explicit trade-offs. What is the cost of this decision? What would the alternative have given us?]

### What Must Be True
[Assumptions that underpin this decision. If any prove false, revisit.]

### Confidence Level
[Express as a percentage range: "65-75% confident because..." - not just "I am confident."]

### Reversibility and Checkpoints
[When and how to evaluate whether this was right. What triggers a course correction?]

### Dissenting View
[The strongest argument against this recommendation. Who would disagree and why? What are they right about?]

---

A decision document that presents the chosen option as obviously correct is not a decision document - it is a justification. The value is in making trade-offs visible, not making the choice feel inevitable.

Once a decision is made, `pm brief` or `pm spec` turns the chosen option into an actionable engineering document.
