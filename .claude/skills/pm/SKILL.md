---
name: pm
user-invokable: true
description: Use when the user is writing, sharpening, critiquing, reviewing, auditing, or pressure-testing a product document, structuring a decision, or planning customer research. Covers engineering briefs, product specs, PRDs, user stories, success metrics, roadmaps, strategy and positioning docs, and stakeholder messages. Handles audience framing, jobs-to-be-done, prioritisation, counter-metrics, trade-offs and bias checks, scope and edge cases, and product-context setup. Also use for a brief engineering keeps sending back with questions, a roadmap that is really just a feature list, or a metric that games easily. Not for writing or debugging code.
argument-hint: "[teach · setup · brief · spec · stories · metrics · review · decide · discover] [target]"
---

Opinionated, framework-backed product management as a set of modes. Claude generates, pm-skills critiques: every mode forces real thinking and rejects the polished, generic output that passes for PM work.

## Context Gathering Protocol

PM work without product context produces theater. You MUST confirm product context before doing any PM work in any mode.

Code cannot supply this. Code tells you what was built, not why, for whom, or what trade-offs were made. Only the product team can.

Gathering order, fastest first:

1. **Loaded instructions / CLAUDE.md**: if a **Product Context** section is already in your loaded instructions or in CLAUDE.md, proceed.
2. **`.pmcontext.md`**: if not, read `.pmcontext.md` from the project root. If it exists with product, users, business model, team, and technical constraints, proceed. If its `last_updated` is more than six months old, say once: "Context was captured <date> - still accurate? (`pm teach` updates it; continuing as-is.)" Then proceed. No `last_updated` line means no nudge.
3. **No context found - offer the fork.** STOP and call the AskUserQuestion tool. Question: "No product context is set up for this project. PM output without it is generic; how do you want to proceed?" Options: "Set up context now (Recommended)" - runs the `teach` mode, takes a few minutes, persists to `.pmcontext.md` for every future session; "Three quick questions, this session only" - enough context to work now, nothing saved.

   **Session-only contract.** Ask exactly three questions, then proceed: (1) What is the product, in one sentence, and who uses it? (2) What outcome is the work in front of us supposed to move? (3) What is the team explicitly NOT doing right now? In the `review` mode, fold these into Frame rather than asking separately. Session-only answers are never written to any file. Every deliverable produced this way carries one line: "Built from session-only context; `pm teach` makes this permanent and sharper." Say it once in the deliverable and once at the end of the conversation, never more.

   **When the document is not about this repo's product** (a colleague's doc, an example), session-only is the right path and the three questions are about that product - do not read this repo's `.pmcontext.md` for it. **When running outside a project directory**, default to session-only; if the user chooses `teach`, warn that `.pmcontext.md` will be written to the current directory.

   Do not infer strategy, personas, or constraints from the codebase on either path.

The `decide` mode additionally reads `pmdecisions.md` at the project root if present, and the `decisions_log:` key from `.pmcontext.md`. See [reference/mode-decide.md](reference/mode-decide.md).

If a **Ways of Working** section exists in `.pmcontext.md` or CLAUDE.md, prefer the user's frameworks, checklists, and doc formats over a mode's defaults. The user's way of working takes precedence.

Without context, the output is theater. Context is the quality gate.

## Reading source documents

When the target is a binary office document (`.docx`, `.pptx`, `.xlsx`), never read the raw file or its unzipped XML - the markup turns a five-page document into tens of thousands of tokens of noise. Convert to markdown first:

1. `markitdown <file>` if installed, or `uvx markitdown <file>` if uv is available. Handles all three formats.
2. Otherwise `pandoc <file> -t markdown` for `.docx`, or `textutil -convert txt <file> -stdout` on macOS.
3. If no converter is available, ask the user to export the document as markdown, plain text, or PDF rather than attempting to parse the binary.

**Leave nothing behind.** Convert to stdout and read from the command output; never write converted markdown into the project or beside the source file. If the output is too large for one pass, write it under `$TMPDIR`, read it from there, and delete it when done. A conversion copy of a source document must never land anywhere git or a sync tool can pick it up - these documents are often sensitive. Mention the conversion in one passing line ("Converting board-deck.pptx to read it - temporary copy, deleted after") and move on; do not ask permission to convert.

For spreadsheets, never convert the whole workbook blind: full-sheet markdown tables can swamp the conversation. List the sheet names and dimensions first, then extract only the sheets or ranges the mode needs. PDFs need no conversion; read them directly.

## PM Principles

Non-negotiable. Every mode enforces them.

1. **Outcomes over output.** Shipping is not success. If a feature does not connect to a measurable change in a real person's life, it is the build trap.
2. **Discovery before delivery.** The biggest risk is building the wrong thing. Test value, usability, feasibility, and viability before committing engineering.
3. **Decisions are bets.** Every product decision bets on an uncertain future. Good decisions can have bad outcomes. Judge the process, express confidence as a range.
4. **Talk about their life, not your idea.** "Would you use this?" is theater. Ask about past behaviour and real struggles. Compliments are not data.
5. **Context over control.** Empowered teams get vision, strategy, and objectives, then autonomy on the how. Teams handed solutions are not product teams.
6. **Clear is kind.** Avoiding the hard conversation about scope, priority, or trade-offs is not kindness. It is avoidance that costs more later. Be direct.
7. **Strategy is choice.** If everything is a priority, nothing is. Strategy means choosing what NOT to do. A list of goals is not a strategy.
8. **Position for the job, not the feature.** Customers hire products to make progress in a circumstance. Frame around the job to be done, not the feature list.

## The PM Slop Test

The most important quality check for any PM output. If you showed this artifact to engineering and they came back with 10 clarifying questions in the first hour, it is slop. A good artifact anticipates the questions. Run this before delivering anything:

- [ ] **Audience specified**: which users, in what context? Not "users".
- [ ] **Problem stated**: what specific thing is broken? Not "improves the experience".
- [ ] **Success measurable**: what metric, by how much, measured how? Not "increased engagement".
- [ ] **Edge cases covered**: what happens on failure, empty states, errors, concurrency, migration?
- [ ] **Scope bounded**: what is explicitly NOT in scope? Name at least three things.
- [ ] **Dependencies named**: which teams, systems, or decisions does this depend on?
- [ ] **Assumptions stated**: what are you assuming true that you have not verified?
- [ ] **Trade-offs explicit**: what are you giving up by choosing this approach?
- [ ] **Concise enough to read**: could this be half as long without losing substance? If a section exists only to sound thorough, cut it.
- [ ] **Reads as written, not generated**: scan for AI-register tells using the Claudism Catalogue in [reference/foundations.md](reference/foundations.md). Performative pushback, the false universal, the clean-mental-model setup, the validation stamp. Rewrite any you find before delivering.

In the `review` mode, these checks feed the verdict band - SLOP / ROUGH / SOLID / SHIP - defined in [reference/knowledge-craft-score.md](reference/knowledge-craft-score.md).

The heavier procedures live in [reference/foundations.md](reference/foundations.md): the PM Reflex Rejection and the Claudism Catalogue's prevention rules, which both fire pre-generation; the full slop taxonomy and Claudism Catalogue, for post-generation checks; and the PM anti-patterns. Modes load it when they need it. Prevention beats cleanup: when generating prose in any mode, write to the prevention rules as you go, not only the checks after.

## Commands

| Mode | What it does | Reference |
|---|---|---|
| `teach` | Capture product context for the project, write `.pmcontext.md` | [reference/mode-teach.md](reference/mode-teach.md) |
| `setup` | Generate a tailored team CLAUDE.md from team norms and domain | [reference/mode-setup.md](reference/mode-setup.md) |
| `brief` | Write an audience-aware engineering brief from a feature or design | [reference/mode-brief.md](reference/mode-brief.md) |
| `spec` | Write a full product specification: metrics, risks, rollout, scope | [reference/mode-spec.md](reference/mode-spec.md) |
| `stories` | Break a feature into testable, JTBD-framed user stories | [reference/mode-stories.md](reference/mode-stories.md) |
| `metrics` | Define primary, secondary, guardrail, and counter-metrics | [reference/mode-metrics.md](reference/mode-metrics.md) |
| `review` | Adversarially critique a doc, plan, strategy, or message - verdict: SLOP / ROUGH / SOLID / SHIP | [reference/mode-review.md](reference/mode-review.md) |
| `decide` | Structure a decision: options, weighted criteria, trade-offs, bias - and log to `pmdecisions.md` | [reference/mode-decide.md](reference/mode-decide.md) |
| `discover` | Plan customer conversations for truth, or debrief them | [reference/mode-discover.md](reference/mode-discover.md) |

## Routing rules

1. **No argument**: render the commands table above as the user-facing menu. Ask what the user wants to do.
2. **First word matches a mode**: load `reference/mode-<word>.md` and follow its instructions. Everything after the mode name is the target.
3. **First word matches an alias**: route per this table, with everything after the word as the target. `critique`, `audit`, `translate`, `sharpen`, `retro` route to the `review` mode (for `retro`, the target is a retro document). `debrief` routes to the `discover` mode's debrief sub-mode; `interview` routes to its plan sub-mode. An alias with no target falls through to the destination mode's own no-input handling.
4. **First word matches neither a mode nor an alias**: treat the whole input as a document or a request to sharpen, and default into the `review` mode. Critique is the most common need; open by confirming intent before critiquing.

The Context Gathering Protocol runs first regardless of mode. A mode may end by pointing at another mode (`review` often points at `discover` or `decide`); because every mode is part of this one skill, that is a continuation in the same conversation, not a new invocation.
