# Changelog

All notable changes to this project will be documented in this file.

## [v1.0.0] - 2026-03-13

### English

Changed:
- Promoted `opencode-enhance-plan` from the 0.2.x iteration line to the first stable `1.0.0` release
- Finalized the tag-driven npm publishing and GitHub Release update flow as the default release path
- Stabilized the shared repository maintenance workflow for CodeBuddy and OpenCode with synced local skills, scripts, and docs

### 中文

变更：
- 将 `opencode-enhance-plan` 从 0.2.x 迭代阶段提升为首个稳定正式版 `1.0.0`
- 将基于 tag 的 npm 发布与 GitHub Release 自动更新流程固化为默认发版路径
- 将 CodeBuddy 与 OpenCode 共用的仓库维护流程稳定下来，统一了本地 skill、脚本与文档

## [v0.2.7] - 2026-03-13


### English

Changed:
- Removed the temporary `publish-npm-bootstrap.yml` workflow after npm Trusted Publishing was configured
- `repo:release` now stops after build, release commit, tag creation, and push; npm publishing is handled by GitHub Actions from the pushed tag
- Maintainer documentation and both project-local skills now describe the tag-driven release flow consistently

### 中文

变更：
- 在 npm Trusted Publishing 配置完成后，移除了临时的 `publish-npm-bootstrap.yml` 工作流
- `repo:release` 现在会在构建、release commit、打 tag、推送后停止；npm 发布改由推送的 tag 触发 GitHub Actions 完成
- 维护文档和两份项目级 skill 已统一为 tag 驱动发版语义

## [v0.2.6] - 2026-03-13


### English

Added:
- GitHub Actions workflow `publish-npm-bootstrap.yml` for first npm publish using `NPM_TOKEN`
- GitHub Actions workflow `publish-npm.yml` for later npm Trusted Publishing releases

Changed:
- `docs/repo-release-workflow.md` now documents the GitHub-hosted npm publishing path and its relation to local release helpers

### 中文

新增：
- 新增 GitHub Actions 工作流 `publish-npm-bootstrap.yml`，用于通过 `NPM_TOKEN` 完成首次 npm 发布
- 新增 GitHub Actions 工作流 `publish-npm.yml`，用于后续基于 npm Trusted Publishing 的发布

变更：
- `docs/repo-release-workflow.md` 已补充 GitHub 托管 npm 发布路径，以及它与本地 release 辅助脚本之间的关系

## [v0.2.5] - 2026-03-13



### English

Added:
- Project-local maintainer skill entrypoints under `.codebuddy/skills/repo-release-workflow/` and `.opencode/skills/repo-release-workflow/`
- Shared helper script `scripts/release-workflow.mjs` for repository commit and release flows
- Maintainer workflow reference at `docs/repo-release-workflow.md`

Changed:
- `README.md`, `docs/installation.md`, and `docs/usage.md` now document the repository maintenance triggers `提交` and `发版`
- `.gitignore` now ignores local CodeBuddy runtime state while keeping project-level skills trackable
- `package.json` now exposes `repo:commit` and `repo:release` script entrypoints

### 中文

新增：
- 在 `.codebuddy/skills/repo-release-workflow/` 与 `.opencode/skills/repo-release-workflow/` 下新增项目级维护 skill 入口
- 新增共享辅助脚本 `scripts/release-workflow.mjs`，用于仓库提交与发版流程
- 新增维护流程文档 `docs/repo-release-workflow.md`

变更：
- `README.md`、`docs/installation.md`、`docs/usage.md` 已补充仓库维护触发词 `提交` 与 `发版` 的说明
- `.gitignore` 现在会忽略 CodeBuddy 本地运行态目录，同时保留项目级 skill 可跟踪
- `package.json` 现在提供 `repo:commit` 与 `repo:release` 脚本入口

## [v0.2.4] - 2026-03-13


### English

Unified runtime agent name and removed legacy installation methods.

Changed:
- Runtime agent renamed from `plan-todo` to `enhance-plan` for full brand alignment with the package name `opencode-enhance-plan`
- Agent file renamed: `agents/plan-todo.md` → `agents/enhance-plan.md`
- All command frontmatter updated: `agent: plan-todo` → `agent: enhance-plan`
- All command internal references updated to use `enhance-plan`
- All documentation (`README.md`, `docs/installation.md`, `docs/usage.md`, `docs/upgrade-compatibility.md`) updated to reference `enhance-plan`
- Templates (`AGENTS.template.md`, `README.template.md`) updated to reference `enhance-plan`

Removed:
- `docs/installation.md`: Manual install and Script install sections removed — only plugin install via `opencode.json` is now documented
- `README.md`: Manual install links and `scripts/` directory listing removed
- `scripts/install.ps1` and `scripts/install.sh` deleted — no longer needed with plugin-based installation

Migration:
- Existing users should delete the old `~/.config/opencode/agents/plan-todo.md` after upgrading — the plugin will automatically deploy `agents/enhance-plan.md`
- In the OpenCode UI, switch to `enhance-plan` instead of the old `plan-todo`
- Projects previously initialized with `/init-plan` can re-run the command to update local references

### 中文

统一运行时 agent 名称，并移除旧的非配置安装方式。

变更：
- 运行时 agent 从 `plan-todo` 重命名为 `enhance-plan`，与包名 `opencode-enhance-plan` 完全对齐
- Agent 文件重命名：`agents/plan-todo.md` → `agents/enhance-plan.md`
- 所有命令 frontmatter 更新：`agent: plan-todo` → `agent: enhance-plan`
- 所有命令内部引用更新为 `enhance-plan`
- 所有文档（`README.md`、`docs/installation.md`、`docs/usage.md`、`docs/upgrade-compatibility.md`）更新为引用 `enhance-plan`
- 模板（`AGENTS.template.md`、`README.template.md`）更新为引用 `enhance-plan`

移除：
- `docs/installation.md`：删除手动安装和脚本安装章节 — 现在仅记录通过 `opencode.json` 的插件安装方式
- `README.md`：删除手动安装链接和 `scripts/` 目录说明
- 删除 `scripts/install.ps1` 和 `scripts/install.sh` — 基于插件安装后不再需要

迁移说明：
- 升级后请删除旧的 `~/.config/opencode/agents/plan-todo.md` — 插件会自动部署 `agents/enhance-plan.md`
- 在 OpenCode UI 中切换到 `enhance-plan` 而不是旧的 `plan-todo`
- 之前用 `/init-plan` 初始化的项目可以重新运行该命令来更新本地引用

## [v0.2.3] - 2026-03-13

### English

Project hygiene and PR workflow improvements.

Changed:
- Added `temp/` directory for reusable PR scripts (excluded from npm package via `files` whitelist and `.npmignore`)
- Updated `.gitignore` to track `temp/` dir but ignore its contents
- Cleaned up leftover temporary files from root (`eco_log.txt`, `release_notes.md`)
- Full code review confirmed plugin implementation matches `@opencode-ai/plugin` v1.2.25 API

### 中文

项目维护和 PR 工作流改进。

变更：
- 新增 `temp/` 目录用于存放可复用的 PR 脚本（通过 `files` 白名单和 `.npmignore` 排除，不会发布到 npm）
- 更新 `.gitignore`，跟踪 `temp/` 目录但忽略其中文件
- 清理根目录遗留临时文件（`eco_log.txt`、`release_notes.md`）
- 完整代码审查确认插件实现与 `@opencode-ai/plugin` v1.2.25 API 完全匹配

## [v0.2.2] - 2026-03-13

### English

Fixed CI installation failure caused by unused `zod` dependency.

Fixed:
- Removed `zod` from `devDependencies` — it was never used in the codebase but caused `bun install --no-cache` to fail with `ENOENT` in OpenCode's CI pipeline

### 中文

修复了未使用的 `zod` 依赖导致 CI 安装失败的问题。

修复：
- 从 `devDependencies` 移除 `zod` — 代码中从未使用，但它在 OpenCode CI 流水线的 `bun install --no-cache` 中触发了 `ENOENT` 错误

## [v0.2.1] - 2026-03-13

### English

Renamed the project from `opencode-plan-todo` to `opencode-enhance-plan` for better discoverability and clearer value proposition.

Changed:
- Package name: `opencode-plan-todo` → `opencode-enhance-plan`
- Repository URL updated to `spartawhy117/opencode-enhance-plan`
- All internal references, docs, templates, and scripts updated to reflect the new name
- Plugin description rewritten for clarity: "An enhanced planning workflow plugin for OpenCode"
- Added `legacy/` directory for archived docs superseded by agent definitions
- Moved `docs/feature-lifecycle.md` to `legacy/` (content already fully defined in `agents/plan-todo.md`)
- Cleaned up temporary files (`pr_body.json`, `update_pr.ps1`)
- Removed accidentally committed `dist/` build artifacts

### 中文

将项目从 `opencode-plan-todo` 重命名为 `opencode-enhance-plan`，以提升可发现性和价值传达。

变更：
- 包名：`opencode-plan-todo` → `opencode-enhance-plan`
- 仓库 URL 更新为 `spartawhy117/opencode-enhance-plan`
- 所有内部引用、文档、模板、脚本均已更新为新名称
- 插件描述重写："An enhanced planning workflow plugin for OpenCode"
- 新增 `legacy/` 目录，用于存放被 agent 定义取代的归档文档
- 将 `docs/feature-lifecycle.md` 移至 `legacy/`（内容已在 `agents/plan-todo.md` 中完整定义）
- 清理了临时文件（`pr_body.json`、`update_pr.ps1`）
- 删除了误提交的 `dist/` 编译产物

## [v0.2.0] - 2026-03-13

### English

Transformed the project into an OpenCode npm plugin package.

Added:
- `package.json` with npm package metadata, build scripts, and plugin entry point
- `tsconfig.json` for TypeScript compilation (ESNext target, Bun-compatible)
- `src/index.ts` — Plugin entry point with auto-deploy and event hooks
- `src/deploy.ts` — Cross-platform asset deployment with idempotent file copy
- `scripts/install.sh` — Bash install script for Linux/macOS (parity with `install.ps1`)
- `.npmignore` for clean npm publishing

Changed:
- `README.md` — Added npm badge, plugin install instructions (English and Chinese)
- `docs/installation.md` — Added plugin install method as recommended approach
- `docs/upgrade-compatibility.md` — Added plugin-specific upgrade notes
- `.gitignore` — Added `dist/` exclusion

Design choices:
- "Plugin shell + config assets" hybrid architecture: TypeScript plugin handles auto-deploy and hooks, while agents/commands/templates remain as Markdown
- Idempotent deployment: skip files already present and matching, never overwrite user modifications unless forced
- Minimal hook footprint: only `event` hook for todo state tracking in v0.2.0

### 中文

将项目转型为 OpenCode npm 插件包。

新增：
- `package.json`，包含 npm 包元数据、构建脚本和插件入口点
- `tsconfig.json`，TypeScript 编译配置（ESNext 目标，兼容 Bun）
- `src/index.ts` — 插件入口，实现自动部署和事件钩子
- `src/deploy.ts` — 跨平台资产部署，支持幂等文件复制
- `scripts/install.sh` — Linux/macOS 的 bash 安装脚本（与 `install.ps1` 功能对等）
- `.npmignore`，用于干净的 npm 发布

变更：
- `README.md` — 添加 npm badge 和插件安装说明（英中双语）
- `docs/installation.md` — 将插件安装方式作为推荐方法
- `docs/upgrade-compatibility.md` — 添加插件模式升级注意事项
- `.gitignore` — 添加 `dist/` 排除规则

关键设计：
- "Plugin 壳 + 配置资产" 混合架构：TypeScript 插件负责自动部署和钩子，agents/commands/templates 保持 Markdown 格式
- 幂等部署：跳过已存在且内容一致的文件，除非强制覆盖，否则不覆盖用户修改
- 最小化钩子范围：v0.2.0 仅使用 `event` 钩子做 todo 状态追踪

## [v0.1.1] - 2026-03-13

### English

Release alignment update.

Added or finalized:
- `CHANGELOG.md`
- bilingual GitHub release notes
- version point that includes both the install script and changelog in the tagged state

### 中文

版本对齐更新。

新增或完成：
- `CHANGELOG.md`
- 英中双语 GitHub Release 正文
- 一个同时包含安装脚本与变更日志的正式标签版本

## [v0.1.0] - 2026-03-13

### English

Initial public release of `opencode-plan-todo`.

Added:
- `plan-todo` primary agent for read-only, feature-focused planning
- planning commands: `/init-plan`, `/plan-feature`, `/feature-switch`, `/plan-handoff`
- `/init-plan` template set for `AGENTS.md`, project README, `plan.json`, `plan.md`, `.plan-original.md`, and `handoff.md`
- PowerShell install helper at `scripts/install.ps1`
- bilingual repository documentation for installation, usage, lifecycle, and upgrade compatibility

Design choices:
- keep OpenCode built-in `/init` and `plan` intact
- use a separate planning mode instead of overriding built-in behavior
- keep build context small through `handoff.md`
- persist feature planning as durable artifacts under `plan/active/<feature>/`

### 中文

`opencode-plan-todo` 的首个公开版本。

新增内容：
- 面向只读、聚焦单 feature 规划的主代理 `plan-todo`
- 一组 planning 命令：`/init-plan`、`/plan-feature`、`/feature-switch`、`/plan-handoff`
- `/init-plan` 所需模板：`AGENTS.md`、项目 README、`plan.json`、`plan.md`、`.plan-original.md`、`handoff.md`
- PowerShell 安装脚本 `scripts/install.ps1`
- 英中双语仓库文档，包括安装、使用、生命周期与升级兼容说明

关键设计：
- 保留 OpenCode 内置 `/init` 和 `plan` 的原始语义
- 通过新增 planning mode，而不是覆盖内置行为
- 使用 `handoff.md` 压缩 build 上下文
- 将 feature planning 以持久化工件形式保存在 `plan/active/<feature>/` 下
