# Start here

This repo contains a Claude Code starter kit for a daily Granola-based meeting briefing workflow.

## Read in this order

1. `README.md`
2. `docs/SETUP.md`
3. `docs/platforms/claude-code.md`
4. `docs/connectors/google-calendar.md`
5. `docs/connectors/granola.md`
6. `docs/common/scheduling.md`

## Fastest path inside Claude Code

Run one of these:

```text
/setup-briefing
```

or

```text
Read docs/SETUP.md and every file it links to. Complete every setup step you can do yourself. Only stop when I must complete OAuth, approve a connector, or provide a secret. After each such step, continue automatically, verify the setup, run a local test briefing from examples/briefing.sample.json, and then summarize what remains.
```

## What good behavior looks like

Claude Code should:

- do the repo inspection itself,
- add the Granola MCP server itself,
- verify connectors itself,
- run the local render test itself,
- create the recurring schedule itself when asked,
- only interrupt you for browser or account actions that require you.
