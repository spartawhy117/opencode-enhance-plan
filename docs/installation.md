# Installation

## Goal

Install the workflow into your global OpenCode configuration without modifying the OpenCode installation directory.

## Recommended target directories

- `~/.config/opencode/agents/`
- `~/.config/opencode/commands/`
- `~/.config/opencode/templates/`

On Windows this is typically:

- `C:\Users\<you>\.config\opencode\agents\`
- `C:\Users\<you>\.config\opencode\commands\`
- `C:\Users\<you>\.config\opencode\templates\`

## Manual install

1. Copy `agents/plan-todo.md` to `~/.config/opencode/agents/`.
2. Copy all files from `commands/` to `~/.config/opencode/commands/`.
3. Copy `templates/init-plan/` to `~/.config/opencode/templates/init-plan/`.
4. Restart OpenCode.

## Verify installation

After restart:
- `plan-todo` should appear as a primary agent
- `/init-plan` should be available
- `/plan-feature`, `/feature-switch`, and `/plan-handoff` should be available

## Important

- Do not modify the OpenCode installation directory.
- Keep your personal provider config and API keys outside this repository.
- If OpenCode upgrades, re-check compatibility using `docs/upgrade-compatibility.md`.
