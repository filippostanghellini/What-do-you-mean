# WDYM — agent notes

Git-only opencode/Claude Code plugin. Zero runtime deps. English only, everywhere.

## Mirror rule (most violated)

Each command exists twice — edit BOTH or they drift:
`commands/<name>.md` (opencode template + Claude Code command) and
`skills/<name>/SKILL.md` (auto-invoke). Keep identical: input branching,
language line, code policy, link policy, closing question verbatim
(`Shall I proceed like this, or do you want the simpler version?`).

## Loader contract (`.opencode/plugins/wdym.mjs`)

- Single named export only (`WdymPlugin`): legacy loader treats every
  exported function as a plugin.
- `config` hook registers every top-level `commands/*.md` (flat, no nesting)
  and pushes `skills/` to `config.skills.paths`. Never overwrites user commands.
- Consumed frontmatter: `description`, `template`, `agent`, `subtask`, `model`.
  `agent: plan` + `subtask: false` keeps history in the main session.

## Verify (no test runner)

```sh
node --input-type=module -e "import('./.opencode/plugins/wdym.mjs').then(async m => { const p = await m.WdymPlugin({}); const cfg = {}; await p.config(cfg); console.log(Object.keys(cfg.command ?? {})); })"
node -e "for (const f of ['package.json','.claude-plugin/plugin.json','.claude-plugin/marketplace.json']) JSON.parse(require('fs').readFileSync(f,'utf8'))"
```

## Release (git-only, no npm)

Bump version in 3 places together: `package.json`, `.claude-plugin/plugin.json`,
`.claude-plugin/marketplace.json` → commit → `git tag vX.Y.Z` → push + push tag.

## Conventions

- Skill dir name == frontmatter `name`; descriptions mutually exclusive
  (`wdym` = no web/no links, `wdym-example` = only on explicit request).
- `wdym-example`: max 3 URLs total, only tool-returned, never invent;
  0 links + omit Sources when offline.
