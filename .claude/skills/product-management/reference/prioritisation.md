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

Test with: customer interviews (using Mom Test principles), fake door tests, landing page experiments, concept testing

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

The best prioritisation: clear strategic context (where to play, how to win) + evidence about the four risks + honest conversation about trade-offs. Frameworks can structure the conversation, but they can't replace it.

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
