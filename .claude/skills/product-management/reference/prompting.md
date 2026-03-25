# Prompting

How to work with AI effectively as a PM. Not a list of tips - a way of thinking about AI as a collaborator that you hold to the same standard you'd hold a junior PM.

---

## Core Techniques

### Chain of Thought for Trade-off Analysis

Don't ask AI for the answer. Ask it to think through the problem step by step.

**Weak**: "Should we build feature X or feature Y?"
**Strong**: "Walk through the trade-offs between building X and Y. For each, consider: impact on our target segment (mid-stage startup PMs), engineering cost, strategic alignment with our positioning as a decision-support tool, and what we'd be giving up. Then make a recommendation and name the biggest risk in that recommendation."

Chain of thought forces the AI to show its work. You can spot where the reasoning breaks down.

### Few-Shot Examples to Set the Quality Bar

Show the AI what good looks like before asking it to produce.

**Weak**: "Write acceptance criteria for this feature."
**Strong**: "Here's an example of acceptance criteria that meets our team's standard: [insert real example]. Now write acceptance criteria for [feature] at the same level of specificity, covering happy path, error states, edge cases, and performance requirements."

The few-shot example is your quality contract. Without it, you get the AI's default - which is generic.

### Structured Prompts

Every PM prompt should include four components:

1. **Context**: What the AI needs to know about the product, users, constraints, and current state
2. **Objective**: What you need it to do, specifically
3. **Constraints**: What it should NOT do, what format to use, what to avoid
4. **Output format**: Exactly how you want the result structured

**Example**:
"Context: We're a B2B project management tool for teams of 20-100. Our users are technical PMs. We're positioned as the tool for teams that need engineering buy-in on product decisions.
Objective: Review this spec for gaps that would cause engineering to come back with questions.
Constraints: Don't rewrite the spec. Only identify gaps. Be specific about what's missing, not vague.
Output: Numbered list of gaps, each with: what's missing, why engineering would need it, and a suggested addition."

### Self-Critique

After the AI produces something, make it attack its own work.

- "Now review what you just wrote. Identify the three weakest assumptions."
- "Read this as a skeptical senior engineer. What would you push back on?"
- "What's missing from this that a customer would notice immediately?"

This catches the AI's tendency toward confident, polished output that hasn't been stress-tested.

### Negative Prompting

Specify what you DON'T want. This is often more effective than specifying what you do want, because it blocks the AI's default patterns.

- "Don't use generic preambles. Start with the specific problem."
- "Don't list 7 equal-weight priorities. If everything matters equally, you haven't prioritised."
- "Don't hedge with 'it depends.' Name the specific factors and their weights."
- "Don't use buzzwords. If a sentence would make sense in any company's strategy doc, it's too generic."

---

## Anti-Slop Rules

These are non-negotiable when using AI for PM work.

### 1. Never Accept First Output

The first output is a draft, not a deliverable. Always iterate at least once. Push back, ask for specifics, challenge assumptions. The AI's first response is optimised for seeming helpful, not for being right.

### 2. Always Specify the Audience

Generic output is the result of no audience specified. "Write a brief" produces slop. "Write a brief for the iOS engineering team who needs to estimate this work and who will push back on vague requirements" produces something useful.

### 3. Demand Specificity

Vague output means vague input. When the AI gives you generics, push:
- "Give me a specific example."
- "What's the actual number?"
- "Name a real scenario where this applies."
- "State your assumptions explicitly."

If the AI can't be specific, either the input lacks context or the question doesn't have a meaningful answer.

### 4. AI Is a Collaborator, Not an Oracle

"Stress-test this" is a better prompt than "what should I do?"

Use AI to:
- Challenge your thinking (devil's advocate)
- Find gaps in your specs (adversarial review)
- Generate options you haven't considered (divergent thinking)
- Translate between audiences (reframing)
- Structure messy thinking (organisation)

Don't use AI to:
- Make decisions for you (you own the decision)
- Replace customer research (AI doesn't know your customers)
- Generate strategy from nothing (garbage in, garbage out)
- Produce final artefacts without human review (always review)

---

## The Slop Taxonomy

Teach yourself to recognise these patterns in AI output. Once you see them, you can't unsee them - and you'll stop accepting them.

### 1. Generic Preamble Slop
**Pattern**: "In today's fast-paced digital landscape..." or "As product teams navigate the complexities of..."
**Fix**: Delete the first paragraph. The real content usually starts in paragraph two.

### 2. False Confidence Slop
**Pattern**: Invented statistics presented as fact. "Studies show that 73% of users prefer..." (which studies? citation needed.)
**Fix**: Challenge every statistic. "Where does that number come from? Is that from our data or are you making it up?"

### 3. Sycophantic Slop
**Pattern**: "That's a great question!" "What an interesting approach!" "You're absolutely right that..."
**Fix**: "Skip the pleasantries. Give me substance."

### 4. List-ification Slop
**Pattern**: Every output is 5-7 equal-weight bullet points. No prioritisation, no hierarchy, no "this one matters 10x more than the others."
**Fix**: "Rank these by impact. The top item should be at least 3x more important than the bottom item. If they're actually equal, tell me why."

### 5. Hedge Slop
**Pattern**: "It depends on various factors..." "There are several considerations..." "The answer varies based on context..."
**Fix**: "Name the factors. Assign weights. Make a recommendation given what you know."

### 6. Buzzword Slop
**Pattern**: "Leverage synergies to drive engagement through seamless experiences"
**Fix**: "Rewrite this so a 14-year-old could understand it. If you can't, the idea isn't clear."

### 7. Mirror Slop
**Pattern**: Restating your input back to you in slightly different words, disguised as analysis.
**Fix**: "Tell me something I don't already know. What's the non-obvious insight?"

---

## PM-Specific Prompt Patterns

### For Specs
**Input**: Problem + personas + constraints
**Prompt structure**: "Given this problem [X] affecting these users [Y] with these constraints [Z], write a spec that covers: proposed solution, acceptance criteria for happy path and error states, edge cases, dependencies, and success metrics. Use specific examples for each acceptance criterion."

### For Decisions
**Input**: Options + weighted criteria
**Prompt structure**: "I'm deciding between [options]. The criteria are [list with weights]. For each option, evaluate against each criterion with a score and one-sentence justification. Then recommend the best option and name what we're giving up."

### For Feedback Analysis
**Input**: Raw feedback (interview notes, support tickets, survey responses)
**Prompt structure**: "Analyse this customer feedback. Group into themes. For each theme: what's the underlying need (not the stated request), how many sources mention it, and what contradictions exist within the theme. Flag any feedback that contradicts our current assumptions."

### For Stakeholder Communications
**Input**: Their context + your context + the ask + their likely concerns
**Prompt structure**: "I need to communicate [what] to [who]. Their context: [what they know, what they care about]. My context: [what I know, what I need from them]. Their likely concerns: [anticipated pushback]. Write a message that leads with what matters to them, addresses their concerns preemptively, and ends with a clear ask."

### For Prioritisation
**Input**: List of options + strategic context + constraints
**Prompt structure**: "Given our strategy of [X] and these constraints [Y], rank these items by expected impact on [target outcome]. For each: state your confidence level (high/medium/low), the biggest assumption behind the ranking, and what would change your mind."
