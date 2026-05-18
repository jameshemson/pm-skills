# pm-v2 — Build Context

Conventions, constraints, and discovered patterns for the pm-skills 2.0 rebuild. Read alongside `pm-v2-plan.md`.

## Repo conventions

- No build system. Skills are markdown files used directly by Claude Code.
- `source/skills/` is authoritative. `.claude/skills/` is an identical copy used at runtime, referenced by `.claude-plugin/plugin.json` (`"skills": "./.claude/skills"`). After editing source, copy to `.claude/skills/`. The sync is manual; there is no script.
- Plugin config: `.claude-plugin/plugin.json` (metadata, version) and `.claude-plugin/marketplace.json` (marketplace listing). Version is kept in sync across both.
- Versioning is semver. Currently 1.5.1. This rebuild is a major bump to 2.0.0.
- Skill frontmatter uses `user-invokable: true` (note: not impeccable's `user-invocable` spelling). Keep the existing spelling.
- No test framework. The only automated check is `eval/` (a Node harness). Verification otherwise is `wc -l`, `grep`, file existence, and manual invocation.
- No em dashes in user-facing copy (CLAUDE.md rule). Applies to skill bodies, README, marketplace text, and the new SKILL.md.

## User constraints

- Positioning to preserve and make explicit: "Claude generates, the pack critiques."
- Anti-theater: skills challenge and critique; they do not just produce polished output.
- Do not over-engineer. Skills are markdown; keep them lean and within the size targets in the plan.
- The rebuild is a deliberate breaking change; a clean break is accepted, with no back-compat shims for old `/pm:*` commands.

## Discovered patterns

- Model architecture: impeccable 3.1.1 at `~/.claude/plugins/cache/impeccable/impeccable/3.1.1/` is one skill (`skills/impeccable/SKILL.md`, 168 lines) plus ~37 `reference/*.md` files. Each "command" is a mode backed by a reference file; `SKILL.md` is a router with a commands table and 3 routing rules.
- `eval/run.js` is coupled to the current layout: `buildSkillContext` (lines ~102-126) regex-matches `../product-management/reference/`, and `loadSkillFile` reads `source/skills/<name>/SKILL.md`. Both break after the rebuild and must be rewritten (REQ-012 / T-023). The eval covers only `brief` and `spec` (hardcoded at `run.js` line ~322).
- `eval/rubric.md` scores generated artifacts on 9 dimensions; unchanged by this rebuild (A-005).
- The current `review/SKILL.md` already loads the 204-line core skill plus five references via its "MANDATORY PREPARATION" block; the 2.0 `review` mode loads less than this.
- Existing repo memory note (`feedback_plugin_updates.md`): third-party plugins do not auto-update silently; users update the marketplace manually.

## Codebase exploration

Exploration was completed during the planning conversation rather than via separate Explore agents. Files read: `source/skills/{review,translate,stakeholders,product-management}/SKILL.md` and the `product-management/reference/` listing; `.claude-plugin/plugin.json` and `marketplace.json`; `README.md`, `CLAUDE.md`, `CHANGELOG.md`; `eval/run.js`, `eval/README.md`, `eval/rubric.md`, `eval/fixtures/b2b-saas-search.json`; impeccable 3.1.1 `SKILL.md` and `reference/critique.md`. The remaining per-skill files (`brief`, `spec`, `stories`, `metrics`, `decide`, `discover`, `teach-pm`, `setup`, `audit`, `retro`, `strategy`, `position`) are read by the Phase 3 mode-authoring agents when they adapt each into a mode reference.

## Out of scope

- The marketing website (`~/repos/skillsfor-pm-site`, separate repo). Immediate follow-on, not built here.
- A `pin`-style per-mode shortcut script. 2.1 candidate.
- Expanding the eval to cover the `review` mode (needs a different rubric).
- An automated `source` to `.claude` sync script. Manual copy retained.
- Old-command aliases (`/pm:brief` to `pm brief`). Clean break.
