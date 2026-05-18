# pm-v2 — Requirements, Decisions, Assumptions

Canonical inventory for the pm-skills 2.0 rebuild. The full plan is `pm-v2-plan.md`; per-task `must_haves` live in its `execution_manifest`.

## Requirements

- **REQ-001**: A single user-invokable skill `pm` replaces the 16 separate `/pm:*` skills.
  Acceptance: `source/skills/` contains only `pm/`.
- **REQ-002**: `pm/SKILL.md` is a thin router (shared context + commands table + routing rules), <= 200 lines, target ~180.
  Acceptance: `wc -l` <= 200; a commands table and 3 routing rules are present.
- **REQ-003**: Nine modes exist as `reference/modes/*.md`: teach, setup, brief, spec, stories, metrics, review, decide, discover.
  Acceptance: all 9 files exist; `scripts/check-structure.mjs` passes.
- **REQ-004**: `review` runs Frame -> Critique -> Refine and is document-type-aware.
  Acceptance: `review.md` has the three phase sections and a document-type routing table.
- **REQ-005**: `review.md` is thin, <= 150 lines, target ~130; no per-document-type critique content inline.
  Acceptance: `wc -l` <= 150; routing table present; no inlined per-type critique bodies.
- **REQ-006**: `review` absorbs translate, stakeholders, audit, retro; none becomes a separate mode.
  Acceptance: no mode file for those four; their guidance lives in the review routing table and knowledge files.
- **REQ-007**: strategy, position, prioritise survive as `reference/knowledge/*.md`; none becomes a mode.
  Acceptance: knowledge files exist; no mode files for those three.
- **REQ-008**: `brief` mode asks for the target audience instead of assuming engineering.
  Acceptance: `grep -i audience` in `brief.md` matches; no hardcoded engineering-only assumption.
- **REQ-009**: Context Gathering Protocol, PM Slop Test, and PM Reflex Rejection survive and apply across modes.
  Acceptance: Context Protocol and Slop Test in `SKILL.md`; Reflex Rejection in `foundations.md`.
- **REQ-010**: `plugin.json` and `marketplace.json` describe the single skill and carry version 2.0.0.
  Acceptance: both parse as JSON; both show 2.0.0.
- **REQ-011**: `CLAUDE.md` and `README.md` are rewritten for the 2.0 architecture.
  Acceptance: no "16 commands" or `product-management/SKILL` references remain.
- **REQ-012**: `eval/run.js` is updated so the brief/spec eval runs against the new layout.
  Acceptance: `node eval/run.js --dry-run` builds a non-trivial skilled context with no load error.
- **REQ-013**: `.claude/skills/` is regenerated to contain only `pm/`, synced from source.
  Acceptance: `diff -r source/skills/pm .claude/skills/pm` is empty.
- **REQ-014**: `CHANGELOG.md` gains a 2.0.0 entry with a breaking-change migration note.
  Acceptance: a 2.0.0 entry with a Breaking section is present.
- **REQ-015**: "Claude generates, the pack critiques" appears in `SKILL.md`, `README.md`, and the marketplace description.
  Acceptance: `grep` finds the line in all three.

## Decisions

- **D-001**: One `pm` skill; every command is a mode backed by a reference file (impeccable 3.x model).
- **D-002**: `review` is one document-type-aware mode, not a family of review-* modes.
- **D-003**: Per-document-type critique knowledge lives in `knowledge/*.md` ("Critiquing this artifact" sections); `review.md` carries only the routing table.
- **D-004**: translate/stakeholders/audit/retro folded into review; strategy/position/prioritise become knowledge only.
- **D-005**: Shared foundations split by fire-frequency: must-fire parts inline in `SKILL.md`, heavier procedures in `reference/foundations.md`.
- **D-006**: The `product-management` core skill is removed; content absorbed into `SKILL.md`, `foundations.md`, `knowledge/`.
- **D-007**: Manual `source` to `.claude` sync retained; no sync script.
- **D-008**: Breaking change; version 2.0.0.
- **D-009**: No `pin` shortcut script in 2.0.0.
- **D-010**: Website rework out of scope; tracked as follow-on.

## Assumptions

- **A-001** (high): Claude Code resolves reference files in nested subdirectories linked from `SKILL.md`. Status: inferred. Fallback: flat `reference/` with a filename convention.
- **A-002** (high): A single skill with a keyword-rich `description` auto-triggers like impeccable's. Status: inferred.
- **A-003** (high): Removing the 16 commands is acceptable as a breaking 2.0. Status: confirmed by the user.
- **A-004** (high): Website rework is out of scope here. Status: confirmed by the user.
- **A-005** (medium): The eval rubric needs no change; only `run.js` loading changes. Status: inferred.
- **A-006** (high): No script enforces skill file size in pm-skills. Status: confirmed by inspection.
- **A-007** (medium): The frontmatter field name `user-invokable` is correct for this repo. Status: inferred from current shipping skills.

## must_haves

Per-task `must_haves` are defined in the `execution_manifest` of `pm-v2-plan.md` (tasks T-001 through T-024). They are observable acceptance criteria and form the verification contract for Phase 3c.
