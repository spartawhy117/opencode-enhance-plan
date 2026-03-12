# Changelog

All notable changes to this project will be documented in this file.

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
