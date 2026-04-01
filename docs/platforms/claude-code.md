# Claude Code setup

This repo currently targets **Claude Code first**.

## Install Claude Code

Typical install:

```bash
npm install -g @anthropic-ai/claude-code
```

Start Claude Code from the repo root:

```bash
claude
```

## Claude-specific files in this repo

- `.claude/commands/daily-briefing.md`
  - a reusable **project slash command**
- `.claude/agents/daily-briefing.md`
  - a reusable **project subagent**

Claude Code supports project slash commands under `.claude/commands/` and project subagents under `.claude/agents/`, so the repo is already laid out in a way Claude Code can use directly.

## How to bootstrap this repo with Claude Code

Inside Claude Code, say:

```text
Read docs/SETUP.md and all linked setup files. Check what is already configured, help me complete any missing setup, then run a local test briefing.
```

## How to use the included command

Inside Claude Code, once you are in this repo, run:

```text
/daily-briefing
```

Or ask explicitly:

```text
Use the daily-briefing subagent to prepare today’s briefing.
```

## How to schedule the recurring run

After setup is complete, ask Claude Code to create a recurring scheduled task for every weekday at 7:00 AM local time, using the behavior in `docs/common/scheduling.md`.
