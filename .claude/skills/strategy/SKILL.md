---
name: strategy
description: Define where to play and how to win using the Playing to Win choice cascade. Forces integrated strategic choices, not a list of goals.
user-invokable: true
args:
  - name: context
    description: The strategic question or area to focus on (optional)
    required: false
---

## MANDATORY PREPARATION

Use the product-management skill - it contains PM principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding. If no product context exists yet, you MUST run teach-pm first.

Additionally, read:
- [Decision-making reference](../product-management/reference/decision-making.md) for the Strategy Choice Cascade and reverse engineering
- [Positioning reference](../product-management/reference/positioning.md) for competitive alternatives and where-to-play
- [Prioritisation reference](../product-management/reference/prioritisation.md) for outcome thinking and the build trap

---

This skill walks you through the Playing to Win choice cascade to define or pressure-test your product strategy. Strategy is not a vision statement, a roadmap, or a list of goals. It's a set of integrated choices about where to play and how to win.

**This skill pushes back hard.** If your answers are vague, internally inconsistent, or could apply to any competitor, you don't have a strategy yet.

## Step 1: Challenge the Starting Point

Before running the cascade, understand where you are:

- **Do you have an existing strategy?** If yes, this skill will pressure-test it for coherence and gaps. If no, it will help you build one.
- **What triggered this?** New product, market shift, stalled growth, strategy never existed, annual planning? The trigger shapes the urgency.
- **Who needs to own this?** Strategy created in isolation dies on contact with the team. Who else should be in this conversation?

If the user says "we have a strategy" but can't articulate it in two sentences, they don't have one. Flag this directly.

## Step 2: Run the Choice Cascade

Walk through each question in order. Each answer constrains the next. Do NOT let the user skip ahead.

### Question 1: What is our winning aspiration?

Not a financial target. Not "be the market leader." What does success look like for the people you serve?

Push back on:
- Revenue targets disguised as aspiration ("reach $10M ARR")
- Vague purpose statements ("empower teams to do their best work")
- Aspirations that any competitor could claim

Good test: Would a customer hear this and say "yes, that's what I need you to be"?

### Question 2: Where will we play?

This is the most important strategic choice. It determines the game.

Force specificity across:
- **Customer segments**: Which specific types of customers? Not "everyone" or "SMBs"
- **Problems**: Which problems will you solve? Which will you ignore?
- **Geographies/markets**: Where, specifically?
- **Channels**: How will you reach them?
- **Product scope**: What parts of their workflow will you own?

Push back on:
- "We serve everyone" - you can't win everywhere
- Defining where-to-play by your current customers rather than your best-fit customers
- Missing the "where we will NOT play" list. If you haven't excluded anything, you haven't chosen.

### Question 3: How will we win?

What's your competitive advantage in the places you've chosen to play? This must be specific to your where-to-play choices.

Push back on:
- "Better product" - that's not a strategy, it's a hope
- "Great customer service" - unless you can explain what makes it structurally better, not just aspirationally better
- Advantages that aren't connected to where-to-play
- Advantages any competitor could claim
- Cost leadership AND differentiation simultaneously - you must choose

Good test: If a competitor read this, would they say "we can't do that" or "we choose not to do that"? If neither, it's not a real advantage.

### Question 4: What capabilities must we have?

What must you be uniquely good at to win where you've chosen to play? These must reinforce each other.

For each capability:
- Why is this essential to the how-to-win?
- Do you have it today? If not, what's the plan to build it?
- Does this capability make the other capabilities stronger? (They should be mutually reinforcing)

Push back on:
- Generic capabilities ("great engineering", "strong culture")
- Capabilities that don't connect to the how-to-win
- A list of nice-to-haves rather than must-haves
- Capabilities that don't reinforce each other

### Question 5: What management systems are required?

What processes, metrics, structures, and habits keep the strategy alive day to day? Strategy dies in execution without systems.

For each system:
- What does it measure or enforce?
- How does it reinforce the strategic choices above?
- Who owns it?

Push back on:
- "We'll figure that out later" - without systems, the strategy is a document, not a practice
- Systems that measure output (features shipped) instead of strategic progress
- Missing feedback loops - how do you know if the strategy is working?

## Step 3: Test for Coherence

This is where most strategies fall apart. Each level of the cascade must reinforce the others.

### Integration Check

Test every connection:
- Does where-to-play serve the winning aspiration?
- Does how-to-win actually win in the chosen where-to-play?
- Do the capabilities enable the how-to-win?
- Do the systems reinforce the capabilities?

Flag any broken links. If where-to-play says "enterprise" but capabilities are built for self-serve, the cascade is broken.

### The Competitor Test

Take your strategy and replace your company name with a competitor's. Does it still work? If yes, it's not a strategy - it's a generic description of being in the industry.

### Reverse Engineering

For each level of the cascade, ask: "What would have to be true for this to work?"

Then assess which of those conditions is least likely. That's your biggest strategic risk. This turns abstract strategy debate into testable hypotheses.

## Step 4: Define What You're NOT Doing

A strategy that doesn't make some things impossible is not a strategy. List:

- **Customers we're NOT serving** (and why)
- **Problems we're NOT solving** (and why)
- **Markets we're NOT entering** (and why)
- **Capabilities we're NOT building** (and why)

For each exclusion: what would change your mind? Under what conditions would you revisit this choice?

## Step 5: Deliver the Strategy

### Winning Aspiration
[One sentence. What winning looks like for the people you serve.]

### Where to Play
| Dimension | Choice | Explicitly NOT |
|---|---|---|
| Customer segments | ... | ... |
| Problems | ... | ... |
| Markets/channels | ... | ... |
| Product scope | ... | ... |

### How to Win
[Your competitive advantage in the chosen where-to-play. Specific, defensible, connected.]

### Required Capabilities
| Capability | Why essential | Current state | Gap to close |
|---|---|---|---|
| ... | ... | ... | ... |

### Management Systems
| System | What it reinforces | Owner |
|---|---|---|
| ... | ... | ... |

### Coherence Assessment
[Honest assessment of how well the cascade integrates. Flag any weak links.]

### Strategic Risks
[From reverse engineering: what would have to be true, and which assumptions are weakest.]

### What Would Change This Strategy
[Signals that would trigger a strategic re-evaluation.]

## NEVER

- Accept "we serve everyone" as a where-to-play answer
- Accept a list of goals as a strategy
- Let the cascade levels be independent of each other - they must integrate
- Skip the "what we're NOT doing" section - exclusion is the essence of strategy
- Produce a strategy that any competitor could claim as their own
- Accept financial targets as winning aspirations

## What's Next

- Run `/pm:position` to define how you'll position the product within your chosen where-to-play.
- Run `/pm:prioritise` to stack-rank current work against this strategy.
- Run `/pm:audit` to check whether what you're currently building aligns with these choices.
