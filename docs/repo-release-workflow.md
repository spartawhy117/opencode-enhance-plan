# Repository Release Workflow / 仓库发版工作流

## English

### Purpose

Keep repository maintenance behavior consistent across CodeBuddy IDE and OpenCode CLI for this project.

### Skill entrypoints

- `.codebuddy/skills/repo-release-workflow/SKILL.md`
- `.opencode/skills/repo-release-workflow/SKILL.md`

### Standard triggers

- **Commit flow**: `提交`, `提交当前改动`, `Commit current changes`
- **Release flow**: `发版`, `发布新版本`, `Release a new version`

### Commit flow

When the maintainer says `提交`, the workflow should:

1. Review the current diff and summarize the real change.
2. Stage all repository changes with `git add -A`.
3. Create exactly one commit.
4. Stop after the commit. Do not push, tag, or publish in this flow.

Standard helper command:

```bash
npm run repo:commit -- --message "docs: update workflow docs"
```

### Release flow

When the maintainer says `发版`, the workflow should:

1. Determine the release target from the request or context.
2. Prefer an explicit `patch`, `minor`, `major`, or a concrete version.
3. Ask only for the missing bump type or exact version when the intent is ambiguous.
4. Run one of the standard helper commands:

```bash
npm run repo:release -- --bump patch
npm run repo:release -- --version 0.2.5
```

The helper performs the following steps in order:

1. `npm version ... --no-git-tag-version`
2. `npm run build`
3. `git add -A`
4. `git commit` with `release: vX.Y.Z` by default
5. `git tag vX.Y.Z`
6. `git push`
7. `git push --tags`
8. `npm publish`

### Notes

- The helper uses `git commit -F` internally to avoid Windows shell quoting issues.
- `.codebuddy/plans/` and `.codebuddy/memory/` are treated as local runtime state and should stay ignored.
- The npm package publish whitelist still targets the plugin payload. These project-level skills exist for repository maintenance only.

## 中文

### 目的

让这个仓库在 `CodeBuddy IDE` 和 `OpenCode CLI` 下都使用同一套维护动作语义。

### Skill 入口

- `.codebuddy/skills/repo-release-workflow/SKILL.md`
- `.opencode/skills/repo-release-workflow/SKILL.md`

### 标准触发词

- **提交流**：`提交`、`提交当前改动`、`Commit current changes`
- **发版流**：`发版`、`发布新版本`、`Release a new version`

### 提交流

当维护者说 `提交` 时，工作流应当：

1. 先查看当前 diff，并基于真实改动生成提交说明。
2. 使用 `git add -A` 暂存整个仓库改动。
3. 只创建一次提交。
4. 到 `commit` 为止，不做 `push`、`tag`、`npm publish`。

标准辅助命令：

```bash
npm run repo:commit -- --message "docs: update workflow docs"
```

### 发版流

当维护者说 `发版` 时，工作流应当：

1. 从请求或上下文中确定版本目标。
2. 优先使用明确的 `patch`、`minor`、`major` 或具体版本号。
3. 如果版本语义不清晰，只补问一次缺失的 bump 类型或目标版本。
4. 执行以下标准辅助命令之一：

```bash
npm run repo:release -- --bump patch
npm run repo:release -- --version 0.2.5
```

辅助脚本会按顺序执行：

1. `npm version ... --no-git-tag-version`
2. `npm run build`
3. `git add -A`
4. 默认使用 `release: vX.Y.Z` 作为 `git commit`
5. `git tag vX.Y.Z`
6. `git push`
7. `git push --tags`
8. `npm publish`

### 说明

- 辅助脚本内部使用 `git commit -F`，避免 Windows shell 下提交说明带空格时的引号问题。
- `.codebuddy/plans/` 和 `.codebuddy/memory/` 视为本地运行态目录，应该继续忽略。
- npm 包发布白名单仍然只面向插件本体；这些项目级 skill 仅用于仓库维护，不参与插件运行时分发。
