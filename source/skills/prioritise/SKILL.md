---
name: prioritise
description: Stack-rank work against outcomes and strategy. Forces trade-offs, checks for drift, and connects decisions to what actually matters.
user-invokable: true
args:
  - name: items
    description: "The items to prioritise - features, bets, opportunities, or a path to a list"
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Prioritisation reference](../product-management/reference/prioritisation.md) for outcome thinking and the Product Kata
- [Decision-making reference](../product-management/reference/decision-making.md) for bias checks and trade-off framing
- [Discovery reference](../product-management/reference/discovery.md) for evidence quality assessment

---

Prioritise a set of options against outcomes and strategy. This skill doesn't just rank things - it forces you to articulate what you're optimising for, what evidence supports each option, and what you're giving up.

Prioritisation without trade-offs is a to-do list. This skill makes the trade-offs visible.

**Check for preferences**: If `.pmcontext.md` has a **Ways of Working** section with a preferred prioritisation framework (e.g. RICE, a custom scorecard), use that as the ranking structure. The steps below for evidence assessment, trade-offs, and drift checks still apply on top.

## Step 1: Understand What You're Prioritising

If the user hasn't provided a list, ask for one. Then clarify:

- **What are these?** Features, bets, experiments, bugs, opportunities, initiatives? The type changes how you evaluate them.
- **What's the time horizon?** This sprint, this quarter, this year? Urgency weighting changes with scope.
- **Who decides?** Is this your call, a team decision, or a recommendation to leadership?
- **What constraints exist?** Team size, dependencies, deadlines, commitments already made.

If the list is longer than 10 items, push back: "Can you cut this to 10 or fewer? If everything's a priority, nothing is. What can you immediately drop?"

## Step 2: Define the Outcome

Before ranking anything, establish what you're optimising for. Ask:

- **What outcome matters most right now?** Not "build features" but "reduce churn in enterprise segment" or "prove PMF in the SMB market" or "unblock the sales team."
- **How do you measure it?** Specific metric, current value, target value.
- **What's the strategic context?** Read .pmcontext.md. Does this align with the stated vision and focus?

If the user can't name a single outcome, stop. You can't prioritise without a target. Help them define one using the Product Kata:

1. **Strategic intent**: Where are you trying to get to?
2. **Current condition**: Where are you now? What does the data say?
3. **Next target condition**: What's the next measurable milestone?
4. **What's blocking you?** What's the biggest obstacle to reaching the target condition?

The answer to #4 is what the prioritisation should serve.

## Step 3: Assess Evidence Quality

For each item on the list, assess the evidence that it matters:

| Evidence level | What it means | Examples |
|---|---|---|
| **Strong** | Observed behaviour, data, or commitments | Usage data, conversion metrics, customers who offered money/time, churned citing this |
| **Medium** | Qualitative signal with some specifics | Customer interviews (Mom Test-quality), support ticket patterns, sales objection patterns |
| **Weak** | Opinions, requests, or intuition | "Customers want X", stakeholder request, competitor copied it, "I think we should" |
| **None** | No evidence | Untested assumption, internal brainstorm output |

Be direct about evidence gaps. A feature with no evidence isn't necessarily wrong - but the team should know they're betting on intuition.

## Step 4: Assess the Four Risks

For each item, quickly assess:

- **Value risk**: Will users actually want this? What's the evidence?
- **Usability risk**: Can users figure it out? How complex is the interaction?
- **Feasibility risk**: Can we build it? Technical unknowns, dependencies, timeline.
- **Viability risk**: Does it work for the business? Legal, operational, financial.

Flag any item where more than one risk is high. That's a signal to validate before committing, not to rank higher or lower.

## Step 5: Force the Trade-offs

This is the hard part. For each item, make explicit:

- **If we do this, we DON'T do**: [what gets pushed or dropped]
- **Opportunity cost**: [what could this team achieve instead with the same resources]
- **Cost of delay**: [what happens if we don't do this for another quarter]
- **Reversibility**: [how easy is it to course-correct if this is wrong]

Then ask: **"Is there anything on this list you're including because a stakeholder asked for it, not because it serves the outcome?"** Stakeholder requests aren't invalid, but they should be evaluated the same way as everything else. Political prioritisation is the most common form of drift.

## Step 6: Check for Drift

Using the product context, verify:

- **Does this list serve the stated strategy?** If half the items don't connect to the stated focus, flag it. Either the strategy needs updating or the list has drift.
- **Is this output-thinking or outcome-thinking?** "Build feature X" is output. "Reduce time-to-value for new enterprise customers" is outcome. If the list is all outputs, push back: what outcomes are these supposed to drive?
- **Are you spreading too thin?** A prioritised list of 8 things isn't prioritised. What are the top 2-3 that would move the needle most?

## Step 7: Deliver the Prioritisation

### Outcome
[The specific outcome this prioritisation serves, with metric and target]

### Strategic alignment check
[Does this list serve the stated strategy? Any drift flagged?]

### Ranked List

For each item, from highest to lowest priority:

**Rank #N: [Item name]**
- **Why here**: [1-2 sentences connecting to the outcome]
- **Evidence**: [Strong/Medium/Weak/None - with specifics]
- **Biggest risk**: [Which of the four risks is highest, and why]
- **Trade-off**: [What you're giving up by doing this]
- **Cost of delay**: [What happens if you wait a quarter]

### Below the Line

Items that didn't make the cut. For each:
- Why it's below the line
- What would change to bring it above (new evidence, strategy shift, dependency cleared)
- Where it's parked for future consideration

### Confidence Assessment

- **High confidence picks**: [Items where evidence is strong and alignment is clear]
- **Bets**: [Items where you're acting on conviction, not evidence - name that explicitly]
- **Validate first**: [Items with high risk that should be tested before committing resources]

### Dissenting View

What would someone who disagrees with this ranking say? What are they right about?

## NEVER
- Rank by effort alone (RICE without the R is just ICE - effort estimation dressed as strategy)
- Treat all items as equal candidates - some should be killed, not ranked
- Accept "the CEO wants it" as sufficient justification without connecting to outcome
- Produce a ranking without naming what gets cut or delayed
- Pretend there's a scientific formula - the frameworks structure judgment, they don't replace it

## What's Next

- Run `/pm:decide` if any single item needs deeper trade-off analysis before committing.
- Run `/pm:brief` or `/pm:spec` on the top-priority items.
- Run `/pm:discover plan` if high-priority items have weak evidence - validate before building.
