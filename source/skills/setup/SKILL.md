---
name: setup
description: Generate a CLAUDE.md for a product team. Interviews about team norms, product domain, and ways of working.
user-invokable: true
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles and the **Context Gathering Protocol**. This skill is the CLAUDE.md generator - it creates the team context document that makes AI useful for the whole product team.

Additionally, read the [leadership reference](../product-management/reference/leadership.md) for team structure principles and the [communication reference](../product-management/reference/communication.md) for audience-specific norms.

---

Generate a CLAUDE.md file tailored to a product team. This isn't a generic template - it interviews the user about their specific team, product domain, and ways of working, then produces a CLAUDE.md that makes AI effective for everyone on the team.

## Step 1: Explore the Codebase

Before asking questions, scan the project for existing context:

- **Existing CLAUDE.md**: Check for any existing file to understand what's already configured
- **README**: Project description, setup instructions, contribution guidelines
- **Package.json / config**: Tech stack, scripts, tooling
- **CI/CD**: Build process, test requirements, deployment pipeline
- **Existing docs**: Architecture docs, ADRs, contribution guides
- **.pmcontext.md**: Product context from teach-pm
- **Git history**: Commit conventions, branch naming, review process

Note what you've found. This reduces the number of questions you'll need to ask.

## Step 2: Interview the User

STOP and call the AskUserQuestion tool. Ask about what you couldn't infer from the codebase. Group questions by topic and skip anything already answered by the codebase scan.

### Product Domain
- What does this product do? (One sentence)
- Who are the users and what's their context?
- What's the current product stage and primary focus?
- What are the key domain concepts the team uses? (Any specific terminology)

### Team Structure
- Who's on the product team? (Roles, not names)
- How are decisions made? (Who has authority for what)
- Who are the key stakeholders and what do they care about?
- What's the team's biggest collaboration challenge?

### Ways of Working
- What does your development process look like? (Sprint length, ceremonies, workflow)
- What's "done" mean? (Ship and iterate? Polished release? Specific quality gates?)
- How do specs/PRDs get written and reviewed?
- How do you handle tech debt vs feature work?

### Quality Standards
- What does a good spec look like on this team? (Any examples you can point to?)
- What are the most common gaps in specs or briefs?
- What makes engineering push back? (What problems come up repeatedly?)
- Are there specific standards for testing, documentation, or code review?

### Communication Norms
- How does the team communicate? (Slack, docs, meetings, async vs sync)
- What format do stakeholder updates take?
- Are there naming conventions, writing style preferences, or language choices?
- Anything the team explicitly avoids? (Specific tools, jargon, processes)

### AI Usage
- How is the team currently using AI? (Code generation, writing, analysis?)
- What works well? What doesn't?
- Any concerns or rules about AI usage? (Security, confidentiality, review requirements)

## Step 3: Generate CLAUDE.md

Synthesize everything into a structured CLAUDE.md. The file should be immediately useful for any team member using Claude Code.

### CLAUDE.md Structure

```markdown
# [Product Name]

## Product Context
[What the product does, who it's for, current stage and focus]

## Team
[Structure, roles, decision-making process]

## Development Process
[Workflow, sprint cadence, definition of done]

## Technical Standards
[Stack, conventions, quality gates, testing requirements]

## Specification Standards
[What good specs look like, common gaps to avoid, review process]
[Reference the PM Slop Test if teach-pm has been run]

## Communication
[Norms, channels, stakeholder update format, writing style]

## Domain Terminology
[Key terms and their definitions - prevents AI from misusing domain language]

## What AI Should and Should Not Do
[Specific guidance: what to use AI for, what requires human judgment, security boundaries]

## Common Gotchas
[Things that trip people up, known constraints, historical decisions that might seem wrong but have good reasons]
```

### Quality Standards for the Output

The generated CLAUDE.md must:
- Be specific to THIS team, not generic advice
- Include concrete examples where possible ("A good commit message looks like: ...")
- Be skimmable - headers, bullet points, short sections
- Avoid filler - every line should be useful to someone sitting down to work
- Include the "What AI Should Not Do" section (critical for team trust in AI tools)

## Step 4: Review and Iterate

Present the generated CLAUDE.md and ask:
- Does this accurately reflect how your team works?
- Is anything missing that would help a new team member (or AI) be effective?
- Is anything wrong or outdated?
- Should this include the Product Context from .pmcontext.md?

Incorporate feedback and write the final version to CLAUDE.md in the project root. If a CLAUDE.md already exists, present a diff of proposed changes rather than overwriting.
