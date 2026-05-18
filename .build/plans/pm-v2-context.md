# pm-v2 — Build Context

Repo conventions, user constraints, and discovered patterns for the pm-skills 2.0 rebuild. Carried into every build phase.

## Repo conventions

- `source/skills/` is the authoritative source. `.claude/skills/` is an identical copy used at runtime, referenced by `.claude-plugin/plugin.json`. The copy is kept in sync manually; there is no sync script.
- Plugin config: `.claude-plugin/plugin.json` (metadata, version) and `.claude-plugin/marketplace.json` (marketplace listing). Both carry the version and must be updated together.
- Versioning is semver. Every release bumps the version in both JSON files.
- No build system. Skills are markdown used directly by Claude Code.
- No em dashes in any user-facing copy. Use commas, colons, or rephrase.
- The only executable code is `eval/run.js` (Node, depends on `@anthropic-ai/sdk`), a skilled-vs-naked quality eval. It currently covers only `brief` and `spec` and is hardcoded to the old `product-management/reference/` layout.
- Skill frontmatter field is `user-invokable` (not impeccable's `user-invocable` spelling). Keep the existing spelling.

## User constraints

- Positioning to preserve and surface: "Claude generates, the pack critiques."
- The `review` mode must stay thin. Hard ceilings: `SKILL.md` <= 200 lines, `review.md` <= 150 lines. No per-document-type critique content inside `review.md`; it routes by document type to knowledge files.
- Quality bar is anti-slop. Every skill must enforce the PM Slop Test. The pack's identity is "skip the theater, do the work"; generated skill prose must not read like AI slop.
- Why this rebuild: in v1.5 the user and a teammate, independently, used only `/pm:review`. The 16-skill pack has a discoverability problem and the generate-an-artifact skills lose to plain Claude. The rebuild collapses 16 entry points into one and makes critique the spine.

## Discovered patterns

- The structural model is impeccable 3.1.1 at `~/.claude/plugins/cache/impeccable/impeccable/3.1.1/`: one skill (`skills/impeccable/SKILL.md`, a 168-line router) plus ~37 `reference/*.md` files, each a mode. Routing rules: no-arg shows a menu; a first word matching a command loads its reference; no match is general handling.
- Current pack: 16 user-invokable skills plus a non-invokable `product-management` core skill with 9 reference files.
- `eval/run.js` `buildSkillContext` (lines 102-126) regex-matches `../product-management/reference/`; after the rebuild that path is gone and the eval would silently load nothing while still printing a plausible score. Must be rewritten (REQ-012, T-023).

## Out of scope

- The marketing website (`~/repos/skillsfor-pm-site`, separate repo). It needs a rewrite from "16 commands" to "one skill" and is the immediate follow-on, not part of this build.
- A `pin`-style per-mode shortcut script (2.1 candidate).
- Expanding the eval to score the `review` mode (needs a new critique rubric and fixtures).
- Old-command aliases mapping `/pm:brief` to `pm brief`. The rebuild takes a clean break.
- An automated `source` to `.claude` sync script.

## Assumptions

- A-001 (high, the one structural bet): Claude Code resolves nested `reference/` subdirectories linked by relative path. Probe with a one-file test before Wave 1; fall back to a flat `reference/` with a filename convention if it fails.
- A-002 (high): a keyword-rich single-skill `description` auto-triggers on PM tasks like impeccable's.
- A-003, A-004, A-006, A-007: confirmed (see pm-v2-requirements.md).
- A-005 (medium): the eval rubric needs no change; only `run.js`'s file loading changes.
