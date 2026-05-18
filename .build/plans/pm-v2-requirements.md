# pm-v2 — Requirements

Canonical requirements, decisions, and assumptions for the pm-skills 2.0 rebuild. Source of truth for verification. Full detail in `pm-v2-plan.md`.

## Requirements

| ID | Requirement | Acceptance criterion |
|----|-------------|----------------------|
| REQ-001 | One `pm` skill replaces the 16 `/pm:*` skills | `source/skills/` contains only `pm/`; `check-structure.mjs` passes |
| REQ-002 | `pm/SKILL.md` is a thin router | `wc -l` <= 200; has commands table, 3 routing rules, Context Protocol, Slop Test |
| REQ-003 | Nine modes as reference files | `reference/modes/` has teach, setup, brief, spec, stories, metrics, review, decide, discover |
| REQ-004 | `review` runs Frame -> Critique -> Refine, document-type-aware | `review.md` has all three phase sections plus a document-type routing table |
| REQ-005 | `review.md` is thin | `wc -l review.md` <= 150; no per-document-type critique body text inline |
| REQ-006 | `review` absorbs translate, stakeholders, audit, retro | no mode or directory for those four; their function is present in `review.md` and the knowledge files |
| REQ-007 | strategy, position, prioritise survive as knowledge only | knowledge files exist; no modes or directories for them |
| REQ-008 | `brief` mode asks the audience | `brief.md` prompts for the target audience and does not assume engineering |
| REQ-009 | Context Protocol, Slop Test, Reflex Rejection survive | present across `SKILL.md` and `foundations.md` |
| REQ-010 | plugin.json and marketplace.json updated, version 2.0.0 | both valid JSON; version `2.0.0`; describe one skill with modes |
| REQ-011 | CLAUDE.md and README.md rewritten for 2.0 | no "16 commands" or "product-management/SKILL" references remain |
| REQ-012 | eval/run.js updated for the new layout | `node eval/run.js --dry-run` builds a non-trivial skilled context with no load error |
| REQ-013 | `.claude/skills/` regenerated, only `pm/` | `diff -r source/skills/pm .claude/skills/pm` empty; `.claude/skills/` holds only `pm/` |
| REQ-014 | CHANGELOG.md 2.0.0 entry with breaking-change note | entry present with a Breaking section and a migration note |
| REQ-015 | Positioning line present | "Claude generates, the pack critiques" in `SKILL.md`, `README.md`, `marketplace.json` |

## Decisions

- D-001 One `pm` skill; every command is a mode backed by a reference file (impeccable 3.x model).
- D-002 `review` is one document-type-aware mode, not a family of `review-spec`, `review-strategy` modes.
- D-003 Per-document-type critique knowledge lives in `reference/knowledge/*.md`; `review.md` carries only a routing table mapping type to knowledge file.
- D-004 translate, stakeholders, audit, retro fold into `review`; strategy, position, prioritise become knowledge-only.
- D-005 Shared foundations split by fire-frequency: must-fire parts inline in `SKILL.md`, heavier procedures in `reference/foundations.md`.
- D-006 The `product-management` core skill is removed; content absorbed into `SKILL.md`, `foundations.md`, and `knowledge/`.
- D-007 Manual `source` to `.claude` sync kept; no sync script in this scope.
- D-008 Breaking change; version becomes `2.0.0`.
- D-009 No `pin` shortcut script in 2.0.0 (2.1 candidate).
- D-010 Website rework out of scope; immediate follow-on.

## Assumptions

- A-001 (high, build risk): Claude Code resolves nested `reference/` subdirectories. Probe before Wave 1; flat-directory fallback exists.
- A-002 (high): a keyword-rich single-skill description auto-triggers like impeccable's.
- A-003 (confirmed): removing the 16 commands is acceptable as a breaking 2.0; the user chose this.
- A-004 (confirmed): website rework is out of scope here.
- A-005 (medium): the eval rubric needs no change; only `run.js` loading changes.
- A-006 (confirmed): no script enforces skill size; `check-structure.mjs` adds that.
- A-007 (confirmed): the frontmatter field is `user-invokable`.

## Key must-haves

From the execution manifest in `pm-v2-plan.md`:

- `review.md` <= 150 lines; contains Frame, Critique, Refine sections plus the document-type routing table plus a generic fallback; no inline per-type critique content.
- `SKILL.md` <= 200 lines; commands table and routing rules present.
- `check-structure.mjs` asserts every mode in the commands table has a file, every reference link resolves, and the size ceilings hold; exits 0 when clean.
- `node eval/run.js --dry-run` proves the new reference layout loads.
- `.claude/skills/pm` is byte-identical to `source/skills/pm`.
- Every `REQ-*` maps to at least one task in the manifest and one verification path.
