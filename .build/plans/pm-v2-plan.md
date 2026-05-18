# PM Skills 2.0 — Implementation Plan

Collapse the 16-skill pack into a single `pm` skill with modes, following impeccable 3.x's architecture.

Status: draft, pending `/review-plan`.

---

## Discovery level

`deep_dive`.

Justification, from codebase evidence:
- Blast radius is the whole repo. Every file under `source/skills/` (17 directories) is removed or rewritten; `.claude/skills/` is regenerated; `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `CLAUDE.md`, `README.md`, `CHANGELOG.md` all change.
- It is a breaking change. The 16 `/pm:*` commands stop existing. Existing installs break on auto-update.
- The eval harness is structurally coupled to the old layout. `eval/run.js` lines 89-96 and 102-126 hardcode `product-management/reference/` paths and a regex for `../product-management/reference/`. It will silently load nothing after the rebuild.
- The `review` mode design is genuinely non-trivial: it absorbs four old skills and must stay thin. That is the main open design risk and is addressed explicitly below.

The conversation that preceded this plan did the discovery interview already. Assumptions are recorded below rather than re-asked.

---

## Requirements and decisions

### Requirements

- **REQ-001**: A single user-invokable skill named `pm` replaces the 16 separate `/pm:*` skills.
- **REQ-002**: `source/skills/pm/SKILL.md` is a thin router: shared PM context + a commands table + routing rules. Ceiling 200 lines, target ~180.
- **REQ-003**: Nine modes exist as reference files under `source/skills/pm/reference/modes/`: `teach`, `setup`, `brief`, `spec`, `stories`, `metrics`, `review`, `decide`, `discover`.
- **REQ-004**: The `review` mode runs a Frame → Critique → Refine loop and is document-type-aware.
- **REQ-005**: `reference/modes/review.md` is thin. Ceiling 150 lines, target ~130. It holds the three-phase skeleton plus a document-type routing table only. No per-document-type critique content lives in it.
- **REQ-006**: `review` absorbs the function of `translate` (audience reframing), `stakeholders` (person-as-audience), `audit` (strategic-alignment check), and `retro` (retro-document critique). None of these four becomes a separate mode.
- **REQ-007**: The thinking from `strategy`, `position`, and `prioritise` survives as `reference/knowledge/` files. None becomes a mode.
- **REQ-008**: The `brief` mode asks for the target audience instead of assuming engineering.
- **REQ-009**: The Context Gathering Protocol, the PM Slop Test, and the PM Reflex Rejection procedure survive and apply across modes.
- **REQ-010**: `plugin.json` and `marketplace.json` describe the single skill and carry version `2.0.0`.
- **REQ-011**: `CLAUDE.md` and `README.md` are rewritten for the 2.0 architecture.
- **REQ-012**: `eval/run.js` is updated so the existing `brief`/`spec` eval runs against the new file layout.
- **REQ-013**: `.claude/skills/` is regenerated to contain only `pm/`, synced from `source/skills/pm/`.
- **REQ-014**: `CHANGELOG.md` gains a `2.0.0` entry with an explicit breaking-change migration note.
- **REQ-015**: The positioning line "Claude generates, the pack critiques" appears in `SKILL.md` framing, `README.md`, and the marketplace description.

### Decisions

- **D-001**: One `pm` skill; every command is a mode backed by a reference file. Mirrors impeccable 3.1.1 (`skills/impeccable/SKILL.md` + `reference/*.md`).
- **D-002**: `review` is one document-type-aware mode, not a family of `review-spec`, `review-strategy` modes. A family rebuilds the sprawl this rebuild removes.
- **D-003**: Per-document-type critique knowledge lives in `reference/knowledge/*.md`, each gaining a "Critiquing this artifact" section. `review.md` carries only a routing table mapping document type to knowledge file. This is the mechanism that keeps `review` thin.
- **D-004**: `translate`, `stakeholders`, `audit`, `retro` are folded into `review`; `strategy`, `position`, `prioritise` become knowledge-only. Their standalone commands are removed.
- **D-005**: Shared PM foundations split by fire-frequency. Must-fire-every-invocation parts (Context Protocol, condensed Principles, the Slop Test checklist) sit inline in `SKILL.md`. Heavier procedures (full Reflex Rejection, full slop taxonomy, anti-patterns) move to `reference/foundations.md`, loaded by the modes that need them.
- **D-006**: The `product-management` core skill is removed as a separate skill. Its content is absorbed into `SKILL.md`, `reference/foundations.md`, and `reference/knowledge/`.
- **D-007**: The manual `source/skills/` → `.claude/skills/` copy convention is kept. No automated sync script is added in this scope.
- **D-008**: This is a breaking change. Version becomes `2.0.0`.
- **D-009**: No `pin`-style per-mode shortcut script in 2.0.0. The single `pm` skill with a keyword-rich `description` is the entry point. A pin script is a 2.1 candidate (see Out of scope).
- **D-010**: The website (`~/repos/skillsfor-pm-site`, separate repo) rework is out of scope for this plan and tracked as the immediate follow-on.

### Assumptions

- **A-001** (high): Claude Code resolves reference files in nested subdirectories (`reference/modes/`, `reference/knowledge/`) linked by relative path from `SKILL.md`. Evidence: impeccable links `reference/brand.md`; nested relative links are ordinary markdown and reference files are read on demand, not enumerated by a schema.
- **A-002** (high): A single skill with a keyword-rich `description` auto-triggers on PM tasks the way impeccable's does. Evidence: impeccable 3.1.1's `SKILL.md` line 3 is exactly this pattern and is the stated model.
- **A-003** (high): Removing the 16 `/pm:*` commands is acceptable as a breaking 2.0. Evidence: the user explicitly chose "one skill, many modes" and acknowledged the breaking-change and website cost.
- **A-004** (high): The website rework is out of scope here. Evidence: it is a separate repo built via a different skill (`CLAUDE.md` "Deliverable 2").
- **A-005** (medium): The eval rubric (`eval/rubric.md`, 9 artifact-scoring dimensions) needs no change; only `run.js`'s file loading changes. Evidence: `run.js` lines 322-330 hardcode `["brief","spec"]`; both survive as modes; the rubric scores generated artifacts and both modes still generate.
- **A-006** (high): No script in pm-skills enforces skill file size. Evidence: `find` for `*.mjs`/`*.js` scripts returned nothing. The size ceilings referenced in this plan are authoring targets, enforced by the new `scripts/check-structure.mjs`.
- **A-007** (medium): The current frontmatter field name `user-invokable` is correct for this repo. Evidence: every current skill uses it and the pack ships and works. The plan keeps it (impeccable's `user-invocable` spelling is not copied).

---

## Problem

A product manager who installed the pack uses only one of its 16 skills (`/pm:review`); a teammate independently does the same. The pack is 16 entry points, most of which are never triggered because each carries a discoverability cost and the generate-an-artifact skills lose to plain Claude. We are rebuilding it as one skill that routes to modes, so there is one thing to invoke and the critique-centred work the user actually values becomes the spine.

---

## Approach

### Target structure

```
source/skills/pm/
├── SKILL.md                         router: shared context + commands table + routing rules
└── reference/
    ├── foundations.md               Reflex Rejection, slop taxonomy, anti-patterns
    ├── modes/
    │   ├── teach.md   setup.md   brief.md   spec.md   stories.md
    │   ├── metrics.md decide.md  discover.md
    │   └── review.md                Frame → Critique → Refine + document-type routing table
    └── knowledge/
        ├── discovery.md      decision-making.md   specification.md
        ├── communication.md  prioritisation.md    leadership.md
        ├── positioning.md    prompting.md         review-personas.md
        └── metrics.md
```

### Routing

`SKILL.md` carries a commands table and three rules, copied in spirit from impeccable's "Routing rules" (its `SKILL.md` lines 151-159):

1. No argument: render the commands table as a menu, ask what the user wants.
2. First word matches a mode: load `reference/modes/<word>.md` and follow it.
3. No match: treat the input as a document or request to sharpen, and default into the `review` mode (the most common need; the user and a teammate use it almost exclusively).

A mode reference file may end by pointing at another mode. `review` does this most: on finding an unevidenced claim it points to `discover`; on an unresolved decision, `decide`; on a missing draft, a generator mode. Because every mode is part of the same skill, this is a continuation in the same conversation, not a new invocation.

### Keeping `review` thin (the stated concern)

`review` is the flagship and absorbs four old skills, so weight control is a hard requirement, not a hope. Three mechanisms:

1. **`review.md` holds no document-type content.** It is the Frame → Critique → Refine skeleton plus one routing table. Target ~130 lines, ceiling 150, enforced by `scripts/check-structure.mjs`.
2. **Document type is a router.** The routing table maps a detected document type to one knowledge file:

   | Document type | Knowledge file loaded |
   |---|---|
   | spec, brief, PRD, user stories | `knowledge/specification.md` |
   | strategy doc | `knowledge/decision-making.md` |
   | positioning doc, one-pager | `knowledge/positioning.md` |
   | metrics doc | `knowledge/metrics.md` |
   | retro, post-launch review | `knowledge/decision-making.md` |
   | stakeholder message, comms | `knowledge/communication.md` |
   | roadmap, prioritisation | `knowledge/prioritisation.md` |
   | other / unclassified | `review.md` built-in generic checklist |

3. **The critique knowledge is co-located with the framework.** Each `knowledge/*.md` file gains one "Critiquing this artifact" section. The framework reference and the critique checklist for it live in the same file, loaded together or not at all.

**Weight budget for one `review` run.** Loaded context = `SKILL.md` (already in context) + `review.md` (~130) + `foundations.md` slop taxonomy (~130) + `knowledge/review-personas.md` (~120) + exactly one document-type knowledge file (~120-150). Roughly 500-530 lines loaded on demand. For comparison, the current `review/SKILL.md` already pulls `product-management/SKILL.md` (204) plus `specification.md`, `discovery.md`, `prioritisation.md`, `communication.md`, `review-personas.md` (its "MANDATORY PREPARATION" block, lines 11-21). The 2.0 `review` loads less than the 1.5 `review`, and every individual file is within size targets. The concept is heavy; the loaded context per run is bounded and smaller than today.

### Stress-test of the approach

- The eval coupling is real and easy to miss. `eval/run.js` `buildSkillContext` (lines 102-126) regex-matches `../product-management/reference/`. After the rebuild that path does not exist, the regex matches nothing, and `loadReferenceFile` (lines 89-96) silently returns `null` for every reference. The eval would still run and still print a delta, but the "skilled" arm would be missing its references and the numbers would be quietly wrong. REQ-012 and T-023 fix this; T-024 verifies it with `--dry-run` showing a non-trivial system-prompt length.
- Nested `reference/` subdirectories (A-001) are the one structural bet. impeccable keeps `reference/` flat. If nested paths fail to resolve, the fallback is a flat `reference/` with a filename convention (`mode-review.md`, `knowledge-specification.md`). This does not change the plan's content, only file paths, so it is a low-cost fallback. Flagged in Open questions.
- `review` defaulting on no-match (routing rule 3) could mis-route a user who wanted to generate. Mitigation: rule 3's behaviour in `review.md` opens by confirming the document type, and its generic branch detects "there is no draft here" and points to a generator mode. Covered in Abuse and edge cases.

---

## Who uses this and how

- **New PM, fresh install.** Invokes `pm` or describes a task. The router shows the menu or routes to a mode. No knowledge of 16 commands required. This is the happy path.
- **Existing PM on v1.5.1 who auto-updates.** Their muscle memory `/pm:brief`, `/pm:review` breaks: those skills no longer exist. This is the person who hits the change sideways. Mitigation: the `CHANGELOG.md` 2.0.0 entry states the new invocation explicitly (REQ-014); the `pm` skill's keyword-rich description (REQ-002) means typing `/pm` or describing the task still lands them in the right mode. There is no automatic alias from old commands to new modes; D-008 accepts this as the cost of a clean 2.0.
- **Claude, executing the skill.** Reads `SKILL.md`, applies the Context Protocol, matches the mode, loads the mode reference and any knowledge files it names. The router must make the load sequence unambiguous so Claude does not skip a reference.
- **The eval harness.** `eval/run.js` loads skill files programmatically. It is not a person but it is a consumer and it breaks without T-023.
- **The maintainer (repo owner).** Edits `source/skills/pm/`, then copies to `.claude/skills/pm/` (D-007, manual). Needs `CLAUDE.md` updated so the sync rule still describes reality.

---

## File structure mapping

| File | New/Modified/Deleted | Responsibility | Depends on |
|------|----------------------|----------------|------------|
| `scripts/check-structure.mjs` | New | Validate structure: modes have files, links resolve, size ceilings | none |
| `source/skills/pm/SKILL.md` | New | Router: shared context, commands table, routing rules | `foundations.md`, `modes/*` |
| `source/skills/pm/reference/foundations.md` | New | Reflex Rejection, slop taxonomy, anti-patterns | none |
| `source/skills/pm/reference/knowledge/{discovery,decision-making,specification,communication,prioritisation,leadership,positioning,prompting,review-personas}.md` | New | Curated frameworks, migrated from `product-management/reference/` | none |
| `source/skills/pm/reference/knowledge/metrics.md` | New | Success-metrics framework, extracted from `metrics/SKILL.md` | none |
| `source/skills/pm/reference/modes/brief.md` | New | brief mode, audience-aware | `foundations.md`, `knowledge/specification.md` |
| `source/skills/pm/reference/modes/spec.md` | New | spec mode | `foundations.md`, `knowledge/specification.md` |
| `source/skills/pm/reference/modes/stories.md` | New | stories mode | `foundations.md`, `knowledge/specification.md` |
| `source/skills/pm/reference/modes/metrics.md` | New | metrics mode | `foundations.md`, `knowledge/metrics.md` |
| `source/skills/pm/reference/modes/teach.md` | New | teach mode (product context capture) | none |
| `source/skills/pm/reference/modes/setup.md` | New | setup mode (team CLAUDE.md generator) | none |
| `source/skills/pm/reference/modes/decide.md` | New | decide mode | `knowledge/decision-making.md` |
| `source/skills/pm/reference/modes/discover.md` | New | discover mode | `knowledge/discovery.md` |
| `source/skills/pm/reference/modes/review.md` | New | review mode: Frame/Critique/Refine + doc-type routing table | `foundations.md`, all `knowledge/*` |
| `source/skills/{audit,brief,decide,discover,metrics,position,prioritise,product-management,retro,review,setup,spec,stakeholders,stories,strategy,teach-pm,translate}/` | Deleted | Old per-skill directories (17) | replaced by `pm/` |
| `.claude/skills/pm/**` | New (generated) | Runtime copy of `source/skills/pm/` | all `source/skills/pm/` |
| `.claude/skills/{17 old dirs}/` | Deleted | Old runtime copies | replaced |
| `.claude-plugin/plugin.json` | Modified | Single skill, version 2.0.0 | structure final |
| `.claude-plugin/marketplace.json` | Modified | Single plugin, version 2.0.0, positioning line | structure final |
| `CLAUDE.md` | Modified | 2.0 architecture, mode list, sync rule | structure final |
| `README.md` | Modified | 2.0 architecture, install, positioning | structure final |
| `CHANGELOG.md` | Modified | 2.0.0 entry with migration note | structure final |
| `eval/run.js` | Modified | Load `pm/SKILL.md` + mode + knowledge files | structure final |
| `PM-2.0-PLAN.md` | New | This plan | none |

Every file in this map appears in the implementation order. Every file in the steps appears here.

---

## Files to change

New, under `source/skills/pm/` (≈ line estimates):
- `SKILL.md` — ~180. Frontmatter (`name`, `user-invokable`, keyword `description`, `argument-hint`); intro; Context Gathering Protocol (condensed from `product-management/SKILL.md` lines 8-28); 8 one-line PM Principles; the 9-item PM Slop Test checklist; commands table (9 rows); 3 routing rules.
- `reference/foundations.md` — ~140. PM Reflex Rejection procedure (`product-management/SKILL.md` lines 32-95), the slop taxonomy (lines 149-167), Anti-Patterns (lines 170-189).
- `reference/knowledge/*.md` (9 files) — migrated 1:1 from `source/skills/product-management/reference/*.md`, with internal links repointed; each ~100-200, unchanged in length. In Wave 3 six of them gain a "Critiquing this artifact" section (+~25 lines each).
- `reference/knowledge/metrics.md` — ~120. New. The primary/secondary/guardrail/counter-metric framework lifted out of `metrics/SKILL.md` so both the `metrics` mode and `review` can cite it.
- `reference/modes/*.md` (9 files) — `brief`, `spec`, `stories`, `metrics`, `teach`, `setup`, `decide`, `discover` each ~110-150, adapted from the matching current `*/SKILL.md` (drop the "MANDATORY PREPARATION" block and the static "What's Next" block; the router and dynamic routing replace them). `review.md` ~130, new content.

New tooling:
- `scripts/check-structure.mjs` — ~60. Node, `fs`/`path` only. Asserts: every mode named in `SKILL.md`'s commands table has a `reference/modes/<mode>.md`; every relative reference link in every `pm` file resolves; `SKILL.md` ≤ 200 lines; `review.md` ≤ 150 lines. Exit 0 clean, exit 1 with a list of failures.

Modified:
- `.claude-plugin/plugin.json` — `version` to `2.0.0`; `description` to describe one skill with modes, not 17 skills.
- `.claude-plugin/marketplace.json` — `version` to `2.0.0`; plugin `description` and `metadata.description` rewritten; `tags` trimmed.
- `CLAUDE.md` — the "Skill Pack Architecture", "File Structure", and skill-list sections rewritten for one skill and modes; the source/compiled sync rule kept; the impeccable reference path updated to `3.1.1`.
- `README.md` — "What's Included" and the command tables replaced by the mode list; install unchanged; positioning line added.
- `CHANGELOG.md` — `## 2.0.0` entry above `1.5.1` with a `### Breaking` section.
- `eval/run.js` — `SKILLS_DIR` and `loadSkillFile`, `loadCoreSkill`, `loadReferenceFile`, `buildSkillContext` rewritten (detail in T-023).

Deleted: the 17 directories under `source/skills/` and their mirrors under `.claude/skills/`.

---

## Data impact

None. The pack is markdown skill files plus one Node eval script. There is no database, no schema, no migration, and no stored records. `eval/results/` holds run output JSON; existing result files remain valid historical artifacts and are not touched.

---

## What existing behavior changes

- The 16 commands `/pm:teach-pm`, `/pm:setup`, `/pm:discover`, `/pm:position`, `/pm:strategy`, `/pm:prioritise`, `/pm:stakeholders`, `/pm:brief`, `/pm:spec`, `/pm:metrics`, `/pm:stories`, `/pm:review`, `/pm:decide`, `/pm:translate`, `/pm:audit`, `/pm:retro` stop existing. They are replaced by one `pm` skill with modes.
- `/pm:translate`, `/pm:stakeholders`, `/pm:audit`, `/pm:retro` have no direct successor command. Their behavior is reachable only through the `review` mode.
- `/pm:strategy`, `/pm:position`, `/pm:prioritise` have no command successor at all. The frameworks survive as `knowledge/` files consulted by other modes.
- Anyone with v1.5.1 installed and marketplace auto-update enabled gets the breaking change with no warning beyond the changelog. `feedback_plugin_updates.md` in repo memory already notes third-party plugins do not auto-update silently, which slightly softens this, but the assumption is users will see broken commands.
- `eval/run.js` invoked the same way (`node run.js`) produces the same report shape; only its internal file loading changes.
- Nothing else changes for anyone, because there is nothing else: no API, no UI runtime, no service.

---

## New dependencies

None. `scripts/check-structure.mjs` uses only Node built-ins (`fs`, `path`, `url`). `eval/run.js` keeps its existing dependency on `@anthropic-ai/sdk` (already in `eval/package.json`); no version change.

---

## Access control and authorization

N/A for runtime: the pack is client-side skill files run inside the user's own Claude Code. There is no server, no endpoint, no auth boundary. Distribution access is unchanged: public GitHub repo, Apache 2.0 `LICENSE`, installed via the Claude Code marketplace. The 2.0 rebuild does not change who can install or read it.

---

## Abuse and edge cases

- **No-argument invocation.** `pm` with no mode word. Handled by routing rule 1: render the menu, ask. Not an error.
- **Ambiguous or unknown mode word.** `pm sharpen` (no such mode). Routing rule 3: treat the rest as a target and default to `review`, opening by confirming intent. `check-structure.mjs` does not police this; it is runtime routing behavior, specified in `SKILL.md`.
- **Missing product context.** A mode runs with no `.pmcontext.md` and no Product Context in `CLAUDE.md`. The Context Gathering Protocol in `SKILL.md` requires routing into `teach` first. This is preserved from `product-management/SKILL.md` lines 21-26.
- **Unclassifiable document in `review`.** The user points `review` at something that is not a recognised type. The routing table's "other" row uses `review.md`'s built-in generic checklist; `review.md` must contain that fallback so the mode never dead-ends.
- **`review` invoked with no draft.** The user wants generation, not critique. `review.md`'s Frame phase detects the absence of a draft and points to the relevant generator mode (`brief`, `spec`, ...) rather than critiquing an empty input.
- **Stale `.claude/skills/`.** The maintainer edits `source/` and forgets to copy to `.claude/`. The runtime then serves old content. Mitigation: T-024 verification includes a `diff -r` between `source/skills/pm` and `.claude/skills/pm`; `CLAUDE.md` keeps the sync rule prominent. A fully automated sync is D-007 out of scope.
- **Large document pasted into `review`.** No volume limit is enforced; this is a single-conversation tool bounded by the model's context window. Not a concern at this layer; no mitigation needed.

---

## Out of scope

- **The website.** `~/repos/skillsfor-pm-site` markets "16 commands"; it needs a rewrite to "one skill." It is a separate repo built with a different skill (D-010). It is the immediate follow-on, not part of this plan.
- **A `pin` shortcut script.** impeccable ships `pin.mjs` to promote a mode to a top-level `/command`. Useful, but the single `pm` entry point is enough for 2.0.0. Candidate for 2.1 (D-009).
- **Expanding the eval to cover `review`.** The current rubric scores generated artifacts on 9 dimensions; it does not fit a critique. A critique eval ("did `review` catch the planted flaws?") needs a new rubric and new fixtures. Worth doing, separately. This plan only keeps the existing `brief`/`spec` eval working (REQ-012).
- **An automated `source` → `.claude` sync script.** D-007 keeps the manual copy. A sync script is a small, safe later addition.
- **Old-command aliases.** No shim mapping `/pm:brief` to `pm brief`. D-008 takes the clean break.

---

## Risks and rollback

Ordered by severity.

1. **`review` underperforms or still feels heavy in practice.** The structural weight budget (Approach) bounds loaded context, but quality is judged by use, not line count. Mitigation: `/review-plan` scrutinises `review.md`'s design before build; after build, the user and the teammate dogfood `review` directly. Rollback: `review.md` is one file; iterating on it does not disturb other modes.
2. **The breaking change strands existing users.** Mitigation: loud `CHANGELOG.md` migration note (REQ-014); keyword-rich `description` so natural language still routes. Accepted residual risk per D-008.
3. **Eval silently loads nothing after the rebuild.** Already live in the current coupling (Approach stress-test). Mitigation: T-023 rewrites the loaders; T-024 runs `--dry-run` and checks the printed system-prompt length is non-trivial (current `runSkilled` prints `System (N chars)` at `run.js` line 204).
4. **Nested `reference/` subdirectories do not resolve (A-001).** Mitigation: fallback to a flat `reference/` with a filename convention; content-neutral. Flagged in Open questions; resolve before Wave 1.
5. **The single-skill `description` does not auto-trigger well.** Mitigation: model it closely on impeccable 3.1.1's `description` (its `SKILL.md` line 3), which is the proven pattern.

**Rollback overall.** Everything is files in git. Tag the current `HEAD` as `v1.5.1` before starting; if 2.0 needs to be abandoned, `git revert` the merge or reset to that tag. No data, no migration, nothing irreversible.

---

## Observability & monitoring

N/A — no production deployment. The pack is markdown distributed through the Claude Code marketplace and run client-side. The closest thing to monitoring is the eval (`eval/run.js`): a skilled-vs-naked score delta and an anti-monoculture score, run manually. The 2.0 success signal is qualitative and behavioral: do the user and the teammate reach for `pm` (and specifically the `review` mode) the way they reached for `/pm:review`. There is no metric to instrument and nobody to page.

---

## Open questions

1. **Nested `reference/` subdirectories (A-001).** Confirm Claude Code resolves `reference/modes/review.md` and `reference/knowledge/specification.md` linked from `SKILL.md`. Resolve before Wave 1 by a one-file probe: a stub `SKILL.md` linking one nested reference, invoked once. If it fails, switch to flat `reference/` with a filename prefix convention. Content of the plan is unaffected; only paths change.
2. **`teach` and `setup` as two modes or one.** `teach` captures product context to `.pmcontext.md`; `setup` generates a team `CLAUDE.md`. They are both "set up context." This plan keeps them as two modes (mechanical migration, low risk). Merging them is a reasonable later simplification; not decided here.
3. **Default on no-match (routing rule 3).** This plan defaults unmatched input into `review`. The alternative is to always show the menu. Defaulting to `review` is chosen because it is the dominant use; flag for `/review-plan` to confirm.
4. **`eval/run.js` model ID.** Line 15 pins `claude-sonnet-4-20250514`, an old identifier. Not touched by this plan. Worth a separate one-line fix; noted, not scheduled.

---

## Wave 0 validation design

There is no test framework in pm-skills; verification is line counts, link resolution, the eval dry-run, and manual routing checks. Wave 0 builds the one piece of automated checking the plan relies on.

- **REQ-001, REQ-003** (one skill, nine modes): testable after Wave 2-3 via `scripts/check-structure.mjs`, which lists modes in `SKILL.md`'s commands table and asserts each has a `reference/modes/<mode>.md`. First task that makes it testable: T-001 (the script) plus T-002 (the table).
- **REQ-002, REQ-005** (size ceilings): testable per file the moment it exists, via `wc -l` and `check-structure.mjs`. First task: T-002 for `SKILL.md`, T-014 for `review.md`.
- **REQ-004, REQ-006, REQ-008, REQ-009** (mode behavior): not unit-testable in a markdown pack. Verified by `grep` for the required section headers in the mode files (named in each task's `verify`) and by manual invocation in T-024.
- **REQ-012** (eval works): testable via `node eval/run.js --dry-run`, which exercises `buildSkillContext` without spending API budget and prints the system-prompt character count. First task: T-023.
- **REQ-013** (sync): testable via `diff -r source/skills/pm .claude/skills/pm` returning no differences. First task: T-017.

Wave 0 deliverable: `scripts/check-structure.mjs`. It will report failures until the structure exists; that is expected. It is exercised for real in T-024.

---

## Execution manifest

```yaml
execution_manifest:
  - id: T-001
    wave: 0
    depends_on: []
    files_modified: ["scripts/check-structure.mjs"]
    requirements: ["REQ-001", "REQ-002", "REQ-003", "REQ-005"]
    must_haves:
      - "script asserts each mode in SKILL.md commands table has reference/modes/<mode>.md"
      - "script asserts every relative reference link in pm/ resolves to a file"
      - "script asserts SKILL.md <= 200 lines and review.md <= 150 lines"
      - "exit 0 when clean, exit 1 with a printed failure list"
    verify: "node scripts/check-structure.mjs; echo exit=$?"
    done: "script runs and reports structured pass/fail"

  - id: T-002
    wave: 1
    depends_on: ["T-001"]
    files_modified: ["source/skills/pm/SKILL.md"]
    requirements: ["REQ-001", "REQ-002", "REQ-009", "REQ-015"]
    must_haves:
      - "frontmatter has name: pm, user-invokable: true, a keyword-rich description, argument-hint listing 9 modes"
      - "body has Context Gathering Protocol, 8 PM Principles, the 9-item Slop Test checklist"
      - "body has a 9-row commands table and 3 routing rules"
      - "contains the line 'Claude generates, the pack critiques'"
    verify: "wc -l source/skills/pm/SKILL.md (<=200); grep -c 'routing' source/skills/pm/SKILL.md"
    done: "SKILL.md exists, <=200 lines, all named sections present"

  - id: T-003
    wave: 1
    depends_on: ["T-001"]
    files_modified: ["source/skills/pm/reference/foundations.md"]
    requirements: ["REQ-009"]
    must_haves:
      - "contains the PM Reflex Rejection procedure"
      - "contains the slop taxonomy (substance slop 1-8, voice slop 9-11)"
      - "contains the PM anti-patterns"
    verify: "grep -E 'Reflex Rejection|Slop Taxonomy|Anti-Pattern' source/skills/pm/reference/foundations.md"
    done: "foundations.md exists with all three sections"

  - id: T-004
    wave: 1
    depends_on: ["T-001"]
    files_modified:
      - "source/skills/pm/reference/knowledge/discovery.md"
      - "source/skills/pm/reference/knowledge/decision-making.md"
      - "source/skills/pm/reference/knowledge/specification.md"
      - "source/skills/pm/reference/knowledge/communication.md"
      - "source/skills/pm/reference/knowledge/prioritisation.md"
      - "source/skills/pm/reference/knowledge/leadership.md"
      - "source/skills/pm/reference/knowledge/positioning.md"
      - "source/skills/pm/reference/knowledge/prompting.md"
      - "source/skills/pm/reference/knowledge/review-personas.md"
    requirements: ["REQ-007"]
    must_haves:
      - "all 9 files copied from source/skills/product-management/reference/"
      - "internal relative links repointed to the new knowledge/ and modes/ paths"
    verify: "ls source/skills/pm/reference/knowledge/ | wc -l (>=9); grep -rL 'product-management' source/skills/pm/reference/knowledge/"
    done: "9 knowledge files exist with no stale product-management paths"

  - id: T-005
    wave: 1
    depends_on: ["T-001"]
    files_modified: ["source/skills/pm/reference/knowledge/metrics.md"]
    requirements: ["REQ-007"]
    must_haves:
      - "contains the primary / secondary / guardrail / counter-metric framework extracted from metrics/SKILL.md"
      - "contains a 'Critiquing this artifact' section for metrics docs"
    verify: "grep -E 'guardrail|counter-metric|Critiquing' source/skills/pm/reference/knowledge/metrics.md"
    done: "knowledge/metrics.md exists with framework and critique section"

  - id: T-006
    wave: 2
    depends_on: ["T-002", "T-003", "T-004"]
    files_modified: ["source/skills/pm/reference/modes/brief.md"]
    requirements: ["REQ-003", "REQ-008"]
    must_haves:
      - "adapted from brief/SKILL.md with MANDATORY PREPARATION and What's Next blocks removed"
      - "asks for the target audience rather than assuming engineering"
    verify: "grep -i 'audience' source/skills/pm/reference/modes/brief.md; wc -l (<=150)"
    done: "brief.md exists, audience-aware, within size target"

  - id: T-007
    wave: 2
    depends_on: ["T-002", "T-003", "T-004"]
    files_modified: ["source/skills/pm/reference/modes/spec.md"]
    requirements: ["REQ-003"]
    must_haves: ["adapted from spec/SKILL.md, boilerplate blocks removed", "links to knowledge/specification.md"]
    verify: "wc -l source/skills/pm/reference/modes/spec.md (<=150); node scripts/check-structure.mjs"
    done: "spec.md exists and its links resolve"

  - id: T-008
    wave: 2
    depends_on: ["T-002", "T-003", "T-004"]
    files_modified: ["source/skills/pm/reference/modes/stories.md"]
    requirements: ["REQ-003"]
    must_haves: ["adapted from stories/SKILL.md, boilerplate blocks removed", "links to knowledge/specification.md"]
    verify: "wc -l source/skills/pm/reference/modes/stories.md (<=150); node scripts/check-structure.mjs"
    done: "stories.md exists and its links resolve"

  - id: T-009
    wave: 2
    depends_on: ["T-002", "T-003", "T-005"]
    files_modified: ["source/skills/pm/reference/modes/metrics.md"]
    requirements: ["REQ-003"]
    must_haves: ["adapted from metrics/SKILL.md, boilerplate removed", "links to knowledge/metrics.md, framework not duplicated inline"]
    verify: "wc -l source/skills/pm/reference/modes/metrics.md (<=150); node scripts/check-structure.mjs"
    done: "metrics.md exists, cites knowledge/metrics.md"

  - id: T-010
    wave: 2
    depends_on: ["T-002"]
    files_modified: ["source/skills/pm/reference/modes/teach.md"]
    requirements: ["REQ-003", "REQ-009"]
    must_haves: ["adapted from teach-pm/SKILL.md", "writes .pmcontext.md as before"]
    verify: "grep '.pmcontext.md' source/skills/pm/reference/modes/teach.md"
    done: "teach.md exists, retains context-capture behavior"

  - id: T-011
    wave: 2
    depends_on: ["T-002"]
    files_modified: ["source/skills/pm/reference/modes/setup.md"]
    requirements: ["REQ-003"]
    must_haves: ["adapted from setup/SKILL.md", "generates a team CLAUDE.md"]
    verify: "wc -l source/skills/pm/reference/modes/setup.md (<=150); node scripts/check-structure.mjs"
    done: "setup.md exists"

  - id: T-012
    wave: 2
    depends_on: ["T-002", "T-004"]
    files_modified: ["source/skills/pm/reference/modes/decide.md"]
    requirements: ["REQ-003"]
    must_haves: ["adapted from decide/SKILL.md, boilerplate removed", "links to knowledge/decision-making.md"]
    verify: "wc -l source/skills/pm/reference/modes/decide.md (<=150); node scripts/check-structure.mjs"
    done: "decide.md exists and its links resolve"

  - id: T-013
    wave: 2
    depends_on: ["T-002", "T-004"]
    files_modified: ["source/skills/pm/reference/modes/discover.md"]
    requirements: ["REQ-003"]
    must_haves: ["adapted from discover/SKILL.md, boilerplate removed", "links to knowledge/discovery.md"]
    verify: "wc -l source/skills/pm/reference/modes/discover.md (<=150); node scripts/check-structure.mjs"
    done: "discover.md exists and its links resolve"

  - id: T-014
    wave: 3
    depends_on: ["T-002", "T-003", "T-004", "T-005"]
    files_modified: ["source/skills/pm/reference/modes/review.md"]
    requirements: ["REQ-004", "REQ-005", "REQ-006"]
    must_haves:
      - "has a Frame section (audience, situation, intent questions, absorbing translate Step 1 and stakeholders Steps 1-2)"
      - "has a Critique section (adversarial, persona-based, runs the Slop Test)"
      - "has a Refine section (surgical edits, slop-tested before output)"
      - "has a document-type routing table mapping type to one knowledge file"
      - "has a generic-document fallback checklist"
      - "covers the audit strategic-alignment check and the retro document type"
      - "file is <= 150 lines and contains no per-document-type critique content"
    verify: "wc -l source/skills/pm/reference/modes/review.md (<=150); grep -E 'Frame|Critique|Refine|routing' review.md; node scripts/check-structure.mjs"
    done: "review.md exists, <=150 lines, three phases plus routing table plus fallback present"

  - id: T-015
    wave: 3
    depends_on: ["T-004", "T-005"]
    files_modified:
      - "source/skills/pm/reference/knowledge/specification.md"
      - "source/skills/pm/reference/knowledge/decision-making.md"
      - "source/skills/pm/reference/knowledge/positioning.md"
      - "source/skills/pm/reference/knowledge/communication.md"
      - "source/skills/pm/reference/knowledge/prioritisation.md"
      - "source/skills/pm/reference/knowledge/review-personas.md"
    requirements: ["REQ-004", "REQ-006"]
    must_haves:
      - "each of the 6 files gains one 'Critiquing this artifact' section"
      - "communication.md's section covers the audience/translate and stakeholder-message critique"
      - "decision-making.md's section covers both strategy-doc and retro-doc critique"
    verify: "grep -l 'Critiquing this artifact' source/skills/pm/reference/knowledge/*.md | wc -l (>=6)"
    done: "6 knowledge files carry a critique section keyed by document type"

  - id: T-016
    wave: 4
    depends_on: ["T-006","T-007","T-008","T-009","T-010","T-011","T-012","T-013","T-014","T-015"]
    files_modified: ["source/skills/audit","source/skills/brief","source/skills/decide","source/skills/discover","source/skills/metrics","source/skills/position","source/skills/prioritise","source/skills/product-management","source/skills/retro","source/skills/review","source/skills/setup","source/skills/spec","source/skills/stakeholders","source/skills/stories","source/skills/strategy","source/skills/teach-pm","source/skills/translate"]
    requirements: ["REQ-001"]
    must_haves: ["all 17 old skill directories removed from source/skills/", "source/skills/ contains only pm/"]
    verify: "ls source/skills/ (only 'pm')"
    done: "source/skills/ holds the pm skill alone"

  - id: T-017
    wave: 4
    depends_on: ["T-016"]
    files_modified: [".claude/skills"]
    requirements: ["REQ-013"]
    must_haves: ["old .claude/skills/* directories removed", "source/skills/pm copied to .claude/skills/pm", "diff -r shows no difference"]
    verify: "diff -r source/skills/pm .claude/skills/pm; ls .claude/skills/ (only 'pm')"
    done: ".claude/skills/ mirrors source/skills/ exactly"

  - id: T-018
    wave: 4
    depends_on: ["T-016"]
    files_modified: [".claude-plugin/plugin.json"]
    requirements: ["REQ-010"]
    must_haves: ["version is 2.0.0", "description describes one skill with modes"]
    verify: "grep '2.0.0' .claude-plugin/plugin.json; node -e \"JSON.parse(require('fs').readFileSync('.claude-plugin/plugin.json'))\""
    done: "plugin.json is valid JSON, version 2.0.0, updated description"

  - id: T-019
    wave: 4
    depends_on: ["T-016"]
    files_modified: [".claude-plugin/marketplace.json"]
    requirements: ["REQ-010", "REQ-015"]
    must_haves: ["version is 2.0.0", "description rewritten for one skill", "contains 'Claude generates, the pack critiques'"]
    verify: "grep -E '2.0.0|critiques' .claude-plugin/marketplace.json; node -e \"JSON.parse(require('fs').readFileSync('.claude-plugin/marketplace.json'))\""
    done: "marketplace.json is valid JSON, version 2.0.0, positioning line present"

  - id: T-020
    wave: 4
    depends_on: ["T-016"]
    files_modified: ["CLAUDE.md"]
    requirements: ["REQ-011"]
    must_haves: ["architecture section describes one skill with modes", "file map matches the new structure", "source-to-.claude sync rule retained", "impeccable reference path updated to 3.1.1"]
    verify: "grep -E 'modes|3.1.1' CLAUDE.md; grep -c 'product-management/SKILL' CLAUDE.md (expect 0)"
    done: "CLAUDE.md describes the 2.0 architecture accurately"

  - id: T-021
    wave: 4
    depends_on: ["T-016"]
    files_modified: ["README.md"]
    requirements: ["REQ-011", "REQ-015"]
    must_haves: ["command tables replaced by the mode list", "install section retained and correct", "contains 'Claude generates, the pack critiques'"]
    verify: "grep -E 'modes|critiques' README.md; grep -c '16 [Cc]ommands' README.md (expect 0)"
    done: "README.md describes the 2.0 pack"

  - id: T-022
    wave: 4
    depends_on: ["T-016"]
    files_modified: ["CHANGELOG.md"]
    requirements: ["REQ-014"]
    must_haves: ["a 2.0.0 entry above 1.5.1", "a Breaking section naming removed commands", "a migration note stating the new pm invocation"]
    verify: "grep -E '2.0.0|Breaking' CHANGELOG.md"
    done: "CHANGELOG.md has the 2.0.0 entry with breaking and migration notes"

  - id: T-023
    wave: 5
    depends_on: ["T-017"]
    files_modified: ["eval/run.js"]
    requirements: ["REQ-012"]
    must_haves:
      - "loadSkillFile reads source/skills/pm/reference/modes/<skill>.md"
      - "buildSkillContext loads pm/SKILL.md plus the mode file plus the knowledge files the mode links"
      - "the obsolete ../product-management/reference/ regex is replaced"
      - "skill_targets brief and spec still resolve and run"
    verify: "node eval/run.js --dry-run -f b2b-saas-search -s brief"
    done: "dry-run prints a non-trivial skilled system-prompt char count and no load errors"

  - id: T-024
    wave: 5
    depends_on: ["T-018","T-019","T-020","T-021","T-022","T-023"]
    files_modified: []
    requirements: ["REQ-001","REQ-003","REQ-005","REQ-012","REQ-013"]
    must_haves:
      - "node scripts/check-structure.mjs exits 0"
      - "node eval/run.js --dry-run completes with no load errors"
      - "manual: invoking pm with no arg shows the menu; pm review <file> enters Frame"
      - "diff -r source/skills/pm .claude/skills/pm is empty"
    verify: "node scripts/check-structure.mjs; node eval/run.js --dry-run; diff -r source/skills/pm .claude/skills/pm"
    done: "structure check passes, eval dry-run clean, sync verified, routing manually confirmed"
```

---

## Workflow artifacts

Run under `/build` with slug `pm-v2`. Artifacts under `.build/plans/`:

- `pm-v2-plan.md`: this plan. Written Phase 1, read by every later phase.
- `pm-v2-context.md`: repo conventions, constraints, discovered patterns, out-of-scope. Written Phase 1, read Phases 2 to 4.
- `pm-v2-requirements.md`: canonical `REQ`/`D`/`A`, acceptance criteria, `must_haves`. Written Phase 1, read Phases 2 to 4.
- `pm-v2-state.md`: phase, `base_ref`, completed task IDs, history. Written Phase 1, updated by every phase.
- `pm-v2-review.md`: plan review findings and verdict. Written Phase 2, read Phase 3.
- `pm-v2-implementation-summary.md`: waves completed, task IDs, files changed, deviations, blockers. Written and updated through Phase 3, read Phases 3c and 4.
- `pm-v2-verify.md`: verification report with command evidence. Written Phase 3c, read Phase 4.
- `pm-v2-architect-review.md`: architect review findings and verdict. Written Phase 4.

---

## UI contract

N/A — no UI files change. The pack is markdown skill files and one Node script. The marketing website has a UI but lives in a separate repo and is out of scope (D-010).

---

## Parallel workstreams

- **WS-foundations** (Wave 1): `SKILL.md`, `foundations.md`, the 9 migrated knowledge files, `knowledge/metrics.md`. Files: T-002 through T-005. Complexity: complex (the router and the foundations split need judgement). Depends on: WS-validation (T-001).
- **WS-generator-modes** (Wave 2): `brief`, `spec`, `stories`, `metrics` mode files. Files: T-006 through T-009. Complexity: simple (adaptation of existing skill files). Depends on: WS-foundations.
- **WS-support-modes** (Wave 2): `teach`, `setup`, `decide`, `discover` mode files. Files: T-010 through T-013. Complexity: simple. Depends on: WS-foundations. Runs in parallel with WS-generator-modes; no shared files.
- **WS-review** (Wave 3): `review.md` and the six knowledge-file critique sections. Files: T-014, T-015. Complexity: complex (the new flagship; the weight discipline matters). Depends on: WS-foundations. T-014 and T-015 touch disjoint files and run in parallel.
- **WS-config-docs** (Wave 4): delete old dirs, sync `.claude/`, `plugin.json`, `marketplace.json`, `CLAUDE.md`, `README.md`, `CHANGELOG.md`. Files: T-016 through T-022. Complexity: simple but order-sensitive (T-016 then T-017; the rest parallel after T-016). Depends on: WS-generator-modes, WS-support-modes, WS-review.
- **WS-eval** (Wave 5): `eval/run.js` and final verification. Files: T-023, T-024. Complexity: complex (T-023 rewrites coupled loader logic). Depends on: WS-config-docs.

Wave 1 is the only true bottleneck: every later workstream depends on it. Waves 2 and 3 can overlap once Wave 1 lands (T-014 needs only Wave 1, not the Wave 2 modes).

---

## Implementation order

1. **T-001** — Write `scripts/check-structure.mjs`: read `SKILL.md`'s commands table, assert each mode has `reference/modes/<mode>.md`; walk every `.md` under `source/skills/pm/`, assert each relative link target exists; assert `SKILL.md` ≤ 200 and `review.md` ≤ 150 lines; exit 1 with a failure list otherwise.
2. **T-002** — Write `source/skills/pm/SKILL.md`: frontmatter (`name: pm`, `user-invokable: true`, keyword-rich `description` modelled on impeccable 3.1.1 line 3, `argument-hint` listing the 9 modes); Context Gathering Protocol condensed from `product-management/SKILL.md` lines 8-28; the 8 PM Principles as one-liners; the 9-item Slop Test checklist; a 9-row commands table (`mode | category | description | reference`); 3 routing rules.
3. **T-003** — Write `reference/foundations.md`: the Reflex Rejection procedure, the slop taxonomy, the anti-patterns, lifted from `product-management/SKILL.md`.
4. **T-004** — Copy the 9 files from `source/skills/product-management/reference/` to `source/skills/pm/reference/knowledge/`; repoint internal links to `../knowledge/` and `../modes/`.
5. **T-005** — Write `reference/knowledge/metrics.md`: extract the primary/secondary/guardrail/counter-metric framework from `metrics/SKILL.md`; add a "Critiquing this artifact" section.
6. **T-006 to T-013** — Write the 8 non-review mode files from the matching current skill files, dropping the "MANDATORY PREPARATION" and "What's Next" blocks; `brief.md` adds the audience question.
7. **T-014** — Write `reference/modes/review.md`: Frame section (audience/situation/intent questions absorbed from `translate` and `stakeholders`); Critique section (adversarial, persona-based, runs the Slop Test); Refine section (surgical, slop-tested); the document-type routing table; a generic fallback checklist. No per-type critique content inline.
8. **T-015** — Add one "Critiquing this artifact" section to each of `specification.md`, `decision-making.md`, `positioning.md`, `communication.md`, `prioritisation.md`, `review-personas.md`.
9. **T-016** — Delete the 17 old directories under `source/skills/`.
10. **T-017** — Delete the old `.claude/skills/*` directories; copy `source/skills/pm/` to `.claude/skills/pm/`.
11. **T-018 to T-022** — Update `plugin.json`, `marketplace.json`, `CLAUDE.md`, `README.md`, `CHANGELOG.md`.
12. **T-023** — Rewrite `eval/run.js` loaders: `loadSkillFile` reads `reference/modes/<skill>.md`; `buildSkillContext` loads `pm/SKILL.md` + the mode file + the knowledge files the mode links; remove the `../product-management/reference/` regex.
13. **T-024** — Run `scripts/check-structure.mjs`, `eval/run.js --dry-run`, `diff -r source/skills/pm .claude/skills/pm`, and a manual routing check.

---

## Verification

- **Structure** (REQ-001, 002, 003, 005, 013): `node scripts/check-structure.mjs` exits 0. `ls source/skills/` shows only `pm`. `diff -r source/skills/pm .claude/skills/pm` is empty. `wc -l` on `SKILL.md` ≤ 200 and `review.md` ≤ 150.
- **Modes present** (REQ-003): `ls source/skills/pm/reference/modes/` shows the 9 expected files.
- **`review` shape** (REQ-004, 005, 006): `grep` in `review.md` finds the Frame, Critique, Refine headers, the routing table, and the generic fallback; `grep` confirms no document-type critique body text is inlined; the routing table lists the 7 type rows plus "other".
- **Folded skills** (REQ-006, 007): no `translate`, `stakeholders`, `audit`, `retro`, `strategy`, `position`, `prioritise` directory exists; `grep` finds their critique guidance inside the `review` routing table and the knowledge files.
- **brief audience** (REQ-008): `grep -i audience source/skills/pm/reference/modes/brief.md` matches.
- **Config** (REQ-010): `plugin.json` and `marketplace.json` parse as JSON and show `2.0.0`.
- **Docs** (REQ-011, 014, 015): `CLAUDE.md` and `README.md` contain no "16 commands" / "product-management/SKILL" references; `CHANGELOG.md` has the `2.0.0` breaking entry; the positioning line is present in `SKILL.md`, `README.md`, `marketplace.json`.
- **Eval** (REQ-012): `node eval/run.js --dry-run -f b2b-saas-search -s brief` completes with no load error and prints a skilled system-prompt char count well above the length of `SKILL.md` alone (proving references loaded).
- **Manual routing**: invoke `pm` with no argument (menu appears); `pm review <a spec file>` (enters Frame, asks audience/intent, then critiques as a spec); `pm brief` (asks the audience); `pm strategy` (no such mode: routing rule 3 confirms intent rather than erroring).
- **Behavioral signal** (post-ship, not a gate): the user and the teammate reach for `pm`, and for the `review` mode specifically, without prompting.

---

## Self-review

- Spec coverage: REQ-001 to REQ-015 each map to at least one task (T-001 to T-024). Checked.
- Requirement/decision coverage: every `REQ-*` appears in the manifest `requirements` fields and in Verification. `D-*` are design decisions reflected in the Approach and file map. Checked.
- Placeholder scan: no "TBD", "handle appropriately", "follow existing patterns", or vague deferral language. Sizes, files, and commands are named. Checked.
- Type consistency: mode names, file paths, and task IDs are spelled identically throughout (`reference/modes/`, `reference/knowledge/`, `review.md`). Checked.
- File map matches steps: every file in the map appears in the manifest and implementation order, and vice versa. Checked.
- All sections present: every required section exists; N/A sections (Data impact, New dependencies, Access control runtime, Observability, Workflow artifacts, UI contract) state why. Checked.
- Execution manifest validity: every task has `id`, `wave`, `depends_on`, `files_modified`, `requirements`, `must_haves`, `verify`, `done`. Same-wave tasks touch disjoint files (Wave 4's T-016 deletes directories, T-017 onward touch distinct files; T-014 and T-015 are disjoint). Checked.
- Observability: N/A justified (no production deployment).
- Dependency justification: None introduced; stated explicitly.
