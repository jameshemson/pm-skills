# Mode: metrics

Define metrics that tell you whether something actually worked - not metrics that make a dashboard look good. "Increase engagement" is not a metric. It is a wish.

**The primary/secondary/guardrail/counter-metric framework**: [knowledge-metrics.md](knowledge-metrics.md)
**Slop test and anti-patterns**: [foundations.md](foundations.md)

This mode pushes back on vanity metrics, vague targets, and metrics that do not connect to real user value.

## Step 1: Understand What You Are Measuring

Before defining metrics, interrogate the initiative:

- **What outcome are you trying to create?** Not "ship feature X" - what changes for the user or the business?
- **How would you know it worked without any metrics?** What would users be doing differently? What complaints would stop? This often reveals the real metric.
- **What is the job-to-be-done?** When a user hires your feature, what progress are they trying to make? The metric should measure whether they made that progress.
- **What does failure look like?** Knowing what you are trying to avoid is as important as knowing what you are aiming for.

Push back on:
- "We want to increase engagement" - engagement with what, by whom, and why does it matter?
- "We want to improve the experience" - for whom, doing what, measured how?
- Feature-level metrics ("adoption of the new button") instead of outcome-level metrics ("users completing the task they came to do")

## Step 2: Define the Metric Stack

Write plainly from the first draft: apply the **Prevention** rules in [foundations.md](foundations.md) as you write, not only the Voice pass afterward.

Use the framework in [knowledge-metrics.md](knowledge-metrics.md): primary, secondary, guardrail, and counter-metrics. Apply it as follows.

**Primary metric**: The one number that tells you whether this solved the problem. One only.
Reject any metric that: the team cannot influence, lags too far to be actionable, or can be improved in ways that do not help users.

**Secondary metrics (2-3 maximum)**: Supporting indicators that explain how the primary metric is moving. For each: what does this add that the primary does not?

**Guardrail metrics (1-3)**: Things that must NOT get worse. For each: what is the threshold and what happens if it is breached?

**Counter-metrics**: What would tell you the primary metric is being gamed or is misleading? If completion rate goes up but satisfaction goes down, are you just making it easier to do the wrong thing?

## Step 3: Set Targets

For each metric in the stack:

- **Baseline**: What is the current state? No target without a baseline.
- **Target**: The specific number you are aiming for. Express as a range if uncertain ("15-20% improvement").
- **Confidence**: How confident are you? Use calibrated uncertainty (60%? 80%?).
- **Timeframe**: When will you evaluate?
- **What would exceed expectations?** So you recognise outperformance.
- **What would be a clear failure?** So you do not rationalise a miss.

Reject: targets without baselines, artificially precise targets, "directional improvement" without a number, timeframes too short to see signal.

## Step 4: Define the Measurement Plan

For each metric:
- **Data source**: Where does this data come from?
- **Instrumentation needed**: What tracking needs to be added? Is it in place?
- **Collection method**: Event tracking, survey, manual count, API call?
- **Analysis approach**: Before/after, cohort analysis, A/B test?
- **Evaluation cadence**: Daily check, weekly review, post-launch analysis?
- **Who reviews**: Who looks at this data and makes decisions from it?

**Confounding factors**: What else could move these metrics besides your work? Seasonality, other launches, external events, marketing campaigns. How will you account for these?

## Step 5: Run the Metric Quality Test

- [ ] **Outcome, not output**: Does this measure what changed for users, not what you shipped?
- [ ] **Connected to value**: If this metric improves, does a real person's life get better?
- [ ] **Not a vanity metric**: Would you show this to a skeptical board member as proof of impact?
- [ ] **Actionable**: If this metric drops, do you know what to investigate?
- [ ] **Honest**: Are you choosing this because it is meaningful, or because it is likely to look good?
- [ ] **Simple enough**: Can you explain it to a non-technical stakeholder in one sentence?

## Step 6: Voice Pass

Scan every prose section (the initiative framing, counter-metric rationale, confounding-factor notes) against the Slop Taxonomy and the Claudism Catalogue in [foundations.md](foundations.md), the same gate the `review` mode runs on drafts. Rewrite any AI-register tell: performative pushback, the false universal ("the question every X turns on"), the clean-mental-model setup ("the cleanest way to think about this is..."), structural metaphor, the validation stamp. A metrics doc that reads as generated invites the skeptical board member to discount it. If a fix introduces a new tell, fix the fix.

## Output Format

### Initiative
[What you are measuring and why]

### Metric Stack

| Type | Metric | Baseline | Target | Timeframe |
|---|---|---|---|---|
| Primary | ... | ... | ... | ... |
| Secondary | ... | ... | ... | ... |
| Guardrail | ... | Threshold: ... | ... | ... |

### Counter-Metrics
[What would tell you the primary metric is misleading]

### Measurement Plan
[For each metric: data source, instrumentation status, analysis approach]

### Confounding Factors
[What else could move these metrics, and how you will account for it]

### Evaluation Checkpoints
- [Date]: First look - is data flowing correctly?
- [Date]: Early signal check - any surprises?
- [Date]: Full evaluation - did it work?

### What Would Change the Targets
[Conditions that would make you revise targets up, down, or change the metrics entirely]

## NEVER

- Accept "increase engagement" without specificity
- Accept metrics without baselines
- Accept more than one primary metric - force the choice
- Accept metrics the team cannot influence
- Accept output metrics (features shipped, velocity) as success metrics
- Skip guardrail metrics
- Accept "directional improvement" as a target

---

If the user wants to embed these metrics into a full specification, point them to `spec` mode. If they want to evaluate whether metrics connected to strategic outcomes, point them to `review` mode.
