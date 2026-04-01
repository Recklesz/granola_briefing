# Setup Overview

This repo deliberately separates **one-time setup** from the **daily briefing runtime**.

## Read these files in order

1. `docs/common/overview.md`
2. `docs/common/automation-principles.md`
3. `docs/platforms/claude-code.md`
4. `docs/connectors/google-calendar.md`
5. `docs/connectors/granola.md`
6. `docs/common/scheduling.md`

## Operating rule for Claude Code

Once Claude Code is inside this repository, it should do **everything it can do itself**.

That means Claude should:

- read the docs itself
- verify the repo layout itself
- wire up the local test itself
- generate the briefing page itself
- create the recurring schedule itself

Claude should only stop when a step genuinely requires the user, such as OAuth, account selection, or an explicit approval dialog.

## What the user should do first

1. Install Claude Code.
2. Connect Google Calendar.
3. Connect Granola MCP.
4. Open this repo in Claude Code.
5. Ask Claude Code to inspect the setup docs, verify access, and complete every non-manual step itself.
6. Run a manual test briefing.
7. Once the test output looks good, ask Claude Code to schedule it for every weekday at 7:00 AM.

## Best bootstrap prompt for Claude Code

```text
Read START_HERE.md, docs/SETUP.md, and every linked setup file. Follow docs/common/automation-principles.md while you work. Complete every setup step you can do yourself, and only stop if you hit a real manual blocker like OAuth, connector approval, or account selection. Once setup is complete, run a local test briefing.
```

## Suggested verification prompt

```text
Verify that Google Calendar and Granola MCP are both available in Claude Code for this repo. If anything is missing, complete every local step yourself and only ask me to intervene for the exact browser or approval step you cannot perform.
```

## Suggested manual test prompt

```text
Run /daily-briefing dist/today. If setup is incomplete, finish everything you can finish yourself first. Only pause if a real manual auth or approval step is required.
```
