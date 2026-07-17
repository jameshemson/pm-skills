# Mode: teach

Gather product context for this project and persist it for all future `pm` sessions.

## Step 1: Explore the Codebase

Before asking anything, scan the project to discover what you can:

- **README and docs**: Project purpose, target audience, any stated goals or vision
- **Package.json / config files**: Tech stack, dependencies, architecture patterns
- **Database schemas / API definitions**: Domain model, core entities, relationships
- **Existing tests**: What's tested reveals what matters and what's risky
- **CI/CD configuration**: Deployment process, environments, release cadence
- **{{INSTRUCTIONS_FILE}} or similar**: Existing team conventions, definitions of done, workflow norms
- **Git history (recent)**: Active areas of development, team focus, pace of change

Note what you learned and what remains unclear. Code tells you what was built, not why, for whom, or what trade-offs were made.

## Step 2: Ask Product-Focused Questions

**How to run the interview**

<!-- provider:claude -->
Use AskUserQuestion in rounds of at most four questions per call. Run round by round - do not queue all questions at once. Put questions with genuinely enumerable options in AskUserQuestion rounds. Ask free-form questions as open prompts in conversation between rounds.
<!-- /provider -->
<!-- provider:codex -->
Use the structured user-input tool when available, in rounds of at most three questions per call. Run round by round - do not queue all questions at once. Put questions with genuinely enumerable options in structured rounds. Ask free-form questions as open prompts in conversation between rounds. If structured input is unavailable, fall back to asking directly in conversation.
<!-- /provider -->

Before each round: pre-fill any question the codebase scan already answered, and pre-fill any question the user already answered earlier in this conversation. Present pre-fills as "I read X from the codebase - does that match?" inside the round, not as silent assumptions. If the user's answer contradicts a pre-fill, the user's answer wins.

If a round's questions were all answered by the scan or earlier in the conversation, skip that round entirely.

After Round 2, STOP. Offer exactly two options through the active provider's question method:
- "Write the context file from what we have"
- "Keep going (two more short rounds)"

If the user exits early, sections not yet covered are written as gaps. Continue to Round 3 and Round 4 only if the user chooses to keep going.

---

**Round 1 - identity** (B2B/B2C, business model, growth model, lifecycle stage)

Open prompt first (in conversation): "What does this product do in one sentence?"

Then ask up to the active provider limit from the following items that the scan did not answer:
- B2B, B2C, B2B2C, platform, or internal tool? (If B2B, also ask: who is the buyer vs the end user?)
- Business model: SaaS, marketplace, transactional, freemium, or enterprise?
- Growth model: product-led, sales-led, marketing-led, or partnerships?
- Lifecycle stage: pre-product-market-fit, growth, scale, mature, or sunset?

---

**Round 2 - users and strategy** (who, job-to-be-done, strategic focus, biggest risk)

Open prompt (in conversation): "What job are they hiring this product to do - the underlying struggle, not the feature?"

Then ask up to the active provider limit from the following items that are not yet answered:
- Who are the primary users? What is their context when using the product?
- What were they doing before? What is the real competitive alternative?
- Current strategic focus: what are you explicitly NOT doing right now?
- Which of the four risks keeps you up at night? Value, usability, feasibility, or viability?

After this round: offer the early exit (see above).

---

**Round 3 - team and constraints** (offered only if user chose to keep going)

Open prompt (in conversation): "What is the hardest product problem you are facing right now?"

Then ask up to the active provider limit from the following items that are not yet answered:
- Empowered product teams or feature teams?
- How do product decisions get made? Who are the key stakeholders?
- What does "done" mean on this team?
- What is easy to change technically, and what is hard?

---

**Round 4 - ways of working** (offered, skippable)

Ask up to the active provider limit from the following items:
- Preferred framework for product decisions? (RICE, ICE, custom scorecard, or something else)
- Any checklists or considerations you always run through before greenlighting work?
- Preferred formats for specs, briefs, or decision docs?
- Anything you have tried and do not like?

If the user has no strong preferences, skip this round. Default frameworks in each mode apply.

## Step 3: Write Product Context

Synthesise findings and answers into a structured context file. For any section not reached because the user exited early or a round was skipped, write `[Not captured - ask me and update this section]` as the section body rather than omitting the section or inventing content. Exception: Ways of Working is omitted entirely if not covered, as it is optional.

```markdown
## Product Context

last_updated: YYYY-MM-DD

### Product
[What it does, B2B/B2C/other, business model, growth model. If B2B: buyer vs user distinction]

### Lifecycle and Strategy
[Stage (pre-PMF/growth/scale/mature), product vision, current strategic focus, what you are NOT doing]

### Users
[Who they are, their context, the job they are hiring this product to do, what they did before]

### Competitive Landscape
[Real alternatives - not just direct competitors. Spreadsheets, manual processes, doing nothing]

### Team and Process
[Empowered or feature teams, discovery vs delivery balance, decision-making, definition of done]

### Technical Constraints
[What is easy, what is hard, known limitations]

### Current Challenges
[Biggest risk (value/usability/feasibility/viability), hardest problems, open questions]

### Ways of Working
[Preferred decision frameworks, checklists, doc formats, approaches to avoid. Only include if the user has preferences - omit entirely if they use defaults.]
```

Write this to `.pmcontext.md` in the project root. If the file already exists, update the Product Context section in place; always refresh `last_updated` to today's date when updating the section, and add the line if an older file lacks it. Do not overwrite or remove other sections (for example, a `## Settings` section managed by other modes such as `decide`).

Then STOP and use the active provider's question method to ask whether to also append the Product Context to {{INSTRUCTIONS_FILE}}. If yes, append or update the section there.

<!-- provider:codex -->
Before writing {{INSTRUCTIONS_FILE}}, inspect the path and resolve it without following an unknown link blindly. If it is a symlink, report its resolved target and preserve the link. Write through the link only when the resolved target is inside the project. If the target is broken or resolves outside the project, stop and request an explicit safe choice instead of writing.
<!-- /provider -->

Confirm completion and summarize the key context that will now guide all future `pm` mode work.

---

Once context is in place, `{{PM_INVOCATION}} setup` generates a team {{INSTRUCTIONS_FILE}} that builds on it.
