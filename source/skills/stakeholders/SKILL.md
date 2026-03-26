---
name: stakeholders
description: Build a stakeholder map. Understand who matters, what they care about, what messages land, and how to work with them.
user-invokable: true
args:
  - name: context
    description: The initiative, decision, or situation to map stakeholders for (optional)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Leadership reference](../product-management/reference/leadership.md) for BRAVING trust, stakeholder management, and change management
- [Communication reference](../product-management/reference/communication.md) for audience translation and the SUCCESs framework
- [Decision-making reference](../product-management/reference/decision-making.md) for cognitive biases in stakeholder interactions

---

This skill builds a stakeholder map - not an org chart, but a practical guide to who matters, what they care about, and how to work with them effectively. PMs spend a huge amount of time managing stakeholders. Most do it by intuition. This skill makes it deliberate.

**This skill asks detailed questions about each stakeholder.** The value is in the specificity. "VP of Engineering cares about quality" is useless. "VP of Engineering's team is under pressure to reduce incident rate, and she judges product work by whether it creates operational burden" is actionable.

## Step 1: Identify the Stakeholders

Start broad, then narrow. For the current initiative or product area:

### Who has influence?
- Who can block or approve this work?
- Who controls the resources (budget, people, timeline)?
- Who has political capital that affects this initiative?

### Who is affected?
- Which teams will need to change how they work?
- Who will inherit the operational burden?
- Whose metrics will be affected (positively or negatively)?

### Who has context you need?
- Who understands the customer problem best?
- Who has historical context on why things are the way they are?
- Who has technical context you need?

### Who's missing?
- Is there someone who should be involved but isn't?
- Is there a team downstream that will be surprised by this?

Push back on:
- Only listing supporters - who's skeptical or opposed?
- Only listing senior people - are there influential ICs you're missing?
- Missing the "silent stakeholders" - the team that will maintain this in production, the support team that will field the tickets

## Step 2: Map Each Stakeholder

For each stakeholder, gather:

### Profile
- **Name and role**: Who are they?
- **Team**: What team are they on? What's the team's current focus?
- **Relationship to this work**: How does this initiative affect them?

### What They Care About
- **Their primary metric**: What are they measured on? What keeps them up at night?
- **Their current priorities**: What are they focused on right now?
- **Their constraints**: What pressures are they under? (Headcount, deadlines, technical debt, political dynamics)
- **Their wins**: What would a good outcome look like from their perspective?
- **Their fears**: What are they worried this initiative might cause?

### How to Work With Them
- **Communication preference**: How do they like to receive information? (Detailed doc vs. quick summary, async vs. sync, data vs. narrative)
- **Decision style**: How do they make decisions? (Data-driven, intuition, consensus, authority)
- **What lands with them**: What framing or evidence has worked in the past?
- **What doesn't land**: What triggers resistance or disengagement?
- **Trust level**: How much do they trust the product team right now? (High/Medium/Low - and why)

### Influence and Position
- **Power**: High/Medium/Low - can they block or accelerate this?
- **Interest**: High/Medium/Low - how much do they care?
- **Current stance**: Supportive / Neutral / Skeptical / Opposed
- **Desired stance**: Where do you need them to be?

Push back on:
- Generic descriptions ("she cares about quality") - push for specifics
- Assuming you know their priorities without asking
- Missing the gap between current stance and desired stance - that gap is your work

## Step 3: Identify the Dynamics

### Alliances and Tensions
- Which stakeholders are aligned with each other?
- Which are in tension? Over what?
- Are there rivalries or political dynamics that affect this work?

### Decision-Making Path
- What's the actual decision path for this initiative?
- Who needs to agree for this to move forward?
- Is there a formal process, or is it relationship-dependent?
- Where are the bottlenecks?

### Power Dynamics
- Who has formal authority vs. informal influence?
- Are there influencers who don't have a title but shape opinions?
- Is there anyone who can single-handedly kill this?

## Step 4: Build the Engagement Plan

For each stakeholder who isn't already where you need them:

### What Needs to Change
- Current stance to desired stance
- What's blocking the shift?

### Engagement Approach
Using the communication reference:
- **Lead with what matters to THEM**: Not your roadmap update - their metric, their problem, their constraint
- **Use their language**: Engineering thinks in systems and trade-offs. Execs think in outcomes and risk. Sales thinks in deals and objections.
- **Choose the right format**: Don't send a 10-page doc to someone who wants a 3-bullet Slack message
- **Anticipate their questions**: What will they ask? Have answers ready.

### Trust-Building Actions
Using the BRAVING framework:
- **Boundaries**: Be clear about what's in scope and what isn't
- **Reliability**: Do what you say you'll do - especially the small things
- **Accountability**: Own mistakes openly
- **Vault**: Don't share their concerns with others without permission
- **Integrity**: Push back when needed, even when it's uncomfortable
- **Non-judgment**: Create safety for them to express concerns
- **Generosity**: Assume good intent behind their requests

### Change Management
If you need a stakeholder to change how they work, use the Rider-Elephant-Path framework:
- **Direct the Rider**: Give them a clear, specific action (not "be more customer-centric")
- **Motivate the Elephant**: Help them feel why this matters (share a customer story, not just data)
- **Shape the Path**: Make the new behaviour easy (template, meeting invite, Slack channel)

## Step 5: Deliver the Stakeholder Map

### Stakeholder Overview

| Stakeholder | Role | Power | Interest | Current Stance | Desired Stance |
|---|---|---|---|---|---|
| ... | ... | H/M/L | H/M/L | Supportive/Neutral/Skeptical/Opposed | ... |

### Detailed Profiles
[For each key stakeholder: what they care about, how to work with them, what lands, what doesn't]

### Power-Interest Grid
- **High power, high interest** (Manage closely): [Names]
- **High power, low interest** (Keep satisfied): [Names]
- **Low power, high interest** (Keep informed): [Names]
- **Low power, low interest** (Monitor): [Names]

### Key Dynamics
[Alliances, tensions, decision path, bottlenecks]

### Engagement Plan
[For each stakeholder needing a stance shift: specific actions, timing, and success signals]

### Risk Stakeholders
[Who could derail this? What's the early warning signal? What's your mitigation?]

## NEVER

- Map stakeholders without asking about their constraints and pressures - understanding their world is the point
- Treat this as a political exercise - it's about empathy and effectiveness, not manipulation
- Assume supportive stakeholders will stay supportive without engagement
- Ignore skeptical stakeholders - their concerns often surface real risks
- Produce a map and never update it - stakeholder dynamics shift constantly
- Reduce stakeholders to one-dimensional descriptions ("she's supportive") - push for depth

## What's Next

- Run `/pm:translate` to adapt a specific message for a key stakeholder.
- Run `/pm:discover plan` if you need to better understand a stakeholder's real concerns.
- Run `/pm:decide` if stakeholder alignment is blocking a key decision.
