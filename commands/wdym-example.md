---
description: Explain the coding agent's last answer with real online examples and links
agent: plan
subtask: false
---

Must run in the main session (subtask: false above preserves conversation
history); do not delegate to a subagent.

If $ARGUMENTS is non-empty (after trimming), explain exactly that and ignore
older history. Otherwise explain the last assistant answer/plan in this
session. Never combine both. If neither exists (empty args and no prior
answer), reply with one line asking the user to paste text or ask a question,
and stop. Do not invent content. If the user did NOT explicitly request online
examples, links, or sources, do not browse — answer like /wdym instead.

$ARGUMENTS

Rules:
- Reply in the user's language (language of $ARGUMENTS if provided, else last user message). Default to English if ambiguous.
- Explanation only. No new code except at most one 3-line mini-example to clarify a term — never a full implementation. Do not modify files.
- Do not read project files or run commands to gather new context. Reuse session history only; list only files already mentioned. Re-read a single file only if a term is ambiguous and one read resolves it.
- Research: use websearch if available, otherwise webfetch. At most 1 webfetch to verify a link, only if the snippet is insufficient; otherwise rely on search snippets.
- Links: max 3 URLs total across the entire answer. Only URLs actually returned by websearch/webfetch. Never invent URLs. Prefer official docs.
- If browsing is unavailable: say so in one line, use model knowledge labeled "(from model knowledge, unverified)", emit 0 links and omit the Sources section.
- Do not ask clarifying questions before explaining: explain first, then ask the closing question.
- Capped lists are 0-N: omit a subsection entirely when empty (no risks, no simpler alternative, no unknown terms). Never pad.
- Format (concise):

## 1. In one line
One sentence: what this really proposes.

## 2. Simple, with examples
- What happens step by step, in plain words (max 5 points)
- 1-2 concrete real-world examples with links (name + URL + one line on why each fits)
- Mini-glossary: max 5 technical terms → one-line explanation each

## 3. Technical
- Steps and files involved
- Risks or open points (max 3)
- Simpler alternative, if one exists
- Close with exactly: "Shall I proceed like this, or do you want the simpler version?"

## Sources (omit entirely if 0 links)
- [title](URL) — one line on what it confirms
