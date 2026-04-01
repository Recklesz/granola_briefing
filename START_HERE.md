# Start here

This repo contains a Claude Code starter kit for a daily Granola-based meeting briefing workflow.

## Read in this order

1. `docs/SETUP.md`
2. `docs/common/automation-principles.md`
3. `docs/platforms/claude-code.md`
4. `docs/connectors/google-calendar.md`
5. `docs/connectors/granola.md`
6. `docs/common/scheduling.md`

## Important operating rule

Once Claude Code is inside this repo, Claude should do all the local repo work it can do itself.

It should only pause when a step genuinely requires you, such as:

- Google Calendar OAuth
- Granola MCP OAuth
- workspace admin approval
- account selection
- a Claude permission prompt that only you can approve

## Then tell Claude Code

```text
Read START_HERE.md, docs/SETUP.md, and every linked setup file. Follow docs/common/automation-principles.md. Complete every setup step you can do yourself. Only pause if you hit a real manual blocker like OAuth, approval, or account selection. Then run a local test briefing from examples/briefing.sample.json.
```
