// wdym — OpenCode plugin.
//
// Registers every commands/*.md (/wdym, /wdym-example) and skills/ when
// installed from git or checkout. No always-on system prompt, no custom
// tools: on-demand only.
//
// Usage in opencode.json (git install, like the biggest plugins):
//   { "plugin": ["opencode-wdym@git+https://github.com/filippostanghellini/What-do-you-mean.git"] }
// or from a local checkout (path relative to the opencode.json declaring it):
//   { "plugin": ["./.opencode/plugins/wdym.mjs"] }

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function cleanValue(value) {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseCommandFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  const frontmatter = match[1];
  const template = match[2].trim();
  const description = frontmatter.match(/description:\s*(.+)/)?.[1];
  if (!description || !template) return null;
  const parsed = { description: cleanValue(description), template };
  // Forward opencode command options when present (agent/subtask/model),
  // so plugin-registered commands behave like file-discovered ones.
  // ponytail: subtask:false keeps /wdym in the main session (history).
  for (const key of ["agent", "model"]) {
    const value = frontmatter.match(new RegExp(`^${key}:\\s*(.+)`, "m"))?.[1];
    if (value) parsed[key] = cleanValue(value);
  }
  const subtask = frontmatter.match(/^subtask:\s*(.+)/m)?.[1];
  if (subtask) parsed.subtask = cleanValue(subtask) === "true";
  return parsed;
}

// Single named export (official plugin shape): the legacy loader treats
// every exported function as a plugin, so exactly one is exported.
export const WdymPlugin = async ({ client } = {}) => {
  const log = (level, message) => {
    try {
      client?.app?.log?.({ body: { service: "wdym", level, message } });
    } catch {}
  };

  const commandsDir = path.resolve(__dirname, "../../commands");
  const skillsDir = path.resolve(__dirname, "../../skills");

  return {
    config: async (config) => {
      config.command ??= {};
      // Register every bundled command; never overwrite a user-defined one.
      // Flat layout: only top-level commands/*.md (no nested dirs).
      try {
        for (const file of fs.readdirSync(commandsDir).filter((f) => f.endsWith(".md"))) {
          const name = path.basename(file, ".md");
          if (config.command[name]) continue;
          const parsed = parseCommandFile(path.join(commandsDir, file));
          if (parsed) {
            config.command[name] = parsed;
          } else {
            log("warn", "wdym: skipping " + file + " (bad frontmatter)");
          }
        }
      } catch (e) {
        log("warn", "wdym commands not registered: " + e?.message);
      }

      config.skills ??= {};
      config.skills.paths ??= [];
      if (fs.existsSync(skillsDir) && !config.skills.paths.includes(skillsDir)) {
        config.skills.paths.push(skillsDir);
      }
    },
  };
};
