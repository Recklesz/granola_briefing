# Setup Overview

This repo deliberately separates **one-time setup** from the **daily briefing runtime**.

## Read these files in order

1. `docs/common/overview.md`
2. `docs/platforms/claude-code.md`
3. `docs/connectors/google-calendar.md`
4. `docs/connectors/granola.md`
5. `docs/common/scheduling.md`

## What Claude Code should do during setup

Claude should handle setup as autonomously as possible.

That means Claude should:

- inspect the repo and linked setup docs itself,
- build a setup checklist itself,
- run command-line verification steps itself,
- add the Granola MCP server itself,
- verify both Google Calendar and Granola access itself,
- run a local test briefing itself,
- only stop when the user must do browser OAuth, approve a connector, restart Claude Code, or provide a secret.

## What the user should do first

1. Install Claude Code if it is not already installed.
2. Open this repo in Claude Code.
3. Ask Claude Code to run the setup flow.

## Best setup command

```text
/setup-briefing
```

## Best direct prompt

```text
Read docs/SETUP.md and all linked setup files. Complete every setup step you can do yourself. Only stop when I must complete OAuth, approve a connector, restart Claude Code, or provide a secret. After each user-required step, continue automatically, verify the setup, run a local test briefing from examples/briefing.sample.json, and then summarize what remains.
```

## Verification prompt

```text
Verify that Google Calendar and Granola MCP are both available in Claude Code for this repo. If either is missing, complete every step you can yourself and ask me only for the exact browser or account action I need to take.
```

## Manual test prompt

```text
Use the daily-briefing subagent to generate a local test briefing page from examples/briefing.sample.json. Do not redesign the template; only fill the data and render the page to dist/today.
```
