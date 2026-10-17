# Craft Score

Review ends with a band verdict, not a number. The bands are SLOP, ROUGH, SOLID, and SHIP. A blunt band name that lands without ambiguity is more useful than a score that invites negotiation over decimal points. Run-to-run scoring jitter on language models is real, so the integer behind the band is internal and the band is the unit a user sees.

---

## The four bands

- **SLOP** (0-39): reads as AI filler or has little real substance; fails the slop test.
- **ROUGH** (40-64): real content with blocking gaps.
- **SOLID** (65-84): proceed; nothing blocking remains.
- **SHIP** (85-100): ready for its audience; voice is clean.

---

## Gates: how the band is picked

Evaluated in order. Lower band wins. Bounds are inclusive.

1. **SLOP** if: three or more Claudism families are present AND three or more of the PM Slop Test checks in SKILL.md fail, OR five or more fail regardless of voice, OR there is no real substance to critique. Voice alone never gates SLOP: a register-heavy document with sound substance bands by gates 2-4 and is held out of SHIP by the tell-cap.
2. **ROUGH** if: any P0 finding exists, or three or more P1s.
3. **SOLID** if: no P0s and at most two P1s (any number of P2s).
4. **SHIP** if: no P0s, no P1s, no mechanical tell anywhere, and fewer than three judgement-call tells in total (individual instances, distinct from the family count in the SLOP gate). Mechanical tells are the shapes a reader spots without judgement, so one instance caps the band at SOLID until removed: the em dash; assistant-artifact slop in any of its four shapes (Voice slop 14 in foundations.md, including an unfilled placeholder); and the bold-label bullet list, three or more consecutive bullets each opening with a bold label and a colon (the list form of Claudism family 16). Every other tell is a judgement call, and the cushion of two exists because the June 2026 calibration saw the same sentence judged a tell in one run and clean in the next. The cushion is for reviewer noise, not a quality allowance: quote and fix all of them.

The band moves only when the findings move. If the user contests the band, restate the gate that fired and the findings behind it.

---

## Severity anchors

The gates count P0s and P1s, so the band is only as stable as the severity calls. Rank every substance finding by its effect on the document's audience, not by how bad it sounds. The type checklists in the knowledge files identify findings; this section ranks them.

- **P0 - the document's primary action is blocked.** The audience cannot do the thing the document exists to make them do, or would do the wrong work if they tried.
- **P1 - the document gets sent back, or commitment is blocked.** The audience cannot commit (fund it, sprint-plan it, send it) until the gap closes, or they return the document for revision. A question the audience can ask and have answered in the room - sprint planning, the review meeting, a reply - without the document being revised is not a P1; it is a P2.
- **P2 - quality erosion and clarifying questions.** Fixing it improves the document; not fixing it changes nothing about whether the audience commits. Includes every gap the audience resolves by asking.

A ready document still generates questions. The engineering read-through doctrine (knowledge-specification.md) allows up to three clarifying questions before a spec has gaps; do not convert ordinary clarifying questions into P1s. The test is not "will the audience ask about this" - they will always ask about something - but "must the document change before the audience can commit".

Anchors by document type (examples of the principle, not an exhaustive registry):

| Type | P0 looks like | P1 looks like |
|---|---|---|
| Spec / brief | A core flow has no acceptance criteria; no primary success metric; the problem statement restates the solution | Rollback plan with no trigger condition; a dependency with no owner; one major state family (empty / error / concurrent) missing from edge cases |
| Metrics doc | No baseline for the primary metric; two primary metrics | A guardrail with no threshold; a secondary metric that duplicates the primary; no counter-metrics |
| Strategy doc | No exclusions anywhere (a strategy that rules nothing out); where-to-play contradicts capabilities | The most fragile assumption is unnamed; "how to win" would read true of the nearest competitor |
| Stakeholder message | The ask is missing or unfindable | The recipient's predictable objection is unaddressed; the ask is buried below the context |
| Roadmap | Every item is a feature with no outcome attached | Same confidence at month 1 and month 9; dependencies on other teams invisible |

For a type with no row here, rank from the three definitions and say which one you applied.

A reproduced defect fix without customer reports is not a finding. A document that does not say how a defect was confirmed gets a P2, because the reader can ask.

**Tie-break.** When torn between two severities, ask which sentence is true: "the audience cannot act on this" (P0), "the document must change before the audience can commit" (P1), or "this just erodes it, or they can ask" (P2). Still torn after that: take the lower severity and say so in the finding. An inflated P0 costs the verdict more credibility than a conservative P1. The commonest inflation is the question-shaped P1: a finding phrased as "the audience will ask X" is a P2 unless the answer has to land in the document before commitment.

## Ordering findings

Severity decides the band. The order decides what the user deals with first, so it follows what happens if each problem stays unfixed. Put every substance finding in one of four groups and give the groups in this order:

1. **Blocks the work.** Someone cannot build, ship or decide until it is fixed, or would build or decide the wrong thing. Every P0 is here, and only P0s and P1s are: a P2 never blocks the work.
2. **Breaks it for users.** What the document describes would fail the people who use it: wrong results, lost or exposed data, a flow that does not work.
3. **Imprecise.** The reasoning, numbers or measures are loose, so a later call may be off or work redone, but nothing is blocked and nothing breaks for users.
4. **Polish.** Fixing it improves the document and changes nothing else.

Place each finding by what happens if it stays unfixed, not by how bad it sounds or how much analysis it took to find. A loose metric definition is imprecise even when it took a page of reasoning to spot; a decision with no recommended default blocks the work even though the fix is one line.

Within a group, order by Reach and Confidence, the two factors of RICE that stay:

- **Reach**: how many of the people who act on the document, or use what it describes, the problem touches: everyone, most of them, one group, or an edge case.
- **Confidence**: how sure you are that the problem is real. 100% = the document's own words show it, or it contradicts the product context; 80% = a strong inference from the document; 50% = it depends on facts the document does not give.

Label each finding's Effort as well: quick fix (a sentence or two), needs a decision (one the author can make now), or needs research (data, or someone else's decision). Effort never moves a finding: how much a fix costs is the author's call, and it should never push a bigger problem below a smaller one.

Give the findings under a heading for each group, in the order above, numbered straight through, and leave out a group with no findings: **Blocks the work**, **Breaks it for users**, **Imprecise**, **Polish**. The heading shows the user why a finding sits where it does, so they can disagree with one placing rather than the whole order. Show reach and confidence only when they change what the user does: when a finding is an inference, say so in its "Why it matters" line and name the fact it depends on, as in `Not certain: it depends on who owns refunds, which the brief doesn't say.` Add the effort to the fix line only when it is not a quick fix: `This one needs your decision.` or `This needs data first.` Judge each part on its own; never adjust one to reach an order you had already decided.

**Wording is hygiene.** Wording problems, including any the plain pass raises as findings, are never ranked among the substance findings. They come after the substance findings, as one list, and every one is fixed before the document is shared: when the author forwards it to someone senior, it cannot read as AI-written, because a reader who spots the phrasing stops trusting the substance.

**Voice findings carry no severity.** Claudism tells and voice slop are not P0/P1/P2; they reach the band only through the SLOP gate (three or more families alongside weak substance) and the SHIP gate (fewer than three tells in total). The mechanical tells are the exception and reach the SHIP gate on a single instance: the em dash, assistant-artifact slop, and the bold-label bullet list. Any one alone caps the band at SOLID, never lower, and clears once removed. A doc with heavy register but sound substance lands SOLID at best, never lower, on voice alone: the tell-cap bars it from SHIP until the voice pass is done. When a tell also hides a substance gap - a false universal asserting an unevidenced claim, a clean mental model papering over an unmade decision - log it twice: once as a voice finding, once as a substance finding placed in the groups above.

---

## The internal score

Place the integer within the band by thirds - low, mid, or high - judged from severity counts. More P1s and P2s push toward the low third of the band. Fewer push toward the high third. Claim no more precision than that. The integer is never displayed, never headlined, and nothing stores it yet.

---

## Deadband

When a later release adds re-review trajectory, a score change counts as movement only if the band changes or the integer moves 10 or more points. Smaller changes are reported as "about the same." This section is dormant until that release ships.

---

## Delivery format

Give the substance findings under the group headings, each finding in this shape, the problem first and the fix straight after it:

```
**Blocks the work**

1. **The brief never says who approves the price change.** (P1)
   Fix: name the approver and the date they will decide, in the Decision section. This one needs your decision.
   Why it matters: finance and sales will each assume the other signs it off.
   Where: Decision, "pricing to be confirmed".
```

The headline is one sentence that names the problem. The fix is concrete enough to act on without rereading the finding, and suits the kind of document under review (see `mode-review.md`). Keep each line to one sentence, plus the effort note on the fix line when there is one.

The verdict line follows this structure. Name P0s and P1s by severity, never as "blockers" or "nothing blocks", so the verdict never contradicts the Blocks the work heading:

`Verdict: BAND - [one sentence naming the gate that fired]. [One sentence: what moves it up one band.]`

Examples:

```
Verdict: SLOP - four Claudism families and six failed slop-test checks; the doc performs
analysis without doing any. Cutting the register tells and adding one measurable success
metric moves it to ROUGH.

Verdict: SOLID - no P0s; two P1s remain (no rollback plan, unowned API dependency).
Closing both P1s moves it to SHIP.
```

---

## The self-grading disclosure

When the user applied Refine fixes from this same conversation and asks for a re-review, the verdict must state that a rise driven by applied fixes measures "the assistant fixed what the assistant flagged" and is expected. The signal that matters is the band rising on a draft the author revised themselves.

---

## On the name SLOP

The blunt name is deliberate. Clear is kind - a label that softens the verdict delays the author from fixing the real problem. If real users report it stings rather than lands, soften the label, never the threshold behind it.
