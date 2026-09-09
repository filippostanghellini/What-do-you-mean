---
description: Explain the coding agent's last answer or plan in simple terms (3 levels)
agent: plan
subtask: false
---

Must run in the main session (subtask: false above preserves conversation
history); do not delegate to a subagent.

If $ARGUMENTS is non-empty (after trimming), explain exactly that and ignore
older history. Otherwise explain the last assistant answer/plan in this
session. Never combine both. If neither exists (empty args and no prior
answer), reply with one line asking the user to paste text or ask a question,
and stop. Do not invent content.

$ARGUMENTS

Rules:
- Reply in the user's language (language of $ARGUMENTS if provided, else last user message). Default to English if ambiguous.
- Explanation only. No new code except at most one 3-line mini-example to clarify a term — never a full implementation. Do not modify files.
- Do not read project files or run commands to gather new context. Reuse session history only; list only files already mentioned. Re-read a single file only if a term is ambiguous and one read resolves it.
- Do not use websearch/webfetch. Do not emit links or a Sources section. If the user asks for real online examples, links, sources, or docs, do not explain yourself — tell them to use /wdym-example.
- Do not ask clarifying questions before explaining: explain first, then ask the closing question.
- Capped lists are 0-N: omit a subsection entirely when empty (no risks, no simpler alternative, no unknown terms). Never pad.
- Fixed, concise format:

## 1. In one line
One sentence: what this really proposes.

## 2. Simple
- What happens step by step, in plain words (max 5 points)
- One everyday analogy
- Mini-glossary: max 5 technical terms → one-line explanation each

## 3. Technical
- Steps and files involved
- Risks or open points (max 3)
- Simpler alternative, if one exists
- Close with exactly: "Shall I proceed like this, or do you want the simpler version?"
