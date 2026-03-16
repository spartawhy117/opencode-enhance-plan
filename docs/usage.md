# Usage / 使用方式

## English

### Recommended workflow

1. Switch to the `enhance-plan` agent.
2. Run `/init-plan` in a project to create or normalize the project planning structure and templates.
3. Run `/plan-feature <feature-name>` to create or resume a feature plan and persist its artifacts.
4. Clarify scope, review option paths, and refine the plan until the user explicitly approves execution.
5. Run `/plan-handoff` to generate the execution-facing handoff.
6. **Switch to the `enhance-build` agent** and start a new conversation to execute from `handoff.md`.

> 💡 `enhance-build` reads only `handoff.md` and `plan.json` at startup — no broad codebase exploration. This keeps token usage significantly lower than OpenCode's built-in code mode. You can still use the built-in code mode if preferred, but `enhance-build` follows batch checkpoints more strictly.

### Commands

#### `/init-plan`
Creates or normalizes the project planning workflow.

Expected outcomes:
- project `AGENTS.md` includes planning rules and `enhance-build` guidance
- `.opencode/README.md` exists
- `plan/active/`, `plan/archive/`, and `plan/templates/` exist
- templates for `plan.json`, `plan.md`, `.plan-original.md`, and `handoff.md` exist

Write boundary:
- may create or update `AGENTS.md`, `.opencode/README.md`, `plan/templates/*`, and the `plan/active/` / `plan/archive/` directory structure
- must not modify implementation files

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
- includes a "How to Execute" section recommending `enhance-build`
- writes the handoff to `plan/active/<feature>/handoff.md`

### Agents

#### `enhance-plan` — Planning agent

Restricted to planning only. Has `edit/write/patch` permissions but enforces a **mandatory path check** before every write operation:

- Only `AGENTS.md`, `.opencode/README.md`, and `plan/**` are allowed
- Any write to implementation files (source code, config, dependencies) is refused
- If the user asks to modify implementation files, the agent suggests switching to `enhance-build`

This prevents the planning phase from accidentally executing code changes.

#### `enhance-build` — Build agent

Focused execution agent that implements approved plans with minimal context overhead:

- **Startup**: reads only `handoff.md` + `plan.json` — no broad file exploration
- **Batch discipline**: executes one batch per conversation, then prompts for commit checkpoint
- **Context discipline**: only reads files directly referenced by the current batch's todo items
- **State tracking**: updates `plan.json` todo statuses as items are completed
- **Resumption**: if returning mid-batch, checks `plan.json` to find where to resume

Token savings compared to built-in code mode:
- No exploratory file reads at startup
- No reading of planning history (`plan.md`, `.plan-original.md`)
- Strict batch boundaries prevent context accumulation across batches

### Context optimization

The plugin includes built-in strategies to keep token usage manageable across planning and build phases. See [`docs/context-optimization.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md) for the full technical explanation.

Key strategies:
- **Execution batching** — `enhance-plan` groups todos into 2–4 item batches; `enhance-build` enforces one-batch-per-conversation discipline with commit checkpoints
- **Commit checkpoints include `plan/`** — prevents planning artifacts from being injected as modified files
- **Batch groups in `plan.json`** — reviewable batch assignments before execution
- **Compaction recommendation** — `/init-plan` checks for OpenCode compaction config
- **`enhance-build` agent** — purpose-built for minimal-context execution

### Planning write boundary

`enhance-plan` may write planning artifacts only:

- `AGENTS.md`
- `.opencode/README.md`
- `plan/**`

Before every write, the agent verifies the target path against this allowlist. Writes to implementation files are refused with an explanation. This boundary applies to `enhance-plan` only; `enhance-build` has full implementation permissions.

### Maintainer repository workflow

This repository also tracks a maintainer-only skill named `repo-release-workflow`.

- **Trigger `提交`**: stage and commit current repository changes
- **Trigger `发版`**: bump version, build, create a release commit, tag, push, and let GitHub Actions publish to npm and update the GitHub Release from the pushed tag

- **Entrypoints**: `.codebuddy/skills/repo-release-workflow/` and `.opencode/skills/repo-release-workflow/`
- **Workflow reference**: `docs/repo-release-workflow.md`


## 中文


### 推荐工作流

1. 切换到 `enhance-plan` agent。
2. 在项目里运行 `/init-plan`，创建或规范化项目规划目录结构与模板。
3. 运行 `/plan-feature <feature-name>` 创建或恢复某个 feature 计划。
4. 持续澄清范围、比较方案、完善计划，直到用户明确批准执行。
5. 运行 `/plan-handoff` 生成面向 build 的最小 handoff。
6. **切换到 `enhance-build` agent**，开新对话，基于 `handoff.md` 执行。

> 💡 `enhance-build` 启动时只读 `handoff.md` 和 `plan.json`——不会广泛探索代码库。token 占用显著低于内建 code 模式。你也可以继续用内建 code 模式，但 `enhance-build` 的批次检查点更严格。

### 命令说明

#### `/init-plan`
创建或规范化项目 planning 工作流。

预期结果：
- 项目 `AGENTS.md` 包含 planning 规则和 `enhance-build` 说明
- `.opencode/README.md` 存在
- `plan/active/`、`plan/archive/`、`plan/templates/` 存在
- `plan.json`、`plan.md`、`.plan-original.md`、`handoff.md` 的模板存在

写入边界：
- 可以创建或更新 `AGENTS.md`、`.opencode/README.md`、`plan/templates/*`，以及目录结构
- 不得修改实现文件

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
- 包含"如何执行"段落，推荐使用 `enhance-build`
- 输出路径为 `plan/active/<feature>/handoff.md`

### Agent 说明

#### `enhance-plan` — 规划 agent

限制为仅规划。拥有 `edit/write/patch` 权限但在每次写入前执行**强制路径检查**：

- 仅允许写入 `AGENTS.md`、`.opencode/README.md`、`plan/**`
- 任何对实现文件（源码、配置、依赖）的写入都会被拒绝
- 如果用户要求修改实现文件，agent 会建议切换到 `enhance-build`

这防止了规划阶段意外执行代码修改。

#### `enhance-build` — 执行 agent

专注执行的 agent，以最小上下文开销实现已批准的计划：

- **启动**：只读 `handoff.md` + `plan.json`——不广泛扫描文件
- **批次纪律**：每次对话执行一个批次，然后提示提交检查点
- **上下文纪律**：只读取当前批次 todo 直接涉及的文件
- **状态追踪**：完成 todo 后即时更新 `plan.json`
- **断点恢复**：中途返回时检查 `plan.json` 找到续接点

相比内建 code 模式的 token 节省：
- 启动时无探索性文件读取
- 不读取规划历史（`plan.md`、`.plan-original.md`）
- 严格批次边界防止上下文跨批次累积

### 上下文优化

插件内置多项策略来控制规划和构建阶段的 token 占用。完整技术说明详见 [`docs/context-optimization.md`](https://github.com/spartawhy117/opencode-enhance-plan/blob/main/docs/context-optimization.md)。

核心策略：
- **执行分批** — `enhance-plan` 将 todo 按 2–4 项分批；`enhance-build` 强制每次对话只执行一个批次并在批次间提示提交检查点
- **提交检查点包含 `plan/`** — 防止规划文件被当作已修改文件注入上下文
- **plan.json 批次分组** — 执行前可审阅的批次分配
- **压缩配置推荐** — `/init-plan` 检查 OpenCode compaction 配置
- **`enhance-build` agent** — 专为最小上下文执行设计

### Planning 写入边界

`enhance-plan` 只允许写以下 planning 文件：

- `AGENTS.md`
- `.opencode/README.md`
- `plan/**`

每次写入前，agent 会验证目标路径是否在允许列表中。对实现文件的写入会被拒绝并解释原因。这个边界仅适用于 `enhance-plan`；`enhance-build` 拥有完整的实现权限。

### 仓库维护工作流

这个仓库还额外跟踪了一套仅供维护者使用的 skill：`repo-release-workflow`。

- **触发 `提交`**：暂存并提交当前仓库改动
- **触发 `发版`**：更新版本号、执行构建、创建 release commit、打 tag、推送，并由推送的 tag 触发 GitHub Actions 发布到 npm
- **入口目录**：`.codebuddy/skills/repo-release-workflow/` 与 `.opencode/skills/repo-release-workflow/`
- **流程说明**：`docs/repo-release-workflow.md`
