# Mode: metrics

Define metrics that tell you whether something actually worked - not metrics that make a dashboard look good. "Increase engagement" is not a metric. It is a wish.

**The primary/secondary/guardrail/counter-metric framework**: [knowledge-metrics.md](knowledge-metrics.md)
**Slop test and anti-patterns**: [foundations.md](foundations.md)

This mode pushes back on vanity metrics, vague targets, and metrics that do not connect to real user value.

If `.pmcontext.md` has a Ways of Working section, apply any metric format or tooling preferences stated there.

## Step 1: Understand What You Are Measuring

Interrogate the initiative first - the four questions and the pushback list live in [knowledge-metrics.md](knowledge-metrics.md) (Before Defining Metrics). Do not skip the pushback.

## Step 2: Define the Metric Stack

<!-- Definitions live in knowledge-metrics.md; do not copy them back here. -->

Write plainly from the first draft: apply the **Prevention** rules in [foundations.md](foundations.md) as you write, not only the Voice pass afterward.

Apply the metric stack from [knowledge-metrics.md](knowledge-metrics.md): exactly one primary, 2-3 secondaries each justified by what they add, 1-3 guardrails with thresholds and a named response, and counter-metrics that would catch gaming.

## Step 3: Set Targets

Set targets per the Setting Targets fields in [knowledge-metrics.md](knowledge-metrics.md): baseline, target (range if uncertain), calibrated confidence, timeframe, exceed/failure definitions. Reject targets without baselines.

## Step 4: Define the Measurement Plan

For each metric, fill the fields from the Measurement Plan section in [knowledge-metrics.md](knowledge-metrics.md): data source, instrumentation status, collection method, analysis approach, evaluation cadence, reviewer.

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

Use the Output Format in [knowledge-metrics.md](knowledge-metrics.md).

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
