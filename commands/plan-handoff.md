---
description: Generate a minimal build handoff for the current approved feature plan
agent: plan-todo
subtask: false
---

Prepare a build handoff for the current active feature.

Validation rules:
- do not produce a final handoff if the active feature is not clearly identified
- do not produce a final handoff if the plan is not at least `approved`
- do not treat vague encouragement as approval; explicit user confirmation is required

The handoff must be concise and execution-focused.

Required handoff sections:
- feature goal
- confirmed scope
- current todo summary
- execution order
- validation steps
- blockers, caveats, or notable constraints

The handoff should minimize token usage for build mode and should avoid repeating background that is not necessary for execution.
