---
description: Create or resume a feature plan with persistent artifacts and todo state
agent: plan-todo
subtask: false
---

Plan the feature described by `$ARGUMENTS`.

Workflow:
- identify or create a normalized feature slug
- if a matching active feature already exists, resume it instead of creating a duplicate
- set that feature as the active planning context
- inspect relevant code, docs, and project rules before proposing implementation structure
- create or update the feature artifacts under `plan/active/<feature>/`

Required artifacts:
- `plan.json`
- `plan.md`
- `.plan-original.md`
- `handoff.md`

The resulting plan must:
- start in `prepare` or `ready` depending on confidence
- maintain a structured todo list with ids, dependencies, and statuses
- include an `Option Paths` section when multiple reasonable directions exist
- wait for explicit user confirmation before any handoff is considered approved

If the request is ambiguous, ask the smallest useful clarifying question first.
