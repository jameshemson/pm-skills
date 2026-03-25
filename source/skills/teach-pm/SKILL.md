---
name: teach-pm
description: One-time setup that gathers product context for your project and saves it for all PM skills. Run once to establish persistent product guidelines.
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

### Product and Users
- What does this product do in one sentence?
- Who are the primary users? What's their context when using it?
- What job are they hiring this product to do? What were they doing before?
- What's the product's current stage? (Pre-launch, early traction, scaling, mature)

### Business Model and Strategy
- How does this product make money (or plan to)?
- What's the primary growth lever? (Sales-led, product-led, content, partnerships)
- Who are the real competitive alternatives? (Not just direct competitors - include spreadsheets, manual processes, doing nothing)
- What's the current strategic focus? What are you explicitly NOT doing right now?

### Team and Decision-Making
- What does the product team look like? (Size, roles, cross-functional or siloed)
- How do product decisions get made? Who are the key stakeholders?
- What's the biggest source of tension in product decisions? (Speed vs quality, stakeholder demands vs user needs, etc.)
- What does "done" mean for your team? (Ship and iterate? Polished release? Data-validated?)

### Technical Constraints
- What's easy to change and what's hard? (Architecture constraints, legacy systems, shared infrastructure)
- Any known technical debt that shapes what's possible?
- What are the deployment constraints? (Release cadence, feature flags, environments)

### Current Challenges
- What's the hardest product problem you're facing right now?
- What's the last product decision that felt wrong or uncertain?
- What do you wish your PM process did better?

Skip questions where the answer is already clear from the codebase exploration.

## Step 3: Write Product Context

Synthesize your findings and the user's answers into a structured product context:

```markdown
## Product Context

### Product
[What it does, current stage, how it makes money]

### Users
[Who they are, their context, the job they're hiring this product to do]

### Competitive Landscape
[Real alternatives - not just direct competitors. What were users doing before?]

### Strategy
[Current focus, what you're explicitly NOT doing, key bets]

### Team and Process
[Team structure, decision-making, definition of done]

### Technical Constraints
[What's easy, what's hard, known limitations]

### Current Challenges
[The hardest problems right now, open questions]
```

Write this to `.pmcontext.md` in the project root. If the file already exists, update the Product Context section in place.

Then STOP and call the AskUserQuestion tool to ask whether they'd also like the Product Context appended to CLAUDE.md. If yes, append or update the section there as well.

Confirm completion and summarize the key product context that will now guide all future PM skill work.
