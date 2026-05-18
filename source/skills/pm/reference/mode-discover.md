# Mode: discover

Help PMs have better customer conversations and extract real signal from them. Two sub-modes: **plan** (before a conversation) and **debrief** (after).

Consult [knowledge-discovery.md](knowledge-discovery.md) for Mom Test principles, JTBD framing, and the Demand-Side Sales forces framework.

If the user does not specify a sub-mode, ask which they need.

---

## Sub-mode: Plan

Prepare for a customer or user conversation that gets truth, not politeness.

### Step 1: What Are You Trying to Learn?

Before designing questions, clarify the goal. Ask:

- **What is your hypothesis?** What do you currently believe about this problem or opportunity?
- **What would change your mind?** If you heard X, would you stop building? If not, you are not really testing anything.
- **What is the riskiest assumption?** The one thing that, if wrong, makes everything else irrelevant.
- **Who are you talking to?** Specific person or type. What is their relationship to the problem?

If the user says "I just want to understand their needs" - push back. That is too vague. What specific aspect? What would you do differently based on what you learn?

### Step 2: Apply the Mom Test

Design questions that follow Mom Test principles:

1. **Talk about their life, not your idea.** Bad: "Would you use a tool that does X?" Good: "How do you handle X today?"
2. **Ask about specifics in the past, not generics about the future.** Bad: "Would you pay for this?" Good: "Last time this happened, what did you do? How much did that cost you?"
3. **Talk less, listen more.** If you are pitching, you are not learning.
4. **Seek disconfirming evidence.** Do not just collect stories that support your hypothesis.
5. **Compliments are noise.** "That sounds great!" teaches you nothing. Commitments and actions do.

For each question, flag: what you will learn, what a concerning answer looks like, and what a validating answer looks like.

### Step 3: Map the Forces

Use the four forces framework to design questions that uncover switching behaviour:

**Push (pain with current situation)**
- "What is the most frustrating part of how you do this today?"
- "When was the last time this really cost you? What happened?"
- "What workaround have you built? How well does it hold up?"

**Pull (attraction to something better)**
- "If this worked perfectly, what would be different about your day?"
- "What have you already tried to fix this? What was appealing about those options?"

**Anxiety (fear of switching)**
- "What would make you hesitate to change how you do this?"
- "What is the worst case if a new approach does not work?"
- "Who else would need to be on board? What would they worry about?"

**Habit (comfort with the status quo)**
- "What works well enough about your current approach?"
- "How long have you done it this way? What would justify changing?"

Push + pull must outweigh anxiety + habit, or people will not switch regardless of how good the solution is.

### Step 4: Deliver the Conversation Guide

**Hypothesis**: [What you are testing]

**Riskiest assumption**: [The one that matters most]

**Kill criteria**: [What answer would make you stop or pivot]

**Opening questions** (warm up, establish context):
- [2-3 questions about their world, not your idea]

**Core questions** (test the hypothesis):
- [5-7 questions, each tagged with which force it maps to and what you will learn]

**Commitment questions** (test if this matters enough to act):
- [2-3 questions that ask for time, money, reputation, or effort - not opinions]

**Watch for**:
- [Specific red flags that mean you are hearing politeness, not truth]
- [Specific signals that mean you are onto something real]

**Never**: generate questions that pitch the solution, accept "yes that sounds useful" as validation, let the user skip the hypothesis step, or produce a script instead of a guide.

---

## Sub-mode: Debrief

Extract signal from conversation notes. Turn raw observations into actionable insight.

### Step 1: Get the Notes

Ask the user to paste their conversation notes, transcript, or summary. Also ask:
- Who did you talk to? (Role, context, relationship to the problem)
- What was your hypothesis going in?
- What were you trying to learn?

### Step 2: Extract Signal vs Noise

Categorise every substantive statement from the notes:

**Facts** (things they actually did, specific past behaviour) - these are reliable

**Opinions** (what they think, feel, or predict) - flag clearly; opinions are unreliable

**Commitments** (things they offered: time, money, introduction, effort) - strongest signal

**Requests** (features or solutions they asked for) - note these but look for the underlying need

### Step 3: Map the Forces

| Force | Strength | Evidence |
|---|---|---|
| Push (pain with status quo) | Weak / Medium / Strong | [Specific quotes or behaviours] |
| Pull (attraction to better) | Weak / Medium / Strong | [Specific quotes or behaviours] |
| Anxiety (fear of change) | Weak / Medium / Strong | [Specific quotes or behaviours] |
| Habit (comfort with now) | Weak / Medium / Strong | [Specific quotes or behaviours] |

If push + pull significantly outweigh anxiety + habit, there is real demand. If not, you have a "nice to have" problem.

### Step 4: Test the Hypothesis

- **Confirmed, challenged, or inconclusive?** Be honest. One conversation does not prove anything, but it raises or lowers confidence.
- **What did you learn that you did not expect?** Often the most valuable part.
- **What is the updated hypothesis?** What do you now believe?
- **What is still unknown?** What would you ask next time?

### Step 5: Deliver the Debrief

**Conversation summary**: [Who, when, context - 2 sentences max]

**Hypothesis going in**: [What you were testing]

**Verdict**: Confirmed / Challenged / Inconclusive

**Key facts learned**: [Bullet list of specific, observable facts - not opinions]

**Forces assessment**: [The table from Step 3]

**Strongest signal**: [The single most important thing learned, and why]

**Red flags**: [Anything suggesting you are wrong, or that the person was being polite]

**Updated hypothesis**: [What you believe now, and confidence level]

**Next conversation should test**: [What is still unknown]

**Never**: treat one conversation as proof, ignore contradicting evidence, elevate opinions over behaviour, or let the user cherry-pick only supportive quotes.

If discovery confirmed something worth building, `pm brief` or `pm spec` is the next step.
