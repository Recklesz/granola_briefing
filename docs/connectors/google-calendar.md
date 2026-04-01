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

## Tool names inside Claude Code

The Google Calendar MCP tools are registered under this prefix:

```
mcp__claude_ai_Google_Calendar__
```

Available tools:

- `mcp__claude_ai_Google_Calendar__gcal_list_events`
- `mcp__claude_ai_Google_Calendar__gcal_list_calendars`
- `mcp__claude_ai_Google_Calendar__gcal_get_event`
- `mcp__claude_ai_Google_Calendar__gcal_create_event`
- `mcp__claude_ai_Google_Calendar__gcal_update_event`
- `mcp__claude_ai_Google_Calendar__gcal_delete_event`
- `mcp__claude_ai_Google_Calendar__gcal_find_meeting_times`
- `mcp__claude_ai_Google_Calendar__gcal_find_my_free_time`
- `mcp__claude_ai_Google_Calendar__gcal_respond_to_event`

## Workaround: tools not available in current session

The connector may show as connected in `claude mcp list` but the tools may not be loaded in the current session. If `ToolSearch` cannot find the Google Calendar tools, use a subprocess:

```bash
claude -p "List my Google Calendar events for today as JSON" \
  --allowedTools "mcp__claude_ai_Google_Calendar__gcal_list_events" \
  --allowedTools "mcp__claude_ai_Google_Calendar__gcal_list_calendars"
```

This spawns a fresh Claude Code process that loads the connector tools properly.

## Common failure modes

- The connector was added on Claude.ai but Claude Code was not restarted.
- The wrong Google account was authorized.
- Team or Enterprise policy blocks the connector.
- Claude Code is running in an older session that predates the connector.
- The tools are connected but not loaded in the current session — use the `claude -p` workaround above.
