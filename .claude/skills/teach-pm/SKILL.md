---
name: teach-pm
description: One-time setup that gathers product context and your preferred ways of working, then saves both for all PM skills. Run once per project.
user-invokable: true
---

Gather product context for this project, then persist it for all future PM skill sessions.

## Step 1: Explore the Codebase

Before asking questions, thoroughly scan the project to discover what you can:

- **README and docs**: Project purpose, target audience, any stated goals or vision
- **Package.json / config files**: Tech stack, dependencies, architecture patterns
- **Database schemas / API definitions**: Domain model, core entities, relationships
- **Existing tests**: What's being tested reveals what matters and what's risky
- **CI/CD configuration**: Deployment process, environments, release cadence
- **CLAUDE.md or similar**: Existing team conventions, definitions of done, workflow norms
- **Git history** (recent): Active areas of development, team focus, pace of change

Note what you've learned and what remains unclear. Code tells you what was built - not why, for whom, or what trade-offs were made.

## Step 2: Ask Product-Focused Questions

STOP and call the AskUserQuestion tool to clarify. Focus only on what you couldn't infer from the codebase:

### What Is This?
- What does this product do in one sentence?
- B2B, B2C, B2B2C, platform, or internal tool?
- If B2B: who's the buyer vs the end user? Same person or different?
- Business model: SaaS, marketplace, transactional, freemium, enterprise?
- Growth model: product-led, sales-led, marketing-led, partnerships?

### Who Are the Users?
- Who are the primary users? What's their context when using it?
- What job are they hiring this product to do? (The underlying struggle, not the feature request)
- What were they doing before? What's the real competitive alternative?

### Where Are You?
- Lifecycle stage: pre-product-market-fit, growth, scale, mature, or sunset?
- If pre-PMF: what's your biggest unknown? If post-PMF: what's the evidence you have it?
- Are you output-focused (shipping features) or outcome-focused (moving metrics)? Be honest.

### Where Are You Going?
- Is there a product vision? What does the world look like in 3-5 years if you succeed?
- Does the team know the vision and can they articulate it?
- What's the current strategic focus? What are you explicitly NOT doing right now?

### How Does the Team Work?
- Empowered product teams or feature teams? (Discovering solutions vs taking requirements)
- How much time goes to discovery vs delivery? Is anything validated before building?
- What does the product team look like? (Size, roles, cross-functional or siloed)
- How do product decisions get made? Who are the key stakeholders?
- What does "done" mean? (Ship and iterate? Polished release? Data-validated?)

### Technical Constraints
- What's easy to change and what's hard? (Architecture constraints, legacy systems, shared infrastructure)
- Any known technical debt that shapes what's possible?
- What are the deployment constraints? (Release cadence, feature flags, environments)

### Current Challenges
- Which of the four risks keeps you up at night? (Value, usability, feasibility, viability)
- What's the hardest product problem you're facing right now?
- What do you wish your PM process did better?

### How You Work
- Do you have a preferred framework for making product decisions? (e.g. RICE, ICE, a custom scorecard, something your team invented)
- Any checklist or set of considerations you always run through before greenlighting work?
- Are there specific formats or structures you prefer for specs, briefs, or decision docs?
- Any frameworks or approaches that you've tried and don't like? Things you want to avoid?
- Anything else about how you personally work that would help skills give you better output?

If they don't have strong preferences, that's fine - skip this section. The default frameworks in each skill will apply.

Skip questions where the answer is already clear from the codebase exploration.

## Step 3: Write Product Context

Synthesize your findings and the user's answers into a structured product context:

```markdown
## Product Context

### Product
[What it does, B2B/B2C/other, business model, growth model. If B2B: buyer vs user distinction]

### Lifecycle and Strategy
[Stage (pre-PMF/growth/scale/mature), product vision, current strategic focus, what you're NOT doing]

### Users
[Who they are, their context, the job they're hiring this product to do, what they did before]

### Competitive Landscape
[Real alternatives - not just direct competitors. Spreadsheets, manual processes, doing nothing]

### Team and Process
[Empowered or feature teams, discovery vs delivery balance, decision-making, definition of done]

### Technical Constraints
[What's easy, what's hard, known limitations]

### Current Challenges
[Biggest risk (value/usability/feasibility/viability), hardest problems, open questions]

### Ways of Working
[Preferred decision frameworks, checklists, doc formats, approaches to avoid. Only include this section if the user has preferences - omit entirely if they use defaults.]
```

Write this to `.pmcontext.md` in the project root. If the file already exists, update the Product Context section in place.

Then STOP and call the AskUserQuestion tool to ask whether they'd also like the Product Context appended to CLAUDE.md. If yes, append or update the section there as well.

Confirm completion and summarize the key product context that will now guide all future PM skill work.

## What's Next

- Run `/pm:setup` to generate a CLAUDE.md for your product team - it builds on the context you just created.
- Or jump straight into `/pm:brief` to write your first engineering brief with full product context.
