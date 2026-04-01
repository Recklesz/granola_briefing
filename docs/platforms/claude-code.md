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

- `.claude/skills/daily-briefing/SKILL.md`
  - the main runtime entrypoint for `/daily-briefing`
- `.claude/agents/daily-briefing.md`
  - the specialized project subagent used by the skill
- `.claude/commands/daily-briefing.md`
  - a compatibility fallback for older command-style workflows

## Why this repo is structured this way

Claude Code supports:

- project subagents under `.claude/agents/`
- project skills under `.claude/skills/`
- skills that run in a forked subagent context using `context: fork`
- choosing a built-in or custom subagent through the `agent:` field

The `daily-briefing` runtime is therefore set up as a **manual skill** that runs in a **forked subagent context** using the `daily-briefing` project subagent.

## Delegation behavior we want

Claude Code should:

- use the `daily-briefing` subagent proactively for briefing work
- perform all repo inspection, file changes, rendering, and scheduling itself
- only stop for genuine human-required auth or approval steps

## How to bootstrap this repo with Claude Code

Inside Claude Code, say:

```text
Read START_HERE.md and docs/SETUP.md plus all linked setup files. Follow docs/common/automation-principles.md. Complete everything you can do yourself, only pause for real manual blockers, and then run a local test briefing.
```

## How to use the included runtime skill

Inside Claude Code, once you are in this repo, run:

```text
/daily-briefing
```

Or pass an output directory explicitly:

```text
/daily-briefing dist/today
```

Or ask explicitly:

```text
Use the daily-briefing subagent and the /daily-briefing skill to prepare today’s briefing, doing as much as possible without stopping.
```

## How to schedule the recurring run

After setup is complete, ask Claude Code to create a recurring scheduled task for every weekday at 7:00 AM local time, using the behavior in `docs/common/scheduling.md`.
