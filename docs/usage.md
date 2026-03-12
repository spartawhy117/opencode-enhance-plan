# Usage

## Recommended workflow

1. Switch to the `plan-todo` agent.
2. Run `/init-plan` in a project to normalize planning files and templates.
3. Run `/plan-feature <feature-name>` to create or resume a feature plan.
4. Clarify scope, review option paths, and refine the plan until the user explicitly approves execution.
5. Run `/plan-handoff` to generate the execution-facing handoff.
6. Switch to build mode and implement from `handoff.md`.

## Commands

### `/init-plan`
Creates or normalizes the project planning workflow.

Expected outcomes:
- project `AGENTS.md` includes planning rules
- `.opencode/README.md` exists
- `plan/active/`, `plan/archive/`, and `plan/templates/` exist
- templates for `plan.json`, `plan.md`, `.plan-original.md`, and `handoff.md` exist

### `/plan-feature <feature-name>`
Creates or resumes a feature-specific plan.

Expected outcomes:
- a normalized feature slug
- feature artifacts under `plan/active/<feature>/`
- a structured todo list with ids, dependencies, and statuses

### `/feature-switch`
Switches the active feature context inside `plan-todo`.

Behavior:
- saves current feature todo state before switching
- restores target feature todo and plan state after switching
- should only be used while `plan-todo` is active

### `/plan-handoff`
Creates a minimal execution handoff for build mode.

Behavior:
- requires an approved feature plan
- keeps execution context small
- focuses on goal, scope, todo summary, order, validation, and blockers

## Runtime language

This workflow is designed so repository files stay in English while the agent can still default to Chinese in user-facing responses.
