# Workflow overview

This project is built around a very simple pattern:

1. **Calendar gives the day ahead.**
2. **Granola gives the memory layer.**
3. **The template gives the report UI.**
4. **Claude Code orchestrates setup, testing, and scheduling.**

## Why the template is bundled in the repo

The agent should not recreate the full page from scratch every day.

Instead, it should:

1. copy `shared/template-site/` into a working output directory,
2. replace `data/briefing.json`, and
3. leave the HTML, CSS, and JS alone unless the user explicitly asks for design changes.

This is much more reliable than token-for-token regeneration.

## What is setup versus runtime

### Setup

Setup is the human-guided part:

- install Claude Code
- connect Google Calendar
- connect Granola MCP
- verify access
- test the workflow
- schedule the recurring task

Setup lives in `docs/`.

### Runtime

Runtime is the thing that repeats every morning:

- get today’s meetings
- gather useful context
- fill the editorial report payload
- render the page
- deliver or save the result

Runtime lives mostly in:

- `.claude/commands/daily-briefing.md`
- `.claude/agents/daily-briefing.md`
- `shared/template-site/`

The current template is intentionally static and local-first. It is styled to feel editorial, but it still renders from plain JSON plus bundled HTML/CSS/JS instead of a React runtime.

## Future expansion

The repo is split this way so that later you can add:

- Manus setup docs
- OpenClaw setup docs
- extra connectors
- a publish step

without needing to redesign the core content model.
