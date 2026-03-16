# Project Workflow Rules

This project uses an enhanced planning workflow built around `enhance-plan`.

## Default Workflow

- Use `enhance-plan` for non-trivial features, cross-module changes, architecture decisions, and work that benefits from explicit review before implementation.
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

- After a plan is approved, switch to the `enhance-build` agent for execution.
- `enhance-build` reads ONLY `handoff.md` and `plan.json` at startup — no broad codebase exploration.
- It executes one batch per conversation and prompts for commit checkpoints between batches.
- This results in significantly lower token usage compared to OpenCode's built-in code mode.
- If using the built-in code mode instead, prefer the current feature's `handoff.md` as the primary execution context.
- Read `plan.json` or `plan.md` only when additional detail is needed.
- Avoid loading broad background context when the current feature handoff is sufficient.

## Build Context Hygiene

Long conversations accumulate token overhead from tool outputs and modified file contents injected into context. To keep build sessions efficient:

- Execute todos in small batches as defined in the `Execution Batching` section of `handoff.md`.
- After completing a batch, prompt the user to commit and push changes before continuing.
- Commit checkpoints must include the `plan/` directory. Planning artifacts (`plan.json`, `plan.md`, etc.) are part of the working tree and will be injected into context by OpenCode if left uncommitted. Committing them reduces noise in subsequent conversations.
- After a commit checkpoint, recommend starting a new conversation to reset context, referencing `handoff.md` for the next batch.
- Do not attempt to implement all todos in a single conversation when the feature involves many files or complex changes.

## Planning Write Policy

- `enhance-plan` may create or update `AGENTS.md`, `.opencode/README.md`, and files under `plan/` while staying in planning mode.
- `enhance-plan` must not modify implementation files such as application source, build config, release config, or dependency manifests.
- Treat planning writes as workflow state management, not as implementation work.

## Feature Discipline

- Keep one active feature context at a time.
- If returning to a previous feature, resume its existing plan instead of creating a duplicate.
- If multiple approaches are viable, include a dedicated `Option Paths` section before execution approval.

## Legacy Docs

If this project had planning or progress documents before initialization, preserve them in a traceable legacy location and normalize future work into the `plan/` structure.
