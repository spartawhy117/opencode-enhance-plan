# Upgrade Guide / 升级与兼容指南

## English

### Positioning

This repository is a workflow layer built on top of OpenCode's extension points. It is **not** a fork of the OpenCode CLI.

Plugin mode simplifies distribution and installation, but it does **not** remove upgrade compatibility concerns. This document focuses on what to verify after upgrading either OpenCode or `opencode-enhance-plan`.

### When to check

- After running `opencode upgrade`
- After upgrading `opencode-enhance-plan` to a new version
- After OpenCode announces breaking changes to agent, command, or tool APIs

### Plugin upgrade guide

Use this path when you are upgrading `opencode-enhance-plan` itself.

1. Review local overrides under `~/.config/opencode/agents/`, `~/.config/opencode/commands/`, and `~/.config/opencode/templates/`.
2. Decide whether any manually modified local copies should be preserved or removed before restart.
3. Upgrade the plugin version in your OpenCode setup.
4. Restart OpenCode so the plugin can deploy the latest assets.
5. Verify that `enhance-plan` and its commands are still discoverable.
6. Run a small planning flow such as `/init-plan` plus `/plan-feature demo-feature` in a test project.

### Engine and OpenCode upgrade compatibility guide

Use this path when the OpenCode app, engine, or tool API changes.

Check these surfaces in order:

1. agent discovery and primary-agent visibility
2. slash-command discovery and frontmatter behavior
3. planning tool availability such as `todowrite`, `question`, and restricted planning writes
4. planning file write boundaries for `AGENTS.md`, `.opencode/README.md`, and `plan/**`
5. command semantics for `/init-plan`, `/plan-feature`, `/feature-switch`, and `/plan-handoff`

If compatibility breaks, inspect `agents/` and `commands/` first, because they are usually more sensitive to upstream changes than the artifact model itself.

### Post-upgrade verification checklist

| # | Check item | How to verify |
|---|-----------|---------------|
| 1 | `enhance-plan` still appears as a primary agent | Open the agent list in the UI and confirm it is still discoverable |
| 2 | Commands are still recognized | Trigger any `/` command and confirm it appears and runs normally |
| 3 | Agent and command frontmatter still behave as expected | Compare headers in `agents/` and `commands/` with the latest OpenCode documentation |
| 4 | Planning tools such as `todowrite`, `question`, and restricted planning writes still work | Execute a complete planning flow and confirm the tools are callable and can update `AGENTS.md`, `.opencode/README.md`, and `plan/**` |
| 5 | Restricted write boundaries are still respected | Confirm `enhance-plan` can update planning artifacts without modifying implementation files such as source code, manifests, or CI config |
| 6 | `@opencode-ai/plugin` remains compatible | If the plugin fails to load or deploy, check whether a newer compatible version is required |

### Plugin-specific notes

- Plugin assets are deployed to `~/.config/opencode/` on each startup.
- **Files you manually modified will not be overwritten automatically.** This protects local customization, but it can also leave old behavior in place after an upgrade.
- If an updated file does not seem to take effect, remove the local overridden copy and restart OpenCode to let the plugin deploy it again.
- After upgrading the plugin version, **restart OpenCode** to trigger re-deployment.
- After upgrading, re-run a small planning flow to confirm restricted writes still reach project-local planning files.

### Local override recovery

- Plugin assets are deployed on restart, but local files you modified by hand are intentionally not overwritten.
- If the latest plugin behavior does not appear after upgrade, compare your local override copy with the repository version.
- Remove or rename the local overridden copy only when you want OpenCode to redeploy the new default file.
- Re-run OpenCode after cleanup so the plugin can redeploy the updated asset.

### If something breaks

1. Compare the latest OpenCode documentation with this repository's assumptions, especially around frontmatter, discovery rules, and tool naming.
2. Update `agents/` and `commands/` first, because they are usually the most sensitive to upstream changes.
3. Keep the planning artifact model stable unless OpenCode introduces a clearly better primitive.

## 中文

### 定位

这个仓库是建立在 OpenCode 官方扩展点之上的 workflow layer，**不是** OpenCode CLI 的源码 fork。

改成 plugin 模式后，分发和安装流程确实更简单了，但这**不代表升级兼容问题消失**。这份文档主要用于说明：当 OpenCode 或 `opencode-enhance-plan` 升级后，应该重点检查哪些点。

### 什么时候看

- 执行 `opencode upgrade` 之后
- 将 `opencode-enhance-plan` 升级到新版本之后
- OpenCode 官方宣布 agent、command 或 tool API 有 breaking change 之后

### 插件升级指引

当你升级 `opencode-enhance-plan` 本身时，按这个流程处理：

1. 先检查 `~/.config/opencode/agents/`、`~/.config/opencode/commands/`、`~/.config/opencode/templates/` 下是否存在你手改过的本地副本。
2. 判断这些本地覆盖文件是要保留，还是要在升级前清理掉。
3. 在 OpenCode 环境中升级插件版本。
4. 重启 OpenCode，让插件重新部署最新资产。
5. 验证 `enhance-plan` 和相关命令是否仍能被发现。
6. 在测试项目里最少跑一遍 `/init-plan` 与 `/plan-feature demo-feature`。

### 引擎与 OpenCode 升级兼容指引

当升级的是 OpenCode 本体、引擎或 tool API 时，按下面顺序回归：

1. agent 是否还能被发现，以及 `enhance-plan` 是否仍是 primary agent
2. slash command 是否还能被发现，frontmatter 是否仍按预期生效
3. `todowrite`、`question` 与受限 planning 写入是否仍可用
4. `AGENTS.md`、`.opencode/README.md` 与 `plan/**` 的写入边界是否仍正确
5. `/init-plan`、`/plan-feature`、`/feature-switch`、`/plan-handoff` 的语义是否仍一致

如果兼容性出现问题，优先检查 `agents/` 与 `commands/`，因为它们通常比 planning artifact 模型更容易受上游变化影响。

### 升级后验证清单

| # | 检查项 | 如何验证 |
|---|--------|----------|
| 1 | `enhance-plan` 是否仍显示为 primary agent | 打开 UI 里的 agent 列表，确认仍然能看到并选择它 |
| 2 | Commands 是否仍能被识别 | 随便触发一个 `/` 命令，确认可以正常显示并执行 |
| 3 | Agent 和 command 的 frontmatter 是否仍按预期工作 | 对照最新 OpenCode 文档，检查 `agents/` 和 `commands/` 中的头部字段定义 |
| 4 | `todowrite`、`question` 以及受限 planning 写入是否仍可用 | 实际跑一遍完整 planning 流程，确认这些工具都还能正常调用，并能更新 `AGENTS.md`、`.opencode/README.md` 与 `plan/**` |
| 5 | 受限写入边界是否仍然成立 | 确认 `enhance-plan` 只能更新 planning 工件，不会修改源码、依赖清单或 CI 配置 |
| 6 | `@opencode-ai/plugin` 是否仍兼容 | 如果插件加载失败、部署失败或行为异常，先检查是否需要升级到兼容版本 |

### 插件模式注意事项

- 插件资源会在每次启动时部署到 `~/.config/opencode/`。
- **你手动改过的文件不会被自动覆盖。** 这能保留本地定制，但也意味着升级后可能继续沿用旧文件，从而看起来像是“升级没生效”。
- 如果某个更新后的文件似乎没有生效，可以先删除本地那份被覆盖过的副本，再重启 OpenCode，让插件重新部署。
- 升级插件版本后，需要**重启 OpenCode**，这样才会触发重新部署。
- 升级后建议最少跑一次 planning 流程，确认项目级 planning 文件仍可被受限更新。

### 本地覆盖文件恢复

- 插件会在重启时重新部署资产，但你手动改过的本地文件不会被自动覆盖。
- 如果升级后最新行为没有生效，先对比本地覆盖文件与仓库版本是否存在差异。
- 只有在你希望恢复默认实现时，才删除或重命名本地覆盖副本。
- 清理后重新启动 OpenCode，让插件重新下发最新文件。

### 如果升级后出问题

1. 先对照最新版 OpenCode 文档，确认这个仓库对 frontmatter、发现规则、tool 命名等假设是否仍然成立。
2. 优先检查和更新 `agents/`、`commands/`，因为这两类文件通常最容易受到上游变化影响。
3. 除非 OpenCode 提供了明显更好的新原语，否则尽量保持现有 planning artifact 模型稳定。
