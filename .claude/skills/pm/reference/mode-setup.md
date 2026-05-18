# Mode: setup

Generate a CLAUDE.md tailored to a product team. Not a generic template - this interviews the user about their specific team, product domain, and ways of working, then produces a file that makes AI effective for everyone on the team.

Consult [knowledge-leadership.md](knowledge-leadership.md) for team structure principles (empowered teams, context vs control, trust frameworks) and [knowledge-communication.md](knowledge-communication.md) for audience-specific communication norms.

## Step 1: Explore the Codebase

Before asking questions, scan the project for existing context:

- **Existing CLAUDE.md**: What is already configured
- **README**: Project description, setup, contribution guidelines
- **Package.json / config**: Tech stack, scripts, tooling
- **CI/CD**: Build process, test requirements, deployment pipeline
- **.pmcontext.md**: Product context from the `teach` mode
- **Git history**: Commit conventions, branch naming, review process

Note what you found. This reduces the questions you need to ask.

## Step 2: Interview the User

STOP and call the AskUserQuestion tool. Ask only about what you could not infer from the codebase scan. Group by topic.

**Product domain**
- What does this product do? (One sentence)
- B2B, B2C, B2B2C, platform, or internal tool?
- Lifecycle stage: pre-PMF, growth, scale, mature?
- What are the key domain concepts the team uses?

**Team structure**
- Empowered product teams or feature teams?
- Who is on the product team? (Roles, not names)
- How are decisions made? (Who has authority for what)
- Who are the key stakeholders and what do they care about?

**Ways of working**
- What does your development process look like? (Sprint length, ceremonies, workflow)
- Output-focused (shipping features) or outcome-focused (moving metrics)?
- What does "done" mean? (Specific quality gates, or ship and iterate?)
- How do specs and briefs get written and reviewed?

**Quality standards**
- What does a good spec look like on this team?
- What are the most common gaps in specs or briefs?
- What makes engineering push back repeatedly?
- Specific standards for testing, documentation, or code review?

**Communication norms**
- How does the team communicate? (Slack, docs, meetings, async vs sync)
- What format do stakeholder updates take?
- Naming conventions, writing style, language choices?
- Anything the team explicitly avoids?

**AI usage**
- How is the team currently using AI?
- What works well? What does not?
- Any rules about AI use? (Security, confidentiality, review requirements)

## Step 3: Generate CLAUDE.md

Synthesize into a structured CLAUDE.md. Every line must be useful to someone sitting down to work - no filler.

```markdown
# [Product Name]

## Product Context
[What the product does, who it is for, current stage and focus]

## Team
[Structure, roles, decision-making process]

## Development Process
[Workflow, sprint cadence, definition of done]

## Technical Standards
[Stack, conventions, quality gates, testing requirements]

## Specification Standards
[What good specs look like, common gaps to avoid, review process]

## Communication
[Norms, channels, stakeholder update format, writing style]

## Domain Terminology
[Key terms and their definitions - prevents AI from misusing domain language]

## What AI Should and Should Not Do
[Specific guidance: what to use AI for, what requires human judgment, security boundaries]

## Common Gotchas
[Things that trip people up, known constraints, historical decisions that might seem wrong but have good reasons]
```

The "What AI Should Not Do" section is not optional - it is critical for team trust in AI tools.

Include concrete examples where possible ("A good commit message looks like: ..."). Keep it skimmable.

## Step 4: Review and Iterate

Present the generated CLAUDE.md and ask:
- Does this accurately reflect how your team works?
- Is anything missing that would help a new team member (or AI) be effective?
- Is anything wrong or outdated?
- Should this include the Product Context from `.pmcontext.md`?

Incorporate feedback and write the final version to CLAUDE.md in the project root. If a CLAUDE.md already exists, present a diff of proposed changes rather than overwriting.

---

If product context has not been captured yet, run `pm teach` first - setup builds on it.
