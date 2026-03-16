# opencode-enhance-plan

## English

`opencode-enhance-plan` is an enhanced planning workflow plugin for OpenCode.

It adds a structured planning phase (`enhance-plan`) and a focused build phase (`enhance-build`) on top of OpenCode's built-in modes.

### What it does

- keeps one active feature at a time with persistent plan artifacts under `plan/active/<feature>/`
- requires explicit approval before handoff to build
- **`enhance-plan`** — planning agent with write access restricted to `plan/**` only; mandatory path checks prevent accidental implementation-file edits
- **`enhance-build`** — build agent that reads only `handoff.md` + `plan.json` at startup, executes one batch per conversation, and prompts commit checkpoints; significantly lower token usage than OpenCode's built-in code mode
- context optimization through execution batching, commit checkpoints, and compaction recommendations

> 💡 **Tip**: After planning, switch to `enhance-build` instead of the built-in code mode. It loads fewer files, follows batch boundaries strictly, and keeps token usage predictable. See [`docs/context-optimization.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md).

### Install

```json
{ "plugin": ["opencode-enhance-plan"] }
```

Add to `opencode.json` and restart OpenCode.

### Commands

| Command | Purpose |
|---------|---------|
| `/init-plan` | Initialize project planning structure |
| `/plan-feature <name>` | Create or resume a feature plan |
| `/feature-switch` | Switch active feature context |
| `/plan-handoff` | Generate build-facing handoff |

### Docs

- [Installation](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/installation.md)
- [Usage](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/usage.md)
- [Context optimization](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md)
- [Upgrade guide](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/upgrade-compatibility.md)

---

## 中文

`opencode-enhance-plan` 是一个构建在 OpenCode 之上的增强规划工作流插件。

它在 OpenCode 内置模式之上新增了结构化规划阶段（`enhance-plan`）和专注执行阶段（`enhance-build`）。

### 它能做什么

- 同一时间只维护一个 active feature，规划工件持久化到 `plan/active/<feature>/`
- handoff 前必须显式批准
- **`enhance-plan`** — 规划 agent，写入权限仅限 `plan/**`；内置路径检查防止误改实现文件
- **`enhance-build`** — 执行 agent，启动时只读 `handoff.md` + `plan.json`，每次对话执行一个批次并提示提交检查点；token 占用显著低于内建 code 模式
- 通过执行分批、提交检查点和压缩配置推荐优化上下文 token

> 💡 **提示**：规划完成后，建议切换到 `enhance-build` 而不是内建 code 模式。它加载更少文件、严格遵循批次边界、token 占用可预测。详见 [`docs/context-optimization.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md)。

### 安装

```json
{ "plugin": ["opencode-enhance-plan"] }
```

添加到 `opencode.json` 后重启 OpenCode。

### 命令

| 命令 | 用途 |
|------|------|
| `/init-plan` | 初始化项目规划结构 |
| `/plan-feature <name>` | 创建或恢复 feature 计划 |
| `/feature-switch` | 切换 active feature |
| `/plan-handoff` | 生成面向 build 的 handoff |

### 文档

- [安装说明](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/installation.md)
- [使用说明](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/usage.md)
- [上下文优化](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md)
- [升级指南](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/upgrade-compatibility.md)

---

## Scope note / 范围说明

This repository is not a fork of OpenCode. It is a public workflow layer built on top of OpenCode's documented extension points.

本仓库不是 OpenCode 的源码 fork，而是建立在 OpenCode 官方扩展点之上的公开工作流层。
