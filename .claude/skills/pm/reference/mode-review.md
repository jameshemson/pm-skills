# Mode: review

The flagship mode. The user brings a document they or Claude already wrote; `review` makes it sharper. Critique is the most common PM need, so unmatched input defaults here.

This mode absorbs four old skills. Their function lives inside the loop, not as separate modes:
- **translate**: rewriting a doc for a different audience (handled in Frame and Refine).
- **stakeholders**: sharpening a message so it lands with its audience (handled in Frame and Refine).
- **audit**: checking strategic alignment, evidence, and drift (a Critique check).
- **retro**: evaluating a launch against expectations (the `retro` document type).

Run a **Frame -> Critique -> Refine** loop. Do not skip Frame. After Critique, always emit the Refine prompt before completing. Both accept and decline are valid exits.

## Phase 1: Frame

Before critiquing, understand the situation. Critiquing in a vacuum produces generic findings. Ask only what the user has not already told you:

- **What is this document, and what is it for?** A spec, a strategy doc, a message, a retro? What decision or action does it need to drive?
- **Who is the audience?** Not "users" or "stakeholders" but which people, what level, what function, and what they care about. If the document is a message to one specific person, their role and what they want from it is enough; do not profile the person. Keep what you learn about the audience in this conversation, not in a file.
- **What is the situation?** What is happening right now that makes this document necessary? What is at stake if it lands badly?
- **What does the user want from the review?** Sharpen for the same audience, retarget to a new audience, or pressure-test the thinking itself?

If the Context Gathering Protocol entered session-only mode, fold its three questions into this Frame conversation (the audience question above already covers part of question 1) - one interview, not two. The critique then proceeds at full depth; only the persistence differs.

**If the user brought no draft at all**, they want generation, not critique. Do not critique an empty input. Point them to a generator mode: `brief`, `spec`, `stories`, or `metrics`. Then stop.

Detect the document type from the content and the user's answers. It selects the knowledge file in the next phase.

## Phase 2: Critique

Adversarial and document-type-aware. The job is to find everything wrong before the audience does. Better a hard question now than a clarification request mid-sprint.

Load these every time:
- [foundations.md](foundations.md) for the full slop taxonomy and the Claudism Catalogue.
- [knowledge-review-personas.md](knowledge-review-personas.md) for persona-based review.
- [knowledge-craft-score.md](knowledge-craft-score.md) for the verdict band: the four bands, their gates, and the delivery format.

Then load **one** knowledge file by document type. Each knowledge file carries a "Critiquing this artifact" section with the type-specific checklist. This file does not duplicate it.

| Document type | Knowledge file |
|---|---|
| spec, brief, PRD, user stories | [knowledge-specification.md](knowledge-specification.md) |
| strategy doc | [knowledge-decision-making.md](knowledge-decision-making.md) |
| positioning doc, one-pager | [knowledge-positioning.md](knowledge-positioning.md) |
| metrics doc | [knowledge-metrics.md](knowledge-metrics.md) |
| retro, post-launch review | [knowledge-decision-making.md](knowledge-decision-making.md) |
| a message, announcement, or internal comms | [knowledge-communication.md](knowledge-communication.md) |
| roadmap, prioritisation | [knowledge-prioritisation.md](knowledge-prioritisation.md) |
| other or unclassified | the generic fallback checklist below |

Run, in order:

1. **The PM Slop Test.** Apply every check from the PM Slop Test in `SKILL.md`. Flag each failure with the exact text that triggers it and what should replace it. Then apply the full slop taxonomy from `foundations.md` for substance and voice slop. For any document with standard template structure, run the template-camouflage test from the taxonomy once, section by section, before the line-level scans - the doc-level diagnosis frames the itemised findings. Then run the **Claudism Catalogue** from `foundations.md`: scan for AI-register tells, quote each one, name its family, and give the fix. Three or more tells from different families means the draft reads as AI-generated; say so in the slop verdict, because an audience that clocks it discounts the whole document.
2. **Persona-based review.** Select 3-4 personas from `knowledge-review-personas.md` using its selection table. Adopt each perspective independently: finish one persona's full assessment before starting the next, no cross-contamination. Then synthesize: where two or more personas flag the same issue, that is a high-confidence gap.
3. **Type-specific critique.** Apply the "Critiquing this artifact" checklist from the loaded knowledge file.
4. **Strategic-alignment check** (the absorbed `audit` function). Using product context, ask: does this connect to a stated outcome, or is it drift? Is the evidence strong, medium, weak, or none? Is this the highest-value use of the team's time? Name one hard question the team is avoiding.

For a **retro** document, the type-specific critique tests the retro itself: was the hypothesis reconstructed before results were seen (hindsight-bias guard)? Is decision quality separated from outcome quality (a good bet with a bad outcome is not a bad decision)? Are the learnings specific and actionable, not "we learned a lot"?

Rank every substance finding by the severity anchors in [knowledge-craft-score.md](knowledge-craft-score.md): P0 (the document's primary action is blocked), P1 (the audience proceeds but the gap bounces it back), P2 (quality erosion only). Voice findings - Claudism tells and voice slop - carry no severity; they reach the verdict only through the SLOP and SHIP gates. Multi-persona findings rank above single-persona ones at the same severity.

Deliver: a slop verdict, the top 3-5 critical gaps (what is wrong, why it matters concretely, a specific fix), persona findings, the ranked question list with persona attribution, any contradictions, genuine strengths, and the craft verdict: one band of SLOP / ROUGH / SOLID / SHIP, picked by the gates in `knowledge-craft-score.md` and delivered with the one-sentence reason and what would move the draft up one band. Compute the internal score for the gates; never headline it.

Then stop and emit this exact prompt to the user: **"Want me to draft fixes for the P0s and P1s now?"** If zero P0 or P1 findings exist, the prompt becomes: **"Want me to refine the P2s, or is this ready?"** Wait for the user's answer.

## Phase 3: Refine

Run Phase 3 only if the user accepted the Refine prompt. On decline, exit cleanly with the Critique output as the final deliverable.

Once the situation is understood, help fix the draft. Do not stop at a list of problems.

- **Be surgical.** Targeted edits to the specific lines that failed Critique, not a wholesale rewrite. Show the original text and the replacement so the user sees the change. A rewrite that loses the author's voice and intent is not a refinement.
- **If the review was a retarget** (rewriting for a different audience): lead with what matters to that audience, strip what they do not need, add what they do, and match their format and channel. Confirm the new structure with the user before producing the full draft.
- **Slop-test the output.** The refined text must itself pass the PM Slop Test before you show it. Refining one slop into another is failure. If a fix you wrote does not pass, fix the fix.

Deliver the refined sections (or the retargeted draft), plus a short note on what changed and why.

## Generic fallback checklist

For a document that matches no type in the routing table, critique against this. The mode never dead-ends.

- **Purpose**: is it clear what this document is for and what it should make the reader do?
- **Audience**: is it written for a specific named reader, or for "everyone" (which means no one)?
- **Claims**: is every assertion either evidenced or explicitly flagged as an assumption?
- **Specificity**: are there numbers, names, and concrete examples, or only generalities?
- **Completeness**: what would a skeptical reader immediately ask that the document does not answer?
- **Scope**: is it clear what this document does and does not cover?
- **Slop**: run the PM Slop Test and the `foundations.md` taxonomy regardless of type.
- **Action**: is the next step explicit, with an owner?

## Routing onward

`review` continues into another mode in the same conversation when the draft exposes a deeper gap:

- An unevidenced assumption that critique cannot resolve from the document: route to `discover` to plan the conversations that would test it.
- An unresolved decision the document assumes away: route to `decide` to structure it properly.
- No draft to critique (caught in Frame): route to a generator mode (`brief`, `spec`, `stories`, `metrics`).
