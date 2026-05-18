# Mode: review

The flagship mode. The user brings a document they or Claude already wrote; `review` makes it sharper. Critique is the most common PM need, so unmatched input defaults here.

This mode absorbs four old skills. Their function lives inside the loop, not as separate modes:
- **translate**: rewriting a doc for a different audience (handled in Frame and Refine).
- **stakeholders**: crafting a message for a specific person (handled in Frame and Refine).
- **audit**: checking strategic alignment, evidence, and drift (a Critique check).
- **retro**: evaluating a launch against expectations (the `retro` document type).

Run a **Frame -> Critique -> Refine** loop. Do not skip Frame. Do not dead-end at Critique.

## Phase 1: Frame

Before critiquing, understand the situation. Critiquing in a vacuum produces generic findings. Ask only what the user has not already told you:

- **What is this document, and what is it for?** A spec, a strategy doc, a stakeholder message, a retro? What decision or action does it need to drive?
- **Who is the audience?** Not "stakeholders" but which people, what level, what function. If the doc is aimed at one specific person, ask what that person is measured on, how they make decisions, and where they currently stand on the topic.
- **What is the situation?** What is happening right now that makes this document necessary? What is at stake if it lands badly?
- **What does the user want from the review?** Sharpen for the same audience, retarget to a new audience, or pressure-test the thinking itself?

**If the user brought no draft at all**, they want generation, not critique. Do not critique an empty input. Point them to a generator mode: `brief`, `spec`, `stories`, or `metrics`. Then stop.

Detect the document type from the content and the user's answers. It selects the knowledge file in the next phase.

## Phase 2: Critique

Adversarial and document-type-aware. The job is to find everything wrong before the audience does. Better a hard question now than a clarification request mid-sprint.

Load these every time:
- [foundations.md](foundations.md) for the full slop taxonomy.
- [knowledge-review-personas.md](knowledge-review-personas.md) for persona-based review.

Then load **one** knowledge file by document type. Each knowledge file carries a "Critiquing this artifact" section with the type-specific checklist. This file does not duplicate it.

| Document type | Knowledge file |
|---|---|
| spec, brief, PRD, user stories | [knowledge-specification.md](knowledge-specification.md) |
| strategy doc | [knowledge-decision-making.md](knowledge-decision-making.md) |
| positioning doc, one-pager | [knowledge-positioning.md](knowledge-positioning.md) |
| metrics doc | [knowledge-metrics.md](knowledge-metrics.md) |
| retro, post-launch review | [knowledge-decision-making.md](knowledge-decision-making.md) |
| stakeholder message, comms | [knowledge-communication.md](knowledge-communication.md) |
| roadmap, prioritisation | [knowledge-prioritisation.md](knowledge-prioritisation.md) |
| other or unclassified | the generic fallback checklist below |

Run, in order:

1. **The PM Slop Test.** Apply every check from the PM Slop Test in `SKILL.md`. Flag each failure with the exact text that triggers it and what should replace it. Then apply the full slop taxonomy from `foundations.md` for substance and voice slop.
2. **Persona-based review.** Select 3-4 personas from `knowledge-review-personas.md` using its selection table. Adopt each perspective independently: finish one persona's full assessment before starting the next, no cross-contamination. Then synthesize: where two or more personas flag the same issue, that is a high-confidence gap.
3. **Type-specific critique.** Apply the "Critiquing this artifact" checklist from the loaded knowledge file.
4. **Strategic-alignment check** (the absorbed `audit` function). Using product context, ask: does this connect to a stated outcome, or is it drift? Is the evidence strong, medium, weak, or none? Is this the highest-value use of the team's time? Name one hard question the team is avoiding.

For a **retro** document, the type-specific critique tests the retro itself: was the hypothesis reconstructed before results were seen (hindsight-bias guard)? Is decision quality separated from outcome quality (a good bet with a bad outcome is not a bad decision)? Are the learnings specific and actionable, not "we learned a lot"?

Rank every finding: **P0** blocking (cannot proceed), **P1** important (proceed but resolve soon), **P2** minor. Multi-persona findings rank above single-persona ones at the same severity.

Deliver: a slop verdict, the top 3-5 critical gaps (what is wrong, why it matters concretely, a specific fix), persona findings, the ranked question list with persona attribution, any contradictions, genuine strengths, and a readiness verdict (Ready / Needs Work / Not Ready).

## Phase 3: Refine

Do not stop at a list of problems. Once the situation is understood, help fix the draft.

- **Be surgical.** Targeted edits to the specific lines that failed Critique, not a wholesale rewrite. Show the original text and the replacement so the user sees the change. A rewrite that loses the author's voice and intent is not a refinement.
- **If the review was a retarget** (translate or stakeholder-message function): lead with what matters to the new audience, strip what they do not need, add what they do, and match their format and channel. Confirm the new structure with the user before producing the full draft.
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
