# Upgrade Compatibility

## Positioning

This repository is a workflow layer built on top of OpenCode's extension points. It is not a fork of the OpenCode CLI.

## Stable parts

These are expected to remain relatively stable:
- planning concepts and lifecycle
- feature artifact structure
- template files
- the `plan-todo` planning kernel itself

## Potentially changing parts

These may need adjustment after OpenCode upgrades:
- agent frontmatter behavior
- command frontmatter behavior
- primary agent discovery in the UI
- command discovery rules
- tool permissions and tool naming

## Recommended upgrade policy

- keep custom files in `~/.config/opencode/` or project `.opencode/`
- do not modify the OpenCode installation directory
- after `opencode upgrade`, verify that:
  - `plan-todo` still appears as a primary agent
  - commands are still recognized
  - command frontmatter still behaves as expected
  - planning tools such as `todowrite` and `question` still work as intended

## If something breaks

1. Compare the new OpenCode docs with this repository's assumptions.
2. Update `agents/` and `commands/` first.
3. Keep the planning artifact model stable unless OpenCode introduces a clearly better primitive.
