# granola_briefing

A Claude Code starter repo for a **daily Granola-based meeting briefing** workflow.

This repo is designed so a user can:

1. connect **Google Calendar** in Claude Code,
2. connect **Granola MCP** in Claude Code,
3. let Claude Code inspect the setup docs,
4. let Claude Code complete all non-manual setup work itself,
5. run a **local test briefing**, and
6. create a recurring **weekday 7:00 AM** scheduled task.

## Core rule

Once Claude Code is inside this repo, it should do as much work as possible itself.

It should only stop for real human-required steps such as connector OAuth, account selection, or approval dialogs.

## Start here

Read these files in order:

1. [`START_HERE.md`](./START_HERE.md)
2. [`docs/SETUP.md`](./docs/SETUP.md)
3. [`docs/common/automation-principles.md`](./docs/common/automation-principles.md)
4. [`docs/platforms/claude-code.md`](./docs/platforms/claude-code.md)
5. [`docs/connectors/google-calendar.md`](./docs/connectors/google-calendar.md)
6. [`docs/connectors/granola.md`](./docs/connectors/granola.md)
7. [`docs/common/scheduling.md`](./docs/common/scheduling.md)

## What is in this repo

- `docs/` — one-time setup docs
- `.claude/skills/daily-briefing/SKILL.md` — main runtime skill
- `.claude/agents/daily-briefing.md` — project subagent
- `.claude/commands/daily-briefing.md` — compatibility fallback
- `shared/template-site/` — bundled editorial-style static report template
- `scripts/generate_report.py` — local deterministic renderer
- `examples/briefing.sample.json` — sample payload for testing

## Quick local test

```bash
python3 scripts/generate_report.py --input examples/briefing.sample.json --output dist/today
python3 -m http.server --directory dist/today 8000
```

Then open `http://localhost:8000`.

The generated output is a plain static site, so you can also open `dist/today/index.html` directly.

## Best first prompt for Claude Code

```text
Read START_HERE.md and docs/SETUP.md plus all linked setup files. Follow docs/common/automation-principles.md. Complete every setup step you can do yourself, only pause for real manual blockers, then run a local test briefing.
```

## Connector setup references

- Google Calendar for Claude Code: [`docs/connectors/google-calendar.md`](./docs/connectors/google-calendar.md)
- Granola MCP for Claude Code: [`docs/connectors/granola.md`](./docs/connectors/granola.md)

## Notes

This repo is currently **Claude Code first**. The structure is intentionally split so Manus or OpenClaw instructions can be added later without changing the core template-and-data workflow.
