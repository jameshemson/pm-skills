slug: pm-v2
base_ref: 50067b866831384e39352c00744d236ec01c8703
branch: pm-v2
phase: review
task: Rebuild pm-skills as a single `pm` skill with modes (2.0)
started: 2026-05-18
last_updated: 2026-05-18
complexity: complex
requirements: [REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-006, REQ-007, REQ-008, REQ-009, REQ-010, REQ-011, REQ-012, REQ-013, REQ-014, REQ-015]
decisions: [D-001, D-002, D-003, D-004, D-005, D-006, D-007, D-008, D-009, D-010]
assumptions_confirmed:
  - A-001 inferred
  - A-002 inferred
  - A-003 confirmed
  - A-004 confirmed
  - A-005 inferred
  - A-006 confirmed
  - A-007 inferred
workstreams:
  - WS-validation (wave 0): scripts/check-structure.mjs
  - WS-foundations (wave 1): pm/SKILL.md, foundations.md, knowledge migration
  - WS-generator-modes (wave 2): brief, spec, stories, metrics modes
  - WS-support-modes (wave 2): teach, setup, decide, discover modes
  - WS-review (wave 3): review.md, knowledge critique sections
  - WS-config-docs (wave 4): old-dir deletion, .claude sync, plugin config, CLAUDE.md, README, CHANGELOG
  - WS-eval (wave 5): eval/run.js, final verification
execution_manifest:
  - wave 0: T-001 (depends_on none)
  - wave 1: T-002, T-003, T-004, T-005 (depends_on T-001)
  - wave 2: T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013 (depends_on wave 1)
  - wave 3: T-014, T-015 (depends_on wave 1)
  - wave 4: T-016, T-017, T-018, T-019, T-020, T-021, T-022 (depends_on waves 2 and 3)
  - wave 5: T-023, T-024 (depends_on wave 4)
completed_tasks: []
history:
  - 2026-05-18 Plan created via /impl-plan and adopted into the /build workflow (slug pm-v2). Codebase exploration done during the planning conversation; recorded in pm-v2-context.md.
  - 2026-05-18 Branch pm-v2 created off main at 50067b8.
  - 2026-05-18 Phase 1 complete: pm-v2-plan.md, pm-v2-context.md, pm-v2-requirements.md, pm-v2-state.md written. Phase set to review.
