# Review Personas

Six perspectives for reviewing PM artifacts. Each persona catches different gaps. Use them independently - complete one persona's full review before moving to the next. No cross-contamination between perspectives.

Five personas are fixed roles (Dev, Tester, Exec, Critic, Sec) that stay consistent across products. The **Customer** persona adapts to the actual users described in `.pmcontext.md` - it should think and react like your real users, not a generic "end user advocate".

---

## Persona Selection Table

Pick the personas the table lists for the document type (2-4).

| Document Type | Personas | Why |
|---|---|---|
| Engineering brief | Dev, Tester | Buildability and testability |
| Full spec | Dev, Tester, Exec | Full coverage |
| Strategy or positioning doc | Exec, Critic | Strategic rigor |
| PRFAQ (press release and FAQ) | Exec, Customer, Critic | Is the case made, and would a customer believe and want what is promised |
| Tenets / principles | Exec, Critic | Do they settle real trade-offs, and are they specific enough to say no to something |
| User-facing feature | Customer, Dev, Tester | User value + buildability |
| Metrics framework | Critic, Exec | Evidence and gaming-resistance |
| Decision doc | Critic, Exec, Dev | Rigour, alignment, feasibility |
| Stakeholder message / comms | Exec, Critic | Does the ask work for this recipient; is the claimed evidence real (add Customer for customer-facing comms) |
| Roadmap / prioritisation | Exec, Critic, Dev | Strategic connection and opportunity cost; evidence behind impact scores; feasibility of the sequencing |
| Retro / post-launch review | Critic, Exec | Decision-vs-outcome separation and honest fielding; accountability for the called result |


Add **Sec** to any document type when the product stores personal data, has accounts or sign-in, lets people share with each other, takes payments, or sends user data to a third-party service.
---

## 1. Senior Engineer - "Dev"

**Profile**: Experienced backend/fullstack engineer. Reads specs to estimate work and plan implementation. Has been burned by vague specs that caused rework. Needs to know exactly what to build, what happens when things break, and what's not included.

**Behaviours**:
- Looks for ambiguity in requirements that would force a guess during implementation
- Searches for missing error states and failure modes
- Checks if acceptance criteria are specific enough to code against
- Flags unstated technical assumptions
- Asks "what happens when X?" for every feature path
- Checks whether dependencies have owners and timelines

**Test questions**:
- Can I estimate this in story points without asking clarifying questions?
- Can I write a PR description from this spec?
- Do I know exactly what "done" looks like?
- Are the API contracts and data models clear?
- What happens on network failure, timeout, invalid input?
- Is the data migration path specified for existing users?
- What happens when an operation is interrupted halfway (a crash, a retry, a second attempt), and where does each piece of state live?
- Will it work on the platform as described: OS and app-store rules, API and version behaviour, concurrency, retries, background and offline behaviour?

**Red flags**:
- Acceptance criteria containing "appropriately", "smoothly", "as expected"
- Missing error states for any user-facing action
- No performance requirements (latency, throughput, data volume)
- Dependencies listed without owners or timelines
- Data migration not addressed when changing existing behaviour
- "The system should handle" without specifying how

---

## 2. QA Lead - "Tester"

**Profile**: Methodical quality engineer. Reads specs to plan test coverage and write test cases. Needs unambiguous, testable criteria with clear pass/fail boundaries. Finds the edge cases everyone else misses.

**Behaviours**:
- Tries to write test cases from acceptance criteria (Given/When/Then)
- Identifies missing boundary conditions and state transitions
- Checks for contradictions between different sections of the document
- Maps all possible states (success, error, empty, loading, partial, concurrent)
- Looks for implicit assumptions about user behaviour or data

**Test questions**:
- Can I write automated tests from these criteria without asking questions?
- Are all states specified (success, error, empty, loading, partial)?
- What are the boundary values (minimum, maximum, zero, one, many)?
- Is there a data migration test plan?
- What's the permission matrix (who can see/do what)?
- How do I test the rollback scenario?
- Does every requirement have a check, and does every check trace back to a requirement?

**Red flags**:
- "User can successfully X" without defining what success means
- No error state specifications for any action
- Missing boundary conditions (what happens at 0, 1, max, max+1?)
- Contradictory requirements in different sections
- No permission model or access control specification
- Acceptance criteria that are subjective ("looks good", "feels fast")

---

## 3. VP/Exec Stakeholder - "Exec"

**Profile**: Accountable for business outcomes. Has 10 minutes to read this and needs to decide whether to fund it. Reads the summary, metrics, and timeline first. Skips implementation details. Asks "why should I fund this over the other five things competing for the same resources?"

**Behaviours**:
- Reads top-down: summary, metrics, risks, timeline, then details only if needed
- Checks whether the investment is proportional to the expected outcome
- Looks for clear connection to business strategy and OKRs
- Evaluates opportunity cost (what are we NOT doing because of this?)
- Checks for a clear "how will we know it worked" section

**Test questions**:
- Can I explain to the board why we're doing this?
- Is the investment proportional to the expected outcome?
- What's the opportunity cost of choosing this over alternatives?
- When will we know if this worked? What's the decision point?
- How does this connect to our current strategic objectives?
- What's the downside risk if this fails?

**Red flags**:
- No connection to business outcomes or strategic objectives
- Metrics that don't connect to revenue, retention, or growth
- Missing competitive context (why is this urgent now?)
- No timeline, phasing, or milestones
- Scope that feels disproportionate to the problem size
- No rollback plan or decision criteria for pulling the plug

---

## 4. End User Advocate - "Customer"

**This persona adapts to product context.** Before using it, read the **Users** section from `.pmcontext.md` or {{INSTRUCTIONS_FILE}}. The Customer persona should think, speak, and react like the actual users described there - their industry, their workflow, their constraints, their level of technical sophistication. A warehouse operations manager, a solo food producer, and a senior data engineer all review a spec differently. If no product context exists, use the generic version below, but flag that the review would be sharper with real user context.

**Profile**: Represents the actual person who will use this feature. Adopt their context: their job, their daily workflow, what tools they use today, what frustrates them, what they care about. Evaluate whether the job-to-be-done is actually addressed and whether the solution fits how THEY really work - not an idealised user, but the specific person described in the product context. Sceptical of features that solve the team's problem instead of the user's problem.

**Behaviours**:
- Reads the spec through the lens of the specific user's daily workflow and context
- Checks if the problem statement describes a struggle this specific user would recognise
- Evaluates whether the solution fits their actual workflow, tools, and habits (not an idealised version)
- Looks for unnecessary complexity that serves the system, not the user
- Checks whether existing habits, data, and workarounds are respected
- Asks "would this specific person actually switch from what they're doing today for this?"
- Uses the language and concerns of the actual user (e.g., a developer cares about API ergonomics; a warehouse worker cares about speed under time pressure; a food producer cares about simplicity)

**Test questions** (adapt these to the specific user's context):
- Does this solve a problem I actually have, in the way I actually experience it?
- Would I understand what this feature does from its description?
- Does this fit into my existing workflow or force me to change how I work?
- What happens to my existing data, settings, or habits?
- Is this solving my problem or the product team's problem?
- Would I pay for this? Would I switch from my current solution for this?
- As a new user with no help from the team, would I understand it and get through setup?

**Red flags**:
- Problem statement that restates the solution rather than describing a real struggle
- Solution that requires significant behaviour change without acknowledging it
- Missing migration path for existing users (data, settings, workflows)
- Features bundled together that solve different problems for different people
- No mention of what users are doing today and why they'd switch
- Jargon or internal terminology that the actual user wouldn't use or understand
- Spec describes a generic "user" instead of the specific people from the product context

---

## 5. Sceptical PM - "Critic"

**Profile**: Experienced PM who has seen too many features ship without evidence and too many specs that are theater instead of thinking. Checks whether discovery was actually done, whether metrics are gaming-proof, and whether the document contains real thinking or just polished structure.

**Behaviours**:
- Asks "what evidence supports this?" for every key claim
- Treats a reproduced defect as evidenced; the author's own reproduction counts. Never asks a bug fix to wait for customer reports
- Checks for Mom Test violations in cited customer research (see knowledge-discovery.md)
- Evaluates whether metrics could be gamed without helping users
- Looks for assumptions stated as facts
- Checks if the pre-mortem section is honest or performative
- Tests whether the "out of scope" section represents real choices or is empty

**Test questions**:
- How many users were actually talked to? What did they say specifically?
- Is the evidence anecdotal or systematic?
- Could the team hit these metrics without actually helping users?
- Are the stated risks real concerns or boilerplate padding?
- What's the cheapest experiment you could run instead of building the full thing?
- Has anyone actually validated that users want this, or is it an internal assumption?
- Is evidence from people close to the author (friends, colleagues, testers recruited personally) treated as weak?
- What were the alternatives, including doing nothing or doing something smaller?

**Red flags**:
- "Users want X" without citing specific conversations or data
- Risk sections with identical severity ratings on everything (means nobody actually assessed)
- All metrics are secondary with no clear primary
- Out-of-scope section that is empty, says "TBD", or only lists things nobody would build anyway
- Pre-mortem with low-probability ratings on every risk (performative, not honest)
- No mention of what was tried before or what alternatives were considered
- Customer quotes that sound like compliments rather than descriptions of struggle

---

## 6. Security and Privacy Engineer - "Sec"

**Profile**: Engineer responsible for user data and access. Reads specs to find what data the product touches, who can reach it, and what happens when someone should no longer have access. Has seen privacy promises made in product copy with nothing in the design behind them.

**Behaviours**:
- Traces every piece of personal data from collection to storage to deletion
- Looks for data that leaks into logs, analytics, error reports, notifications or backups
- Checks the rules on invites, links and sharing
- Asks how access is removed as well as how it is granted
- Checks that every third party receiving user data is named

**Test questions**:
- What personal data does it collect, where is it stored, who can see it, and how long is it kept?
- Does data end up anywhere the document does not mention: logs, analytics, error reports, notifications, backups?
- Who can join, invite or share, and what stops an invite or link reaching the wrong person (expiry, single use, tied to an identity)?
- How is access removed when someone leaves, and what happens to what they could already see?
- Which third parties receive user data, and is each one named, with its agreement and where the data is held?
- What could a careless or malicious user reach through this that they should not?
- Can a user export or delete their data, and does the document's privacy promise match what the design does?

**Red flags**:
- A privacy promise with no mechanism behind it
- Sharing or invites with no rules
- No way to remove someone's access
- A data-protection or compliance step stated as done with nothing to show it is

---

## Critiquing this artifact

This section explains how to apply the personas when running a critique on a document. Each persona is a lens that catches a different kind of failure. Apply them one after another, never at once.

### How to select and sequence personas

Use the Persona Selection Table at the top of this file to pick the personas it lists for the document type (2-4). Do not use all six on every document - that produces noise, not signal.

**Run one persona completely before starting the next.** Each persona must read the document fresh from their perspective. If you let the Dev persona inform the Critic persona mid-review, you cross-contaminate the perspectives and the Critic will miss what the Critic alone would catch.

For each persona, work through the full set of test questions and red flags before recording any findings. Do not pre-filter - if the question is in the persona's list, answer it, even if the answer is "this is fine."

### Applying personas to different document types

**Specs and briefs**: Start with Dev (can I build this?) then Tester (can I verify it?) then Critic (was discovery done?). Add Customer if the feature is user-facing. Add Exec if budget or strategic sign-off is needed. This order matters: Dev and Tester catch structural gaps that make Critic and Exec questions premature.

**Strategy and positioning docs**: Start with Exec (does this connect to business outcomes?) then Critic (is the evidence there?). Dev and Tester are not useful here - they are not trained to evaluate strategic coherence.

**Metrics frameworks**: Start with Critic (can these be gamed?) then Exec (do these connect to what we care about?). A metric that passes the Critic's gaming test but fails the Exec's relevance test is still a bad metric.

**Decision docs**: Use all three of Critic, Exec, and Dev. Critic checks the reasoning quality. Exec checks strategic alignment and opportunity cost. Dev checks whether the feasibility assumptions are grounded.

**Retros and post-launch reviews**: Use Critic primarily. The Critic is the only persona trained to separate decision quality from outcome quality and to check whether outcome fielding is honest.

### How to report findings from persona-based review

For each finding, record:
- Which persona raised it
- The specific test question or red flag it triggered
- The exact location in the document (section and quote)
- The severity: blocker (requires revision before use), concern (requires discussion), observation (worth noting)

Record which persona raised each finding; the findings are then ranked together with the rest of the review.

### When persona findings conflict

Different personas will sometimes reach opposite conclusions. The Dev wants more detail; the Exec wants less. The Customer wants plain language; the Tester needs precise technical criteria.

These conflicts are real. Do not resolve them silently. Name the tension: "Dev needs precise error state specifications, but the current spec is written for an exec audience and lacks them." The document owner must decide whether to write two versions or resolve the conflict in one.

### Calibrating the Customer persona before review

The Customer persona is only as useful as the product context it draws on. Before running a Customer review:
1. Read the Users section of `.pmcontext.md` or {{INSTRUCTIONS_FILE}}
2. Identify the specific user type most affected by the document under review
3. Set the persona's context explicitly: job title, daily workflow, current tools, key frustrations, level of technical sophistication
4. If no product context file exists, flag this before starting the review - a Customer review without real user context produces a generic "end user advocate" perspective that misses the actual users

A Customer review on a developer-facing API feature should think like a developer (API ergonomics, documentation quality, error message clarity). A Customer review on a field operations tool should think like a field worker under time pressure. The persona name is fixed; the persona's worldview is not.
