---
name: repo-release-workflow
description: Use this skill for repository maintenance requests in this project, especially when the user says “提交” for stage-and-commit behavior or “发版” for version bump, build, release commit, tag, push, and GitHub Actions publishing.
---


## Purpose

Provide one repository maintenance workflow shared by CodeBuddy IDE and OpenCode CLI for this project.

## Required context

Read `docs/repo-release-workflow.md` and `package.json` before taking action. Inspect `git status --short` and the relevant diff so the commit or release message matches the real changes.

## Trigger mapping

- Treat `提交`, `提交当前改动`, `commit`, and `Commit current changes` as the commit flow.
- Treat `发版`, `发布新版本`, `release`, and `Release a new version` as the release flow.

## Commit flow

1. Summarize the real repository changes.
2. Generate a concise commit message from the actual diff.
3. Execute `npm run repo:commit -- --message "<message>"`.
4. Stop after the commit. Do not push, tag, or publish in this flow.

## Release flow

1. Determine the target release from the request or context.
2. Prefer explicit `patch`, `minor`, `major`, or an exact version.
3. Ask only for the missing bump type or exact version when the intent is ambiguous.
4. Execute one of the following:
   - `npm run repo:release -- --bump <patch|minor|major>`
   - `npm run repo:release -- --version <x.y.z>`
5. Remember that the release helper performs version bump, build, release commit, tag creation, branch push, and tag push.
6. The npm package publish now happens in GitHub Actions after the pushed `v*` tag triggers `.github/workflows/publish-npm.yml`.


## Guardrails

- Stop and explain clearly if npm authentication, publish permission, or git remote access is missing.
- Avoid inventing release semantics that are not supported by the repository scripts.
- Keep explanations short and action-oriented.
