---
name: translate
description: Rewrite content for a different audience. Strips jargon, adjusts framing, leads with what matters to THEM.
user-invokable: true
args:
  - name: content
    description: "The content to translate, or a path to a file containing it"
    required: false
  - name: audience
    description: "Target audience: exec, engineering, customer, sales, support, or a custom description"
    required: false
  - name: format
    description: "Output format: deck, email, doc, changelog, talking-points, or a custom format"
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read the [communication reference](../product-management/reference/communication.md) for the SUCCESs framework, Curse of Knowledge, and audience translation patterns.

---

Translate existing content for a different audience and format. The same information needs different framing for different people. What matters to them is different from what matters to you.

**This skill asks questions before it produces anything.** Do not skip the discovery step.

## Step 1: Discover Before You Translate

Before writing a single word, you need to understand the communication. Ask these questions (skip any the user has already answered):

### The Audience
- **Who exactly is in the room?** Not "executives" but which executives, what level, what function?
- **What do they already know about this topic?** Where are they starting from?
- **What do they care about most?** What's keeping them up at night?
- **What are they afraid of?** What's their likely objection or concern?

### The Message
- **What's the one thing?** If they remember nothing else, what must they walk away with?
- **Where are they now vs where you need them to be?** What's the gap between their current understanding and where you need them to land?
- **What action do you need from them?** Approval, buy-in, feedback, awareness, a decision?

### The Format
- **What format?** Deck, email, doc, changelog, talking points, Slack message, meeting agenda?
- **How long do you have?** A 5-minute exec slot is different from a 30-minute deep dive.
- **What's the context?** Standing meeting, ad-hoc request, quarterly review, incident response?

### Brand and Tone (check .pmcontext.md first)
- **Any brand or tone guidelines?** Formal vs casual, specific language to use or avoid?
- **Any templates or existing formats to match?** House style they expect?

## Step 2: Iterate on Structure in Text

Before producing the final output, propose the structure. Show:

1. **Opening line / hook** for this specific audience
2. **Key sections** with one-line descriptions of what each covers
3. **The narrative arc**: how does this flow from their starting point to your ask?
4. **What you're cutting** from the source material (and why this audience doesn't need it)
5. **What you're adding** that wasn't in the source (and why this audience needs it)

Get the user's sign-off on the structure before writing. If they want changes, adjust and re-propose. Do not proceed to full output until the structure is confirmed.

## Step 3: Audience-Specific Translation

Apply the appropriate lens based on the target audience:

### Engineering
- **Lead with**: The problem and technical requirements
- **Strip**: Business jargon, strategic framing, stakeholder politics
- **Add**: Technical specificity, API details, performance requirements, dependency mapping
- **Tone**: Direct, precise, respectful of their expertise
- **Format**: Skimmable, structured, with code examples or technical details where relevant

### Executives
- **Lead with**: The outcome and why it matters to the business
- **Strip**: Technical details, implementation specifics, jargon
- **Add**: Revenue/customer/strategic impact, competitive context, risk assessment
- **Tone**: Confident, concise, decision-oriented
- **Format**: One page maximum. Three sections: what, why, what you need from them.

### Customers
- **Lead with**: The benefit in their language
- **Strip**: Internal terminology, technical architecture, business rationale
- **Add**: Clear next steps, timeline, how to get help
- **Tone**: Warm, helpful, honest about limitations
- **Format**: Short paragraphs, clear action items, no assumed knowledge

### Sales
- **Lead with**: What they can now say to customers and how it helps close deals
- **Strip**: Technical details beyond credibility needs, internal process details
- **Add**: Competitive talking points, customer-facing language, objection/response pairs
- **Tone**: Confident, practical, equipped
- **Format**: Talking points, one-liners they can use, objection/response pairs

### Support
- **Lead with**: What they need to know to help customers starting [date]
- **Strip**: Strategic rationale, implementation details
- **Add**: Known issues, troubleshooting steps, escalation paths, copy-paste responses
- **Tone**: Practical, thorough, anticipatory
- **Format**: FAQ structure, troubleshooting decision tree, response templates

### Custom Audience
If the audience doesn't fit these categories, use the answers from Step 1 to build a custom lens following the same pattern: lead with, strip, add, tone, format.

## Step 4: Apply the SUCCESs Framework

For any audience, apply Made to Stick principles:
- **Simple**: Find the core message for THIS audience. Strip everything else.
- **Unexpected**: What's the hook that gets their attention? Different hooks for different audiences.
- **Concrete**: Use examples and details specific to their world.
- **Credible**: Use evidence they find persuasive (engineers want data, execs want ROI, customers want social proof).
- **Emotional**: Connect to what they personally care about, not what you care about.
- **Stories**: Use scenarios from their perspective, not yours.

## Step 5: Fight the Curse of Knowledge

You've been living with this content. Your audience is encountering it for the first time. Check:
- Am I using jargon they won't know?
- Am I skipping context they need?
- Am I assuming they care about the same things I care about?
- Would this make sense if they read nothing else about the topic?

## Step 6: Quality Check

Before delivering, verify:
- [ ] Opens with what matters to THEM, not you
- [ ] Uses their language, not yours
- [ ] Cuts everything they don't need
- [ ] Anticipates their first two questions and answers them
- [ ] Has a clear call to action or next step
- [ ] Would make sense if they read nothing else about the topic
- [ ] Passes the "read it aloud" test
- [ ] Could be half as long without losing substance
- [ ] The structure matches what was agreed in Step 2

## Output Format

Deliver the translated content directly, formatted for the target audience and chosen format. Follow with a brief note on:
- What was cut and why (in case they want to add it back)
- What was added and why
- Suggested delivery method if not already specified

## What's Next

- Run `/pm:review` on the translated output if it's a spec or brief heading to engineering.
- Run `/pm:translate` again with a different audience or format to create another version of the same content.
