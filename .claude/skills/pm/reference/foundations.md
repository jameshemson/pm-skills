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

**Voice slop** (it sounds like AI wrote it):

9. **AI vocabulary slop**: Words like "delve", "tapestry", "landscape", "realm", "beacon", "nuanced", "multifaceted", "robust", "meticulous", "pivotal", "underscore", "intricate", "foster", "bolster", "harness", "illuminate", "facilitate", "streamline", "showcase", "vibrant", "enduring". If the word sounds like a thesaurus suggestion, replace it with plain English.
10. **Sentence pattern slop**: "It's not X, it's Y" constructions, verb inflation ("serves as" instead of "is"), uniform sentence length, opening by restating the question, closing with an upbeat summary paragraph. Read aloud - if it sounds like a press release, rewrite it.
11. **Formatting slop**: Excessive colon-into-list patterns, bold key phrases mid-sentence, headers every 2-3 paragraphs when unnecessary. Not everything needs a subheading or a bullet list. Never use em dashes.

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
