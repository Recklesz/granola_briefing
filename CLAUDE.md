# Project memory for Claude Code

See @README.md for the repo overview and @docs/SETUP.md for the setup flow.

## Core behavior

- Use the `daily-briefing` subagent **proactively** and treat it as the default worker for briefing-generation tasks.
- When the user asks for setup, verification, testing, or scheduling, do as much work as possible yourself before asking the user for anything.
- Do **not** ask the user to perform steps that Claude Code can do directly in the repo or terminal.
- Only interrupt the user when one of these is true:
  - a browser OAuth or connector approval step must be completed by the user,
  - a secret or credential is needed and is not already available,
  - an external service requires explicit human confirmation,
  - a requested action would be unsafe or ambiguous.
- After the user completes an OAuth or approval step, immediately continue with verification, testing, file updates, and the next setup step without waiting for extra prompting.

## Setup behavior

- During setup, first read `docs/SETUP.md` and all linked files.
- Build a checklist of prerequisites and mark each item as one of: done, needs Claude action, needs user OAuth/action, blocked.
- Execute all `needs Claude action` items immediately.
- For `needs user OAuth/action`, give the shortest possible instruction, then resume automatically once the user confirms it is done.
- After connectors are configured, verify them before moving on.
- Once setup is complete, run a local test briefing before proposing a recurring schedule.

## Runtime behavior

- Keep the UI template stable. Prefer replacing structured data files over rewriting layout files.
- Use `shared/template-site/` as the canonical template.
- Prefer writing `data/briefing.json` in the output copy of the template.
- Return a concise summary of what was generated, where it was written, and what remains blocked, if anything.

## Scheduling behavior

- If the user asks for recurring execution, create the recurring scheduled task in Claude Code rather than telling the user to do it manually.
- Use the schedule described in `docs/common/scheduling.md` unless the user requests a different one.
