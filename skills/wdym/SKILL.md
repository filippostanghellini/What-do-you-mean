---
name: wdym
description: Explain the coding agent's last plan or answer in plain words, no web search, no links. Use when the user types /wdym, says "what do you mean", "explain it simply", or didn't get the plan.
license: MIT
---

# WDYM — What do you mean

Use this skill when the user wants to understand before implementing:
`/wdym`, "what do you mean", "explain it simply", "I didn't get the plan".
If the user asks for real online examples, links, sources, or docs, do not
explain yourself — the `wdym-example` skill handles it instead.

## Input

If arguments are provided, explain exactly those and ignore older history.
Otherwise explain the last assistant answer/plan in the current session. Never
combine both. If neither exists (no args and no prior answer), reply with one
line asking the user to paste text or ask a question, and stop. Do not invent
content.

## Output (always, in this order)

Reply in the user's language (language of the request if provided, else last
user message). Default to English if ambiguous. Explanation only. No new code
except at most one 3-line mini-example to clarify a term — never a full
implementation. Do not modify files.

Do not read project files or run commands to gather new context. Reuse session
history only; list only files already mentioned. Re-read a single file only if
a term is ambiguous and one read resolves it.

Do not use websearch/webfetch. Do not emit links or a Sources section.

Do not ask clarifying questions before explaining: explain first, then ask the
closing question.

Capped lists are 0-N: omit a subsection entirely when empty (no risks, no
simpler alternative, no unknown terms). Never pad.

## 1. In one line
One sentence: what this really proposes.

## 2. Simple
- Max 5 step-by-step points in plain words
- 1 everyday analogy
- Mini-glossary: max 5 terms → one line each

## 3. Technical
- Steps and files involved
- Max 3 risks or doubts
- Simpler alternative if one exists
- Close with exactly: "Shall I proceed like this, or do you want the simpler version?"

## Don't

- Do not implement the plan.
- Do not add extra sections or needless jargon.
