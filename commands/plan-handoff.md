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
- validation steps
- blockers, caveats, or notable constraints

Execution batching rules:
- Group todos into small batches (2-4 items each) based on logical dependency and scope
- Each batch must end with a commit checkpoint that reminds the user to commit and push changes
- Commit checkpoints must explicitly remind the user to include the `plan/` directory in the commit, since uncommitted planning artifacts remain in the working tree and may be injected into context by OpenCode
- After a commit checkpoint, recommend starting a new conversation to reduce accumulated context tokens
- If a feature has 3 or fewer todos, a single batch is acceptable

The handoff should minimize token usage for build mode and should avoid repeating background that is not necessary for execution.
Do not copy the entire planning history into `handoff.md`; keep it as the smallest useful execution context.
