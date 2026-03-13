# Usage / 使用方式

## English

### Recommended workflow

1. Switch to the `enhance-plan` agent.
2. Run `/init-plan` in a project to create or normalize the project planning structure and templates.
3. Run `/plan-feature <feature-name>` to create or resume a feature plan and persist its artifacts.
4. Clarify scope, review option paths, and refine the plan until the user explicitly approves execution.
5. Run `/plan-handoff` to generate the execution-facing handoff.
6. After approval, switch to build mode outside `enhance-plan` and implement from `handoff.md`.

### Commands

#### `/init-plan`
Creates or normalizes the project planning workflow.

Expected outcomes:
- project `AGENTS.md` includes planning rules
- `.opencode/README.md` exists
- `plan/active/`, `plan/archive/`, and `plan/templates/` exist
- templates for `plan.json`, `plan.md`, `.plan-original.md`, and `handoff.md` exist

Write boundary:
- may create or update `AGENTS.md`, `.opencode/README.md`, `plan/templates/*`, and the `plan/active/` / `plan/archive/` directory structure
- must not modify implementation files

Notes:
- use this command to seed project-level planning files before the first feature plan
- legacy planning or progress docs should be normalized into the `plan/` structure without touching business documentation

#### `/plan-feature <feature-name>`
Creates or resumes a feature-specific plan.

Expected outcomes:
- a normalized feature slug
- feature artifacts under `plan/active/<feature>/`
- a structured todo list with ids, dependencies, and statuses

Write boundary:
- may create or update `plan/active/<feature>/plan.json`, `plan.md`, `.plan-original.md`, and `handoff.md`
- must keep `plan.json` synchronized with status, todos, open questions, option paths, and confirmation state

File roles:
- `plan.md` is the current reviewable draft
- `.plan-original.md` is the baseline draft and should not be overwritten on every refinement pass
- `handoff.md` may exist as a draft before approval, but becomes the final execution handoff only after approval

#### `/feature-switch`
Switches the active feature context inside `enhance-plan`.

Behavior:
- saves current feature todo state back to the current `plan.json` before switching
- restores target feature todo and plan state from the target `plan.json` and `plan.md` after switching
- builds the selectable feature list from persisted `plan/active/*/plan.json` files
- should only be used while `enhance-plan` is active

#### `/plan-handoff`
Creates a minimal execution handoff for build mode.

Behavior:
- may update `handoff.md` as a draft during planning, but requires an approved feature plan for the final handoff
- keeps execution context small
- focuses on goal, scope, todo summary, order, validation, and blockers
- writes the handoff to `plan/active/<feature>/handoff.md`

### Planning write boundary

`enhance-plan` is no longer read-only. It may write planning artifacts and init-plan project files only:

- `AGENTS.md`
- `.opencode/README.md`
- `plan/**`

It must not modify implementation files such as source code, build configuration, release configuration, or dependency manifests.
This boundary applies to the `enhance-plan` agent only; build mode may have a different execution scope.

### Maintainer repository workflow

This repository also tracks a maintainer-only skill named `repo-release-workflow`.

- **Trigger `提交`**: stage and commit current repository changes
- **Trigger `发版`**: bump version, build, create a release commit, tag, push, and let GitHub Actions publish to npm and update the GitHub Release from the pushed tag

- **Entrypoints**: `.codebuddy/skills/repo-release-workflow/` and `.opencode/skills/repo-release-workflow/`
- **Workflow reference**: `docs/repo-release-workflow.md`


## 中文


### 推荐工作流

1. 切换到 `enhance-plan` agent。
2. 在项目里运行 `/init-plan`，创建或规范化项目 planning 目录结构、模板与项目级 planning 文件。
3. 运行 `/plan-feature <feature-name>` 创建或恢复某个 feature 计划，并持久化其工件。
4. 持续澄清范围、比较 `Option Paths`、完善计划，直到用户明确批准执行。
5. 运行 `/plan-handoff` 生成面向 build 的最小 handoff。
6. 在获得批准后，于 `enhance-plan` 之外切换到 build mode，并基于 `handoff.md` 实施。

### 命令说明

#### `/init-plan`
创建或规范化项目 planning 工作流。

预期结果：
- 项目 `AGENTS.md` 包含 planning 规则
- `.opencode/README.md` 存在
- `plan/active/`、`plan/archive/`、`plan/templates/` 存在
- `plan.json`、`plan.md`、`.plan-original.md`、`handoff.md` 的模板存在

写入边界：
- 可以创建或更新 `AGENTS.md`、`.opencode/README.md`、`plan/templates/*`，以及 `plan/active/` / `plan/archive/` 目录结构
- 不得修改实现文件

说明：
- 首次使用前，先用这个命令初始化项目级 planning 文件
- 如有旧的 planning 或进度文档，应将其规范化进 `plan/` 结构，而不是改动业务说明文档

#### `/plan-feature <feature-name>`
创建或恢复某个 feature 的专属计划。

预期结果：
- 生成规范化 feature slug
- 在 `plan/active/<feature>/` 下生成工件
- 生成带 `id`、`dependencies`、`status` 的结构化 todo

写入边界：
- 可以创建或更新 `plan/active/<feature>/plan.json`、`plan.md`、`.plan-original.md`、`handoff.md`
- 必须持续同步 `plan.json` 中的状态、todo、开放问题、方案路径与确认状态

文件角色：
- `plan.md` 是当前可审阅的计划草稿
- `.plan-original.md` 是基线稿，不应在每次细化时都被覆盖
- `handoff.md` 可以在批准前作为草稿存在，但只有批准后才是最终执行交接

#### `/feature-switch`
在 `enhance-plan` 中切换当前 active feature。

行为：
- 切换前将当前 feature 的 todo 状态写回当前 `plan.json`
- 切换后从目标 `plan.json` 与 `plan.md` 恢复 todo 与 plan 状态
- 可选 feature 列表来源于已持久化的 `plan/active/*/plan.json`
- 只应在 `enhance-plan` 激活时使用

#### `/plan-handoff`
为 build mode 生成最小执行 handoff。

行为：
- 允许在规划阶段更新 `handoff.md` 草稿，但最终 handoff 仍要求 feature plan 已进入 `approved`
- 尽量压缩执行上下文
- 聚焦于目标、范围、todo 摘要、执行顺序、验证步骤与阻塞点
- 输出路径为 `plan/active/<feature>/handoff.md`

### Planning 写入边界

`enhance-plan` 不再是绝对只读。它只允许写以下 planning 文件：

- `AGENTS.md`
- `.opencode/README.md`
- `plan/**`

它不得修改源码、构建配置、发版配置或依赖清单等实现相关文件。
这个边界只适用于 `enhance-plan` agent；build mode 可以拥有不同的执行范围。

### 仓库维护工作流

这个仓库还额外跟踪了一套仅供维护者使用的 skill：`repo-release-workflow`。

- **触发 `提交`**：暂存并提交当前仓库改动
- **触发 `发版`**：更新版本号、执行构建、创建 release commit、打 tag、推送，并由推送的 tag 触发 GitHub Actions 发布到 npm
- **入口目录**：`.codebuddy/skills/repo-release-workflow/` 与 `.opencode/skills/repo-release-workflow/`
- **流程说明**：`docs/repo-release-workflow.md`


## Runtime language / 运行时语言


This workflow keeps repository files in English-first form while still allowing the agent to default to Chinese in user-facing responses.

这套工作流默认让仓库文件以英文优先，但 agent 在面向用户时仍可默认使用中文回复。
