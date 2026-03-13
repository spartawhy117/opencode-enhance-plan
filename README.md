# opencode-enhance-plan

## English

`opencode-enhance-plan` is an enhanced planning workflow plugin for OpenCode.

It does not replace the built-in `plan` mode. Instead, it adds a stronger planning mode for feature work that needs:
- persistent feature artifacts
- explicit review before execution
- structured todo state
- feature switching and resume support
- minimal build handoff
- restricted write access for planning artifacts and project-level planning files

### Current capabilities

- planning-first workflow for non-trivial feature work
- one active feature context at a time
- persistent plan artifacts under `plan/active/<feature>/`
- restricted writes to planning files during planning
- explicit approval before final handoff to build mode
- feature switching with persisted and restorable plan state

### Planning write boundary

`enhance-plan` may create or update planning files only:

- `AGENTS.md`
- `.opencode/README.md`
- `plan/templates/*`
- `plan/active/<feature>/*`
- `plan/archive/<feature>/*`

`enhance-plan` must not modify implementation files such as application source, dependency manifests, CI config, build config, or release scripts.

### Why not just use the built-in `plan` mode?

The built-in `plan` mode is still useful for lightweight read-only analysis.

`enhance-plan` is intended for heavier feature planning where the default planning experience is often too weak in practice.

### Built-in `plan` vs `enhance-plan`

| Area | Built-in `plan` | `enhance-plan` |
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
- `src/` - TypeScript plugin source (auto-deploys agents/commands/templates)
- `docs/` - installation, usage, upgrade, and maintainer workflow notes
- `scripts/` - shared repository maintenance helper for commit/release flows
- `.codebuddy/skills/` - project-level CodeBuddy skill entrypoint for repository maintenance
- `.opencode/skills/` - project-level OpenCode skill entrypoint for repository maintenance
- `legacy/` - archived docs superseded by agent definitions


### Install as OpenCode Plugin (recommended)

Add `opencode-enhance-plan` to your `opencode.json`:

```json
{
  "plugin": ["opencode-enhance-plan"]
}
```

OpenCode will automatically install and load the plugin on next startup. The plugin deploys agents, commands, and templates to your OpenCode config directory (`~/.config/opencode/`).

The plugin is installed globally through OpenCode, but `enhance-plan` writes planning artifacts into each project that uses `/init-plan` and `/plan-feature`.

### Core idea

Use the built-in `plan` mode when you want lightweight investigation.

Use `enhance-plan` when you want a full planning loop with:
- one active feature at a time
- persistent plan artifacts under `plan/active/<feature>/`
- explicit option comparison
- explicit user confirmation before build
- a small execution context through `handoff.md`
- project-local planning files that can be updated during planning without editing implementation code

### What it writes in a project

After installation, the planning workflow can create and maintain:

- project `AGENTS.md`
- project `.opencode/README.md`
- `plan/templates/plan.json`
- `plan/templates/plan.md`
- `plan/templates/.plan-original.md`
- `plan/templates/handoff.md`
- `plan/active/<feature>/plan.json`
- `plan/active/<feature>/plan.md`
- `plan/active/<feature>/.plan-original.md`
- `plan/active/<feature>/handoff.md`

### What it does not do

- it does not replace build mode
- it does not implement application code while planning
- it does not run build, install, release, deploy, or migration steps from `enhance-plan`
- it does not change files outside the planning boundary listed above

### Start here

- Installation: [`docs/installation.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/installation.md)
- Usage: [`docs/usage.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/usage.md)
- Maintainer release workflow: [`docs/repo-release-workflow.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/repo-release-workflow.md)
- Upgrade checklist: [`docs/upgrade-compatibility.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/upgrade-compatibility.md)


### Quick path

1. Install this workflow into your OpenCode config.
2. Restart OpenCode.
3. Switch to `enhance-plan`.
4. Run `/init-plan` inside a project.
5. Run `/plan-feature <feature-name>`.
6. Review and approve the plan.
7. Run `/plan-handoff` before switching to build mode.

### Maintainer repo skill

This repository also tracks a cross-tool maintainer skill named `repo-release-workflow`.

- **CodeBuddy entrypoint**: `.codebuddy/skills/repo-release-workflow/`
- **OpenCode entrypoint**: `.opencode/skills/repo-release-workflow/`
- **Standard triggers**: `提交` and `发版`
- **`提交` behavior**: `git add -A` + `git commit`
- **`发版` behavior**: version bump + `npm run build` + release commit + `git tag` + `git push` + GitHub Actions npm publish and GitHub Release latest update triggered by the pushed tag



Implementation details live in `docs/repo-release-workflow.md` and `scripts/release-workflow.mjs`.

## 中文


`opencode-enhance-plan` 是一个构建在 OpenCode 之上的增强规划工作流插件。

它不是用来替代内置 `plan` 模式，而是新增一个更强的规划模式，专门处理这类 feature 任务：
- 需要持久化 feature 工件
- 需要执行前明确审阅
- 需要结构化 todo 状态
- 需要 feature 切换与恢复
- 需要最小化 build handoff

### 当前能力

- 面向非简单 feature 的 planning-first 工作流
- 同一时间只维护一个 active feature context
- 规划工件持久化到 `plan/active/<feature>/`
- 在规划阶段允许对 planning 文件做受限写入
- build 前必须显式批准
- feature 切换时可以恢复已持久化的 plan state

### Planning 写入边界

`enhance-plan` 只允许创建或更新以下 planning 文件：

- `AGENTS.md`
- `.opencode/README.md`
- `plan/templates/*`
- `plan/active/<feature>/*`
- `plan/archive/<feature>/*`

`enhance-plan` 不得修改应用源码、依赖清单、CI 配置、构建配置或发版脚本等实现相关文件。

### 为什么不直接用内置 `plan`？

内置 `plan` 仍然适合做轻量级只读分析。

`enhance-plan` 的目标是解决更重的 feature planning 场景：默认 planning 体验在这些场景里通常不够强，尤其是在 todo 持久化、状态管理、feature 切换、handoff 收敛这几个方面。

### 内置 `plan` 与 `enhance-plan` 的区别

| 维度 | 内置 `plan` | `enhance-plan` |
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
- `src/` - TypeScript 插件源码（自动部署 agents/commands/templates）
- `docs/` - 安装、使用、升级兼容说明
- `scripts/` - Windows（PowerShell）和 Linux/macOS（bash）安装脚本
- `legacy/` - 已被 agent 定义取代的归档文档

### 作为 OpenCode Plugin 安装（推荐）

在 `opencode.json` 中添加：

```json
{
  "plugin": ["opencode-enhance-plan"]
}
```

OpenCode 下次启动时会自动安装并加载插件，自动将 agents、commands、templates 部署到 OpenCode 配置目录（`~/.config/opencode/`）。

插件是通过 OpenCode 全局安装的，但 `enhance-plan` 写入的 planning artifacts 会落到每个实际执行 `/init-plan` 与 `/plan-feature` 的项目中。

### 核心思路

如果你只是想做轻量调研，就继续用内置 `plan`。

如果你想要完整的 planning loop，就用 `enhance-plan`，它强调：
- 同一时间只维护一个 active feature
- feature 工件持久化到 `plan/active/<feature>/`
- 明确的方案比较
- build 前必须有显式确认
- 通过 `handoff.md` 压缩执行上下文
- 在规划阶段可受限写入项目级 planning 文件，但不修改实现代码

### 在项目里会写入什么

安装后，这套 workflow 可以在项目中创建并维护：

- 项目 `AGENTS.md`
- 项目 `.opencode/README.md`
- `plan/templates/plan.json`
- `plan/templates/plan.md`
- `plan/templates/.plan-original.md`
- `plan/templates/handoff.md`
- `plan/active/<feature>/plan.json`
- `plan/active/<feature>/plan.md`
- `plan/active/<feature>/.plan-original.md`
- `plan/active/<feature>/handoff.md`

### 它不会做什么

- 不会替代 build mode
- 不会在 planning 阶段实现业务代码
- 不会在 `enhance-plan` 中执行 build、install、release、deploy、migration
- 不会修改写入边界之外的文件

### 从这里开始读

- 安装说明：[`docs/installation.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/installation.md)
- 使用说明：[`docs/usage.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/usage.md)
- 仓库维护流程：[`docs/repo-release-workflow.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/repo-release-workflow.md)
- 升级检查清单：[`docs/upgrade-compatibility.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/upgrade-compatibility.md)


### 最短使用路径

1. 把这套 workflow 安装到你的 OpenCode 配置目录。
2. 重启 OpenCode。
3. 切换到 `enhance-plan`。
4. 在项目里运行 `/init-plan`。
5. 运行 `/plan-feature <feature-name>`。
6. 审阅并批准计划。
7. 在切到 build 前运行 `/plan-handoff`。

### 仓库维护 skill

这个仓库还额外跟踪了一套跨工具维护 skill：`repo-release-workflow`。

- **CodeBuddy 入口**：`.codebuddy/skills/repo-release-workflow/`
- **OpenCode 入口**：`.opencode/skills/repo-release-workflow/`
- **标准触发词**：`提交` 与 `发版`
- **`提交` 行为**：`git add -A` + `git commit`
- **`发版` 行为**：版本号更新 + `npm run build` + release commit + `git tag` + `git push` + 由推送的 tag 触发 GitHub Actions 发布到 npm


具体执行细节记录在 `docs/repo-release-workflow.md` 与 `scripts/release-workflow.mjs`。

## Scope note / 范围说明


This repository is not a fork of OpenCode. It is a public workflow layer built on top of OpenCode's documented extension points.

本仓库不是 OpenCode 的源码 fork，而是建立在 OpenCode 官方扩展点之上的公开工作流层。
