# Foundations

Core PM procedures and quality checks. Loaded by modes that need them. Enforces the standard that prevents product theater.

---

## PM Reflex Rejection Procedure

AI models produce predictable PM output regardless of context. The same personas, the same metrics, the same acceptance criteria, the same risk sections. This procedure forces you to name and reject those defaults before generating anything.

This fires PRE-generation (before you write). The PM Slop Test fires POST-generation (after you write, before you deliver). Both must pass.

### Step 1: Anchor in the specific product context

Before generating any PM artefact, write down three concrete words that describe the specific product situation. Not generic labels like "enterprise", "SaaS", or "mobile app". Situation-specific anchors like "high-churn, regulated, legacy-migration" or "pre-PMF, developer-tool, open-source-competitor". Every sentence you write should connect to these three words.

### Step 2: List your reflex defaults, then reject them

For the artefact you are about to generate, check each relevant category below. If what you were about to write matches an item in the reflex list, stop and replace it with something specific to the product context from Step 1.

**Personas**
- "Busy professionals aged 25-45 who value efficiency"
- "Tech-savvy early adopters" / "Non-technical business users" (the universal binary)
- Any persona that is a demographic sentence rather than a specific person in a specific situation with a specific job to be done
- Replacement test: could this persona description apply to 50 different products? If yes, it's a reflex.

**Problem statements**
- "Users need a better way to X" (restates the feature as a problem)
- "There is currently no easy way to X" (absence of your solution is not a problem statement)
- "The current experience is suboptimal" (compared to what? for whom? measured how?)
- Replacement test: does this describe something you could observe a real person struggling with? If not, it's a reflex.

**Metrics**
- NPS as a primary metric for anything
- CSAT without a baseline or measurement plan
- "Engagement" without defining what engagement means in this context
- "Adoption rate" or "conversion rate" without a specific target and timeline
- "User satisfaction" as a success metric (unmeasurable without defining the instrument)
- Replacement test: could an engineer build a dashboard for this metric today, with the information in this document? If not, it's a reflex.

**Acceptance criteria**
- "User can successfully complete the action" (what does success look like specifically?)
- "System handles X appropriately" (appropriately how?)
- "Experience is smooth/seamless/intuitive" (not testable)
- Any criterion containing "easily", "quickly", "properly" without specific thresholds
- Replacement test: could a QA engineer write a pass/fail test from this criterion alone? If not, it's a reflex.

**Risk mitigations**
- "Risk of low adoption. Mitigation: communicate the value proposition clearly." (the mitigation restates the problem)
- "Risk of scope creep. Mitigation: manage scope carefully." (circular)
- "Risk of technical complexity. Mitigation: take an iterative approach." (not a mitigation, just a platitude)
- Replacement test: does the mitigation describe a specific action a specific person will take by a specific date? If not, it's a reflex.

**Out-of-scope sections**
- Empty sections
- "Will be addressed in a future phase" with no specifics
- "To be determined" or "TBD"
- Replacement test: could someone read this section and know exactly what NOT to build? If not, it's a reflex.

### Step 3: Generate with the replacements

Now produce the artefact. Use context-specific alternatives from your product context instead of the rejected defaults. Every persona, metric, acceptance criterion, and risk should be specific enough that it could only belong to THIS product.

### Step 4: Cross-check the result

After generating, scan your output for any reflex defaults that crept back in. Check each section against the reflex list above. If the personas read like a marketing demographic, the metrics are vanity metrics, or the risk mitigations are circular, revise before delivering.

---

## Slop Taxonomy

Teach yourself to recognise these patterns in PM output.

**Substance slop** (the thinking is weak):

1. **Generic preamble slop**: "In today's fast-paced digital landscape..." - if the first paragraph could apply to any product, delete it.
2. **False confidence slop**: Stating assumptions as facts, invented statistics presented as data, certainty where uncertainty exists.
3. **Sycophantic slop**: "Great question!" "That's a really interesting approach!" - flattery that substitutes for substance.
4. **List-ification slop**: Everything becomes 5-7 equal-weight bullet points. Real prioritisation means some things matter more than others.
5. **Hedge slop**: "It depends on various factors..." - if you can't name the factors and their weights, you haven't done the thinking.
6. **Buzzword slop**: "Leverage synergies to drive engagement through seamless experiences" - words that sound strategic but mean nothing.
7. **Scope creep slop**: A brief that started as one feature but somehow includes a redesign, a migration, and a new integration.
8. **Happy path slop**: Specs that only describe what happens when everything works perfectly.
9. **Mirror slop**: restating the user's input back in slightly different words, disguised as analysis. If the output contains nothing the user did not already say, it is a mirror, not a contribution.

**Voice slop** (it sounds like AI wrote it):

10. **AI vocabulary slop**: Words like "delve", "tapestry", "landscape", "realm", "beacon", "nuanced", "multifaceted", "robust", "meticulous", "pivotal", "underscore", "intricate", "cacophony", "intricacies", "interplay", "garner", "foster", "bolster", "harness", "illuminate", "facilitate", "streamline", "showcase", "vibrant", "enduring". If the word sounds like a thesaurus suggestion, replace it with plain English. Also cut the overused qualifiers: "arguably", "it's worth noting", "importantly", "notably", "furthermore", "consequently", "ultimately".
11. **Sentence pattern slop**: "It's not X, it's Y" constructions, verb inflation ("serves as", "stands as", "represents", "marks" instead of "is"), uniform sentence length, opening by restating the question, closing with an upbeat summary paragraph. Read aloud - if it sounds like a press release, rewrite it.
12. **Formatting slop**: Excessive colon-into-list patterns, bold key phrases mid-sentence, headers every 2-3 paragraphs when unnecessary. Not everything needs a subheading or a bullet list. Never use em dashes.

---

## The Claudism Catalogue

The slop taxonomy above catches the GPT-era tells: thesaurus vocabulary, "it's not X, it's Y", em dashes. Those are now widely known and easy to scrub. This section catches the newer register: the Claude analytical voice that sounds like sharp thinking but is pattern-matched. The vocabulary can be clean and the doc can still read machine-extruded, because the moves give it away.

A PM should care because an exec or eng lead who clocks these tells stops reading for content and starts reading for the tells. The moment they conclude "this was generated, not thought", the doc loses authority no matter how correct it is. In a review, flag these the way you flag a vanity metric: quote the exact phrase, name what it is faking, give the fix.

This catalogue has three uses, in order of leverage. First, **prevention**: write plainly the first time so the tells never appear (rules below). Second, the **post-generation voice pass**: the generator modes scan their own output and rewrite what slipped through. Third, **detection**: the `review` mode runs it on a draft the user brings in. Prevention is the goal; the other two are the safety net, and the safety net stays, because this register is the model's default and instruction alone will not fully suppress it. Aim for a lower rate, not zero.

The hardest tells are sentence skeletons with swappable slots, not single words. The example phrases below are illustrations; the skeleton is what repeats. Match the shape, not the literal words. "It's the question every audit turns on" and "it's the constraint every migration runs into" are the same tell.

One tell is not a verdict. Three or more from different families below means the draft reads as AI-generated and needs a voice pass before it reaches its audience.

**Prevention: write plainly the first time.** Catching a tell after writing it is cleanup. The goal is not to reach for it at all. The standard for "plain" here comes from Ann Handley's *Everybody Writes*, applied to PM docs. Write to it before you start, not only in the voice pass after.

Her rules:
- Lead with the most important words. Cut throat-clearing openers like "There is", "It's worth noting", and "The purpose of this is".
- One idea per sentence, most under 25 words. Concrete subject, verb, object.
- Active voice, present tense. The subject does the thing.
- Short, common words. "use", not "utilise". Make every word carry meaning, and delete the ones that do not, starting with "very", "really", "actually", and "fundamentally".
- Show, do not tell. "A team can raise it without helping one user" beats "the metric is misaligned".
- Write for the reader. Answer what is in it for them and why they should care. Assume they know nothing, but never that they are stupid.
- No one ever complained that a document was too easy to understand.

The tells to avoid:
- State the point. Do not announce that you are about to make it, reframe it, push back, or be honest. The reader cannot see the setup and does not want to.
- No metaphor unless it carries information the plain word does not.
- No universal ("every X", "for structural reasons") you cannot cite a basis for.
- No tidy decomposition ("three layers", "the cleanest way to think about this", "four things have to hold") unless the cut points change what the reader does.
- No colon used to set up a one-clause payoff. If the bit after the colon could be its own sentence, write the sentence.
- Cut the closer. End on the last real point, not a punchline.

Before and after (each "plain" version follows Handley's rules above):
- Slop: "Let me push back: it's not that the metric is wrong, it's that it games easily. That's the structural spine." Plain: "The metric games easily. A team can raise it without helping one user."
- Slop: "Here's what's actually interesting, and it's the question every roadmap turns on." Plain: "The roadmap turns on one trade-off: breadth now or depth later."
- Slop: "The way to hold the scope is as three clean layers." Plain: "Search and filters are in scope. Saved views are out of scope for now."
- Slop: "Here's the catch: the metric games easily." Plain: "The metric games easily."
- Slop: "For the launch to land, four things have to hold." Plain: "The launch works only if sales can demo it in under ten minutes and support can clear tickets without escalating."

**1. Performative pushback.** Signals critical engagement without doing any. Announces a challenge, then concedes or restates the user's point in fancier words.
- Tells: "Let me push back on that", "Let me refine your load-bearing claim rather than just accepting it", "The one place I'd still push", "you're doing zero moves there", "I'd challenge the premise here".
- Fakes: independent judgement. Real pushback names the specific claim and the specific counter-evidence. This just performs the posture.
- Fix: cut the announcement. State the disagreement and the reason, or delete it.

**2. The reframe announcement.** Telegraphs a reframe instead of doing one. Promises the interesting part is elsewhere, then rarely delivers it.
- Tells: "Here's what's actually interesting", "the gap is what's actually interesting", "the real question is", "the deeper point is", "what's really going on here", "Zoom out", "Let's step back".
- Fakes: insight. If the reframe is real, just make it. The signpost is the tell.
- Fix: delete the signpost and lead with the reframed point. If nothing is behind it, cut the sentence.

**3. Naming the move.** Meta-labels its own rhetoric as if narrating the analysis makes it true.
- Tells: "The tell:", "the move here is", "what's load-bearing here is", "the thing that's actually doing the work", "and that's the crux".
- Fakes: precision. Calling a claim "load-bearing" does not make it load-bearing.
- Fix: make the point without narrating that you are making it.

**4. Structural metaphor and forced conceit.** Reaches for building, skeleton, or vivid-clothing imagery to sound rigorous, dressing an abstract point in a physical metaphor it does not need.
- Tells: "the structural spine", "load-bearing claim", "the scaffolding", "the connective tissue", "the through-line", "pull one and the other goes inert", "the foundation this rests on". And the personifying conceit: "your message is wearing content-clothes", "two problems wearing one coat", "the claim is doing a lot of heavy lifting".
- Fakes: systems thinking. The metaphor stands in for the actual mechanism.
- Fix: describe the real dependency or distinction in plain terms, or cut the metaphor.

**5. The antithesis flip.** The reversal that announces itself. A close cousin of the slop taxonomy's sentence-pattern slop above ("it's not X, it's Y"), extended to its current variants.
- Tells: "not just X but Y", "isn't X so much as Y", "X isn't the problem; Y is", "Two things can be true at once", "the emptiness IS the content".
- Fakes: paradox and depth. It is a sentence template, not an idea.
- Fix: say it directly. "The metric games easily" beats "It's not that the metric is wrong, it's that it games easily".

**6. False candor, flattery, and the validation stamp.** Performs honesty, intimacy, or assessment to buy trust it has not earned. Two shapes: flattering the person, and certifying their premise as legitimate before engaging it.
- Flattery tells: "You're absolutely right", "Great question", "That's a sharp observation", "Let me be honest", "I'll be direct", "the honest answer is", "To be clear", "Real talk".
- Validation-stamp tells: "This is a real gap", "This is a real problem", "That's a genuine tension", "You're onto something real here", "This is the right question to be asking".
- Fakes: a relationship and a stake, plus the appearance of having assessed. Candor is saying the hard thing, not announcing that you are about to. A stamp that the premise is "real" is not engagement with the premise.
- Fix: drop the preamble and engage the substance directly. Cut the flattery and the stamp entirely.

**7. The aphoristic closer.** A short, punchy fragment dropped to sound profound. Often a one-line sentence standing alone for cadence.
- Tells: "That's the structural spine.", "That's the whole game.", "And that changes everything.", "Simple as that.", any fragment whose only job is to feel like a mic drop.
- Fakes: a hard-won conclusion. The rhythm does the work the argument should.
- Fix: end on the substantive point. If the closer adds no information, cut it.

**8. Emphasis and rhythm tics.** Typographic and structural habits that signal "this is the important part" instead of earning it.
- Tells: CAPS mid-sentence for emphasis ("the emptiness IS the content"), bolding a key phrase mid-sentence, the compulsive rule of three (every list and sentence arriving in triads), uniform paragraph length, the colon-into-list reflex, the clipped parallel negation ("Search and filters ship now. Saved views do not."), where a short second sentence mirrors and negates the first for cadence.
- Fakes: emphasis and structure. Real emphasis comes from word choice and placement, not typography.
- Fix: let the sentence carry the weight. Vary list length to what the content needs. Break the triads.

**9. The false universal.** Inflates one local, specific point into a categorical law so it reads as settled wisdom. The claim about this situation gets dressed as the hinge of an entire class.
- Setup (the skeleton, the bracketed slot varies): "it's the question every [audit] turns on", "this is what every [migration] comes down to", "every good [strategy] does this", "the thing every [PM] eventually learns", "this is the [X] that makes or breaks it".
- Fakes: authority and consensus. The universal is asserted, never shown, and is usually unfalsifiable.
- Fix: make the claim about this specific situation and back it. Drop the "every X" frame unless you can cite the basis for it.

**10. The clean mental model.** Hands over an invented decomposition as if it were the natural, canonical one. Usually a suspiciously round number and a "clean" or "crisp" stamp.
- Setup: "the cleanest way to think about this is...", "the cleanest way to hold it is as four layers", "there are basically three kinds of...", "this splits neatly into two...", "the right frame here is X versus Y".
- Fakes: a rigorous framework. The number is arbitrary, "cleanest" is unearned, and the model often does no work beyond looking orderly.
- Fix: keep a decomposition only if it changes what the reader does. Justify the cut points, or drop the framing and state the content plainly.

**11. The strategy-memo register.** The compressed, confident, insight-dense voice of a VC memo or strategy essay. Packs a thesis, a market gap, and a moat into knowing shorthand that sounds like operator instinct while skipping the evidence for any of it. Common in positioning and strategy docs.
- Setups (the skeleton, the bracketed slot varies):
  - Present-state compression: "we run [access and posture] today", "today we do [X and Y]". States current scope crisply to tee up a gap.
  - Proof and gap: "two vendors prove the model and show the gap", "[X] proves the thesis and exposes the opening".
  - Trajectory inflation: "it points us to where the market is going", "this signals where things are heading", "this is where the puck is going". A single present signal recast as the direction of a whole market, with no basis for the extrapolation.
  - Structural blind spot: "the rest of the field misses this for structural reasons", "incumbents can't follow for structural reasons".
  - The held tension: "one tension to hold honestly", "a tension to hold here", "two things to hold at once".
  - Game framing: calling decisions "moves" ("the move here is", "the smart move is", "they're out of moves").
- Fakes: strategic clarity and operator judgement. The shorthand asserts the thesis, the gap, and the moat at once, with evidence for none of them.
- Fix: name the actual capability, the actual gap with the evidence for it, and the actual reason a competitor has not closed it. Cut the "move" framing and the "to hold honestly" flourish.

**12. The bolt-on significance sentence.** A free-floating claim of broader importance dropped onto a paragraph, usually as the opening sentence or tacked on with "it also...", wired only loosely to the content around it. This is a structural tell, not a vocabulary one: the sentence is there to inflate stakes, not to carry information. Trajectory inflation (family 11) is a frequent payload, but the slot takes anything that gestures at a bigger picture.
- Tells: "it also points us to where the market is going", "there's a bigger story here", "this connects to a broader pattern", "and that has implications well beyond this", "zooming out, this matters because...".
- Test: delete the sentence. If the paragraph loses no information, it was bolted on.
- Fakes: significance and synthesis. Real significance is argued in its own right, not asserted as an aside.
- Fix: cut it. If the broader point is real and worth making, give it its own claim with the reasoning that supports it.

**13. The colon reveal.** Uses a colon to manufacture a beat of suspense before a short payoff, as if the pause were the insight. Distinct from family 8's colon-into-list reflex (colon, then bullets); this is the mid-prose colon doing dramatic work. The pattern is [short label] + colon + [the actual point], repeated until every paragraph in the doc opens the same way.
- Tells: "Here's the catch: it games easily", "The problem: nobody owns it", "One tension: speed versus safety", "The tell: it reframes without delivering", "What changed: everything", "The result: a roadmap nobody trusts".
- Fakes: emphasis and timing. The colon borrows the rhythm of a reveal without an argument behind it. Repeated across a doc, every point arrives with the same engineered pause.
- Fix: write the full sentence. "The metric games easily" beats "The catch: it games easily". Keep a colon only when what follows is a genuine list or a definition the colon is structurally introducing, not a one-clause punchline.

**14. The conditions checklist (the logician's "hold").** Presents a set of requirements as formal necessary conditions, usually with a round number and the verb "hold" borrowed from logic and maths, where "X holds" means "X is true". Dresses a judgement call as a satisfied proof.
- Setup (the bracketed slots vary): "for this to work, [four] things have to hold", "[three] conditions have to hold", "this only works if [Y] holds", "the assumption that has to hold is...", "the invariant here is...".
- Note: "hold" is a Claude favourite in three senses, and only this one is family 14. Here it means be true. In family 11 ("a tension to hold") it means keep in mind. In family 10 ("the way to hold this is as four layers") it means grasp or understand. Flag any of the three.
- Fakes: rigour. A real precondition is testable and you say how you would check it. The borrowed-logic "hold" makes a soft list of hopes sound like a theorem, and the count is usually arbitrary (the same point survives as three conditions or as five).
- Fix: list the actual requirements and, for each, how you would know it is met. Drop the "have to hold" framing and the tidy number.

**Register vocabulary.** The current Claude word-hoard, distinct from the delve/tapestry GPT list. Treat a cluster of these as a flag: "load-bearing", "tractable", "crisp", "surface" (as a verb), "gestures at", "in tension with", "orthogonal", "first-order / second-order", "downstream", "non-trivial", "the interesting tension", "fundamentally", "nuanced", "the crux", "hold" (in any of its overused senses: "X holds" = is true, "a tension to hold" = keep in mind, "the way to hold this" = grasp or understand). Replace with plain English, as in the slop taxonomy's AI vocabulary slop above.

The catalogue grows in the pm-skills repository, not at runtime. If a review surfaces a tell that fits no family, flag it in the review output as an unclassified tell so the user can report it; do not edit this file, which may be a read-only installed copy.

---

## Anti-Patterns in PM Work

### Feature Factory

Measuring success by velocity and output. Sprint velocity is not product strategy. If your roadmap is a list of features without hypotheses, you're a feature factory.

### Stakeholder Waiter

Taking feature requests from stakeholders and passing them to engineering. A PM's job is to understand the problem behind the request and find the best solution, not to be a translator of demands.

### Research Theater

Running surveys and interviews to validate decisions already made. If the research can't change the outcome, it's theater.

### Strategy by Analogy

"Spotify does X, so we should too." Context matters more than best practices. What works for a mature music streaming platform may be irrelevant for your B2B SaaS.

### Consensus Seeking

Trying to make everyone happy with every decision. Good product decisions make some people unhappy. If nobody disagrees, you haven't made a real choice.

### Metric Worship

Optimising for metrics that don't connect to real user value. High engagement can mean users are confused. Low churn can mean users are locked in, not satisfied.
