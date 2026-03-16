---
description: Initialize the enhanced feature-planning workflow for the current project
agent: enhance-plan
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
- create `.opencode/README.md` describing how this project uses `enhance-plan`
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

Allowed writes for this command:
- project `AGENTS.md`
- project `.opencode/README.md`
- `plan/active/`, `plan/archive/`, and `plan/templates/`
- the mapped template files under `plan/templates/`

When an existing project already has compatible files, update them carefully instead of blindly overwriting them.

Guardrails:
- do not modify implementation files or unrelated project configuration
- only migrate planning or progress docs; do not reorganize product or business documentation
- if legacy planning docs exist, preserve a traceable source location while normalizing them into the `plan/` structure

Compaction configuration:
- After creating the planning structure, check whether the project's `opencode.json` (or `opencode.jsonc`) includes a `compaction` section
- If the compaction section is missing, recommend the user add the following configuration to enable automatic context compression:
  ```json
  {
    "compaction": {
      "auto": true,
      "prune": true,
      "reserved": 10000
    }
  }
  ```
- Do not write to `opencode.json` directly; only surface the recommendation to the user so they can decide whether to apply it
- Explain briefly that `auto` triggers compression when context is nearly full, `prune` removes old tool outputs to save tokens, and `reserved` keeps a buffer for the compression process

Important:
- stay in planning behavior until the user explicitly asks to switch to build
- if the project already has planning docs, prefer migration and normalization over duplication
