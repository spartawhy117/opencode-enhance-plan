# Project Workflow Rules

This project uses an enhanced planning workflow built around `plan-todo`.

## Default Workflow

- Use `plan-todo` for non-trivial features, cross-module changes, architecture decisions, and work that benefits from explicit review before implementation.
- Use build mode only after a feature plan has been reviewed and explicitly approved.
- Keep planning focused on one feature at a time.

## Planning Artifacts

Active feature plans live under `plan/active/<feature>/` and should include:

- `plan.json` - structured plan state and todo metadata
- `plan.md` - human-readable plan draft
- `.plan-original.md` - preserved baseline draft
- `handoff.md` - minimal execution-facing handoff for build mode

Completed or inactive feature plans should move to `plan/archive/<feature>/` when appropriate.

## Build Context Policy

- Prefer the current feature's `handoff.md` as the primary execution context.
- Read `plan.json` or `plan.md` only when additional detail is needed.
- Avoid loading broad background context when the current feature handoff is sufficient.

## Feature Discipline

- Keep one active feature context at a time.
- If returning to a previous feature, resume its existing plan instead of creating a duplicate.
- If multiple approaches are viable, include a dedicated `Option Paths` section before execution approval.

## Legacy Docs

If this project had planning or progress documents before initialization, preserve them in a traceable legacy location and normalize future work into the `plan/` structure.
