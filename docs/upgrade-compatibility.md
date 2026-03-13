# Upgrade Guide / 升级与兼容指南

## English

### Plugin upgrade steps

1. Edit `opencode.json` and make sure it still contains:

```json
{
  "plugin": ["opencode-enhance-plan"]
}
```

2. Restart OpenCode.
3. If the new plugin behavior does not appear, remove local overridden copies under `~/.config/opencode/agents/`, `~/.config/opencode/commands/`, or `~/.config/opencode/templates/`, then restart OpenCode again.
4. Verify that `enhance-plan`, `/init-plan`, `/plan-feature`, `/feature-switch`, and `/plan-handoff` are available.

### Engine upgrade checklist

Run after `opencode upgrade` or any upstream engine/tool change.

- [ ] `enhance-plan` still appears as a primary agent
- [ ] `/init-plan`, `/plan-feature`, `/feature-switch`, and `/plan-handoff` are still discoverable
- [ ] agent and command frontmatter still work with the current engine
- [ ] `todowrite`, `question`, and restricted writes still work
- [ ] `enhance-plan` can still update `AGENTS.md`, `.opencode/README.md`, and `plan/**`
- [ ] `enhance-plan` still does not modify implementation files

## 中文

### 插件升级步骤

1. 编辑 `opencode.json`，确认里面仍然包含：

```json
{
  "plugin": ["opencode-enhance-plan"]
}
```

2. 重启 OpenCode。
3. 如果新版插件行为没有生效，删除 `~/.config/opencode/agents/`、`~/.config/opencode/commands/`、`~/.config/opencode/templates/` 下对应的本地覆盖副本后再次重启。
4. 验证 `enhance-plan`、`/init-plan`、`/plan-feature`、`/feature-switch`、`/plan-handoff` 是否可用。

### 引擎升级检查清单

在执行 `opencode upgrade` 或上游引擎 / tool API 发生变化后，检查：

- [ ] `enhance-plan` 仍然显示为 primary agent
- [ ] `/init-plan`、`/plan-feature`、`/feature-switch`、`/plan-handoff` 仍可被发现
- [ ] agent 与 command 的 frontmatter 仍按当前引擎预期工作
- [ ] `todowrite`、`question` 与受限写入仍可用
- [ ] `enhance-plan` 仍可更新 `AGENTS.md`、`.opencode/README.md` 与 `plan/**`
- [ ] `enhance-plan` 仍不会修改实现文件
