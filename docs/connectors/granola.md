# Connect Granola MCP to Claude Code

Use Granola MCP so Claude Code can search past meeting notes, transcripts, action items, and open loops from Granola.

## Setup steps

### 1. Add the Granola MCP server

Run in your terminal:

```bash
claude mcp add granola --transport http https://mcp.granola.ai/mcp
```

### 2. Start a fresh Claude Code session

Open a new terminal tab or restart Claude Code, then run:

```bash
claude
```

### 3. Authenticate the MCP connection

Inside Claude Code:

- run `/mcp`
- select the `granola` MCP server
- choose **Authenticate**
- complete the browser OAuth flow

### 4. Verify it is available

In another terminal, run:

```bash
claude mcp list
```

You should see the `granola` MCP server listed.

Then inside Claude Code, use `/mcp` to confirm it is authenticated.

### 5. Test it

Ask Claude Code:

```text
Search my Granola notes for the last time I spoke with Alice and summarize any open loops or action items.
```

## What Granola is used for in this repo

Granola provides the meeting-memory layer:

- prior meeting context
- transcript-derived reminders
- action items and open loops
- context for suggested talking points

## Important notes

- Granola MCP uses browser-based OAuth.
- The public MCP server URL is `https://mcp.granola.ai/mcp`.
- If the server is listed but unavailable, re-open `/mcp` and re-authenticate.
- Granola’s docs note that on the free plan, MCP access is limited to notes from the last 30 days.
