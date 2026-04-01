# Template contract

The bundled report should be treated as **stable UI** with **replaceable data**.

## Rules

- Copy the template directory to a working output folder.
- Replace `data/briefing.json` with the current day's structured data.
- Keep HTML, CSS, and JS stable unless the user explicitly asks for design changes.
- Prefer concise summaries and clear links over long narrative sections.

## Why this exists

This pattern is more reliable than asking the model to regenerate the entire page from scratch on every run.
