---
description: Initialize the enhanced feature-planning workflow for the current project
agent: plan-todo
subtask: false
---

Initialize the enhanced planning workflow for this project without executing implementation work.

Goals:
- keep the official `/init` behavior separate from this workflow
- inspect the current project structure and existing docs first
- create or update project files needed for the planning workflow
- preserve and reorganize existing planning or progress docs instead of discarding them

Required outcomes:
- ensure a project `AGENTS.md` exists and includes the planning workflow conventions
- create `.opencode/README.md` describing how this project uses `plan-todo`
- create `plan/active/`, `plan/archive/`, and `plan/templates/`
- create template files for `plan.json`, `plan.md`, `.plan-original.md`, and `handoff.md`
- if legacy planning docs exist, reorganize them into the agreed structure and keep a traceable legacy location
- summarize what was created, what was migrated, and any follow-up decisions still needed

Use these global template sources when creating project files:
- `~/.config/opencode/templates/init-plan/AGENTS.template.md`
- `~/.config/opencode/templates/init-plan/README.template.md`
- `~/.config/opencode/templates/init-plan/plan-json.template.json`
- `~/.config/opencode/templates/init-plan/plan.template.md`
- `~/.config/opencode/templates/init-plan/plan-original.template.md`
- `~/.config/opencode/templates/init-plan/handoff.template.md`

Project file mapping:
- `AGENTS.template.md` -> project `AGENTS.md`
- `README.template.md` -> project `.opencode/README.md`
- `plan-json.template.json` -> project `plan/templates/plan.json`
- `plan.template.md` -> project `plan/templates/plan.md`
- `plan-original.template.md` -> project `plan/templates/.plan-original.md`
- `handoff.template.md` -> project `plan/templates/handoff.md`

When an existing project already has compatible files, update them carefully instead of blindly overwriting them.

Important:
- stay in planning behavior until the user explicitly asks to switch to build
- if the project already has planning docs, prefer migration and normalization over duplication
