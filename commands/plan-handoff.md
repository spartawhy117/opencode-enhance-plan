---
description: Generate a minimal build handoff for the current approved feature plan
agent: enhance-plan
subtask: false
---

Prepare a build handoff for the current active feature.

Validation rules:
- do not produce a final handoff if the active feature is not clearly identified
- do not produce a final handoff if the plan is not at least `approved`
- do not treat vague encouragement as approval; explicit user confirmation is required
- you may update `plan/active/<feature>/handoff.md` as a planning draft before approval, but it does not become the final handoff until the feature is `approved`

The handoff must be concise and execution-focused.

Required handoff sections:
- feature goal
- confirmed scope
- current todo summary
- execution order
- execution batching
- how to execute (must recommend `enhance-build` agent)
- validation steps
- blockers, caveats, or notable constraints

Execution batching rules:
- Group todos into small batches (2-4 items each) based on logical dependency and scope
- Each batch should be a self-contained unit of work that the build agent can implement independently
- Mark each batch with `Commit checkpoint: yes` so the build agent knows to prompt for commit and new conversation
- If a feature has 3 or fewer todos, a single batch is acceptable
- Batching decisions should align with the `batchGroups` field in `plan.json` if populated

The handoff should minimize token usage for build mode and should avoid repeating background that is not necessary for execution.
Do not copy the entire planning history into `handoff.md`; keep it as the smallest useful execution context.

Transition guidance:
- The handoff must include a `How to Execute` section that recommends switching to the `enhance-build` agent.
- Explain that `enhance-build` reads only `handoff.md` and `plan.json` at startup, avoiding the broad file exploration that OpenCode's built-in code mode performs.
- Mention that the built-in code mode is also supported, but `enhance-build` offers stricter batch discipline and lower token usage.
