---
name: discover
description: Plan customer conversations that get truth, not politeness. Debrief after to extract real signal. Uses Mom Test and Demand-Side Sales forces.
user-invokable: true
args:
  - name: mode
    description: "'plan' to prepare for a conversation, 'debrief' to extract signal from notes, or omit to be asked"
    required: false
  - name: context
    description: "What you're trying to learn, or paste conversation notes for debrief"
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read the [discovery reference](../product-management/reference/discovery.md) for Mom Test principles, JTBD framing, and validation patterns.

---

Help PMs have better customer conversations and extract real signal from them. This skill has two modes: **plan** (before the conversation) and **debrief** (after).

If the user doesn't specify a mode, ask which they need.

---

## Mode: Plan

Prepare for a customer or user conversation that gets truth, not politeness.

### Step 1: What Are You Trying to Learn?

Before designing questions, clarify the goal. Ask:

- **What's your hypothesis?** What do you currently believe about this problem or opportunity?
- **What would change your mind?** If you heard X, would you stop building? If not, you're not really testing anything.
- **What's the riskiest assumption?** The one thing that, if wrong, makes everything else irrelevant.
- **Who are you talking to?** Specific person or type. What's their relationship to the problem?

If the user says "I just want to understand their needs" - push back. That's too vague. What specific aspect of their needs? What would you do differently based on what you learn?

### Step 2: Apply the Mom Test

Design questions that follow Mom Test principles. The rules:

1. **Talk about their life, not your idea.** Bad: "Would you use a tool that does X?" Good: "How do you handle X today?"
2. **Ask about specifics in the past, not generics about the future.** Bad: "Would you pay for this?" Good: "Last time this happened, what did you do? How much did that cost you?"
3. **Talk less, listen more.** If you're pitching, you're not learning.
4. **Seek disconfirming evidence.** Don't just collect stories that support your hypothesis.
5. **Compliments are noise.** "That sounds great!" teaches you nothing. Commitments and actions teach you everything.

For each question, flag:
- What you'll learn from the answer
- What a concerning answer would sound like
- What a validating answer would sound like

### Step 3: Map the Forces (Demand-Side Sales)

Use Moesta's four forces framework to design questions that uncover switching behaviour:

**Push of the current situation** - What's painful enough to make them want change?
- "What's the most frustrating part of how you do this today?"
- "When was the last time this really cost you? What happened?"
- "What's the workaround you've built? How well does it hold up?"

**Pull of the new solution** - What's attractive about a better future?
- "If this worked perfectly, what would be different about your day/week/quarter?"
- "What have you already tried to fix this? What was appealing about those options?"

**Anxiety of the new** - What's scary about switching?
- "What would make you hesitate to change how you do this?"
- "What's the worst case if a new approach doesn't work?"
- "Who else would need to be on board? What would they worry about?"

**Habit of the present** - What's comfortable about the status quo?
- "What works well enough about your current approach?"
- "How long have you been doing it this way? What would it take to justify changing?"

The forces tell you whether demand exists. Push + pull must outweigh anxiety + habit, or people won't switch no matter how good your solution is.

### Step 4: Deliver the Conversation Guide

Structure the output as:

**Hypothesis**: [What you're testing]

**Riskiest assumption**: [The one that matters most]

**Kill criteria**: [What answer would make you stop or pivot]

**Opening questions** (warm up, establish context):
- [2-3 questions about their world, not your idea]

**Core questions** (test the hypothesis):
- [5-7 questions, each tagged with which force it maps to and what you'll learn]

**Commitment questions** (test if this matters enough to act):
- [2-3 questions that ask for time, money, reputation, or effort - not opinions]

**Watch for**:
- [Specific red flags that mean you're hearing politeness, not truth]
- [Specific signals that mean you're onto something real]

### NEVER
- Generate questions that pitch the solution ("Wouldn't it be great if...")
- Accept "yes that sounds useful" as validation - it's a compliment, not a commitment
- Let the user skip the hypothesis step - conversations without hypotheses are tourism
- Produce a script - this is a guide, not a teleprompter

---

## Mode: Debrief

Extract signal from conversation notes. Turn raw observations into actionable insight.

### Step 1: Get the Notes

Ask the user to paste their conversation notes, recording transcript, or summary. Also ask:

- Who did you talk to? (Role, context, relationship to the problem)
- What was your hypothesis going in?
- What were you trying to learn?

### Step 2: Extract Signal vs Noise

Go through the notes and categorise every substantive statement:

**Facts** (things they actually did, specific past behaviour):
- Quote or paraphrase, with context

**Opinions** (what they think, feel, or predict):
- Flag these clearly - opinions are unreliable. "I would definitely use that" is an opinion, not a fact.

**Commitments** (things they offered to do - time, money, introduction, effort):
- These are the strongest signal. Did they offer anything concrete?

**Requests** (features or solutions they asked for):
- Note these but don't take them at face value. The request is a symptom - what's the underlying need?

### Step 3: Map the Forces

From the notes, assess each force:

| Force | Strength | Evidence |
|---|---|---|
| Push (pain with status quo) | Weak / Medium / Strong | [Specific quotes or behaviours] |
| Pull (attraction to better) | Weak / Medium / Strong | [Specific quotes or behaviours] |
| Anxiety (fear of change) | Weak / Medium / Strong | [Specific quotes or behaviours] |
| Habit (comfort with now) | Weak / Medium / Strong | [Specific quotes or behaviours] |

**Switching likelihood**: If push + pull significantly outweigh anxiety + habit, there's real demand. If not, you have a "nice to have" problem.

### Step 4: Test the Hypothesis

- **Confirmed, challenged, or inconclusive?** Be honest. One conversation doesn't prove anything, but it can raise or lower confidence.
- **What did you learn that you didn't expect?** This is often the most valuable part.
- **What's the updated hypothesis?** Based on this conversation, what do you now believe?
- **What's still unknown?** What would you ask next time?

### Step 5: Deliver the Debrief

**Conversation summary**: [Who, when, context - 2 sentences max]

**Hypothesis going in**: [What you were testing]

**Verdict**: Confirmed / Challenged / Inconclusive

**Key facts learned**:
- [Bullet list of specific, observable facts - not opinions]

**Forces assessment**:
[The table from Step 3]

**Strongest signal**: [The single most important thing you learned, and why]

**Red flags**: [Anything that suggests you're wrong, or that the person was being polite]

**Updated hypothesis**: [What you believe now, and confidence level]

**Next conversation should test**: [What's still unknown]

### NEVER
- Treat one conversation as proof of anything
- Ignore evidence that contradicts the hypothesis
- Elevate opinions ("I'd love that") over behaviour ("Last time this happened, I spent 3 hours on a workaround")
- Let the user cherry-pick only the supportive quotes

## What's Next

- Run `/pm:prioritise` to stack-rank what you've learned against other opportunities.
- Run `/pm:brief` or `/pm:spec` if discovery confirmed something worth building.
- Run `/pm:discover plan` again to design the next conversation based on what's still unknown.
