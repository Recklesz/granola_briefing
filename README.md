# granola_briefing

A Claude Code starter repo for a **daily Granola-based meeting briefing** workflow.

This repo is designed so a user can:

1. connect **Google Calendar** in Claude Code,
2. connect **Granola MCP** in Claude Code,
3. let Claude Code inspect the setup docs and complete setup autonomously where possible,
4. run a **local test briefing**, and
5. create a recurring **weekday 7:00 AM** scheduled task.

## Start here

Read these files in order:

1. [`START_HERE.md`](./START_HERE.md)
2. [`docs/SETUP.md`](./docs/SETUP.md)
3. [`docs/platforms/claude-code.md`](./docs/platforms/claude-code.md)
4. [`docs/connectors/google-calendar.md`](./docs/connectors/google-calendar.md)
5. [`docs/connectors/granola.md`](./docs/connectors/granola.md)
6. [`docs/common/scheduling.md`](./docs/common/scheduling.md)

## What is in this repo

- `CLAUDE.md` — project memory that tells Claude Code to keep going and only stop for true user-required steps
- `docs/` — one-time setup docs
- `.claude/commands/setup-briefing.md` — project slash command for autonomous setup
- `.claude/commands/daily-briefing.md` — project slash command for runtime generation
- `.claude/agents/daily-briefing.md` — project subagent
- `shared/template-site/` — bundled static report template
- `scripts/generate_report.py` — local deterministic renderer
- `examples/briefing.sample.json` — sample payload for testing

## Best first command in Claude Code

```text
/setup-briefing
```

## Quick local test

```bash
python3 scripts/generate_report.py --input examples/briefing.sample.json --output dist/today
python3 -m http.server --directory dist/today 8000
```

Then open `http://localhost:8000`.

## If you want to prompt Claude directly instead

```text
Read START_HERE.md and docs/SETUP.md plus all linked setup files. Complete every setup step you can do yourself. Only stop when I must complete OAuth, approve a connector, restart Claude Code, or provide a secret. After each user-required step, continue automatically, verify everything, run a local test briefing from examples/briefing.sample.json, and summarize what remains.
```

## Connector setup references

- Google Calendar for Claude Code: [`docs/connectors/google-calendar.md`](./docs/connectors/google-calendar.md)
- Granola MCP for Claude Code: [`docs/connectors/granola.md`](./docs/connectors/granola.md)

## Notes

This repo is currently **Claude Code first**. The structure is intentionally split so Manus or OpenClaw instructions can be added later without changing the core template-and-data workflow.
