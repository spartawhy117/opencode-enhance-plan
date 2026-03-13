# Changelog

All notable changes to this project will be documented in this file.

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
