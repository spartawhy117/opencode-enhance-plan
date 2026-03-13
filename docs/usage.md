# Usage / 使用方式

## English

### Recommended workflow

1. Switch to the `enhance-plan` agent.
2. Run `/init-plan` in a project to normalize planning files and templates.
3. Run `/plan-feature <feature-name>` to create or resume a feature plan.
4. Clarify scope, review option paths, and refine the plan until the user explicitly approves execution.
5. Run `/plan-handoff` to generate the execution-facing handoff.
6. Switch to build mode and implement from `handoff.md`.

### Commands

#### `/init-plan`
Creates or normalizes the project planning workflow.

Expected outcomes:
- project `AGENTS.md` includes planning rules
- `.opencode/README.md` exists
- `plan/active/`, `plan/archive/`, and `plan/templates/` exist
- templates for `plan.json`, `plan.md`, `.plan-original.md`, and `handoff.md` exist

#### `/plan-feature <feature-name>`
Creates or resumes a feature-specific plan.

Expected outcomes:
- a normalized feature slug
- feature artifacts under `plan/active/<feature>/`
- a structured todo list with ids, dependencies, and statuses

#### `/feature-switch`
Switches the active feature context inside `enhance-plan`.

Behavior:
- saves current feature todo state before switching
- restores target feature todo and plan state after switching
- should only be used while `enhance-plan` is active

#### `/plan-handoff`
Creates a minimal execution handoff for build mode.

Behavior:
- requires an approved feature plan
- keeps execution context small
- focuses on goal, scope, todo summary, order, validation, and blockers

### Maintainer repository workflow

This repository also tracks a maintainer-only skill named `repo-release-workflow`.

- **Trigger `提交`**: stage and commit current repository changes
- **Trigger `发版`**: bump version, build, create a release commit, tag, push, and publish to npm
- **Entrypoints**: `.codebuddy/skills/repo-release-workflow/` and `.opencode/skills/repo-release-workflow/`
- **Workflow reference**: `docs/repo-release-workflow.md`

## 中文


### 推荐工作流

1. 切换到 `enhance-plan` agent。
2. 在项目里运行 `/init-plan`，初始化或规范化 planning 目录与模板。
3. 运行 `/plan-feature <feature-name>` 创建或恢复某个 feature 计划。
4. 持续澄清范围、比较 `Option Paths`、完善计划，直到用户明确批准执行。
5. 运行 `/plan-handoff` 生成面向 build 的最小 handoff。
6. 切换到 build mode，并基于 `handoff.md` 实施。

### 命令说明

#### `/init-plan`
创建或规范化项目 planning 工作流。

预期结果：
- 项目 `AGENTS.md` 包含 planning 规则
- `.opencode/README.md` 存在
- `plan/active/`、`plan/archive/`、`plan/templates/` 存在
- `plan.json`、`plan.md`、`.plan-original.md`、`handoff.md` 的模板存在

#### `/plan-feature <feature-name>`
创建或恢复某个 feature 的专属计划。

预期结果：
- 生成规范化 feature slug
- 在 `plan/active/<feature>/` 下生成工件
- 生成带 `id`、`dependencies`、`status` 的结构化 todo

#### `/feature-switch`
在 `enhance-plan` 中切换当前 active feature。

行为：
- 切换前保存当前 feature 的 todo 状态
- 切换后恢复目标 feature 的 todo 与 plan 状态
- 只应在 `enhance-plan` 激活时使用

#### `/plan-handoff`
为 build mode 生成最小执行 handoff。

行为：
- 需要 feature plan 已进入 `approved`
- 尽量压缩执行上下文
- 聚焦于目标、范围、todo 摘要、执行顺序、验证步骤与阻塞点

### 仓库维护工作流

这个仓库还额外跟踪了一套仅供维护者使用的 skill：`repo-release-workflow`。

- **触发 `提交`**：暂存并提交当前仓库改动
- **触发 `发版`**：更新版本号、执行构建、创建 release commit、打 tag、推送并发布到 npm
- **入口目录**：`.codebuddy/skills/repo-release-workflow/` 与 `.opencode/skills/repo-release-workflow/`
- **流程说明**：`docs/repo-release-workflow.md`

## Runtime language / 运行时语言


This workflow keeps repository files in English-first form while still allowing the agent to default to Chinese in user-facing responses.

这套工作流默认让仓库文件以英文优先，但 agent 在面向用户时仍可默认使用中文回复。
