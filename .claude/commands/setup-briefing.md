---
description: Perform one-time setup for the Granola daily briefing repo and keep going until only a true user-required step remains.
---

Read `docs/SETUP.md` and all linked setup files.

Then do this autonomously:

1. Build a checklist with four buckets: done, needs Claude action, needs user OAuth/action, blocked.
2. Execute every `needs Claude action` item immediately.
3. Only stop for these user-required steps:
   - browser OAuth,
   - connector approval,
   - restart of Claude Code,
   - missing secret or credential.
4. After the user completes a required step, continue automatically without asking for extra confirmation beyond what is strictly necessary.
5. Verify Google Calendar access.
6. Add and verify Granola MCP.
7. Run a local test briefing from `examples/briefing.sample.json` into `dist/today`.
8. Summarize what was completed, what was verified, and what remains, if anything.

Rules:

- Do not tell the user to perform terminal or repo actions that Claude can perform directly.
- Prefer concise check-ins over stopping the workflow.
- If a connector is already configured, verify it and move on.
