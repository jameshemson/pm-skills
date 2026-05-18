# Mode: teach

Gather product context for this project and persist it for all future `pm` sessions.

## Step 1: Explore the Codebase

Before asking anything, scan the project to discover what you can:

- **README and docs**: Project purpose, target audience, any stated goals or vision
- **Package.json / config files**: Tech stack, dependencies, architecture patterns
- **Database schemas / API definitions**: Domain model, core entities, relationships
- **Existing tests**: What's tested reveals what matters and what's risky
- **CI/CD configuration**: Deployment process, environments, release cadence
- **CLAUDE.md or similar**: Existing team conventions, definitions of done, workflow norms
- **Git history (recent)**: Active areas of development, team focus, pace of change

Note what you learned and what remains unclear. Code tells you what was built, not why, for whom, or what trade-offs were made.

## Step 2: Ask Product-Focused Questions

STOP and call the AskUserQuestion tool. Focus only on what you could not infer from the codebase.

**What is this?**
- What does this product do in one sentence?
- B2B, B2C, B2B2C, platform, or internal tool?
- If B2B: who is the buyer vs the end user?
- Business model: SaaS, marketplace, transactional, freemium, enterprise?
- Growth model: product-led, sales-led, marketing-led, partnerships?

**Who are the users?**
- Who are the primary users? What is their context when using it?
- What job are they hiring this product to do? (The underlying struggle, not the feature request)
- What were they doing before? What is the real competitive alternative?

**Where are you?**
- Lifecycle stage: pre-product-market-fit, growth, scale, mature, or sunset?
- If pre-PMF: what is your biggest unknown? If post-PMF: what is the evidence you have it?
- Are you output-focused (shipping features) or outcome-focused (moving metrics)? Be honest.

**Where are you going?**
- Is there a product vision? What does the world look like in 3-5 years if you succeed?
- What is the current strategic focus? What are you explicitly NOT doing right now?

**How does the team work?**
- Empowered product teams or feature teams?
- How much time goes to discovery vs delivery?
- How do product decisions get made? Who are the key stakeholders?
- What does "done" mean?

**Technical constraints**
- What is easy to change and what is hard?
- Any known technical debt that shapes what is possible?

**Current challenges**
- Which of the four risks keeps you up at night? (Value, usability, feasibility, viability)
- What is the hardest product problem you are facing right now?

**How you work**
- Preferred framework for product decisions? (RICE, ICE, custom scorecard, or something else)
- Any checklists or considerations you always run through before greenlighting work?
- Preferred formats for specs, briefs, or decision docs?
- Anything you have tried and do not like?

If the user has no strong preferences, skip the last section. Default frameworks in each mode apply.

Skip questions where the answer is already clear from the codebase scan.

## Step 3: Write Product Context

Synthesize findings and answers into a structured context file:

```markdown
## Product Context

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

Write this to `.pmcontext.md` in the project root. If the file already exists, update the Product Context section in place.

Then STOP and call the AskUserQuestion tool: ask whether to also append the Product Context to CLAUDE.md. If yes, append or update the section there.

Confirm completion and summarize the key context that will now guide all future `pm` mode work.

---

Once context is in place, `pm setup` generates a team CLAUDE.md that builds on it.
