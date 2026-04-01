# Setup Overview

This repo deliberately separates **one-time setup** from the **daily briefing runtime**.

## Read these files in order

1. `docs/common/overview.md`
2. `docs/platforms/claude-code.md`
3. `docs/connectors/google-calendar.md`
4. `docs/connectors/granola.md`
5. `docs/common/scheduling.md`

## What the user should do first

1. Install Claude Code.
2. Connect Google Calendar.
3. Connect Granola MCP.
4. Open this repo in Claude Code.
5. Ask Claude Code to inspect the setup docs and verify access.
6. Run a manual test briefing.
7. Once the test output looks good, ask Claude Code to schedule it for every weekday at 7:00 AM.

## Suggested first prompt to Claude Code

```text
Read docs/SETUP.md and all linked setup files. Build a concrete checklist of what is already configured and what still needs setup for this daily briefing workflow. Then help me finish the missing setup steps one by one.
```

## Suggested verification prompt

```text
Verify that Google Calendar and Granola MCP are both available in Claude Code for this repo. If either is missing, guide me through the exact missing step and wait for me to complete any OAuth flow.
```

## Suggested manual test prompt

```text
Use the daily-briefing subagent and the /daily-briefing project command to generate a local test briefing page from examples/briefing.sample.json. Do not redesign the template; only fill the data and render the page.
```
