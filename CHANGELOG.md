# Changelog

## 2.21.2 - 2026-10-07

### Fixed

- **Specs state their trade-offs, and keep the skill's own checks out of the document.** Spec mode printed its working into the spec: the Slop Test results and an "engineering read-through" listing gaps, in 9 of 10 specs. The spec template also had no place for trade-offs, so that printed check was often the only spot where a spec said what it was giving up. The Proposed Solution section now asks for the main alternative considered, why it was not chosen, and the cost the team accepts. The Slop Test and the read-through run on the draft and fix what they find; anything they cannot fix goes in the reply after the spec, and so does the pointer to `stories` mode.

### Evidence

Generator A/B on specs, 10 pairs, against 2.21.1: 0.30 points higher (95% CI -0.40 to 0.90), no printed checks (2.21.1: 9 of 10), and a trade-off stated in the body of 9 of 10 specs. Taking the checks out without the trade-offs slot had cost 0.70 points, because the trade-offs went with them. A version that applied the rule to every mode through `SKILL.md` was not shipped: only specs printed their checks, and the metrics scores dipped in that run (-0.90, CI -2.30 to 0.50), so the rule lives in spec mode only.

---

## 2.21.1 - 2026-10-07

### Fixed

- **`stories` now says why the stories exist.** The output opens with a short paragraph before the first story: the problem the stories solve and for whom, the metric they should move (with its baseline and target, or how it would be measured if neither is known), and what is out of scope, with the reason for each exclusion. The stories template had no place for the problem or the metric, so a story set failed the skill's own Slop Test on both, and in 2.21.0's generator A/B `stories` scored the same as no skill (13.2 against 13.4 out of 20). The closing pointer to `review` mode now goes in the reply after the stories, so mode names no longer land inside the document.

### Evidence

Generator A/B on the five fixtures, three runs, 15 pairs: 2.21.1 scored 2.27 points above 2.21.0 (95% CI 1.47 to 3.00) and 1.60 above no skill (0.73 to 2.47). Metrics rose 0.87, scope 0.73 and problem statement 0.47. All 15 story sets opened with the problem, the metric and the scope (2.21.0: 5 of 15), and they ran 9% shorter. A first version that listed exclusions without reasons lost scope points instead (-0.33), because a bare list does not tell the team why the rest waits; the shipped wording asks for the reason.

---

## 2.21.0 - 2026-10-07

### Added

- **Room shorthand, Claudism family 17.** Plain words that mean something only to people who were in the conversation. A label agreed during the session ("the lite tier"), a fact the session settled ("six weeks gives us room"), or a verb the session gave a private sense ("the export work gets pulled forward") turns up in the document as if the reader had been there. No word looks like jargon, so a jargon check passes it, and the reader cannot tell what is missing. The modes that interview before they write are the most exposed, because the reader saw none of the interview. The family is distinct from family 16's coined noun, which sounds technical. It counts once per unexplained name, as a judgement call, and comes with a prevention rule (write for a reader who saw none of the conversation) and a before/after pair.
- **A Slop Test check for it: "Readable without the conversation".** Could someone who saw none of the session follow every name, number and reference? The check lives in `SKILL.md`, so it reaches every mode, including `decide`, which does not load `foundations.md`. The Slop Test now has eleven checks.

### Changed

- **The session-only line moves out of the document.** "Built from session-only context; `/pm teach` makes this permanent and sharper" now goes in the reply after the deliverable. In testing it kept landing inside documents meant for a VP or a tech lead, who cannot act on it.
- **Mode and gate text no longer counts the Slop Test checks.** `mode-brief.md` and `mode-spec.md` said "all ten checks" and the SLOP gate in `knowledge-craft-score.md` said "of the ten", which went stale with the new check. They now say "every check", and the gate keeps its thresholds of three and five failed checks.

### Evidence

A blind trial ran on live multi-turn conversations in which the user coined labels along the way. Each conversation was forked into endings with no skill, with 2.20.0, with this release, and with a placebo of neutral text matched to the skill's token count and loaded the same way. 2.20.0 made the tell worse than no skill: 5.8 instances per document against 2.2. This release brings it to 2.3, lower than 2.20.0 in 10 of 12 conversations (p = 0.012) and below the placebo (3.8). Labels the user coined and left unexplained fell from 47% to 10%. On fresh held-out conversations this release averaged 1.7 against 2.6 with no skill, but that gap is inside the noise: the release fixes the regression and does not yet beat no skill. The generator A/B showed no quality change against 2.20.0 (-0.02 out of 20, 95% CI -0.55 to 0.53, 58 pairs), and the review band calibration held 6 of 6, with the SHIP fixture at SHIP 3 of 3.

---

## 2.20.0 - 2026-10-02

### Added

- **`metrics` now helps you find the metric, not only check it.** A user working out metrics had to suggest HEART themselves: the mode tested candidates hard but never proposed any, and none of five baseline eval outputs named a framework. A new "Finding the Metrics" section in `knowledge-metrics.md` works down from the goal, to the user behaviour that would show it was met, to a number that counts that behaviour. This is the Goals-Signals-Metrics process from Google's HEART framework (Rodden, Hutchinson and Fu, 2010). The mode then picks one lens by asking whether users are meant to notice the change: HEART for a feature or UX change, AARRR (Dave McClure) for a funnel problem, a North Star with its input metrics for a product-level goal, and no framework for reliability, performance or infrastructure work. The lens only finds candidates. The metric stack still forces one primary, and a document that fills every HEART category or every funnel stage is flagged in review.
- **The document shows its working in plain sentences.** It says what goal the primary serves and which behaviour it counts, names the strongest candidate it did not pick and what that choice gives up, and marks any unknown baseline as unknown with the query that would fill it, plus the value the team is planning around with a confidence.
- **Weak metrics get rebuilt, not just rejected.** When a metric fails, whether the user brought it or a review flagged it, the mode walks back to the goal it stood for and rebuilds it, asking for the goal first if no document states it. In `review`, a P0 or P1 about metrics, in a metrics doc or the Success Metrics section of a spec or brief, now loads `knowledge-metrics.md` during Refine and rebuilds each failing metric that way.

### Evidence

Three runs per version of the five metrics fixtures through `eval/run.js`: the mean skilled score rose from 13.6 to 14.9 out of 20, assumptions from 1.73 to 1.87, trade-offs from 1.13 to 1.80, and the Claude-register score from 0.60 to 0.87 (higher is cleaner). The first draft of the section scored worse than 2.19.1, because the model copied its wording, AI tells included, into every output; the shipped text was rewritten until that stopped. The review band calibration held: SHIP fixture 3 of 3 SHIP, and `spec-rough` stayed ROUGH while its rebuilt Success Metrics gained a counter-metric for recoded outcomes, a comparison group, and planning baselines with confidence.

---

## 2.19.1 - 2026-09-25

### Fixed

- **A reproduced bug now counts as evidence in `review`.** A review told a user to defer a bug fix until a customer confirmed the bug, and rated that finding P0 or P1, although the user had reproduced the bug themselves. Review's evidence checks recognised only user evidence, so a defect the author had confirmed read like an untested feature idea. The strategic-alignment check in `mode-review.md` and the Critic persona now treat a reproduction by anyone, the author included, as the evidence for a defect fix, and review never recommends deferring a reproduced defect until customers report it. `knowledge-craft-score.md` ranks the one remaining finding, a document that does not say how a defect was confirmed, as a P2, because the reader can ask. The change is additive and covers defect fixes only, so review stays as strict as before on everything else. Six baseline calibration runs on a matched pair of fixtures never reproduced the reported flag, so this makes the right call explicit instead of leaving it to the reviewer's judgement. After the change, five of six runs applied the rule by name or substance, and the four existing fixtures held their bands.

---

## 2.19.0 - 2026-09-20

### Added

Five tells from Wikipedia's "Signs of AI writing" guide, the catalogue the WikiProject AI Cleanup editors maintain from dated examples in real edits. It confirmed most of the existing taxonomy (significance inflation, the antithesis flip, the rule of three, boldface, em dashes, chat leftovers, the vocabulary list) and exposed these gaps.

- **The trailing participle, Voice slop 16.** A sentence that ends with an "-ing" phrase doing fake analysis: "..., ensuring alignment with the roadmap", "..., enabling teams to move faster", "..., highlighting the need for guardrails". Wikipedia's most-cited sentence-level sign, and a spec staple. Comes with a delete test and a fix.
- **The labelled line, third shape of Claudism family 16.** A label and a colon where a sentence should be ("Pilot: 20 companies, 8 weeks.") and its bulleted form with a bold label per item. The 2.18.0 calibration run had filed these lines under family 16 with no name for them; now they have one, with the boundary against family 13 and family 8 stated. The prose form counts once per document and only when most paragraphs open with a label, because the first calibration pass counted five instances in a five-paragraph email; the bulleted form counts on sight.
- **Unfilled placeholders, fourth shape of assistant-artifact slop.** "[N]", "[TBD]", "[insert metric]", "XX%". Absolute, like the other three shapes: one instance fails the draft.
- **Weasel attribution under False confidence slop.** "Industry reports show", "experts agree", "users consistently tell us", with no source, count, or date.
- **The availability pivot under Hedge slop.** Admit the number is missing, then reason from it anyway: "exact churn figures are unavailable, but benchmarks suggest 8-10%".

### Changed

- **The SHIP gate separates mechanical tells from judgement calls.** The gate used to allow two tells of any kind, a cushion set in June for run-to-run detection noise when the catalogue had eleven families. It now allows two judgement-call tells and zero mechanical ones. Mechanical tells are the shapes a reader spots without judgement: the em dash, assistant-artifact slop in all four shapes (now including placeholders), and the bold-label bullet list, three or more consecutive bullets each opening with a bold label and a colon. The first two were already single-instance blockers; the list form is new. The cushion is stated for what it is, reviewer noise, not an allowance, and the review still quotes and fixes every tell it finds.

---

## 2.18.0 - 2026-09-20

### Added

- **The noun problem, Claudism family 16.** Nominalisation and the verbless fragment, the two habits a widely shared r/ClaudeCode post named as the reason current model prose reads like a smart but bad writer. Nominalisation turns the verb into a noun hung on a weak verb ("made an attempt at" for "tried", "the improvement of the performance of the system" for "the system got faster"). The verbless fragment drops the verb for a trailing modifier ("The runner, built.") and loses the actor, the tense, and whether the work is done. The family also names the coined-noun payoff, where a nominalised action becomes a capitalised term of art ("The Walk", "credential-provenance collision") and the doc starts citing a thing nobody built. Handley's subject-verb-object rule already asked for the verb at prevention time; the catalogue had no detection entry for its absence, so `review` waved through a draft with clean vocabulary and no verbs. Adds a "keep the verb" prevention rule, a before/after pair, the checklist mention in `SKILL.md`, and the family in the eval rubric.

### Changed

- **Claude parity now checks meaning, not bytes.** The 2.17.0 check pinned every non-allowlisted Claude file to a pre-Codex commit, which made this release's first content edit to `foundations.md` fail CI and would have failed every future one. `check:sync` already proves the generated trees match the canonical source, so `check:claude-parity` now runs its semantic guards on every Claude file, every time: no Codex-only syntax, and `/pm`, `CLAUDE.md`, the four-question AskUserQuestion cap, and the session-only `decide` contract all present. The `--base` flag is gone.

---

## 2.17.0 - 2026-07-17

### Added

- **Native Codex distribution.** The `pm` skill now ships through a Codex marketplace and self-contained plugin, and through `.agents/skills/pm` for repository discovery. Installed plugin users invoke `$pm:pm`; repository users invoke `$pm`. Claude Code installation and `/pm` remain supported.
- **One canonical source and checked generation.** Maintainers edit `source/skills/pm`; `npm run build` renders the Claude tree, Codex repository tree, and Codex plugin tree. A generated-file inventory bounds stale cleanup, while sync, structure, Claude parity, plugin validation, skill validation, and an isolated Codex install smoke catch drift before release.
- **Provider-specific interaction seams.** Claude retains four-question structured interview batches. Codex uses at most three structured questions when that input is available and falls back to direct conversation for free text or unavailable tooling.

### Changed

- **Instruction-file safety.** Codex setup and teach target `AGENTS.md`. Existing symlinks are resolved and reported, preserved when their target stays inside the project, and refused when broken or project-external. This repository's tracked `AGENTS.md -> CLAUDE.md` link remains intact.
- **Session-only decisions stay session-only.** `decide` now runs Steps 1-7 on the session-only path while skipping prior-decision reads, settings changes, and decision-log writes.

---

## 2.16.0 - 2026-06-23

### Added

Three AI-voice tells, sourced from a ~90,000-post Reddit analysis of what makes writing read as AI-generated (89,239 posts pulled, 7,984 on-topic, plus a 600-post hand-audited sample). The data ranks tells by what human readers actually cite, which is the same concern the slop detector runs on.

- **Assistant-artifact slop, an absolute voice tell.** New item 14 in the Slop Taxonomy (`foundations.md`): leftover chat scaffolding the generator forgot to strip - trailing offers ("Would you like me to..."), form-letter sign-offs ("I hope this helps"), and model self-reference ("as a large language model"). Flagged on a single instance anywhere, the same standard as the em dash; `knowledge-craft-score.md` now caps the band at SOLID when either is present, never lower, clearing once removed. Closes the one tell family the data ranks high (leftover assistant boilerplate appears in thousands of cited posts) that the taxonomy had no entry for. Most likely to leak from the tail of a generated artifact, because the model's native turn-ending move is to offer follow-up.
- **Uniform-rhythm slop, promoted to a named structural tell.** New item 15 in the Slop Taxonomy: sentences and paragraphs of even length and shape, the second-most-cited AI tell in the data and entirely keyword-invisible. Previously a buried clause in Sentence pattern slop (12) and Claudism family 8; both now point to the single home. Makes lexical-clean necessary but not sufficient - a draft with no flagged words but machine-even meter no longer reads as clean, and the review pass measures length variance instead of only scanning vocabulary.
- **The over-corrected anti-AI register, Claudism family 15.** The mirror of the whole catalogue: prose straining not to read as AI (staccato fragments, forced lowercase, bolted-on "real talk", em-dash avoidance contortions) is its own tell, clocked just as fast. Guards the skill's own voice pass from trading one detectable default for another, and lets `review` flag a draft that has been aggressively de-slopped into fake-casual rather than waving it through as human.

---

## 2.15.0 - 2026-06-12

### Added

- **Reading source documents.** New shared-context section in `SKILL.md`, inherited by all nine modes: point a mode at a `.docx`, `.pptx`, or `.xlsx` and it reads the document cleanly and leaves nothing behind. Conversion goes to stdout or a system temp file deleted after use, never into the project or beside the source, so no markdown copy of a sensitive document can land where git or a sync tool picks it up - previously this was improvised per session, which is exactly how stray conversion files get littered. Converter order: `markitdown` if present, then `pandoc`, then `textutil`; if none is available the skill asks for an export rather than parsing the binary. Spreadsheets are inspected sheet-by-sheet rather than converted whole; PDFs are read directly. No new dependency, no permission prompts, one passing line of narration.

---

## 2.14.0 - 2026-06-10

### Changed

- **P1 means the document must change before the audience can commit.** Previously "the gap bounces it back", which let every "engineering will ask this" finding rank P1. Calibration showed an adversarial review can always mint such findings, making SHIP (zero P1s) unreachable and SOLID unstable, and contradicting the read-through doctrine that a ready spec generates up to three clarifying questions. Questions the audience can ask and have answered in the room now rank P2; the tie-break names the question-shaped P1 as the commonest inflation. One sentence in `mode-review.md` and the anchors in `knowledge-craft-score.md` updated together.

---

## 2.13.1 - 2026-06-10

### Fixed

- Spelling normalised to British English throughout the skill pack; "theater" kept deliberately as brand vocabulary.

---

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
