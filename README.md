# opencode-enhance-plan

## English

`opencode-enhance-plan` is an enhanced planning workflow plugin for OpenCode.

It keeps the built-in `plan` mode for lightweight analysis and adds a stronger planning workflow for feature work.

The plugin is installed globally through OpenCode, but it writes planning artifacts into each project that uses `/init-plan` and `/plan-feature`.

### What it does

- keeps one active feature at a time
- stores plan artifacts under `plan/active/<feature>/`
- allows restricted writes to planning files during planning
- requires explicit approval before final handoff
- restores plan state when switching features
- optimizes context token usage through execution batching, commit checkpoints, and compaction recommendations

### Context optimization

Long build sessions accumulate token overhead from tool outputs and modified file contents. The plugin mitigates this with built-in strategies:

- **Execution batching** — todos are grouped into small batches (2–4 items); each batch runs in its own conversation
- **Commit checkpoints** — after each batch, the user is prompted to commit and push all changes (including `plan/`), then start a fresh conversation
- **Batch groups in `plan.json`** — batch assignments are captured during planning, making them reviewable before execution
- **Compaction recommendation** — `/init-plan` checks for OpenCode's compaction config and recommends enabling it if missing

See [`docs/context-optimization.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md) for the full explanation.

### Planning boundary

`enhance-plan` may update planning files only:

- `AGENTS.md`
- `.opencode/README.md`
- `plan/**`

It must not modify implementation files such as source code, dependency manifests, CI config, build config, or release scripts.

### Install

Add `opencode-enhance-plan` to your `opencode.json`:

```json
{
  "plugin": ["opencode-enhance-plan"]
}
```

Restart OpenCode. The plugin deploys its agents, commands, and templates to `~/.config/opencode/` and refreshes those managed runtime files by default when the packaged versions change.

### Main commands

- `/init-plan` - initialize project planning files
- `/plan-feature <feature-name>` - create or resume a feature plan
- `/feature-switch` - switch the active feature context
- `/plan-handoff` - generate the build-facing handoff

### What it does not do

- it does not replace build mode
- it does not implement application code while planning
- it does not run build, install, release, deploy, or migration steps from `enhance-plan`
- it does not preserve manual edits to the plugin's own managed runtime files during refresh

### Docs

- Installation: [`docs/installation.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/installation.md)
- Usage: [`docs/usage.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/usage.md)
- Context optimization: [`docs/context-optimization.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md)
- Upgrade guide: [`docs/upgrade-compatibility.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/upgrade-compatibility.md)
- Maintainer release workflow: [`docs/repo-release-workflow.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/repo-release-workflow.md)

## 中文

`opencode-enhance-plan` 是一个构建在 OpenCode 之上的增强规划工作流插件。

它保留内置 `plan` 处理轻量分析，并为 feature 级任务提供更强的规划工作流。

插件通过 OpenCode 全局安装，但实际的 planning artifacts 会落到执行 `/init-plan` 与 `/plan-feature` 的项目中。

### 它能做什么

- 同一时间只维护一个 active feature
- 将规划工件持久化到 `plan/active/<feature>/`
- 在规划阶段允许对 planning 文件做受限写入
- 最终 handoff 前必须显式批准
- 切换 feature 时可以恢复 plan state
- 通过执行分批、提交检查点和压缩配置推荐来优化上下文 token 占用

### 上下文优化

长时间的 build 会话会因工具输出和修改文件的注入导致 token 堆积。插件通过以下内置策略缓解：

- **执行分批** — 将 todo 分成小批次（每批 2–4 项），每个批次在独立对话中执行
- **提交检查点** — 每批完成后提示用户提交并推送所有改动（包括 `plan/`），然后开新对话
- **plan.json 批次分组** — 在规划阶段就记录批次分配，执行前可审阅调整
- **压缩配置推荐** — `/init-plan` 检查 OpenCode 的 compaction 配置，若缺失则推荐开启

详见 [`docs/context-optimization.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md)。

### Planning 边界

`enhance-plan` 只允许更新 planning 文件：

- `AGENTS.md`
- `.opencode/README.md`
- `plan/**`

它不得修改源码、依赖清单、CI 配置、构建配置或发版脚本等实现相关文件。

### 安装

在 `opencode.json` 中添加：

```json
{
  "plugin": ["opencode-enhance-plan"]
}
```

重启 OpenCode。插件会将 agents、commands、templates 部署到 `~/.config/opencode/`，并在打包内容变化时默认刷新这些受管理运行时文件。

### 主要命令

- `/init-plan` - 初始化项目 planning 文件
- `/plan-feature <feature-name>` - 创建或恢复 feature 计划
- `/feature-switch` - 切换 active feature context
- `/plan-handoff` - 生成面向 build 的 handoff

### 它不会做什么

- 不会替代 build mode
- 不会在 planning 阶段实现业务代码
- 不会在 `enhance-plan` 中执行 build、install、release、deploy、migration
- 不会保留你对插件自管理运行时文件的手工修改

### 文档

- 安装说明：[`docs/installation.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/installation.md)
- 使用说明：[`docs/usage.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/usage.md)
- 上下文优化：[`docs/context-optimization.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md)
- 升级指南：[`docs/upgrade-compatibility.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/upgrade-compatibility.md)
- 仓库维护流程：[`docs/repo-release-workflow.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/repo-release-workflow.md)

## Scope note / 范围说明

This repository is not a fork of OpenCode. It is a public workflow layer built on top of OpenCode's documented extension points.

本仓库不是 OpenCode 的源码 fork，而是建立在 OpenCode 官方扩展点之上的公开工作流层。
