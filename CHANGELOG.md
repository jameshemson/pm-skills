# Changelog

## 2.13.0 - 2026-06-10

### Added

- **Persona rows for comms, roadmap, and retro.** The persona selection table in `knowledge-review-personas.md` now prescribes personas for stakeholder message / comms (Exec, Critic; add Customer for customer-facing comms), roadmap / prioritisation (Exec, Critic, Dev), and retro / post-launch review (Critic, Exec) - the three doc types empirically confirmed as improvised choices before this release.
- **OKR routing.** The document-type table in `mode-review.md` now routes "OKRs, quarterly goals" to `knowledge-metrics.md`. That file's Critiquing section gains a five-checkbox OKR block: outcome-framed objective, measures not milestones, baselines present, at most one aspirational KR labelled as such, and no KR outside the team's influence.
- **Context staleness nudge.** `teach` mode now writes `last_updated: YYYY-MM-DD` at the top of the Product Context section and refreshes it on every update (adding it if absent in an older file). The Context Gathering Protocol fires one non-blocking nudge when `last_updated` is more than six months old; no line means no nudge.

### Changed

- **Persona count is table-driven.** "Pick 3-4 personas" is replaced with "pick the personas the table lists for the document type (2-4)" everywhere - in the selection table header and in `mode-review.md` Phase 2. The three new rows above make this concrete for every doc type now covered.

---

## 2.12.0 - 2026-06-10

### Added

- **Template camouflage** named as substance slop item 10. AI-PRD tool output (ChatPRD, Figma AI PRD, template mills) produces complete section structure with generic content - structure used as evidence of thinking. The detection test is regeneration, not length: cover the heading and read the section; if the text could sit under the same heading in any product's document, the section is camouflage. Each camouflaged section fails the slop-test check it fakes (once, not twice). Reviews of tool-generated PRDs lead with the doc-level diagnosis: "template camouflage: N of M sections regenerable from their headings". Voice slop items renumber 10-12 to 11-13.
- `review` Critique step 1 now instructs: for any document with standard template structure, run the camouflage test once, section by section, before line-level scans - the doc-level diagnosis frames the itemised findings.

---

## 2.11.1 - 2026-06-10

### Fixed

- **mode/knowledge duplication collapsed for metrics.** mode-metrics.md carried near-verbatim copies of the interrogation questions, metric-stack definitions, target fields, measurement-plan fields, and the output format from knowledge-metrics.md. The mode now holds procedure and pointers; knowledge-metrics.md is the single source for definitions. The output-table divergence is resolved - two Secondary rows is canonical, matching the "2-3 secondary metrics" rule. The Metric Quality Test has one home: mode-metrics.md Step 5 (the delivery gate). knowledge-metrics.md's copy is replaced with a one-line pointer. Calibration not required; no gate-relevant file touched.

---

## 2.11.0 - 2026-06-10

### Changed

- **teach and setup interview in bounded rounds.** Both onboarding modes now run the interview in rounds of at most 4 questions per AskUserQuestion call, ordered by what downstream modes consume most. Questions with genuinely enumerable options go in AskUserQuestion rounds; free-text questions (vision, job-to-be-done, hardest problem) are open prompts in conversation between rounds. After Round 2, the user is offered an early exit; unanswered sections are written as `[Not captured - ask me and update this section]` rather than invented. Ways of Working remains omit-if-empty.

---

## 2.10.0 - 2026-06-10

### Added

- **Session-only escape hatch.** The Context Gathering Protocol no longer forces new users into the teach interview before they can do any work. When no `.pmcontext.md` exists, the skill now offers a fork via AskUserQuestion: set up context properly (recommended, persists to `.pmcontext.md`) or answer three fixed questions for this session only. Session-only answers are never written to any file. Every deliverable produced on the session-only path carries one line noting the limitation and one closing pointer to `pm teach`; neither repeats.
- **Three fixed session questions.** (1) What is the product, in one sentence, and who uses it? (2) What outcome is the work in front of us supposed to move? (3) What is the team explicitly NOT doing right now? These map to the three context sections modes lean on most.
- **Review merges the session questions into Frame.** When the protocol enters session-only mode, `review` folds the three questions into its existing Frame conversation rather than running a separate gate - one interview, not two.
- **Edge case handling.** When the document under review is not about this repo's product (a colleague's doc, an example), session-only is the right path and the three questions target that product. When running outside any project directory, session-only is the default; choosing `teach` gets a warning about where `.pmcontext.md` will land.

---

## 2.9.1 - 2026-06-10

### Fixed

- **Voice alone no longer gates SLOP.** Gate 1's Claudism-family clause now requires weak substance too: three or more families AND three or more failed slop-test checks (five failed checks still gate SLOP regardless of voice). Calibration runs showed three borderline single-instance tells could band a substantively strong spec SLOP, and tell detection on borderline instances is noisy run to run. A register-heavy but sound document now bands by gates 2-4 and is held out of SHIP by the existing tell-cap; the review still names the register in the slop verdict. This closes the contradiction with the 2.9.0 voice-finding rule, which already said voice alone lands SOLID at best.

---

## 2.9.0 - 2026-06-10

### Added

- **Severity anchors.** P0, P1, and P2 are now defined by their effect on the document's audience, with per-type anchor examples for specs, metrics docs, strategy docs, stakeholder messages, and roadmaps, plus a tie-break rule that biases toward the lower severity. The ROUGH/SOLID boundary rests on these counts; they now have calibration behind them. Lives in `knowledge-craft-score.md` beside the gates they feed.
- **The voice-finding rule.** Claudism tells and voice slop never carry P-severities; they reach the verdict only through the SLOP gate (family count) and the SHIP gate (tell count). A register-heavy but substantively sound doc lands SOLID at best, never ROUGH on voice alone. A tell that hides a substance gap is logged on both tracks.

---

## 2.8.1 - 2026-06-10

### Fixed

- The PM Slop Test existed in three diverging copies (10 checks in SKILL.md, 7 in `brief`, 8 in `spec`), and the SLOP gate counted failures against an unnamed list. SKILL.md's ten checks are now the single canonical list; `brief` and `spec` reference it, and the gate names its denominator ("five or more of the ten"). `brief` and `spec` therefore now also check trade-offs, concision, and register tells at the checklist level.

---

## 2.8.0 - 2026-06-10

### Added

- The Demand-Side Sales four-forces framework (push, pull, anxiety, habit) now lives in `knowledge-discovery.md`, where `discover` mode has pointed all along. The pointer was broken; the model is now where the mode says it is.
- Routing aliases: `critique`, `audit`, `translate`, `sharpen`, and `retro` route straight to `review`; `debrief` and `interview` route to `discover`'s sub-modes. Previously `debrief` dead-ended.
- The slop taxonomy gains mirror slop, four register words, the overused-qualifier list, and three verb-inflation tells, merged from the retired prompting reference.

### Removed

- `knowledge-prompting.md`. It was referenced by nothing and carried a second, diverging copy of the slop taxonomy. Its unique detection content moved to `foundations.md`; the rest is in git history.

### Changed

- The Claudism Catalogue's growth note now tells a runtime agent to flag unclassified tells in review output instead of editing what may be a read-only installed file.

---

## 2.7.0 - 2026-06-09

### Added

- **The verdict band.** `review` mode now ends Critique with one of four verdicts - SLOP / ROUGH / SOLID / SHIP - picked by findings-anchored gates (Claudism family count, slop-test failures, P0/P1 counts) defined in the new `reference/knowledge-craft-score.md`. The 0-100 score behind the band is internal and never displayed. Includes the self-grading disclosure: a band that rises after applied Refine fixes measures "Claude fixed what Claude flagged", not the author's own revision.

### Changed

- The band replaces the previous readiness verdict (Ready / Needs Work / Not Ready) in the Critique deliverable.

---

## 2.6.1 - 2026-06-09

### Changed

- Plugin and marketplace descriptions now lead with critique ("Claude generates, pm-skills critiques") instead of a flat nine-mode list, and frame the drafting modes as critique-inflected.
- README adds the companion anchor to Anthropic's official PM plugin: pm-skills is the second opinion it can't give you, with no dependency between them.
- CLAUDE.md versioning rule now requires a CHANGELOG entry and a website footer version update with every bump.

---

## 2.6.0 - 2026-06-04

_(Entry added retroactively on 2026-06-09; the release shipped without one.)_

### Added

- New Claudism family: **the colon reveal** (family 13). The dramatic mid-prose colon ("Here's the catch: it games easily"), distinct from family 8's colon-into-list reflex.
- New Claudism family: **the conditions checklist** (family 14). The logician's "hold" ("four things have to hold"), naming the three overused senses of "hold" (be true / keep in mind / grasp), added to register vocabulary.
- Family 8 now names the **clipped parallel negation** ("X ships now. Y does not.") as a rhythm tic.

### Changed

- The "plain" rewrite standard is grounded in Ann Handley's _Everybody Writes_: lead with the most important words, one idea per sentence, active voice, short common words, show don't tell.

---

## 2.5.0 - 2026-06-04

### Added

- New Claudism family: **the bolt-on significance sentence** (family 12). A free-floating claim of broader importance dropped onto a paragraph (often the opener, or tacked on with "it also..."), wired only loosely to the content. Structural tell, with a delete-test: if cutting the sentence loses no information, it was bolted on.
- New sub-tell under the strategy-memo register (family 11): **trajectory inflation**. A single present signal recast as the direction of a whole market ("it points us to where the market is going").

---

## 2.4.0 - 2026-06-04

### Added

- **Prevention rules** for the Claude register in `reference/foundations.md`: a pre-generation discipline (write plainly the first time, with before/after examples) that sits alongside the existing post-generation Voice pass and review-mode detection. The catalogue now has three uses, in order of leverage: prevention, the post-generation voice pass, and detection. Prevention is framed honestly as rate-reduction, not elimination, since the register is the model's default; the voice pass stays as the backstop.

### Changed

- The generator modes (`brief`, `spec`, `stories`, `metrics`) point at the Prevention rules at their generation step, so they write to avoid the register up front rather than only cleaning up after.
- `SKILL.md` notes the Claudism Catalogue's prevention rules fire pre-generation alongside the PM Reflex Rejection, and that prevention applies when generating prose in any mode.

---

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
