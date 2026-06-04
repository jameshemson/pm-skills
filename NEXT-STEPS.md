# Next Steps: review mode gets a score and a memory

pm-skills today critiques and forgets. The next evolution: `review` scores the doc and remembers it, so a PM sees their craft improve across versions. "Claude generates, pm-skills critiques" becomes "and tracks that your docs get sharper."

This is days of work on what already exists. No new infrastructure. The memory is a project-root markdown file, the same pattern as `pmdecisions.md`.

## Why

A one-shot critique is a commodity. The user's own AI gives it for free. The defensible value is two things the raw model does not provide:

- **Calibration.** The same doc scores the same way every time, so the number means something.
- **Memory.** A trajectory across versions, so "is my craft improving" has an answer.

Both live in the skill with zero infrastructure. The skill runs on the user's own AI and writes to their own repo. The no-infra thesis stays intact.

## The three changes (all in `review` mode)

1. **Emit a calibrated score.** Add a 0-100 craft score alongside the existing readiness verdict (SLOP / ROUGH / SOLID / SHIP) to every review. Calibrate against the rubric in `mode-review.md` so the score is consistent run to run, not vibes.

2. **Persist each review to `pmreviews.md`.** Project root, lowercase `pm` prefix, no hyphen, matching `pmdecisions.md`. One entry per review: date, doc identifier, score, verdict, open P0-P3 issues, and issues closed since the last review. Gate it with a `reviews_log: enabled | disabled` key under `## Settings` in `.pmcontext.md`, set on first run via AskUserQuestion, exactly like `decisions_log`.

3. **Read it back for trajectory.** When reviewing a doc already in `pmreviews.md`, load the prior entries first and report the delta: score change, which P1s closed, which persist, which are new. "v1 was 52, this is 71. Closed 3 of 5 P1s. One new P0 in the metrics section." That measurable before-and-after in one session is the hook the commodity critique lacks.

## What stays out (this is the future paid backend, a separate private repo)

The skill stays free, open, single-user, local. These do not belong in it, because they need a server and a shared corpus:

- Benchmark percentile ("bottom 30% of specs we have seen") - needs data across all users.
- Cross-device and team sync.
- A web dashboard for PMs who do not live in an agent.
- Accounts and billing.

That backend is the paid tier. Build it only after engagement is proven, in a clean repo. The open skill is the funnel; the backend is the business. Match the Pad / MarkItDown model: open the client, charge for the cloud.

## Positioning

"Grammarly for product docs" - a quality system of record. A calibrated critic that scores craft and tracks it improving over time.

Not "Productboard for the AI era." That is the feedback-to-roadmap lane this project deliberately avoids. Hold any platform ambition until the wedge validates.

## Validate before building more

The three changes are cheap, so ship them and let real use answer the only question that matters: do AI-native PMs come back to re-review a second and third doc unprompted, and do they value the trajectory? That tests engagement for free. Willingness to pay is a later test, via the backend tier, not this skill.

Set the pass bar before shipping. If they will not return even when it is free and local, the memory thesis is wrong and the fallback is to keep pm-skills as the paid one-time skill it already is.

## Roadmap

Phase 1 and 2 build now. Phase 3 and 4 are gated on the validation signal above, so the backend is never built before users come back twice. Tasks 2 and 4 are where the difficulty and the moat live.

**Phase 1 - Trustworthy local critic with memory (build now)**
1. 0-100 score + verdict in the `review` deliverable.
2. Calibration rubric - new `knowledge-scoring.md`, anchored per-dimension bands so the same doc scores within a few points run to run. The hard part.
3. Calibration test harness - fixture docs with expected ranges, variance check. Mirrors `tests/voice.test.ts`.
4. Issue-identity fingerprinting so re-review can match findings across versions. The other hard part; the trajectory is fake without it.
5. `pmreviews.md` persistence + `reviews_log` toggle.
6. Trajectory read-back - score delta, P1s closed/persisting/new.
7. Docs, version bump, a "track your craft" line on pmskills.co.

**Phase 2 - Workspace feel (still local and free)**
8. `/pm status` - craft-health rollup, open P1s across all docs.
9. Ingestion: review `.pptx`/`.docx`/`.pdf` via MarkItDown so real PM docs work.
10. `pmreviews.md` rotation to `pmreviews-archive.md` as logs grow.

**Validation gate** - do AI-native PMs re-review a 2nd and 3rd doc unprompted, and value the trajectory? Set the pass bar before shipping Phase 1. Fail = keep pm-skills as the paid one-time skill.

**Phase 3 - Private backend, paid (clean repo, only past the gate)**
11. Thin state API + `pm login`; skill optionally syncs reviews up.
12. Benchmark corpus to percentile scoring - the moat, the first thing raw Claude cannot do.
13. Web dashboard - history, trajectory charts, the view for non-agent PMs.
14. MCP connector - same backend for Cowork/Claude.ai PMs with no shell.
15. Team tier + billing.

**Phase 4 - Growth (parallel, after the backend)**
16. "State of PM Docs" report generated from the corpus.
17. CI gate: `pmreview --fail-on slop` for teams.
18. Connector directory + marketplace listing.

## Implementation pointers

- `.claude/skills/pm/reference/mode-review.md` - add the score to the Critique deliverable; add the persist step and the trajectory read-back to the loop.
- `.claude/skills/pm/SKILL.md` - register `pmreviews.md` as a project-root artifact.
- `.pmcontext.md` `## Settings` - add the `reviews_log` toggle, mirroring `decisions_log`.
- Naming already covered by the "Project-root artifacts and naming" section in `CLAUDE.md`. Follow it: `pmreviews.md`, and `pmreviews-archive.md` for rotation.
- Bump the version in `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` (minor: changed mode and reference content).
