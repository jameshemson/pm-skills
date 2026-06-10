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

1. **SLOP** if: three or more Claudism families are present, OR five or more of the ten PM Slop Test checks in SKILL.md fail, OR there is no real substance to critique.
2. **ROUGH** if: any P0 finding exists, or three or more P1s.
3. **SOLID** if: no P0s and at most two P1s (any number of P2s).
4. **SHIP** if: no P0s, no P1s, and fewer than three Claudism tells in total (individual instances, distinct from the family count in the SLOP gate).

The band moves only when the findings move. If the user contests the band, restate the gate that fired and the findings behind it.

---

## The internal score

Place the integer within the band by thirds - low, mid, or high - judged from severity counts. More P1s and P2s push toward the low third of the band. Fewer push toward the high third. Claim no more precision than that. The integer is never displayed, never headlined, and nothing stores it yet.

---

## Deadband

When a later release adds re-review trajectory, a score change counts as movement only if the band changes or the integer moves 10 or more points. Smaller changes are reported as "about the same." This section is dormant until that release ships.

---

## Delivery format

The verdict line follows this structure:

`Verdict: BAND - [one sentence naming the gate that fired]. [One sentence: what moves it up one band.]`

Examples:

```
Verdict: SLOP - four Claudism families and six failed slop-test checks; the doc performs
analysis without doing any. Cutting the register tells and adding one measurable success
metric moves it to ROUGH.

Verdict: SOLID - no blockers; two P1s remain (no rollback plan, unowned API dependency).
Closing both P1s moves it to SHIP.
```

---

## The self-grading disclosure

When the user applied Refine fixes from this same conversation and asks for a re-review, the verdict must state that a rise driven by applied fixes measures "Claude fixed what Claude flagged" and is expected. The signal that matters is the band rising on a draft the author revised themselves.

---

## On the name SLOP

The blunt name is deliberate. Clear is kind - a label that softens the verdict delays the author from fixing the real problem. If real users report it stings rather than lands, soften the label, never the threshold behind it.
