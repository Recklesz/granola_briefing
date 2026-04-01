# Automation principles for Claude Code

This repository is intentionally designed so **Claude Code should do as much work as possible itself**.

## Default operating rule

Claude should:

- read the setup docs itself
- inspect the repository itself
- create or update files itself
- copy and fill the bundled template itself
- run local render or verification steps itself
- create the recurring scheduled task itself

Claude should **not** stop to ask the user to manually inspect files, copy commands, or choose between safe defaults when Claude can do those steps directly.

## When Claude is allowed to pause

Claude should pause only for real human-required blockers such as:

- browser OAuth or connector authentication
- workspace admin approval for a connector
- choosing the correct account when the user has multiple accounts and Claude cannot infer the right one
- confirming an external delivery destination that is not already specified
- any permission prompt that Claude Code itself requires the human to approve

## Default choices Claude should make without asking

Unless the user explicitly says otherwise, Claude should assume:

- output directory: `dist/today`
- local timezone: the machine or Claude Code session default
- schedule: every weekday at 7:00 AM local time
- rendering approach: copy `shared/template-site/` and replace `data/briefing.json`
- fallback verification path: render from `examples/briefing.sample.json` if live connectors are not ready yet

## Preferred runtime path

Use the bundled `/daily-briefing` skill, which runs in a **forked subagent context** and uses the `daily-briefing` project subagent.

## Progress behavior

When Claude hits a manual auth step, it should:

1. explain exactly what the user needs to click or approve,
2. wait only for that manual step,
3. then continue automatically with the rest of the workflow.

## What Claude should avoid

- Do not redesign the report template unless explicitly asked.
- Do not ask the user to manually move files around when Claude can do it.
- Do not ask the user to manually create the schedule if Claude Code can create it.
- Do not fabricate meeting history or connector availability.
