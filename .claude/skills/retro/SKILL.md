---
name: retro
description: Evaluate what shipped against what you expected. Separates decision quality from outcome quality. Closes the learning loop.
user-invokable: true
args:
  - name: subject
    description: The feature, initiative, or launch to retrospect on (optional)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Decision-making reference](../product-management/reference/decision-making.md) for resulting, pre-mortem, and outcome fielding
- [Prioritisation reference](../product-management/reference/prioritisation.md) for outcome thinking and the Product Kata
- [Discovery reference](../product-management/reference/discovery.md) for validating hypotheses

---

This is not a team retro about process ("we should have more standups"). This is a product retro: did the thing we shipped actually work? What did we learn? What does that mean for what we do next?

**This skill separates decision quality from outcome quality.** A good bet that didn't pay off is different from a bad bet that got lucky. The goal is to learn, not to assign credit or blame.

## Step 1: Reconstruct What You Expected

Before looking at results, reconstruct what you believed when you committed to this work. This prevents hindsight bias.

Ask:
- **What was the hypothesis?** What specific change did you expect to see?
- **What were the success metrics?** What numbers did you commit to? (If you didn't define metrics, flag this as a process gap.)
- **What were the key assumptions?** What had to be true for this to work?
- **What risks did you identify?** What were the pre-mortem failure modes?
- **What was the timeline?** How long did you expect it to take vs. how long it actually took?

If the user can't answer these: that's the first finding. You shipped without a clear hypothesis, which means you can't evaluate whether it worked - only whether people seem to like it.

## Step 2: Gather the Evidence

Now look at what actually happened:

### Quantitative
- **Primary metric**: What moved? By how much? Over what period?
- **Secondary metrics**: Supporting indicators - did they tell a consistent story?
- **Guardrail metrics**: Did anything get worse?
- **Unexpected changes**: Did anything move that you weren't tracking?

### Qualitative
- **User feedback**: What are users actually saying? (Not cherry-picked praise - the full picture)
- **Support signal**: Did support tickets change? New categories of issues?
- **Usage patterns**: Are people using it the way you expected? Any surprising behaviours?
- **Team observations**: What did the team notice during rollout?

### Confounders
- What else happened during this period that could explain the results?
- Seasonality, other launches, external events, marketing campaigns?

## Step 3: Compare Expected vs. Actual

For each hypothesis and metric:

| What we expected | What happened | Delta | Explanation |
|---|---|---|---|
| ... | ... | ... | ... |

### Classification

For each outcome, classify it:

- **Confirmed**: The hypothesis was right. The metric moved as expected for the reasons we predicted.
- **Partially confirmed**: Some metrics moved, others didn't, or the magnitude was different.
- **Disproven**: The hypothesis was wrong. The metric didn't move, or moved in the wrong direction.
- **Inconclusive**: We don't have enough data or there are too many confounders to draw a conclusion.
- **Surprised**: Something happened we didn't predict at all.

## Step 4: Separate Decision Quality from Outcome Quality

This is the critical step. Using the Thinking in Bets framework:

### Outcome Fielding
For each result, honestly assess how much was skill (good decisions) vs. luck (external factors):

- **Good decision, good outcome**: We bet right and it paid off. What can we repeat?
- **Good decision, bad outcome**: We bet right but the world didn't cooperate. Don't overcorrect - the decision process was sound.
- **Bad decision, good outcome**: We got lucky. Don't take credit for the outcome - fix the decision process.
- **Bad decision, bad outcome**: The process was flawed and the result shows it. What should we change?

Push back on:
- "It worked, so we were right" - maybe you got lucky
- "It failed, so we were wrong" - maybe the decision was sound but the market shifted
- Taking credit for outcomes driven by external factors
- Blaming external factors for outcomes driven by bad decisions

## Step 5: Extract Learning

### What did we learn about our users?
- Any surprises in how they used the feature?
- Any assumptions about their behaviour that proved wrong?
- Any new jobs-to-be-done we discovered?

### What did we learn about our product?
- Any technical constraints we didn't anticipate?
- Any interaction effects with other features?
- Any scalability or performance surprises?

### What did we learn about our process?
- Were the metrics well-chosen? Would you choose different ones next time?
- Was the hypothesis clear enough to evaluate?
- Did you have the right instrumentation in place?
- Was the evaluation timeline appropriate?

### What would we do differently?
- Not "we should have built it faster" - that's not actionable
- Specific changes to how you'd scope, validate, or measure next time

## Step 6: Define What's Next

Based on the learning:

- **Double down**: If confirmed, what's the next iteration? How do you capture more value?
- **Pivot**: If disproven, what alternative approach does the evidence suggest?
- **Investigate**: If inconclusive, what additional data would resolve the ambiguity?
- **Kill**: If the hypothesis is clearly wrong and the investment isn't justified, stop. Don't fall into sunk cost.

## Step 7: Deliver the Retro

### Initiative
[What shipped, when, for whom]

### Hypothesis vs. Reality

| Dimension | Expected | Actual | Verdict |
|---|---|---|---|
| Primary metric | ... | ... | Confirmed/Disproven/Inconclusive |
| Secondary metrics | ... | ... | ... |
| Guardrail metrics | ... | ... | ... |
| Timeline | ... | ... | ... |
| Key assumption 1 | ... | ... | ... |
| Key assumption 2 | ... | ... | ... |

### Decision Quality Assessment
[Good decision/bad outcome? Bad decision/good outcome? Be honest about skill vs. luck.]

### Key Learnings
1. [Most important learning - specific and actionable]
2. [Second learning]
3. [Third learning]

### What's Next
[Specific next action: double down, pivot, investigate, or kill. With rationale.]

### Process Improvements
[What to change about how you set hypotheses, choose metrics, or evaluate outcomes. Only if genuinely different from what you'd do by default.]

## NEVER

- Run a retro without first reconstructing what you expected (prevents hindsight bias)
- Equate bad outcomes with bad decisions - separate the two
- Accept "we learned a lot" without specific, actionable learnings
- Skip the decision quality assessment - this is what makes this skill valuable
- Turn this into a blame exercise - the goal is learning, not accountability theater
- Accept vague next steps - "do more research" is not actionable

## What's Next

- Run `/pm:discover plan` to design validation conversations for the next iteration.
- Run `/pm:metrics` to refine the metric stack based on what you learned.
- Run `/pm:prioritise` to re-evaluate priorities in light of new evidence.
