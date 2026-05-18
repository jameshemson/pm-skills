# Prioritisation

How to focus on what matters, escape the build trap, and make product decisions that connect to real outcomes.

---

## The Build Trap (Melissa Perri)

Companies fall into the build trap when they measure success by output (features shipped) instead of outcomes (problems solved). Product management is about value, not velocity.

### Recognising the Trap

You're in the build trap when:
- Success is measured by features shipped, not problems solved
- The roadmap is a list of features, not a set of hypotheses
- "When will it ship?" is asked more often than "what did we learn?"
- Customer requests go directly onto the backlog without investigation
- The PM role is project management with a different title
- Strategy is a list of goals, not a set of choices

### The Product Manager Archetypes

**The Waiter**: Takes orders from stakeholders and passes them to engineering. "The VP wants a dashboard, so let's build a dashboard." No investigation of whether the dashboard solves a real problem.

**The Former Project Manager**: Manages timelines, tracks dependencies, runs ceremonies. Good at delivery, but never asks whether the thing being delivered matters.

**The Real PM**: Discovers and delivers value. Investigates problems before proposing solutions. Validates hypotheses before committing resources. Owns outcomes, not output.

### Output vs Outcome

| Output Thinking | Outcome Thinking |
|---|---|
| "Ship the search feature by Q2" | "Reduce time-to-assign to under 15s by Q2" |
| "Build 12 integrations this year" | "Increase activated users by 30% this year" |
| "Redesign the dashboard" | "Reduce support tickets about finding data by 50%" |
| "Launch mobile app" | "Enable field teams to complete inspections without a laptop" |

The shift: stop defining success by what you ship, start defining it by what changes for the user.

### The Product Kata

A repeating cycle for product thinking:

1. **Understand the direction**: What's the strategic intent? Where are we trying to go?
2. **Analyse the current state**: Where are we now? What does the data say? What are users actually doing?
3. **Set the next target condition**: What's the next measurable improvement we're aiming for?
4. **Choose the problem to solve now**: Of all the problems that could move us toward the target condition, which one should we tackle first?
5. **Experiment**: Run the smallest possible experiment to test whether your solution moves the metric
6. **Evaluate**: Did it work? What did we learn? Update your understanding and repeat.

This is not a one-time planning exercise. It's a continuous cycle. Each loop tightens your understanding and improves your bets.

---

## The Four Risks (Marty Cagan)

Every product idea carries four risks. The best teams address all four before committing to build.

### 1. Value Risk

**Will customers want this?**
- Is there evidence of demand beyond "customers said they want it"?
- Are people currently struggling with this problem (workarounds, complaints, non-consumption)?
- Would they switch from their current solution? What's the switching cost?

Test with: customer interviews (using Mom Test principles from knowledge-discovery.md), fake door tests, landing page experiments, concept testing

### 2. Usability Risk

**Can customers figure it out?**
- Can they accomplish the task without instructions?
- Do they understand what the feature does and how to access it?
- Does it fit their mental model?

Test with: prototype testing, usability studies, wizard-of-oz tests, A/B testing of different flows

### 3. Feasibility Risk

**Can we build this?**
- Do we have the technical capability?
- Can we build it in the time we have?
- Are there architecture constraints or dependencies that make this harder than it looks?
- What's the tech debt cost?

Test with: engineering spike, proof of concept, architecture review, similar project estimation

### 4. Viability Risk

**Should we build this?**
- Does it work for the business model?
- Can we support it operationally?
- Does it comply with legal and regulatory requirements?
- Does it align with the strategy?

Test with: business case analysis, legal review, operational readiness assessment, strategic alignment check

### Sequencing Risk Reduction

Address the highest risk first. If there's no value risk (you know customers want it), focus on feasibility and usability. If feasibility is the big unknown, run an engineering spike before investing in design. Don't do a pixel-perfect design for a feature that might be technically impossible.

---

## Discovery vs Delivery

Product work is two things: figuring out what to build (discovery) and building it well (delivery). Both must happen continuously and in parallel.

### Discovery

- Purpose: Reduce risk and uncertainty before committing engineering resources
- Cadence: Continuous, not a phase. Discovery never stops.
- Activities: Customer interviews, prototype testing, data analysis, competitive research, experimentation
- Output: Evidence-backed hypotheses about what to build and why
- Owned by: Product, design, and engineering together (not product alone)

### Delivery

- Purpose: Build, ship, and iterate on validated solutions
- Cadence: Sprints, continuous deployment, whatever works for the team
- Activities: Design, development, testing, deployment, monitoring
- Output: Working software that solves real problems
- Owned by: The cross-functional product team

### The Failure Mode

When discovery and delivery separate:
- Discovery team throws specs "over the wall" to a delivery team
- Engineers build what they're told without understanding why
- Feedback from delivery never makes it back to discovery
- The result: features nobody wanted, built exactly to spec

The fix: one team does both. Engineers participate in discovery. PMs stay close to delivery. The whole team owns the outcome.

---

## Prioritisation Frameworks

### ICE Scoring
- **Impact**: How much will this move the target metric? (1-10)
- **Confidence**: How sure are we about the impact estimate? (1-10)
- **Ease**: How easy is this to implement? (1-10)
- Score = Impact x Confidence x Ease

Useful for: comparing a backlog of roughly similar-sized items. Falls apart when items are wildly different in scope.

### RICE Scoring
- **Reach**: How many users does this affect per time period?
- **Impact**: How much does this affect each user? (0.25-3x)
- **Confidence**: How confident are we? (percentage)
- **Effort**: How many person-months?
- Score = (Reach x Impact x Confidence) / Effort

Useful for: adding reach to the equation. Better than ICE when reach varies significantly between options.

### Opportunity Scoring (Ulwick)
- Importance: How important is this job/outcome to the customer? (1-10)
- Satisfaction: How satisfied are they with current solutions? (1-10)
- Opportunity = Importance + max(Importance - Satisfaction, 0)

Useful for: finding underserved needs. High importance + low satisfaction = opportunity.

### When Frameworks Fail

Frameworks are tools for structured thinking, not substitutes for judgment. They fail when:
- You game the scores to justify what you already decided
- Everyone inflates their pet project's impact score
- The framework becomes the decision instead of an input to the decision
- You use one framework for everything instead of picking the right tool

The best prioritisation: clear strategic context (where to play, how to win from knowledge-decision-making.md) + evidence about the four risks + honest conversation about trade-offs. Frameworks can structure the conversation, but they can't replace it.

---

## Missionaries, Not Mercenaries (Marty Cagan)

Teams who believe in their mission outperform teams who are just executing tickets. The difference isn't talent - it's ownership.

**Mercenary teams**: Ship what they're told. Meet deadlines. Hit velocity targets. Don't care if the feature matters.

**Missionary teams**: Own the outcome. Push back when the solution doesn't match the problem. Celebrate when the metric moves, not when the feature ships. Feel personally responsible for the customer's experience.

You can't mandate missionary teams. You create them by:
- Sharing the strategic context (why this matters)
- Giving them the problem, not the solution
- Trusting them to find the best approach
- Celebrating outcomes, not output
- Including them in discovery, not just delivery

---

## Critiquing this artifact

Use this checklist when reviewing a roadmap or a prioritisation decision. Both require the same underlying standard: connection to outcomes and honest trade-off reasoning.

---

### Critiquing a roadmap

**What a strong roadmap must contain:**

- [ ] **Outcome-framed items.** Each item on the roadmap names the problem being solved or the metric being moved, not just the feature being built. "Member search for large teams - reduce time-to-assign" not just "member search."
- [ ] **Strategic connection.** The roadmap connects to the current strategic bets. A reader should be able to see why this set of work, in this order, advances the stated where-to-play and how-to-win. If the roadmap could belong to any product team at any company, it is not connected to strategy.
- [ ] **Time horizon is appropriate.** Near-term items (1-3 months) are specific and committed. Medium-term items (3-6 months) are directional. Long-term items (6+ months) are aspirational. A roadmap with the same level of specificity across 12 months is either lying about confidence or lying about time.
- [ ] **Explicit trade-offs.** The roadmap shows what is NOT being done and why. If everything fits comfortably, either the team is under-resourced relative to ambitions or nothing hard was excluded.
- [ ] **Discovery and delivery balance.** The roadmap allocates time to discovery work (experiments, research, validation) not just delivery. A roadmap that is 100% delivery work has a build trap problem.
- [ ] **Dependencies are visible.** Items that depend on other teams' work are flagged, with those dependencies having their own confidence ratings.

**Common failure modes for roadmaps:**

- Every item is a feature name with no outcome attached - this is a feature list, not a roadmap
- The roadmap is sorted by stakeholder seniority rather than outcome impact
- The most important strategic work is perpetually in the "next quarter" column and never gets scheduled
- Confidence level is the same for items 1 month out and items 9 months out
- No exclusions anywhere - the roadmap says yes to everything and is therefore impossible to execute
- Time allocations are missing or implied - it is unclear whether an item is a one-week build or a three-month investment

---

### Critiquing a prioritisation

**What a strong prioritisation must contain:**

- [ ] **Options considered before a decision.** The prioritisation names all the options that were in contention, not just the winner. If only one option was ever discussed, it is not a prioritisation, it is an announcement.
- [ ] **Criteria are explicit and weighted.** The criteria used to evaluate options are stated. If all criteria are equally weighted, that is a choice that must be stated. Implicit criteria that favour a predetermined answer must be surfaced.
- [ ] **Evidence is cited for impact estimates.** High impact scores must be justified. "We think this will move retention by 20%" needs supporting evidence or must be flagged as an assumption.
- [ ] **Opportunity cost is stated.** What is not getting done because of this choice? A prioritisation that does not name the opportunity cost has not fully considered the trade-off.
- [ ] **The four risks are addressed.** Value risk, usability risk, feasibility risk, viability risk. A prioritisation that addresses only feasibility ("can we build it in time?") has missed three risks.
- [ ] **The decision is revisable.** The prioritisation names the conditions under which it would be reconsidered. Sunk cost language ("we've already started") must not appear as a reason to continue.

**Common failure modes for prioritisation:**

- Scores were reverse-engineered to justify a decision already made - the winning item has suspiciously high confidence, impact, and ease regardless of evidence
- The framework score is the decision rather than an input to the decision (a 72 vs a 68 ICE score is statistical noise, not a mandate)
- All items have the same impact score, suggesting the team inflated scores across the board rather than differentiating
- Customer value and business value are conflated - an item that helps the business but does not help users is treated as high-value without acknowledging the tension
- Out-of-scope or deprioritised items are listed without explanation, making the trade-off reasoning invisible
- Strategic context is absent - the prioritisation does not reference where-to-play or how-to-win, so there is no way to evaluate whether the choices advance the strategy
