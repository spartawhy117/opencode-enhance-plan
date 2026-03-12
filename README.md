# opencode-plan-todo

`opencode-plan-todo` is a lightweight workflow layer for OpenCode that adds a stronger planning experience without modifying the built-in CLI.

It introduces:
- a dedicated primary agent: `plan-todo`
- planning commands: `/init-plan`, `/plan-feature`, `/feature-switch`, `/plan-handoff`
- project templates for persistent feature plans and minimal build handoff

## Why this exists

Built-in planning modes are often good at analysis but weak at preserving feature-specific todo state, explicit review checkpoints, and lightweight execution handoff. This repository treats planning as a first-class workflow.

## Design goals

- keep the built-in `/init` and `plan` behaviors intact
- add a stronger planning mode instead of patching built-in behavior
- keep execution context small by handing build mode a focused `handoff.md`
- store feature planning as durable artifacts instead of disposable chat state
- default to Chinese in runtime conversation while keeping repository docs in English

## Repository contents

- `agents/` - custom agent definitions
- `commands/` - custom slash commands
- `templates/` - files used by `/init-plan`
- `docs/` - installation, usage, lifecycle, and upgrade notes

## Quick start

1. Copy `agents/`, `commands/`, and `templates/` into your OpenCode config directory.
2. Restart OpenCode.
3. Switch to `plan-todo`.
4. Run `/init-plan` inside a project.
5. Run `/plan-feature <feature-name>` to start planning.
6. Run `/plan-handoff` before switching to build mode.

## Key workflow

- Plan in `plan-todo`
- Keep one active feature at a time
- Persist plan artifacts under `plan/active/<feature>/`
- Generate a concise `handoff.md`
- Build from the handoff with minimal additional context

## Documentation

- `docs/installation.md`
- `docs/usage.md`
- `docs/feature-lifecycle.md`
- `docs/upgrade-compatibility.md`

## Scope note

This repository is not a fork of OpenCode. It is a public workflow layer built on top of OpenCode's documented extension points.
