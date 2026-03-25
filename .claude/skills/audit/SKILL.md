---
name: audit
description: Challenge whether you're doing the right work. Checks evidence, strategic alignment, discovery gaps, and priority drift. The Cagan/Perri bullshit detector.
user-invokable: true
args:
  - name: subject
    description: "What to audit - a feature, initiative, roadmap item, or the current focus. Can be a description or path to a doc."
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Discovery reference](../product-management/reference/discovery.md) for evidence quality and validation
- [Prioritisation reference](../product-management/reference/prioritisation.md) for outcome thinking and the build trap
- [Decision-making reference](../product-management/reference/decision-making.md) for bias checks

---

This skill doesn't check whether your document is well-written. That's what `/pm:review` does. This skill checks whether you should be writing the document at all.

It asks the questions a good VP Product or CPO would ask: Why this? Why now? What's the evidence? Have you talked to anyone? Is this the highest-value thing you could be doing?

## Step 1: Understand What's Being Worked On

If the user provides a feature, initiative, or document, read it. If not, ask what they're currently working on or about to commit to.

Then ask:

- **Where did this come from?** Stakeholder request, user research, data, competitor move, intuition, roadmap inheritance?
- **What's the expected outcome?** Not "ship feature X" but what changes for users or the business?
- **How long has this been in the plan?** Is this fresh thinking or something that's been sitting on a roadmap for months without re-evaluation?

## Step 2: Check the Evidence

Assess the evidence supporting this work:

### Have You Talked to Users?

- How many users or customers have you spoken to about this problem?
- Were those conversations truth-seeking (Mom Test) or pitching?
- What specific behaviours did you observe? Not opinions - actions.
- If the answer is zero conversations: flag this immediately. Building without discovery is gambling.

### What Data Supports This?

- Is there quantitative evidence the problem exists? (Usage data, support tickets, churn reasons, conversion drop-offs)
- How strong is it? One angry customer is anecdote. A trend across a segment is signal.
- Is the data current or stale? A pain point from 6 months ago may have been solved by a workaround.

### Evidence Quality Verdict

| Level | What it means |
|---|---|
| **Strong** | Multiple data sources + user conversations with specific past behaviour |
| **Medium** | Some data or qualitative signal, but gaps remain |
| **Weak** | Opinions, single requests, or "we've always planned to do this" |
| **None** | No evidence. Pure assumption or stakeholder mandate |

Be blunt about where evidence is weak. "We think users want this" is not evidence.

## Step 3: Check Strategic Alignment

Using the product context (.pmcontext.md), assess:

- **Does this serve the stated outcome?** What's the connection between this work and the metric that matters?
- **Does this fit the current strategic focus?** Or is it drift?
- **Is this the highest-value use of this team's time?** What else could they be doing? What's the opportunity cost?
- **Has the strategy changed since this was planned?** Roadmap items that made sense last quarter may not make sense now.

### Drift Detection

Common drift patterns to flag:
- **Stakeholder-driven drift**: "The CEO mentioned it once" becoming a priority without evidence
- **Competitor-driven drift**: Building because a competitor shipped it, not because users need it
- **Sunk cost drift**: Continuing because you've already invested, not because it's still the right call
- **Shiny object drift**: Chasing a new idea before finishing what's in flight
- **Roadmap inertia**: "It's on the roadmap" as justification for not re-evaluating

## Step 4: Check the Four Risks

For the work being audited, assess each risk:

**Value risk** - Will anyone actually want this?
- What's the evidence of demand? (Strong/Medium/Weak/None)
- Have you validated the problem, or just the solution?
- What's the switching behaviour? (Moesta forces: is the push strong enough?)

**Usability risk** - Can people figure it out?
- Has any version of this been tested with users?
- How complex is the interaction? Simple change or new mental model?

**Feasibility risk** - Can you actually build it?
- Are there technical unknowns? Have you spiked them?
- Dependencies on other teams or systems?

**Viability risk** - Should you build it?
- Legal, compliance, operational implications?
- Does this create maintenance burden disproportionate to the value?
- Does it align with the business model?

## Step 5: Check for Product Theater

Is this real work or theater?

- **Is the spec polished but the thinking shallow?** A beautifully formatted PRD with no user evidence is theater.
- **Are you building to learn or building to ship?** If there's high uncertainty, should this be an experiment instead of a feature?
- **Is this solving a problem or fulfilling a process?** "We need a PRD" is process. "Engineering needs clarity on X before they can build" is a real need.
- **Could you validate the riskiest assumption in a week without building anything?** If yes, why aren't you doing that first?

## Step 6: Deliver the Audit

### Verdict

One of:
- **Green: Build it.** Evidence is strong, alignment is clear, risks are understood.
- **Yellow: Validate first.** There are gaps in evidence or alignment that should be addressed before committing resources.
- **Red: Stop and reconsider.** Weak evidence, poor alignment, or signs of drift. This needs re-evaluation before proceeding.

### Evidence Assessment
- Source: [Where this came from]
- User evidence: [Strong/Medium/Weak/None - with specifics]
- Data evidence: [Strong/Medium/Weak/None - with specifics]
- Overall: [Honest assessment]

### Strategic Alignment
- Connection to stated outcome: [Clear / Tenuous / Missing]
- Drift detected: [Yes/No - which pattern]
- Opportunity cost: [What else could this team do instead]

### Risk Summary
| Risk | Level | Key concern |
|---|---|---|
| Value | High/Med/Low | [One line] |
| Usability | High/Med/Low | [One line] |
| Feasibility | High/Med/Low | [One line] |
| Viability | High/Med/Low | [One line] |

### Theater Check
- [Any signs of theater flagged, or "No theater detected"]

### Recommendation
- [Specific: what to do next. Not vague - "talk to 5 enterprise customers about X" not "do more research"]
- [If yellow/red: what would change the verdict to green? Be specific about what evidence or validation is needed]

### The Hard Question
[One question the team is avoiding. Name it directly.]

## NEVER
- Accept "it's on the roadmap" as justification
- Accept "the stakeholder wants it" without asking about evidence and alignment
- Accept "users are asking for it" without asking how many, which users, and what they actually said
- Soften a red verdict to avoid conflict - the point is to catch bad bets early
- Audit the document quality - that's /pm:review's job. This audits the thinking.

## What's Next

- If **green**: Run `/pm:brief` or `/pm:spec` to produce the engineering output.
- If **yellow**: Run `/pm:discover plan` to design the validation conversations needed.
- If **red**: Run `/pm:prioritise` to reassess what should be worked on instead.
