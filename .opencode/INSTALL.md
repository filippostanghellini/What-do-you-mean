# Installing WDYM for OpenCode

## Prerequisites

- OpenCode.ai installed

## Installation

Add wdym to the `plugin` array in your `opencode.json` (global `~/.config/opencode/opencode.json` or project `./opencode.json`).

From git (no package registry needed, same as the biggest plugins):

```json
{ "plugin": ["opencode-wdym@git+https://github.com/filippostanghellini/What-do-you-mean.git"] }
```

Pin a version:

```json
{ "plugin": ["opencode-wdym@git+https://github.com/filippostanghellini/What-do-you-mean.git#v0.1.0"] }
```

Restart OpenCode. That's it — `/wdym` and `/wdym-example` are registered and `skills/` is added to skill paths.

Verify:

1. Type `/wdym` in the TUI (should show "Explain the coding agent's...").
2. Or ask: "what do you mean?".

## Updating

Restart OpenCode. If a git-backed install looks stale (Bun cache), clear `~/.cache/opencode/node_modules/` and restart.

## Troubleshooting

Plugin not loading:

```sh
opencode run --print-logs "hello" 2>&1 | grep -i wdym
```

- Check the `plugin` line in `opencode.json`.
- Use a recent OpenCode version (this doc targets v1 `plugin`; newer majors may use `plugins`).
- Your own `/wdym` command takes precedence: the plugin never overwrites it.
- `/wdym` runs on the `plan` agent: if you renamed or removed it, override `agent` in your own `/wdym` command.
