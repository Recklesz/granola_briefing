---
name: daily-briefing
description: Build today's Granola-based meeting briefing. Use this for manual runs and scheduled morning briefings.
argument-hint: [output-directory]
disable-model-invocation: true
context: fork
agent: daily-briefing
---

Build or refresh the daily briefing.

Before you start:

1. Read `docs/common/template-contract.md`.
2. Read `docs/common/automation-principles.md`.
3. Default to `dist/today` if no output directory is provided.

## Required behavior

- Do as much work as possible yourself.
- Use connected Google Calendar and Granola MCP when available.
- Only pause for genuine manual blockers such as OAuth, connector approval, or account selection.
- Prefer changing `data/briefing.json` over redesigning the page.

## Workflow

1. Inspect today's meetings.
2. Gather relevant Granola context.
3. Build a structured JSON payload.
4. Copy `shared/template-site/` into the target output directory.
5. Replace `data/briefing.json` in the output directory.
6. Verify the page renders.
7. Return a concise summary and the output location.

## Fallback

If live connectors are not ready yet, validate the local rendering path by using `examples/briefing.sample.json`.
