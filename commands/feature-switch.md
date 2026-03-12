---
description: Switch the active feature plan context while preserving persisted todo state
agent: plan-todo
subtask: false
---

Switch the active feature plan context.

Rules:
- this command is only valid while `plan-todo` is the active agent
- if the current agent is not `plan-todo`, instruct the user to switch to `plan-todo` first and do not proceed
- inspect `plan/active/*/plan.json` files to build the feature selection list
- present lightweight metadata for selection, including feature id, name, overview, status, and confirmation state
- before switching, persist the current feature todo and plan state
- after switching, restore the target feature's todo, plan state, and review context
- do not merge two feature contexts unless the user explicitly requests a merge workflow

If there is only one active feature, say so and show its current state.
