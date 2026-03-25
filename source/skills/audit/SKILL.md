---
name: audit
description: Assess a project's AI readiness across documentation, testing, processes, and onboarding. Team-level, not org-level.
user-invokable: true
args:
  - name: area
    description: Specific area to audit (optional - audits everything by default)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read the [specification reference](../product-management/reference/specification.md) for documentation quality standards and the [prompting reference](../product-management/reference/prompting.md) for AI readiness criteria.

---

Assess a project's readiness for effective AI-assisted product work. This is a team-level assessment (not org-level) that scores across concrete dimensions and recommends specific improvements.

The goal: can a PM or engineer sit down with Claude Code and be productive within 30 minutes? If not, what's blocking that?

## Step 1: Scan the Project

Systematically examine the project across all dimensions. Don't ask questions yet - gather evidence first.

### Documentation Audit
- **README quality**: Does it explain what the product does, how to set it up, and how to contribute? Score: 0 (missing) to 5 (comprehensive).
- **Architecture docs**: Is the system architecture documented? Can someone understand how components relate?
- **API documentation**: Are APIs documented with examples, error codes, and authentication requirements?
- **ADRs (Architecture Decision Records)**: Are significant technical decisions recorded with context and reasoning?
- **Inline documentation**: Is the code self-documenting? Are complex sections explained?
- **CLAUDE.md or similar**: Is there AI-specific context configured?

### Specification Quality
- **Spec existence**: Do specs/PRDs exist for recent features?
- **Spec quality**: Sample 2-3 recent specs and run the PM Slop Test:
  - Audience specified?
  - Problem stated with evidence?
  - Success metrics defined?
  - Edge cases covered?
  - Scope bounded?
  - Dependencies named?
- **Spec accessibility**: Can you find specs easily? Are they linked from code or tickets?

### Testing Maturity
- **Test existence**: Are there tests? What percentage of code is covered?
- **Test quality**: Do tests test behaviour (good) or implementation details (fragile)?
- **Test types**: Unit tests? Integration tests? E2E tests? What's the balance?
- **CI/CD**: Do tests run automatically? Is the pipeline healthy?
- **Test documentation**: Can someone understand what's being tested and why?

### Development Process
- **Commit quality**: Are commit messages descriptive? Do they explain why, not just what?
- **Branch strategy**: Is it clear how code gets from idea to production?
- **Code review**: Is there a review process? Are reviews substantive?
- **Release process**: Is deployment documented and repeatable?
- **Feature flags**: Is there a mechanism for gradual rollout?

### Onboarding Quality
- **Setup instructions**: Can a new person set up the project from the README alone?
- **Contributing guide**: Is it clear how to contribute?
- **Domain glossary**: Are domain-specific terms defined somewhere?
- **Architecture overview**: Can someone understand the system without tribal knowledge?
- **"Why" documentation**: Are historical decisions explained, especially ones that look wrong?

### AI Readiness (Specific)
- **Context availability**: Is there enough written context for AI to be useful?
- **Prompt-friendliness**: Is the codebase structured so AI can navigate it effectively? (Clear naming, modular architecture, typed interfaces)
- **Security considerations**: Are there clear boundaries for what AI should and shouldn't access?
- **Team norms**: Are there documented guidelines for AI usage?

## Step 2: Score Each Dimension

Use a 1-5 scale:

| Score | Meaning |
|---|---|
| 1 | Missing or severely lacking |
| 2 | Exists but has major gaps |
| 3 | Adequate - functional but could improve |
| 4 | Good - above average, minor gaps |
| 5 | Excellent - could serve as an example |

## Step 3: Generate the Audit Report

### Executive Summary
- Overall readiness score (average across dimensions)
- Top 3 strengths (be specific about what's working)
- Top 3 gaps (be specific about impact)
- Estimated effort to reach "AI-productive" state

### Detailed Scores

| Dimension | Score | Key Finding |
|---|---|---|
| Documentation | X/5 | [One-line summary] |
| Specification Quality | X/5 | [One-line summary] |
| Testing Maturity | X/5 | [One-line summary] |
| Development Process | X/5 | [One-line summary] |
| Onboarding Quality | X/5 | [One-line summary] |
| AI Readiness | X/5 | [One-line summary] |

### Detailed Findings by Dimension

For each dimension, provide:
- **What's working**: Specific things done well (with examples)
- **What's missing**: Specific gaps (with concrete impact)
- **Recommendations**: Specific actions to improve (ordered by impact)

### Quick Wins (Do This Week)

The 3-5 improvements that have the highest impact for the lowest effort. For each:
- What to do (specific action, not "improve documentation")
- Expected impact (what changes for the team)
- Effort estimate (hours, not days)

### Strategic Improvements (Do This Quarter)

Larger improvements that require more investment but create lasting value. For each:
- What to do
- Why it matters
- Suggested approach
- Dependencies or prerequisites

### PM Skills Recommendations

Based on the audit, recommend which PM skills would have the most impact:
- If specs are weak: "/pm:spec and /pm:review would immediately improve specification quality"
- If context is missing: "/pm:teach-pm to establish product context, then /pm:setup for team CLAUDE.md"
- If communication is a gap: "/pm:translate to bridge the gap between technical and non-technical stakeholders"

## Output Notes

- Be direct about what's good and what's not. Inflated scores help nobody.
- Every recommendation must be specific and actionable. "Improve documentation" is not actionable. "Add a system architecture diagram showing how the API, database, and frontend connect" is.
- Prioritise ruthlessly. A team that tries to fix everything fixes nothing. Focus on the 3-5 changes that would make the biggest difference.
- If the project is in great shape, say so. Not every audit needs a long list of problems.
