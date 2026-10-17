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

Use AskUserQuestion when structured options fit, with at most four questions per call. Ask free-form questions directly in conversation.

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
- [knowledge-craft-score.md](knowledge-craft-score.md) for severity, the order of findings, and the verdict band: the four bands, their gates, and the delivery format.

Then load **one** knowledge file by document type. Each knowledge file carries a "Critiquing this artifact" section with the type-specific checklist. This file does not duplicate it.

| Document type | Knowledge file |
|---|---|
| spec, brief, PRD, user stories | [knowledge-specification.md](knowledge-specification.md) |
| strategy doc | [knowledge-decision-making.md](knowledge-decision-making.md) |
| positioning doc, one-pager | [knowledge-positioning.md](knowledge-positioning.md) |
| PRFAQ (press release and FAQ), working-backwards doc | [knowledge-positioning.md](knowledge-positioning.md) |
| tenets, principles | [knowledge-decision-making.md](knowledge-decision-making.md) |
| decision record | [knowledge-decision-making.md](knowledge-decision-making.md) |
| metrics doc | [knowledge-metrics.md](knowledge-metrics.md) |
| retro, post-launch review | [knowledge-decision-making.md](knowledge-decision-making.md) |
| a message, announcement, or internal comms | [knowledge-communication.md](knowledge-communication.md) |
| roadmap, prioritisation | [knowledge-prioritisation.md](knowledge-prioritisation.md) |
| OKRs, quarterly goals | [knowledge-metrics.md](knowledge-metrics.md) |
| other or unclassified | the generic fallback checklist below |

Run, in order:

1. **Persona-based review.** Select the personas its selection table lists for the document type (2-4), adding Sec where the table says to, from `knowledge-review-personas.md`. Adopt each perspective independently: finish one persona's full assessment before starting the next, no cross-contamination. Then synthesise: where two or more personas flag the same issue, that is a high-confidence gap.
2. **Type-specific critique.** Apply the "Critiquing this artifact" checklist from the loaded knowledge file.
3. **Check the document against itself and its context.** Go through every claim, status, date, number, rule and criterion, and compare it with every other place the document or the product context mentions the same thing. Each mismatch is a finding, quoting both places: a status stated as done in one section and pending in another, two rules that cannot both hold, a criterion described as hard in one place and optional in another, dates that do not add up. Then check each factual claim about the world (a figure, a platform rule, what has or has not been announced): if the document gives no source, it is an assumption and should say who will confirm it. Then list what the document's own checklist or plan needs before it can go ahead but does not mention.
4. **Strategic-alignment check** (the absorbed `audit` function). Run it even when the user has told you the purpose: a stated purpose is not evidence that the work is worth doing. Using product context, ask: does this connect to a stated outcome, or is it drift? Is the evidence strong, medium, weak, or none? For a defect fix, a reproduction by anyone, the author included, is the evidence: do not ask for customer reports, and never recommend deferring a reproduced defect until customers report it. If the document does not say how a defect was confirmed, ask it to (P2). Is this the highest-value use of the team's time, against the next-best use of the same effort? Which options were never considered, including something smaller? What would show it is doing harm elsewhere (a counter-metric)? Then ask what would have to be true for this to be worth doing, the reverse-engineering test in [knowledge-decision-making.md](knowledge-decision-making.md): name the condition least likely to hold and grade the evidence for it on the same scale. For each risk the document names, is its mitigation aimed at the failure most likely to happen? Name one hard question the team is avoiding.
5. **The PM Slop Test, after the substance checks.** Substance comes before voice, so run this only after the checks above. Apply every check from the PM Slop Test in `SKILL.md`. Flag each failure with the exact text that triggers it and what should replace it. Then apply the full slop taxonomy from `foundations.md` for substance and voice slop. For any document with standard template structure, run the template-camouflage test from the taxonomy once, section by section, before the line-level scans - the doc-level diagnosis frames the itemised findings. Then run the **Claudism Catalogue** from `foundations.md`: scan for AI-register tells, quote each one, name its family, and give the fix. Three or more tells from different families means the draft reads as AI-generated; say so in the slop verdict, because an audience that clocks it discounts the whole document.
6. **Run the plain pass, after your own checks.** It comes last so that it cannot steer them. Use the subagent tool (Agent or Task) to run one general-purpose subagent on a different, smaller model (Haiku where the tool lets you choose), and wait for it to finish; do not run it in the background, because the review has to reach the user as one list. Send it this request, word for word, with the document's path: "Review <path>. What's missing, and what should be improved? Do not load or use any skills." If the user stated the audience or the purpose, add their words after it. Keep the skills sentence: without it the subagent often loads this skill, or another review skill the user has installed, and the plain pass stops being plain. Add nothing else: no product context, none of your findings, no instructions about format or ranking. Its job is the review the model would give unaided, which catches things a checklist steers past. If no subagent tool is available, skip this step and say so in one line of the output.
7. **Merge the plain pass.** Keep every finding from it unless the document itself shows it is wrong; when in doubt, keep it. Merge it with any of yours that describes the same problem, and rank it with the rest. Do not drop a finding because none of your checks raised it: the plain pass exists to catch what the checks miss.

For a **retro** document, the type-specific critique tests the retro itself: was the hypothesis reconstructed before results were seen (hindsight-bias guard)? Is decision quality separated from outcome quality (a good bet with a bad outcome is not a bad decision)? Are the learnings specific and actionable, not "we learned a lot"?

**Every fix suits the document.** Each kind of document has its own job: a PRFAQ argues the case and states what customers are promised; tenets state the principles that settle trade-offs; a decision record records one decision and why; a roadmap sets the order of work; a spec says what to build. Fix the document in its own form. When the right fix belongs somewhere else, such as status tracking or a task list for a PRFAQ, implementation detail for tenets, or open tasks for a decision record, say which document it belongs in and keep the change here to a line or a link.

Give every substance finding a severity from the anchors in [knowledge-craft-score.md](knowledge-craft-score.md): P0 (the document's primary action is blocked), P1 (the document must change before the audience can commit), P2 (quality erosion, and every question the audience can simply ask). Severity sets the verdict band. Then order the findings as the same file sets out: what blocks the work first (every P0 is there), then what breaks it for users, then what is imprecise, then polish; within each group, by reach and confidence. Voice findings - Claudism tells, voice slop, and any wording point the plain pass raises - carry no severity and are never ranked among the substance findings; they reach the verdict only through the SLOP and SHIP gates, and all of them are fixed before the document is shared.

Deliver, in this order: the substance findings under the group headings `knowledge-craft-score.md` sets out (Blocks the work, Breaks it for users, Imprecise, Polish, leaving out any group with no findings), numbered straight through, each finding in the shape that file shows (the problem in one bold sentence with its severity, then the fix on its own line, why it matters to the reader, and where it is), with contradictions and open questions placed in the same groups; genuine strengths, briefly; voice findings (Claudism tells and voice slop) as one compact list, one line each; the slop verdict; and the craft verdict: one band of SLOP / ROUGH / SOLID / SHIP, picked by the gates in `knowledge-craft-score.md` and delivered with the one-sentence reason and what would move the draft up one band. Compute the internal score for the gates; never headline it.

Then stop and emit this exact prompt to the user: **"Want me to draft fixes for the P0s and P1s now?"** If zero P0 or P1 findings exist, the prompt becomes: **"Want me to refine the P2s, or is this ready?"** Wait for the user's answer.

## Phase 3: Refine

Run Phase 3 only if the user accepted the Refine prompt. On decline, exit cleanly with the Critique output as the final deliverable.

Once the situation is understood, help fix the draft. Do not stop at a list of problems.

- **Be surgical.** Targeted edits to the specific lines that failed Critique, not a wholesale rewrite. Show the original text and the replacement so the user sees the change. A rewrite that loses the author's voice and intent is not a refinement.
- **If the review was a retarget** (rewriting for a different audience): lead with what matters to that audience, strip what they do not need, add what they do, and match their format and channel. Confirm the new structure with the user before producing the full draft.
- **Build metrics, do not just reword them.** When a P0 or P1 is about metrics, in a metrics doc or the success-metrics section of a spec or brief, load [knowledge-metrics.md](knowledge-metrics.md) even if the routing table loaded another file. Rebuild each failing metric from goal to signal to metric, pick the lens by initiative type, and mark any baseline you cannot find as unknown with the query that would produce it. If the doc never states the goal, ask for it before drafting.
- **Slop-test the output.** The refined text must itself pass the PM Slop Test before you show it. Refining one slop into another is failure. If a fix you wrote does not pass, fix the fix.

Deliver the refined sections (or the retargeted draft), plus a short note on what changed and why.

## Generic fallback checklist

For a document that matches no type in the routing table, critique against this. The mode never dead-ends.

- **Purpose**: is it clear what this document is for and what it should make the reader do?
- **Audience**: is it written for a specific named reader, or for "everyone" (which means no one)?
- **Claims**: is every assertion either evidenced or explicitly flagged as an assumption?
- **Specificity**: are there numbers, names, and concrete examples, or only generalities?
- **Completeness**: what would a sceptical reader immediately ask that the document does not answer?
- **Scope**: is it clear what this document does and does not cover?
- **Slop**: run the PM Slop Test and the `foundations.md` taxonomy regardless of type.
- **Action**: is the next step explicit, with an owner?

## Routing onward

`review` continues into another mode in the same conversation when the draft exposes a deeper gap:

- An unevidenced assumption that critique cannot resolve from the document: route to `discover` to plan the conversations that would test it.
- An unresolved decision the document assumes away: route to `decide` to structure it properly.
- No draft to critique (caught in Frame): route to a generator mode (`brief`, `spec`, `stories`, `metrics`).
