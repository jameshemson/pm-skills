# Decision Making

How to make better decisions under uncertainty, recognise your own biases, and build strategy that's more than a list of goals.

---

## Thinking in Bets (Annie Duke)

Life is poker, not chess. In chess, you can see the whole board. In product, you're making bets with incomplete information. Judge decision quality, not outcome quality.

### Core Framework

**Resulting**: The trap of judging decision quality by outcome quality. A bad bet can pay off (doesn't make it smart). A good bet can lose (doesn't make it dumb). If you launched a feature that flopped, was the decision bad - or did the world just not cooperate?

**Decisions as bets**: Every decision is a bet. What do you believe? How confident are you? What are you willing to stake? Framing decisions as bets forces rigour: you wouldn't bet your house on a hunch, so why would you bet six months of engineering time on one?

**Calibrated uncertainty**: Express confidence as a range, not a binary. "I'm 70% sure this will increase retention" is more honest and useful than "I think this will work." Teams that calibrate make better collective decisions because they can discuss the actual uncertainty.

### Tools

**Pre-mortem**: Before committing to a decision, imagine it's six months later and it failed spectacularly. Why? This surfaces risks that optimism hides. Your brain is better at explaining past events than predicting future ones - exploit that by making the failure feel real.

**10-10-10**: How will this decision feel in 10 minutes, 10 months, and 10 years? Helps escape emotional short-termism. The decision to delay a launch feels painful in 10 minutes but smart in 10 months if it avoids a broken customer experience.

**Outcome fielding**: When something happens (good or bad), resist the urge to assign it entirely to skill or luck. Reality is always a mix. Won a big customer? Partly your positioning, partly their timing. Lost a feature bet? Partly your analysis, partly market shift. Honest fielding improves future bets.

**Truthseeking groups**: Surround yourself with people who challenge your thinking, not confirm it. The best product teams have a norm of "I'll argue the other side" - not to be contrarian, but to stress-test ideas before committing resources.

---

## Cognitive Biases (Daniel Kahneman)

Your brain has two systems: System 1 (fast, intuitive, always on) and System 2 (slow, deliberate, lazy). Most product decisions are made by System 1, which is powerful but systematically wrong in predictable ways.

### The Biases That Kill Product Decisions

**Anchoring**: The first number you hear distorts all subsequent judgment. If someone says "this will take 6 months" before estimation, every subsequent estimate drifts toward 6 months. Counter: generate estimates independently before sharing. Let each person write their number down first.

**Availability heuristic**: You judge probability by how easily examples come to mind, not by actual frequency. The customer complaint you read this morning feels like a massive trend. The silent majority who are fine don't come to mind. Counter: look at the data, not the narrative. What's the actual frequency?

**Loss aversion**: Losses hurt roughly twice as much as equivalent gains feel good. This distorts product decisions toward preservation (avoiding losses) over creation (seeking gains). It's why sunsetting features is harder than launching them. Counter: frame decisions symmetrically. "What do we gain?" not just "what might we lose?"

**WYSIATI (What You See Is All There Is)**: System 1 builds the best possible story from available information and doesn't notice what's missing. You can write a confident spec based on three customer interviews and feel certain - because System 1 built a coherent story from limited data. Counter: actively ask "what are we NOT seeing? Who did we NOT talk to?"

**Planning fallacy**: You will systematically underestimate time, cost, and risk while overestimating benefits. This isn't optimism - it's a built-in cognitive bug. Projects take 1.5-2x what you estimate, consistently. Counter: use reference class forecasting. How long did similar projects actually take? Use that, not your estimate.

**Framing effects**: How a question is framed changes the answer. "90% survival rate" and "10% mortality rate" trigger different decisions despite being identical. This matters for how you present options to stakeholders. Counter: reframe every important decision at least once. Present the same information differently and see if the conclusion changes.

**Sunk cost fallacy**: "We've already invested 3 months in this" is never a reason to continue. The investment is gone regardless. The only question is: given what we know now, is continuing the best use of the next month? Counter: ask "if we were starting from scratch today, would we choose this path?"

**Confirmation bias**: You seek evidence that confirms what you already believe and ignore or explain away evidence that contradicts it. This poisons customer research - you hear what you want to hear. Counter: assign someone to argue the opposite position. Actively seek disconfirming evidence.

### Regression to the Mean

Extreme performances are followed by more average ones. This is statistics, not causation. The feature that had exceptional first-week metrics will likely settle back to average. The sprint that went terribly will likely be followed by a normal one. Don't invent causal stories for what's just statistical noise.

---

## Strategy Choice Cascade (A.G. Lafley & Roger Martin)

Strategy is not a vision, a plan, or a list of goals. It's a set of integrated choices about where to play and how to win. Each choice constrains and reinforces the others.

### The Five Questions

1. **What is our winning aspiration?** Not a financial target - a statement of what success looks like for the people you serve. "Be the tool teams reach for when a decision matters" not "reach $10M ARR."

2. **Where will we play?** Which customers, which segments, which geographies, which channels, which problems? Where to play is the most important strategic choice because it determines the game you're playing. You can't win everywhere.

3. **How will we win?** What's your competitive advantage in the places you've chosen to play? Cost leadership or differentiation - you must choose. If your strategy could apply to any competitor, it's not a strategy.

4. **What capabilities must we have?** What do you need to be uniquely good at to win where you've chosen to play? These must be reinforcing - each capability should make the others stronger.

5. **What management systems are required?** What processes, metrics, and structures keep the strategy alive day to day? Strategy dies in execution without systems.

### Key Principles

**Strategy is about choice**: Choosing what not to do is as important as choosing what to do. A strategy that doesn't make some things impossible is not a strategy. If your roadmap doesn't have a "we're explicitly NOT doing" list, you don't have a strategy.

**Integrated choices**: Each level of the cascade must reinforce the others. Isolated decisions aren't strategy. If where-to-play says "enterprise" but capabilities are built for self-serve, the cascade is broken.

**Reverse engineering**: Test any strategy by asking "what would have to be true for this to work?" Then assess which of those conditions is least likely - that's your biggest risk. This turns abstract strategy debate into testable hypotheses.

**Where to play before how to win**: The playing field determines the game. Pick where your strengths create asymmetric advantage before deciding tactics. A great how-to-win in the wrong where-to-play is a losing strategy.
