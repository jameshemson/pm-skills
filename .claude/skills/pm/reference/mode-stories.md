# Mode: stories

Break a feature into user stories that are independently valuable, testable, and small enough for one sprint. Stories that are just tasks in disguise are slop.

**Slop test and anti-patterns**: [foundations.md](foundations.md)
**Acceptance criteria standards and JTBD framing**: [knowledge-specification.md](knowledge-specification.md)

## Step 1: Understand the Feature

Before splitting anything, understand the whole:

- What is the user's job-to-be-done? (Not the feature - the progress they are trying to make)
- What is the full workflow from the user's perspective, start to finish?
- What exists today? What changes?
- Who are the different user types affected?
- What are the dependencies between parts of this feature?

If the input is a vague feature name ("improve search"), push back. You need enough context to understand the user's journey, not just the label.

## Step 2: Map the User Journey

Before writing stories, map the complete journey:

1. What triggers the user to start this workflow?
2. What steps do they take?
3. What decisions do they make along the way?
4. What does success look like for them?
5. Where can things go wrong?

This map reveals the natural story boundaries: each meaningful step or decision point is a candidate for a story.

## Step 3: Write the Stories

### Story Format

JTBD framing: **When** [situation/trigger], **I want to** [action/capability], **so I can** [outcome/progress].

This is better than "As a [role], I want to [feature]" because it grounds the story in a real situation, not an abstract role.

### Story Requirements

Each story MUST be:

- **Independent**: Can be built without requiring other stories first. If it cannot, state the dependency explicitly.
- **Valuable**: Delivers something meaningful to the user, even if small. "Create database table" is a task. "User can see their recent searches" is a story.
- **Testable**: Acceptance criteria are specific enough to write test cases from.
- **Small**: Fits within one sprint. If it does not, break it down further.

### Acceptance Criteria Format

**Given** [precondition], **when** [action], **then** [observable result].

Every criterion must include:
- Specific observable outcome (not "works correctly" - what does correct look like?)
- Performance bounds where relevant ("results appear within 200ms")
- Error handling ("if the API returns 500, show [specific message] and retry once")
- Boundary conditions ("when search query is empty, show recent items instead")

### What Good Looks Like

**Good story**: When I am assigning a task in a team with 50+ members, I want to search for a team member by name, so I can find the right person without scrolling through the full list.

Acceptance criteria:
- Given the assignment modal is open, when I type 2+ characters, then the member list filters to matching names within 200ms
- Given I search for a name that does not exist, then I see "No members found"
- Given I clear the search field, then the full member list is restored

**Slop story**: As a user, I want to search for team members so I can find people easily.
Acceptance criteria: Search works correctly. Results are relevant. Good performance.

## Step 4: Check Dependencies

For each story, identify:
- **Blocked by**: Stories that must be completed first (with the reason)
- **Blocks**: Stories that cannot start until this one is done
- **Independent**: Can be built in any order

Create a simple dependency map. Flag circular dependencies: they indicate stories need restructuring.

## Step 5: Suggest Sequencing

Recommend a build order based on:
1. Dependencies (blocked items last)
2. Risk reduction (highest-uncertainty stories first)
3. Value delivery (something useful to users as soon as possible)
4. Technical foundation (infrastructure before features that depend on it)

For each story: which sprint it fits in and why it is sequenced there.

## Step 6: Flag Hidden Issues

- Stories that seem simple but have hidden complexity
- Acceptance criteria that require design decisions not yet made
- Integration points that might be harder than they look
- Stories where independence is questionable
- Missing stories (gaps in the user journey no story covers)
- Stories that are really tasks in disguise

## Output Format

```
### Story N: [Short descriptive title]

**When** [situation], **I want to** [action], **so I can** [outcome].

**Acceptance Criteria:**
- Given [X], when [Y], then [Z]

**Dependencies:** [None / Blocked by Story N / Blocks Story N]
**Estimate signal:** [Small / Medium / Large]
**Notes:** [Hidden complexity, open questions, design dependencies]
```

End with the dependency map and suggested sequencing.

---

If any stories feel underspecified or risky, point the user to `review` mode.
