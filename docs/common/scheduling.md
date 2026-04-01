# Scheduling the daily briefing

The intended recurring behavior is:

- every weekday
- at 7:00 AM local time
- read today’s Google Calendar events
- use Granola MCP to gather relevant prior context
- fill the bundled template using structured data
- produce a local or published briefing page
- return a concise summary plus the output path or URL

## Suggested scheduling prompt for Claude Code

```text
Create a recurring scheduled task for every weekday at 7:00 AM local time. Each run should:
1. read today's Google Calendar events,
2. use Granola MCP to gather relevant prior meeting context,
3. fill the bundled briefing template using structured data,
4. produce a daily briefing page,
5. return a concise summary plus the output path or URL.
Do not redesign the template unless explicitly asked.
```

## Test before scheduling

Before enabling a recurring schedule, run a manual test first:

```text
Use the daily-briefing subagent to generate a local briefing from examples/briefing.sample.json. Use the template in shared/template-site and write the output to dist/today.
```
