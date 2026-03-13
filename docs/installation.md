# Installation / 安装

## English

### Goal

Install the workflow into your global OpenCode configuration without modifying the OpenCode installation directory.

### Recommended target directories

- `~/.config/opencode/agents/`
- `~/.config/opencode/commands/`
- `~/.config/opencode/templates/`

On Windows this is typically:

- `C:\Users\<you>\.config\opencode\agents\`
- `C:\Users\<you>\.config\opencode\commands\`
- `C:\Users\<you>\.config\opencode\templates\`

### Plugin install (recommended)

Add the plugin to your `opencode.json`:

```json
{
  "plugin": ["opencode-enhance-plan"]
}
```

Restart OpenCode. The plugin will be automatically installed via Bun and will deploy agents, commands, and templates to `~/.config/opencode/`.

### Verify installation

After restart:
- `enhance-plan` should appear as a primary agent
- `/init-plan` should be available
- `/plan-feature`, `/feature-switch`, and `/plan-handoff` should be available

### Maintainer note

This repository also tracks a project-local maintainer skill under `.codebuddy/skills/repo-release-workflow/` and `.opencode/skills/repo-release-workflow/`.

That skill is only for maintaining this repository. It does not change how end users install the plugin.

## 中文


### 目标

将这套工作流安装到你的 OpenCode 全局配置目录中，而不是修改 OpenCode 安装目录。

### 推荐安装目录

- `~/.config/opencode/agents/`
- `~/.config/opencode/commands/`
- `~/.config/opencode/templates/`

在 Windows 上通常对应：

- `C:\Users\<你自己的用户名>\.config\opencode\agents\`
- `C:\Users\<你自己的用户名>\.config\opencode\commands\`
- `C:\Users\<你自己的用户名>\.config\opencode\templates\`

### 插件安装（推荐）

在 `opencode.json` 中添加：

```json
{
  "plugin": ["opencode-enhance-plan"]
}
```

重启 OpenCode。插件会通过 Bun 自动安装，并将 agents、commands、templates 部署到 `~/.config/opencode/`。

### 安装验证

重启后检查：
- `enhance-plan` 是否出现在主 agent 中
- `/init-plan` 是否可用
- `/plan-feature`、`/feature-switch`、`/plan-handoff` 是否可用

### 维护者说明

这个仓库还会在 `.codebuddy/skills/repo-release-workflow/` 和 `.opencode/skills/repo-release-workflow/` 下跟踪一套项目级维护 skill。

它只用于维护当前仓库，不会改变终端用户安装插件的方式。

## Important / 注意事项


- Do not modify the OpenCode installation directory.
- Keep your personal provider config and API keys outside this repository.
- If OpenCode upgrades, re-check compatibility using `docs/upgrade-compatibility.md`.

- 不要修改 OpenCode 安装目录。
- 个人 provider 配置和 API key 不要放入这个仓库。
- 升级 OpenCode 后，请按照 `docs/upgrade-compatibility.md` 重新检查兼容性。
