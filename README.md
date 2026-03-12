# opencode-plan-todo

## English

`opencode-plan-todo` is a planning workflow layer for OpenCode.

It does not replace the built-in `plan` mode. Instead, it adds a stronger planning mode for feature work that needs:
- persistent feature artifacts
- explicit review before execution
- structured todo state
- feature switching and resume support
- minimal build handoff

### Why not just use the built-in `plan` mode?

The built-in `plan` mode is still useful for lightweight read-only analysis.

`plan-todo` is intended for heavier feature planning where the default planning experience is often too weak in practice.

### Built-in `plan` vs `plan-todo`

| Area | Built-in `plan` | `plan-todo` |
| --- | --- | --- |
| Primary use | quick analysis | feature planning workflow |
| Todo persistence | limited | explicit, structured, feature-scoped |
| Plan state model | implicit | `prepare -> ready -> approved -> building -> ...` |
| Feature switching | not a core workflow | built in via `/feature-switch` |
| Execution handoff | loose | focused `handoff.md` |
| Plan artifacts | optional | required per feature |
| Review gate | informal | explicit approval before handoff |

### What this repository includes

- `agents/` - custom agent definitions
- `commands/` - custom slash commands
- `templates/` - project templates used by `/init-plan`
- `docs/` - installation, usage, lifecycle, and upgrade notes
- `scripts/install.ps1` - optional Windows install helper

### Core idea

Use the built-in `plan` mode when you want lightweight investigation.

Use `plan-todo` when you want a full planning loop with:
- one active feature at a time
- persistent plan artifacts under `plan/active/<feature>/`
- explicit option comparison
- explicit user confirmation before build
- a small execution context through `handoff.md`

### Start here

- Installation: [`docs/installation.md`](https://github.com/spartawhy117/opencode-plan-todo/blob/main/docs/installation.md)
- Usage: [`docs/usage.md`](https://github.com/spartawhy117/opencode-plan-todo/blob/main/docs/usage.md)
- Feature lifecycle: [`docs/feature-lifecycle.md`](https://github.com/spartawhy117/opencode-plan-todo/blob/main/docs/feature-lifecycle.md)
- Upgrade compatibility: [`docs/upgrade-compatibility.md`](https://github.com/spartawhy117/opencode-plan-todo/blob/main/docs/upgrade-compatibility.md)

### Quick path

1. Install this workflow into your OpenCode config.
2. Restart OpenCode.
3. Switch to `plan-todo`.
4. Run `/init-plan` inside a project.
5. Run `/plan-feature <feature-name>`.
6. Review and approve the plan.
7. Run `/plan-handoff` before switching to build mode.

## 中文

`opencode-plan-todo` 是一个构建在 OpenCode 之上的 planning workflow layer。

它不是用来替代内置 `plan` 模式，而是新增一个更强的规划模式，专门处理这类 feature 任务：
- 需要持久化 feature 工件
- 需要执行前明确审阅
- 需要结构化 todo 状态
- 需要 feature 切换与恢复
- 需要最小化 build handoff

### 为什么不直接用内置 `plan`？

内置 `plan` 仍然适合做轻量级只读分析。

`plan-todo` 的目标是解决更重的 feature planning 场景：默认 planning 体验在这些场景里通常不够强，尤其是在 todo 持久化、状态管理、feature 切换、handoff 收敛这几个方面。

### 内置 `plan` 与 `plan-todo` 的区别

| 维度 | 内置 `plan` | `plan-todo` |
| --- | --- | --- |
| 主要用途 | 快速分析 | feature 级 planning workflow |
| todo 持久化 | 较弱 | 明确、结构化、按 feature 隔离 |
| plan 状态模型 | 隐式 | `prepare -> ready -> approved -> building -> ...` |
| feature 切换 | 不是核心能力 | 通过 `/feature-switch` 内建支持 |
| 执行交接 | 较松散 | 使用聚焦的 `handoff.md` |
| plan 工件 | 可选 | 每个 feature 都要求具备 |
| 审阅门槛 | 偏口头化 | handoff 前必须显式批准 |

### 仓库包含什么

- `agents/` - 自定义 agent 定义
- `commands/` - 自定义斜杠命令
- `templates/` - `/init-plan` 使用的项目模板
- `docs/` - 安装、使用、生命周期、升级兼容说明
- `scripts/install.ps1` - 可选的 Windows 安装脚本

### 核心思路

如果你只是想做轻量调研，就继续用内置 `plan`。

如果你想要完整的 planning loop，就用 `plan-todo`，它强调：
- 同一时间只维护一个 active feature
- feature 工件持久化到 `plan/active/<feature>/`
- 明确的方案比较
- build 前必须有显式确认
- 通过 `handoff.md` 压缩执行上下文

### 从这里开始读

- 安装说明：[`docs/installation.md`](https://github.com/spartawhy117/opencode-plan-todo/blob/main/docs/installation.md)
- 使用说明：[`docs/usage.md`](https://github.com/spartawhy117/opencode-plan-todo/blob/main/docs/usage.md)
- 生命周期：[`docs/feature-lifecycle.md`](https://github.com/spartawhy117/opencode-plan-todo/blob/main/docs/feature-lifecycle.md)
- 升级兼容：[`docs/upgrade-compatibility.md`](https://github.com/spartawhy117/opencode-plan-todo/blob/main/docs/upgrade-compatibility.md)

### 最短使用路径

1. 把这套 workflow 安装到你的 OpenCode 配置目录。
2. 重启 OpenCode。
3. 切换到 `plan-todo`。
4. 在项目里运行 `/init-plan`。
5. 运行 `/plan-feature <feature-name>`。
6. 审阅并批准计划。
7. 在切到 build 前运行 `/plan-handoff`。

## Scope note / 范围说明

This repository is not a fork of OpenCode. It is a public workflow layer built on top of OpenCode's documented extension points.

本仓库不是 OpenCode 的源码 fork，而是建立在 OpenCode 官方扩展点之上的公开工作流层。
