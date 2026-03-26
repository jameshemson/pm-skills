---
name: position
description: Define what your product is, who it's for, and why it wins. Five-component positioning framework with testing.
user-invokable: true
args:
  - name: context
    description: The product, feature, or repositioning trigger to work on (optional)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Positioning reference](../product-management/reference/positioning.md) for the five-component framework and positioning pitfalls
- [Discovery reference](../product-management/reference/discovery.md) for JTBD and understanding customer switching behaviour
- [Communication reference](../product-management/reference/communication.md) for making positioning stick

---

Positioning is not a tagline exercise. It's the strategic context that makes everything downstream - messaging, sales, product decisions, pricing - coherent. Get it wrong and nothing else lands, no matter how good the execution.

**This skill follows the five-component framework in order.** The order matters. Don't skip ahead.

## Step 1: Check for Repositioning Signals

Before building positioning, check if this is new positioning or repositioning. Ask:

- Are sales cycles longer than they should be because buyers don't understand what you are?
- Do you keep losing to competitors you think you're better than?
- Do customers describe you differently than you describe yourself?
- Do your best customers use you for something different than what you designed for?
- Does explaining "what do you do?" take more than two sentences?

If any of these are true, you're repositioning. Start with what your best customers actually value, not what you originally intended.

## Step 2: Run the Five Components (In Order)

### Component 1: Competitive Alternatives

What would customers use if you didn't exist? This is your real competition.

**Do NOT start with "our competitors are..."** Start with: what are customers actually doing today to solve this problem?

Alternatives include:
- Direct competitors (obvious)
- Adjacent products used for this purpose (less obvious)
- Spreadsheets, manual processes, hiring someone (often the real answer)
- Doing nothing (frequently the biggest competitor)

Push back on:
- Only listing direct competitors - the real alternative is often "a spreadsheet and a weekly meeting"
- Listing aspirational competitors you want to be compared to rather than what customers actually use
- Missing "do nothing" as an alternative

### Component 2: Unique Attributes

What do you have that the alternatives don't? Facts, not claims.

For each attribute:
- Is this genuinely unique, or do competitors have it too?
- Is this a fact (you can demonstrate it) or a claim (you believe it)?
- Is this defensible, or could a competitor replicate it in 6 months?

Push back on:
- "Better UX" - unless you can point to specific, measurable differences
- Attributes that three competitors also have
- Claims that aren't demonstrable to a skeptical buyer

### Component 3: Value (That Attributes Enable)

Features aren't value. Translate each unique attribute into what it enables for the customer.

For each attribute: "[Attribute] means you can [value]."

Push back on:
- Value statements that are really just restated features
- Value that the customer doesn't actually care about
- Generic value ("save time", "increase efficiency") without specificity

### Component 4: Target Customers

Who cares most about the value you deliver? Position for them, not the broadest possible audience.

Define by:
- Who gets the most value from your unique strengths?
- Who buys fastest and churns least?
- What characteristics do your best customers share?

Push back on:
- "Everyone who manages projects" - that's not a target
- Defining target by demographics alone rather than by the problem they have
- Targets so broad that the positioning can't be specific to them

### Component 5: Market Category

Which category triggers the right set of assumptions in the buyer's mind?

Consider:
- What existing category makes your strengths obvious advantages?
- What expectations does this category set? Can you meet them?
- Are you creating a new category? (Know that this is expensive and slow - only do it if no existing category serves you.)

Push back on:
- Categories chosen for aspiration rather than clarity
- New categories that require extensive education before the buyer understands the value
- Categories where your weaknesses are the table stakes

## Step 3: Test the Positioning

### The Best-Fit Customer Test
Would your best-fit customer read this positioning and think "this is exactly for me"? Would a bad-fit customer self-select out?

### The Competitor Test
Does your positioning clearly differentiate from the alternatives identified in Component 1? Could a competitor make the same claims?

### The "So What?" Test
For each value statement: would a customer respond with "so what?" If yes, dig deeper. The value isn't concrete enough.

### The Two-Sentence Test
Can you state the full positioning in two sentences? If not, it's not clear enough.

## Step 4: Check for Positioning Pitfalls

Flag any of these:
- **Positioning by aspiration**: "We're the AI-powered future of X" - what does this mean to a buyer today?
- **Positioning by feature**: Leading with a feature list instead of value
- **Positioning by competitor**: "We're like [competitor] but for X" - this makes them the reference point
- **Positioning for everyone**: "For teams of all sizes" - positioning for nobody
- **Positioning for yourself**: Framing that makes sense internally but not to buyers

## Step 5: Deliver the Positioning

### Positioning Statement

For [target customers] who [key problem/need], [product] is a [market category] that [key value]. Unlike [primary alternative], [product] [primary differentiation].

### The Five Components

| Component | Definition |
|---|---|
| Competitive alternatives | [What customers would use instead] |
| Unique attributes | [What you have that alternatives don't] |
| Value | [What those attributes enable for customers] |
| Target customers | [Who cares most about this value] |
| Market category | [The context that makes the value obvious] |

### Positioning Test Results
- Best-fit customer test: [Pass/Fail - details]
- Competitor test: [Pass/Fail - details]
- "So what?" test: [Pass/Fail - details]
- Two-sentence test: [Pass/Fail - details]

### Implications for Product Decisions
[How this positioning should inform what you build and what you don't. Every feature decision is a positioning decision.]

### Repositioning Signals to Watch
[What would tell you this positioning needs revisiting]

## NEVER

- Accept "we serve everyone" as a target customer
- Let the user start with the category and work backwards - the order matters
- Accept claims as attributes - they must be demonstrable facts
- Produce positioning that any competitor could claim
- Skip the testing step - untested positioning is assumption

## What's Next

- Run `/pm:strategy` to ensure positioning aligns with strategic choices.
- Run `/pm:translate` to turn this positioning into audience-specific messaging.
- Run `/pm:brief` or `/pm:spec` to ensure product decisions reinforce the positioning.
