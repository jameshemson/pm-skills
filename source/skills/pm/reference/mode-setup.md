# Mode: setup

Generate team instructions in {{INSTRUCTIONS_FILE}}, tailored to a product team. Not a generic template - this interviews the user about their specific team, product domain, and ways of working, then produces a file that makes AI effective for everyone on the team.

Consult [knowledge-leadership.md](knowledge-leadership.md) for team structure principles (empowered teams, context vs control, trust frameworks) and [knowledge-communication.md](knowledge-communication.md) for audience-specific communication norms.

## Step 1: Explore the Codebase

Before asking questions, scan the project for existing context:

<!-- provider:codex -->
Before reading an existing {{INSTRUCTIONS_FILE}}, inspect the path itself. If it is a symlink, resolve and report its target while preserving the link. Read it only when the resolved target is inside the project. If the target is broken or resolves outside the project, stop and request an explicit safe choice instead of reading it.
<!-- /provider -->

- **Existing {{INSTRUCTIONS_FILE}}**: What is already configured
- **README**: Project description, setup, contribution guidelines
- **Package.json / config**: Tech stack, scripts, tooling
- **CI/CD**: Build process, test requirements, deployment pipeline
- **.pmcontext.md**: Product context from the `teach` mode
- **Git history**: Commit conventions, branch naming, review process

Note what you found. This reduces the questions you need to ask.

## Step 2: Interview the User

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
- "Generate {{INSTRUCTIONS_FILE}} from what we have"
- "Keep going (one more short round)"

If the user exits early, sections not yet covered are written as gaps. Continue to Round 3 only if the user chooses to keep going.

---

**Round 1 - product domain and team structure**

Open prompt first (in conversation): "What does this product do in one sentence, and what are the key domain concepts the team uses?"

Then ask up to the active provider limit from the following items that the scan did not answer:
- B2B, B2C, B2B2C, platform, or internal tool? Lifecycle stage: pre-PMF, growth, scale, or mature?
- Empowered product teams or feature teams?
- Who is on the product team? (Roles, not names)
- How are decisions made and who has authority for what? Who are the key stakeholders?

---

**Round 2 - ways of working and quality standards**

Ask up to the active provider limit from the following items that are not yet answered:
- What does your development process look like? (Sprint length, ceremonies, workflow)
- What does "done" mean - specific quality gates, or ship and iterate?
- What does a good spec look like on this team? What are the most common gaps?
- What makes engineering push back repeatedly? Any specific standards for testing, documentation, or code review?

After this round: offer the early exit (see above).

---

**Round 3 - communication norms and AI usage** (offered only if user chose to keep going)

Ask up to the active provider limit from the following items that are not yet answered:
- How does the team communicate? (Slack, docs, meetings, async vs sync) What format do stakeholder updates take?
- Naming conventions, writing style, language choices? Anything the team explicitly avoids?
- How is the team currently using AI? What works well? What does not?
- Any rules about AI use? (Security, confidentiality, review requirements)

## Step 3: Generate {{INSTRUCTIONS_FILE}}

Synthesise into a structured {{INSTRUCTIONS_FILE}}. Every line must be useful to someone sitting down to work - no filler. For any section not reached because the user exited early or a round was skipped, write `[Not captured - ask me and update this section]` as the section body rather than omitting the section or inventing content.

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

Present the generated {{INSTRUCTIONS_FILE}} and ask:
- Does this accurately reflect how your team works?
- Is anything missing that would help a new team member (or AI) be effective?
- Is anything wrong or outdated?
- Should this include the Product Context from `.pmcontext.md`?

<!-- provider:codex -->
Before preparing a diff, inspect {{INSTRUCTIONS_FILE}} again. If it is a symlink, resolve and report its target, then diff the resolved target only when it remains inside the project. Preserve the symlink node. If the target is broken or resolves outside the project, stop and request an explicit safe choice. Revalidate the same path and resolved target immediately before writing; write through the link without replacing it only while the target remains inside the project.
<!-- /provider -->

Incorporate feedback and write the final version to {{INSTRUCTIONS_FILE}} in the project root. If {{INSTRUCTIONS_FILE}} already exists, present a diff of proposed changes rather than overwriting.

---

If product context has not been captured yet, run `{{PM_INVOCATION}} teach` first - setup builds on it.
