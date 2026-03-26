---
name: stakeholders
description: Craft the right message for the right person. Helps you communicate with stakeholders, get buy-in, and navigate tough conversations.
user-invokable: true
args:
  - name: situation
    description: "Who you need to communicate with and about what (e.g. 'update VP Engineering on the delay', 'get buy-in from data team')"
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Leadership reference](../product-management/reference/leadership.md) for BRAVING trust, stakeholder management, and change management
- [Communication reference](../product-management/reference/communication.md) for audience translation and the SUCCESs framework

---

This skill helps you communicate with specific people effectively - crafting messages, preparing for conversations, getting buy-in, or navigating difficult situations. It's not about building a map and filing it away. It's about the message you need to send right now.

**This skill asks pointed questions about the person you're communicating with.** Generic advice ("be clear and concise") is useless. The value is in understanding their specific context and tailoring your approach.

**Important: This skill does not persist or store information about stakeholders.** Organisational dynamics are sensitive. Everything stays in the conversation.

## Step 1: Understand the Situation

Ask:

- **Who are you communicating with?** Name, role, team.
- **What's the goal?** What do you need from this interaction? (Approval, awareness, buy-in, feedback, alignment, de-escalation)
- **What's the context?** What's happening right now that makes this conversation necessary?
- **What's at stake?** What happens if this goes badly? What happens if you don't have the conversation at all?

If the user provides a situation upfront ("I need to tell the CTO we're dropping the migration"), start there and fill in gaps.

## Step 2: Understand the Person

Ask about the specific person or team:

### What do they care about?
- What are they measured on? What's their team focused on right now?
- What pressures are they under? (Headcount, deadlines, political dynamics, their own stakeholders)
- What does a good outcome look like from their perspective - not yours?

### How do they operate?
- How do they prefer to receive information? (Detailed doc, quick Slack message, face-to-face, structured meeting)
- How do they make decisions? (Data-first, gut feel, consensus, authority)
- What framing has worked with them before? What hasn't?

### Where are they on this topic?
- What's their current understanding of the situation?
- Are they likely supportive, neutral, skeptical, or opposed?
- What's their likely first question or concern?

Push back on:
- "I don't know what they care about" - then you're not ready for this conversation. What can you find out first?
- "They're supportive" without specifics - supportive of what exactly? People who seem supportive can flip when details emerge.
- Generic descriptions - "she's technical" doesn't help. "She'll want to know the migration risk to uptime" does.

## Step 3: Identify the Gap

What needs to shift?

- **Knowledge gap**: They don't know something they need to know. Lead with information.
- **Alignment gap**: They disagree on direction. Lead with shared goals, then address the disagreement.
- **Trust gap**: They don't trust the team or the process. Lead with evidence and accountability.
- **Priority gap**: They don't think this is important enough. Lead with what matters to them, not what matters to you.
- **Emotional gap**: They're frustrated, anxious, or feel unheard. Lead with acknowledgment before content.

Most failed stakeholder conversations fail because the PM leads with their own priority instead of addressing the actual gap.

## Step 4: Craft the Approach

Based on the gap and the person:

### Message Structure
- **Open with their context**: Start with what matters to them, not your update. "I know your team is focused on reducing incidents - here's how this affects that" not "Here's a project update."
- **State the core message**: One clear sentence. What's the thing they need to know or decide?
- **Anticipate their questions**: What will they ask? Have answers ready. If you don't know, say so honestly.
- **Make the ask explicit**: What do you need from them? Don't make them guess.

### Format and Channel
- Match their preference. A detailed person gets the doc. A busy exec gets three bullets.
- Bad news in person or on a call, never buried in a Slack thread.
- Decisions that need a paper trail go in writing, even if you discuss verbally first.

### For Difficult Conversations

Using the BRAVING framework:
- **Be honest about what's happening** - clear is kind. Softening bad news erodes trust faster than the bad news itself.
- **Own what's yours** - if the team dropped the ball, say so before they have to point it out.
- **Separate the problem from the person** - "The timeline slipped" not "You gave us an unrealistic timeline."
- **Come with options, not just problems** - "Here's what happened, here are three paths forward, here's what I recommend."

### For Getting Buy-In

Using the Rider-Elephant-Path framework:
- **Direct the Rider** (rational mind): Give them a clear, specific ask. Not "support this initiative" but "I need you to approve two engineers for three weeks."
- **Motivate the Elephant** (emotional mind): Help them feel why it matters. A customer story beats a slide deck.
- **Shape the Path** (make it easy): Reduce friction. "I've drafted the email, can you review and forward?" not "Can you communicate this to your team?"

## Step 5: Deliver the Output

Depending on what the user needs:

### If they need a message draft:
Write the actual message - Slack, email, or talking points. Tailored to the person, the channel, and the gap. Short enough to actually send.

### If they need conversation prep:
- **Opening**: How to start (their context, not yours)
- **Core message**: The one thing they need to hear
- **Anticipated pushback**: What they'll say, and how to respond
- **The ask**: What you need from them, stated clearly
- **Fallback**: If they say no, what's your next move?

### If they need to navigate a difficult dynamic:
- **What's really going on**: Name the underlying tension
- **What they're likely feeling**: Not just thinking - feeling
- **Approach**: Specific actions, not generic advice
- **What to avoid**: The thing that would make it worse

## NEVER

- Store, persist, or write stakeholder information to files - organisational dynamics are sensitive
- Produce a generic "stakeholder communication plan" - this skill is about specific interactions
- Give advice that ignores the person's actual context and pressures
- Suggest manipulation tactics - this is about empathy and effectiveness, not politics
- Assume the user's framing is complete - always ask what the other person's perspective might be
- Skip the "what do they care about" step - it's the foundation of everything else

## What's Next

- Run `/pm:translate` to rewrite an existing document for this person's audience.
- Run `/pm:decide` if the stakeholder interaction is about resolving a contested decision.
- Run `/pm:discover plan` if you realise you need to understand their concerns better before the conversation.
