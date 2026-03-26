---
name: metrics
description: Define success metrics that measure what matters. Primary, secondary, guardrail structure with measurement plans. Anti-vanity, pro-outcome.
user-invokable: true
args:
  - name: feature
    description: The feature, initiative, or product area to define metrics for (optional)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Prioritisation reference](../product-management/reference/prioritisation.md) for outcome thinking, the build trap, and the four risks
- [Discovery reference](../product-management/reference/discovery.md) for JTBD and understanding what progress looks like
- [Decision-making reference](../product-management/reference/decision-making.md) for calibrated uncertainty and resulting

---

This skill helps you define metrics that tell you whether something actually worked - not metrics that make a dashboard look good. "Increase engagement" is not a metric. It's a wish.

**This skill pushes back on vanity metrics, vague targets, and metrics that don't connect to real user value.**

## Step 1: Understand What You're Measuring

Before defining metrics, interrogate the initiative:

- **What outcome are you trying to create?** Not "ship feature X" - what changes for the user or the business?
- **How would you know it worked without any metrics?** What would users be doing differently? What complaints would stop? This often reveals the real metric.
- **What's the job-to-be-done?** When a user hires your feature, what progress are they trying to make? The metric should measure whether they made that progress.
- **What does failure look like?** Knowing what you're trying to avoid is as important as knowing what you're aiming for.

Push back on:
- "We want to increase engagement" - engagement with what, by whom, and why does it matter?
- "We want to improve the experience" - for whom, doing what, measured how?
- Feature-level metrics ("adoption of the new button") instead of outcome-level metrics ("users completing the task they came to do")

## Step 2: Define the Metric Stack

### Primary Metric
The one number that tells you whether this solved the problem. You get exactly one.

Requirements:
- **Connected to user value**: Does this metric going up mean a real person's life got better?
- **Measurable**: Can you actually collect this data? With current instrumentation?
- **Attributable**: Can you reasonably connect changes in this metric to your work? (Not a company-wide metric you can't influence)
- **Timely**: Can you see movement within a reasonable evaluation window?
- **Not gameable**: Could the team improve this metric in ways that don't actually help users?

Push back on:
- Metrics the team can't influence ("company revenue")
- Metrics that are too lagging ("annual retention")
- Proxy metrics when the real metric is measurable ("page views" when "task completion" is trackable)

### Secondary Metrics (2-3 maximum)
Supporting indicators that provide context for the primary metric. These tell you HOW the primary metric is moving.

For each: what does this add that the primary metric doesn't tell you?

### Guardrail Metrics (1-3)
Things that must NOT get worse. These protect against optimising the primary metric at the expense of something important.

For each:
- What's the threshold? (Specific number, not "don't decrease")
- What happens if it's breached? (Who gets alerted, what's the response)

### Counter-Metrics
What would tell you the metric is being gamed or misleading?

- If completion rate goes up but satisfaction goes down, are you just making it easier to do the wrong thing?
- If usage increases but so do support tickets, is the feature confusing?

## Step 3: Set Targets

For each metric in the stack:

- **Baseline**: What's the current state? If you don't know, you're not ready to set targets.
- **Target**: What's the specific number you're aiming for? Express as a range if uncertain ("15-20% improvement").
- **Confidence**: How confident are you in this target? (Use calibrated uncertainty - 60%? 80%?)
- **Timeframe**: When will you evaluate?
- **What would exceed expectations?** (So you recognise outperformance)
- **What would be a clear failure?** (So you don't rationalise a miss)

Push back on:
- Targets without baselines
- Artificially precise targets ("23.7% improvement" when you're guessing)
- "Directional improvement" without a number - that's not a target
- Timeframes too short to see signal or too long to be actionable

## Step 4: Define the Measurement Plan

For each metric:
- **Data source**: Where does this data come from?
- **Instrumentation needed**: What tracking needs to be added? Is it in place?
- **Collection method**: Event tracking, survey, manual count, API call?
- **Analysis approach**: Simple before/after, cohort analysis, A/B test?
- **Evaluation cadence**: Daily check, weekly review, post-launch analysis?
- **Who reviews**: Who looks at this data and makes decisions from it?

### Confounding Factors
What else could move these metrics besides your work?
- Seasonality, other launches, external events, marketing campaigns
- How will you account for these?

## Step 5: Run the Metric Quality Test

Check every metric against:

- [ ] **Outcome, not output**: Does this measure what changed for users, not what you shipped?
- [ ] **Connected to value**: If this metric improves, does a real person's life get better?
- [ ] **Not a vanity metric**: Would you be comfortable showing this to a skeptical board member as proof of impact?
- [ ] **Actionable**: If this metric drops, do you know what to investigate?
- [ ] **Honest**: Are you choosing this metric because it's meaningful, or because it's likely to look good?
- [ ] **Simple enough**: Can you explain what this metric means to a non-technical stakeholder in one sentence?

## Step 6: Deliver the Metrics Framework

### Initiative
[What you're measuring and why]

### Metric Stack

| Type | Metric | Baseline | Target | Timeframe |
|---|---|---|---|---|
| Primary | ... | ... | ... | ... |
| Secondary | ... | ... | ... | ... |
| Secondary | ... | ... | ... | ... |
| Guardrail | ... | ... | Threshold: ... | ... |

### Counter-Metrics
[What would tell you the primary metric is misleading]

### Measurement Plan
[For each metric: data source, instrumentation status, analysis approach]

### Confounding Factors
[What else could move these metrics, and how you'll account for it]

### Evaluation Checkpoints
- [Date]: First look - is data flowing correctly?
- [Date]: Early signal check - any surprises?
- [Date]: Full evaluation - did it work?

### What Would Change the Targets
[Conditions that would make you revise the targets up, down, or change the metrics entirely]

## NEVER

- Accept "increase engagement" as a metric without specificity
- Accept metrics without baselines
- Accept more than one primary metric - force the choice
- Accept metrics the team can't influence
- Accept output metrics (features shipped, velocity) as success metrics
- Skip guardrail metrics - optimising without guardrails is dangerous
- Accept "directional improvement" as a target

## What's Next

- Run `/pm:spec` to embed these metrics into the full specification.
- Run `/pm:retro` after launch to evaluate whether the metrics moved as expected.
- Run `/pm:audit` to check whether the metrics connect to strategic outcomes.
