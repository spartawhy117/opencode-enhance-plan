# Context Optimization / 上下文优化

## English

### Problem

OpenCode injects modified file contents and tool outputs into the conversation context automatically. During long build sessions that touch many files, token usage grows rapidly — eventually hitting context window limits or degrading response quality. Planning artifacts under `plan/` add to this overhead when left uncommitted.

### Built-in optimizations

`opencode-enhance-plan` addresses this problem through four complementary strategies that work together across the planning and build phases.

---

#### 1. Execution Batching

**Where**: `handoff.md`, `enhance-plan` agent, `/plan-handoff` command

Instead of implementing an entire feature in a single conversation, the plugin groups todos into small batches (2–4 items each) based on logical dependency and scope. Each batch ends with a **commit checkpoint** — a clear prompt for the user to commit, push, and start a fresh conversation.

How it works:

- During planning, the `enhance-plan` agent evaluates todo dependencies and groups them into batches.
- The `/plan-handoff` command requires an `Execution Batching` section in every handoff document.
- Each batch in `handoff.md` lists the todo items and ends with `Commit checkpoint: yes`.
- The build agent reads these batches and executes only one batch per conversation.

Benefits:

- Each conversation starts with a clean context window.
- Token usage stays predictable and manageable.
- Progress is saved incrementally via git commits.

#### 2. Commit Checkpoints with `plan/` Directory

**Where**: `AGENTS.template.md`, `handoff.template.md`, `/plan-handoff` command

After each batch, the user is prompted to commit **all** changes — including the `plan/` directory. Planning artifacts (`plan.json`, `plan.md`, etc.) are part of the working tree. If left uncommitted, OpenCode treats them as modified files and injects their contents into subsequent conversations.

How it works:

- The `Build Context Hygiene` section in `AGENTS.md` instructs the build agent to include `plan/` in every commit checkpoint.
- The `Execution Batching` note in `handoff.md` explicitly reminds: *"commit and push your changes — including the `plan/` directory"*.
- The `/plan-handoff` batching rules require commit checkpoints to mention `plan/` explicitly.

Benefits:

- Eliminates unnecessary token overhead from uncommitted planning files.
- Keeps subsequent conversations focused on the next batch only.

#### 3. Batch Groups in `plan.json`

**Where**: `plan.json` template

The `batchGroups` field in `plan.json` captures batch assignments at planning time, before the handoff is generated. This makes batching a first-class part of the plan state rather than an afterthought.

Structure:

```json
{
  "batchGroups": [
    {
      "batch": 1,
      "todoIds": ["todo-1", "todo-2"],
      "commitCheckpoint": true
    },
    {
      "batch": 2,
      "todoIds": ["todo-3", "todo-4"],
      "commitCheckpoint": true
    }
  ]
}
```

Benefits:

- Batching decisions are made during planning when dependencies are well understood.
- The handoff generator can read `batchGroups` directly instead of guessing groupings.
- Batch assignments are reviewable and adjustable before execution begins.

#### 4. Compaction Configuration Recommendation

**Where**: `/init-plan` command

When initializing a project's planning structure, the `/init-plan` command checks whether the project's `opencode.json` includes a `compaction` section. If missing, it recommends the following configuration:

```json
{
  "compaction": {
    "auto": true,
    "prune": true,
    "reserved": 10000
  }
}
```

- `auto`: triggers context compression automatically when the context window is nearly full.
- `prune`: removes old tool outputs to reclaim tokens.
- `reserved`: keeps a 10 000-token buffer so the compression process itself has room to work.

The plugin does not write to `opencode.json` directly — it surfaces the recommendation so the user can decide whether to apply it.

Benefits:

- Provides a safety net when conversations do grow long despite batching.
- Works at the OpenCode level, complementing the plugin's own strategies.

---

### How the strategies work together

```
Planning phase
  └─ enhance-plan groups todos into batchGroups in plan.json
       ↓
/plan-handoff generates handoff.md
  └─ Execution Batching section with commit checkpoints
       ↓
Build phase (conversation 1)
  └─ Build agent executes Batch 1
  └─ Prompts: "Commit and push (including plan/), then start a new conversation"
       ↓
Build phase (conversation 2)
  └─ Build agent reads handoff.md, continues with Batch 2
  └─ Clean context — no leftover tool outputs or stale file contents
       ↓
  ... repeat until all batches are done ...
       ↓
OpenCode compaction (safety net)
  └─ If a single batch still grows large, auto-compaction kicks in
```

---

### Files involved

| File | Role |
|------|------|
| `agents/enhance-plan.md` | Execution Batching Awareness section — teaches the planning agent to group todos |
| `templates/init-plan/AGENTS.template.md` | Build Context Hygiene section — instructs the build agent on batching and commit rules |
| `templates/init-plan/handoff.template.md` | Execution Batching section template — provides the batch structure and commit reminder |
| `templates/init-plan/plan-json.template.json` | `batchGroups` field — stores batch assignments as plan state |
| `commands/plan-handoff.md` | Execution batching rules — requires batching and commit checkpoints in every handoff |
| `commands/init-plan.md` | Compaction configuration — recommends OpenCode compaction settings during project init |

---

## 中文

### 问题

OpenCode 会自动将修改过的文件内容和工具输出注入对话上下文。在长时间的 build 会话中，如果修改了大量文件，token 占用会快速增长——最终可能达到上下文窗口上限或导致回复质量下降。`plan/` 目录下未提交的规划文件也会增加额外的 token 开销。

### 内置优化策略

`opencode-enhance-plan` 通过四个互补策略来解决这个问题，覆盖规划和构建的全流程。

---

#### 1. 执行分批（Execution Batching）

**涉及位置**：`handoff.md`、`enhance-plan` agent、`/plan-handoff` 命令

插件不会在单次对话中实现整个 feature，而是将 todo 按逻辑依赖和范围分成小批次（每批 2–4 项）。每个批次结束时会有一个 **提交检查点**——明确提示用户提交代码、推送到远端，然后开启新对话。

工作方式：

- 规划阶段，`enhance-plan` agent 评估 todo 依赖关系并分组为批次
- `/plan-handoff` 命令要求每份交接文档必须包含 `Execution Batching` 段
- `handoff.md` 中每个批次列出对应的 todo 项，并以 `Commit checkpoint: yes` 结尾
- Build agent 按批次执行，每次对话只处理一个批次

收益：

- 每次对话以干净的上下文窗口开始
- Token 占用可预测、可控
- 通过 git commit 增量保存进度

#### 2. 提交检查点包含 `plan/` 目录

**涉及位置**：`AGENTS.template.md`、`handoff.template.md`、`/plan-handoff` 命令

每个批次完成后，提示用户提交 **所有** 改动——包括 `plan/` 目录。规划文件（`plan.json`、`plan.md` 等）属于工作区的一部分，如果不提交，OpenCode 会将它们当作已修改文件注入后续对话的上下文。

工作方式：

- `AGENTS.md` 中的 `Build Context Hygiene` 段指示 build agent 在每个提交检查点包含 `plan/`
- `handoff.md` 中的 `Execution Batching` 提示明确提醒："提交并推送你的改动——**包括 `plan/` 目录**"
- `/plan-handoff` 的分批规则要求提交检查点必须显式提到 `plan/`

收益：

- 消除未提交规划文件带来的不必要 token 开销
- 让后续对话只聚焦于下一个批次

#### 3. plan.json 中的批次分组（Batch Groups）

**涉及位置**：`plan.json` 模板

`plan.json` 中的 `batchGroups` 字段在规划阶段就记录了批次分配，在生成 handoff 之前就已确定。这使得分批成为 plan 状态的一等公民，而不是事后补充。

结构示例：

```json
{
  "batchGroups": [
    {
      "batch": 1,
      "todoIds": ["todo-1", "todo-2"],
      "commitCheckpoint": true
    },
    {
      "batch": 2,
      "todoIds": ["todo-3", "todo-4"],
      "commitCheckpoint": true
    }
  ]
}
```

收益：

- 在依赖关系最清晰的规划阶段做出分批决策
- Handoff 生成器可以直接读取 `batchGroups`，无需猜测分组
- 批次分配在执行前可审阅和调整

#### 4. 压缩配置推荐（Compaction Configuration）

**涉及位置**：`/init-plan` 命令

初始化项目规划结构时，`/init-plan` 命令会检查项目的 `opencode.json` 是否包含 `compaction` 段。如果缺失，会推荐以下配置：

```json
{
  "compaction": {
    "auto": true,
    "prune": true,
    "reserved": 10000
  }
}
```

- `auto`：上下文接近满时自动触发压缩
- `prune`：移除旧的工具输出以回收 token
- `reserved`：保留 10,000 token 缓冲区供压缩过程使用

插件不会直接写入 `opencode.json`——只是向用户展示推荐配置，由用户决定是否采用。

收益：

- 为意外增长的长对话提供安全网
- 在 OpenCode 层面运作，与插件自身策略互补

---

### 策略协作流程

```
规划阶段
  └─ enhance-plan 将 todo 分组写入 plan.json 的 batchGroups
       ↓
/plan-handoff 生成 handoff.md
  └─ 包含 Execution Batching 段和提交检查点
       ↓
构建阶段（对话 1）
  └─ Build agent 执行 Batch 1
  └─ 提示："提交并推送（包括 plan/），然后开新对话"
       ↓
构建阶段（对话 2）
  └─ Build agent 读取 handoff.md，继续 Batch 2
  └─ 干净上下文——没有残留的工具输出或过期文件内容
       ↓
  ... 重复直到所有批次完成 ...
       ↓
OpenCode compaction（安全网）
  └─ 如果单个批次仍然增长过大，自动压缩会启动
```

---

### 涉及文件

| 文件 | 作用 |
|------|------|
| `agents/enhance-plan.md` | Execution Batching Awareness 段——教会规划 agent 分组 todo |
| `templates/init-plan/AGENTS.template.md` | Build Context Hygiene 段——指导 build agent 分批执行和提交规则 |
| `templates/init-plan/handoff.template.md` | Execution Batching 段模板——提供批次结构和提交提醒 |
| `templates/init-plan/plan-json.template.json` | `batchGroups` 字段——将批次分配作为 plan 状态存储 |
| `commands/plan-handoff.md` | 执行分批规则——要求每份 handoff 包含分批和提交检查点 |
| `commands/init-plan.md` | 压缩配置——在项目初始化时推荐 OpenCode compaction 设置 |
