# Changelog

## 2.3.0 - 2026-06-04

### Added

- **The Claudism Catalogue** in `reference/foundations.md`: a curated, growable catalogue of distinctly-Claude analytical-register tells, distinct from the older slop taxonomy (which covers the GPT-era tells like delve/tapestry and em dashes). Eleven families: performative pushback, the reframe announcement, naming the move, structural metaphor and forced conceit, the antithesis flip, false candor plus the validation stamp, the aphoristic closer, emphasis and rhythm tics, the false universal, the clean mental model, and the strategy-memo register; plus a register-vocabulary list. The catalogue tracks sentence-skeletons (setups), not just exact phrases, because the slot-fillers swap while the shape repeats (for example "it's the question every [audit] turns on", "the cleanest way to hold it is as four layers").

### Changed

- `review` mode runs the Claudism Catalogue as an explicit AI-tell scan inside the Critique loop: quote each tell, name its family, give the fix. Three or more tells from different families flags the draft as AI-generated in the slop verdict.
- The generator modes (`brief`, `spec`, `stories`, `metrics`) now run a **Voice pass** as a post-generation gate, scanning their own prose against the Slop Taxonomy and Claudism Catalogue before delivering. `stories` and `metrics` gained a dedicated voice step; `brief` and `spec` append it to their existing slop-test step.
- The PM Slop Test in `SKILL.md` gained a universal "reads as written, not generated" check pointing at the catalogue, so `decide`, `setup`, and `discover` inherit the voice gate too.

---

## 2.1.0 - 2026-05-20

### Added

- `decide` mode now logs decisions to `pmdecisions.md` at the project root after a decision is made. Includes a read-flywheel (Step 0) that surfaces open and revisit-triggered entries on a fresh session, user-initiated supersede flow that updates prior entries inline, and an archival prompt at 30 entries or 600 lines.
- `decisions_log: enabled | disabled` key under a new `## Settings` section in `.pmcontext.md` controls per-repo opt-in. First `decide` run in a new repo asks once via AskUserQuestion and persists the answer.
- `pmdecisions-archive.md` holds archived entries when the active log gets long. Move is user-prompted, never automatic.
- Filesystem write failures during logging fall back to in-conversation-only with a one-line acknowledgement.

### Changed

- `review` mode now always emits the Refine prompt after Critique. Previous behaviour sometimes terminated at Critique silently. The prompt text is exact: "Want me to draft fixes for the P0s and P1s now?" (or, if zero P0/P1 findings exist, "Want me to refine the P2s, or is this ready?"). Decline is a valid exit; accept continues into Refine with the existing slop-test gate.
- New convention documented in `CLAUDE.md`: pm-skills modes that write working files to the project root use the `pm`-prefix-no-hyphen root (`pmdecisions.md`), matching `.pmcontext.md`. Modifier suffixes use a single hyphen (`pmdecisions-archive.md`).
- `mode-teach.md` updated to preserve sections it does not own (such as `## Settings`) when re-running.

---

## 2.0.1 - 2026-05-19

### Changed

- Rewrote the `pm` skill description for sharper invocation matching: a five-part structure (use when, covers, handles, also use for, not for) with concrete scenarios, modelled on the impeccable skill.

---

## 2.0.0 - 2026-05-18

### Breaking

The 16 separate `/pm:*` commands (`/pm:brief`, `/pm:review`, `/pm:decide`, `/pm:spec`, `/pm:stories`, `/pm:metrics`, `/pm:teach-pm`, `/pm:setup`, `/pm:discover`, `/pm:prioritise`, `/pm:audit`, `/pm:strategy`, `/pm:position`, `/pm:translate`, `/pm:stakeholders`, `/pm:retro`) are removed. They are replaced by a single `pm` skill with nine modes.

### Migration

Replace every `/pm:<command>` invocation with `/pm <mode>`:

| Was | Now |
|-----|-----|
| `/pm:teach-pm` | `/pm teach` |
| `/pm:setup` | `/pm setup` |
| `/pm:brief` | `/pm brief` |
| `/pm:spec` | `/pm spec` |
| `/pm:stories` | `/pm stories` |
| `/pm:metrics` | `/pm metrics` |
| `/pm:review` | `/pm review` |
| `/pm:decide` | `/pm decide` |
| `/pm:discover` | `/pm discover` |
| `/pm:prioritise` | `/pm review` (strategy/roadmap input) |
| `/pm:audit` | `/pm review` (strategic alignment) |
| `/pm:strategy` | `/pm review` (strategy doc) |
| `/pm:position` | `/pm review` (positioning doc) |
| `/pm:translate` | `/pm review` (audience reframe) |
| `/pm:stakeholders` | `/pm review` (stakeholder message) |
| `/pm:retro` | `/pm review` (retro doc) |

The `review` mode is document-type-aware and absorbs the critique function of translate, stakeholders, audit, retro, strategy, position, and prioritise. Run `/pm` with no argument to see the mode menu.

### Added

- Single `pm` skill replacing 16 separate skills, version 2.0.0
- Nine modes: teach, setup, brief, spec, stories, metrics, review, decide, discover
- Flat `reference/` directory: `foundations.md`, nine `mode-*.md` files, ten `knowledge-*.md` files
- `review` mode: document-type-aware Frame, Critique, Refine loop
- Positioning line: "Claude generates, pm-skills critiques"

---

## 1.5.1 - 2026-05-17

### Changed

- Updated GitHub repository references to `jameshemson/pm-skills`.
- Updated install command:
  - `/plugin marketplace add jameshemson/pm-skills`

### Migration

Existing installs should update their marketplace source to `jameshemson/pm-skills`.
