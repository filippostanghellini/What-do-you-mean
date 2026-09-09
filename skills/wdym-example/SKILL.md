---
name: wdym-example
description: Explain the coding agent's last plan with real online examples, links and sources. Use ONLY when the user types /wdym-example or explicitly asks for real examples, links, sources, docs, or verifiable cases.
license: MIT
---

# WDYM-Example — What do you mean, with proof

Use this skill when the user wants more than a plain explanation:
`/wdym-example`, "with real examples", "with links", "show me real cases",
"where is this documented", "sources". If the user did NOT explicitly request
online examples, links, or sources, do not browse — answer like `wdym` instead.

## Input

If arguments are provided, explain exactly those and ignore older history.
Otherwise explain the last assistant answer/plan in the current session. Never
combine both. If neither exists (no args and no prior answer), reply with one
line asking the user to paste text or ask a question, and stop. Do not invent
content.

## Research

Use websearch if available, otherwise webfetch. At most 1 webfetch to verify
a link, only if the snippet is insufficient; otherwise rely on search snippets.
Max 3 URLs total across the entire answer. Only URLs actually returned by
websearch/webfetch. Never invent URLs. Prefer official docs. If browsing is
unavailable: say so in one line, use model knowledge labeled
"(from model knowledge, unverified)", emit 0 links and omit the Sources
section.

## Output (always, in this order)

Reply in the user's language (language of the request if provided, else last
user message). Default to English if ambiguous. Explanation only. No new code
except at most one 3-line mini-example to clarify a term — never a full
implementation. Do not modify files.

Do not read project files or run commands to gather new context. Reuse session
history only; list only files already mentioned. Re-read a single file only if
a term is ambiguous and one read resolves it.

Do not ask clarifying questions before explaining: explain first, then ask the
closing question.

Capped lists are 0-N: omit a subsection entirely when empty (no risks, no
simpler alternative, no unknown terms). Never pad.

## 1. In one line
One sentence: what this really proposes.

## 2. Simple, with examples
- Max 5 step-by-step points in plain words
- 1-2 concrete real-world examples with links (name + URL + one line on why each fits)
- Mini-glossary: max 5 terms → one line each

## 3. Technical
- Steps and files involved
- Max 3 risks or doubts
- Simpler alternative if one exists
- Close with exactly: "Shall I proceed like this, or do you want the simpler version?"

## Sources (omit entirely if 0 links)
- [title](URL) — one line on what it confirms

## Don't

- Do not implement the plan.
- Do not add extra sections or needless jargon.
- Do not list more than 3 links.
