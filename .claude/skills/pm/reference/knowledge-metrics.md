# Metrics

How to define metrics that tell you whether something actually worked - not metrics that make a dashboard look good. "Increase engagement" is not a metric. It's a wish.

---

## Before Defining Metrics: Interrogate the Initiative

- **What outcome are you trying to create?** Not "ship feature X" - what changes for the user or the business?
- **How would you know it worked without any metrics?** What would users be doing differently? What complaints would stop? This often reveals the real metric.
- **What's the job-to-be-done?** When a user hires your feature, what progress are they trying to make? The metric should measure whether they made that progress. See knowledge-discovery.md for the JTBD framework.
- **What does failure look like?** Knowing what you're trying to avoid is as important as knowing what you're aiming for.

Push back on:
- "We want to increase engagement" - engagement with what, by whom, and why does it matter?
- "We want to improve the experience" - for whom, doing what, measured how?
- Feature-level metrics ("adoption of the new button") instead of outcome-level metrics ("users completing the task they came to do")

---

## The Metric Stack

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

---

## Setting Targets

For each metric in the stack:

- **Baseline**: What's the current state? If you don't know, you're not ready to set targets.
- **Target**: What's the specific number you're aiming for? Express as a range if uncertain ("15-20% improvement").
- **Confidence**: How confident are you in this target? (Use calibrated uncertainty from knowledge-decision-making.md: 60%? 80%?)
- **Timeframe**: When will you evaluate?
- **What would exceed expectations?** (So you recognise outperformance)
- **What would be a clear failure?** (So you don't rationalise a miss)

Push back on:
- Targets without baselines
- Artificially precise targets ("23.7% improvement" when you're guessing)
- "Directional improvement" without a number - that's not a target
- Timeframes too short to see signal or too long to be actionable

---

## Measurement Plan

For each metric:
- **Data source**: Where does this data come from?
- **Instrumentation needed**: What tracking needs to be added? Is it in place?
- **Collection method**: Event tracking, survey, manual count, API call?
- **Analysis approach**: Simple before/after, cohort analysis, A/B test?
- **Evaluation cadence**: Daily check, weekly review, post-launch analysis?
- **Who reviews**: Who looks at this data and makes decisions from it?

**Confounding factors**: What else could move these metrics besides your work? Seasonality, other launches, external events, marketing campaigns. How will you account for these?

---

## Output Format

### Initiative
[What you're measuring and why]

### Metric Stack

| Type | Metric | Baseline | Target | Timeframe |
|---|---|---|---|---|
| Primary | ... | ... | ... | ... |
| Secondary | ... | ... | ... | ... |
| Secondary | ... | ... | ... | ... |
| Guardrail | ... | Threshold: ... | | ... |

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
[Conditions that would make you revise targets up, down, or change the metrics entirely]

---

The delivery-gate checklist lives in [mode-metrics.md](mode-metrics.md) Step 5; this file owns definitions, the review checklist below owns critique.

---

## Critiquing this artifact

Use this section when reviewing a metrics document (for any feature, initiative, or product area).

**A strong metrics document contains all of the following:**
- Exactly one primary metric (if there are two, it's a negotiation, not a metric)
- 2-3 secondary metrics, each justified by what they add that the primary doesn't cover
- At least one guardrail metric with a specific threshold and a named response if breached
- Counter-metrics that would catch gaming or misleading signals
- A baseline for every metric (no baseline = no target = no evaluation)
- A specific numeric target, not "directional improvement"
- A measurement plan stating where data comes from and who reviews it
- Named confounding factors and a plan to account for them

**Common failure modes - check for each:**
- [ ] More than one primary metric. Force the choice.
- [ ] Secondary metrics that are actually the same as the primary stated differently.
- [ ] Guardrail metrics with no threshold ("don't get worse" is not a threshold).
- [ ] No counter-metrics. Every metric can be gamed; the doc should acknowledge how.
- [ ] Missing baseline. "We'll measure improvement" is not a plan.
- [ ] Vanity metrics: MAUs, page views, downloads, app store ratings without context.
- [ ] Metrics the team can't influence. If the team ships nothing, does the metric still move? Then it's not theirs to own.
- [ ] Instrumentation not in place with no plan to add it. The metric is aspirational, not real.
- [ ] Timeframe too short to see signal (one week for a retention metric) or too long to be actionable (12 months for anything).
- [ ] Confounding factors not mentioned. Every launch has them; pretending otherwise is theater.
