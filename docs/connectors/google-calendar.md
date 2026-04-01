# Connect Google Calendar to Claude Code

Use this connector so Claude Code can see the meetings coming up and decide what should appear in the daily briefing.

## Setup steps

### 1. Add the connector on Claude.ai

Go to `claude.ai/settings/connectors`, click **Google Calendar**, and authorize your Google account through the OAuth flow.

### 2. Restart Claude Code

Exit your current session and reopen Claude Code. The connector will not appear until you start a fresh session.

### 3. Verify it is connected

Run in your terminal:

```bash
claude mcp list
```

You should see a line like:

```text
claude.ai Google Calendar: https://gcal.mcp.claude.com/mcp - ✓ Connected
```

### 4. Test it

Ask Claude Code to pull your upcoming events:

```text
List my Google Calendar events for tomorrow.
```

## What this connector is used for in this repo

Google Calendar is the source of truth for:

- today’s meetings
- attendee names
- meeting times
- the list of meetings that the morning briefing should consider

## Common failure modes

- The connector was added on Claude.ai but Claude Code was not restarted.
- The wrong Google account was authorized.
- Team or Enterprise policy blocks the connector.
- Claude Code is running in an older session that predates the connector.
