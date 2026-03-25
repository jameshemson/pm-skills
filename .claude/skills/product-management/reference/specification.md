# Specification

How to write specs that engineering trusts. A good spec anticipates the questions. A bad spec creates a week of Slack threads.

---

## The Purpose of a Spec

A spec is not documentation. It's a thinking tool. The act of writing a spec forces you to confront the decisions you haven't made, the edge cases you haven't considered, and the trade-offs you're pretending don't exist.

If writing the spec was easy, you haven't thought hard enough.

### What a Spec Is

- A contract between product and engineering about what "done" means
- A record of decisions made and why
- A tool for surfacing unknowns before code is written
- A reference that reduces ambiguity during development

### What a Spec Is Not

- A pitch deck for stakeholders (use a brief)
- A feature request from a customer (dig deeper)
- A creative writing exercise (substance over polish)
- A document that's "done" when written (it evolves with discovery)

---

## Spec Structure

### 1. Problem Statement

What specific problem are we solving, for whom, in what context? This must be concrete enough that someone could observe the problem in the wild.

**Good**: "Customers with more than 50 team members can't find the right person to assign a task to because the dropdown loads all members in a flat list with no search or filtering."

**Slop**: "Users need a better team management experience."

### 2. Context and Background

Why now? What changed? What have we tried before? What data supports this being worth solving? This is where you connect the problem to business context.

Include:
- Evidence the problem exists (support tickets, usage data, research findings)
- Previous attempts and why they didn't work
- Strategic context (how this connects to current objectives)

### 3. Proposed Solution

What are we building? Be specific enough that an engineer can estimate the work.

For each component:
- What it does (user-facing behaviour)
- How it behaves in the happy path
- How it behaves in error states, edge cases, and boundary conditions
- What it does NOT do (explicit scope boundaries)

### 4. User Stories and Acceptance Criteria

Each story follows: As a [specific user type], I want to [specific action], so that [specific outcome connected to their job-to-be-done].

Acceptance criteria must be testable:

**Good**: "When a user types 2 or more characters in the member search field, results filter to show only members whose name or email contains the search string, within 200ms."

**Slop**: "Search should be fast and show relevant results."

### 5. Edge Cases and Error Handling

This is where slop dies. For every feature, answer:

- What happens when the data is empty?
- What happens when the data is unexpectedly large?
- What happens when the network fails mid-operation?
- What happens with concurrent users?
- What happens with invalid input?
- What if a dependency (API, service, database) is unavailable?
- What happens for users with different permission levels?
- What about data migration from the old system?

If your spec doesn't have an edge cases section, it's a happy-path sketch, not a spec.

### 6. Out of Scope

Explicitly list what you're NOT building. This is as important as what you are building. It prevents scope creep during development and sets expectations with stakeholders.

**Good**: "Out of scope: bulk member management, role hierarchy changes, SSO integration. These are tracked separately and may follow in Q3."

**Slop**: Nothing listed, or "we'll address these later" with no specifics.

### 7. Dependencies

What does this depend on?
- Other teams' work
- API availability or changes
- Data migrations
- Third-party services
- Design decisions not yet made
- Infrastructure requirements

For each dependency: who owns it, what's the timeline, and what's the fallback if it's not ready?

### 8. Success Metrics

How will you know this worked? Define:
- **Primary metric**: The one number that tells you if this solved the problem
- **Secondary metrics**: Supporting indicators
- **Guardrail metrics**: Things that should NOT get worse
- **Measurement plan**: How you'll collect the data, when you'll evaluate

**Good**: "Primary: reduce average time-to-assign from 45s to under 15s for teams with 50+ members. Guardrail: assignment completion rate stays above 95%. Measured via existing analytics events, evaluated 2 weeks post-launch."

**Slop**: "Increase user satisfaction."

### 9. Risks and Mitigations

What could go wrong? Use the four risks framework:
- **Value risk**: Will users actually want this?
- **Usability risk**: Can they figure it out?
- **Feasibility risk**: Can we build it in the time we have?
- **Viability risk**: Does it work for the business?

For each identified risk: what's the mitigation plan?

### 10. Rollout Plan

How does this get to users?
- Feature flag or big bang?
- Phased rollout (which users first)?
- Rollback criteria and process
- Communication plan (changelog, in-app notification, email?)

---

## The PM Slop Test - In Practice

Before you ship a spec, run this test. For each item, the answer must be specific and verifiable:

| Check | Pass | Fail |
|---|---|---|
| Who is this for? | "Team admins in orgs with 50+ members" | "Users" |
| What problem? | "Can't find the right assignee - 40% abandon" | "Better experience" |
| How do we know it worked? | "Time-to-assign < 15s, measured via events" | "Positive feedback" |
| What's NOT in scope? | "Bulk management, role hierarchy, SSO" | Nothing listed |
| What if it fails? | "Feature flag, rollback if assign-rate drops" | No plan |
| What don't we know? | "Unclear if search alone is sufficient for 500+ orgs" | "We're confident" |

### The Engineering Read-Through Test

Give your spec to an engineer who wasn't in the planning meetings. Ask them to read it and list every question they'd need answered before starting work. If they come back with more than 3 questions, the spec has gaps. 10+ questions means it's not ready.

Common questions that reveal spec gaps:
- "What happens when...?" (missing edge cases)
- "Which API endpoint...?" (missing technical context)
- "Does the PM mean X or Y?" (ambiguous requirements)
- "What about existing users who...?" (missing migration plan)
- "How does this interact with...?" (missing dependency mapping)
- "What's the priority if we can't do all of this?" (missing prioritisation within the spec)

---

## Writing Tips

- **Lead with the decision, not the process.** "We're building X because Y" not "After careful consideration of multiple approaches..."
- **Use concrete examples.** "A team admin with 150 members searching for 'Sarah'" not "the user performs a search."
- **State assumptions explicitly.** "We're assuming the existing member API can support search. If not, backend work is needed and timeline extends by ~2 weeks."
- **Version the spec.** Decisions change. Track what changed and why. Don't silently edit history.
- **Keep it skimmable.** Engineers will reference this during development. Use headers, bullet points, and tables. Nobody reads a 15-page prose spec twice.
