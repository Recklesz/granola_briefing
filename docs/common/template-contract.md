# Template contract

The bundled report should be treated as **stable UI** with **replaceable data**.

## Rules

- Copy the template directory to a working output folder.
- Replace `data/briefing.json` with the current day's structured data.
- Keep HTML, CSS, and JS stable unless the user explicitly asks for design changes.
- Keep the local rendering path simple: static template plus JSON, no required frontend framework runtime.

## Data shape

The editorial template expects a direct JSON payload shaped like this:

```json
{
  "title": "daily brief",
  "issue": "Issue 91",
  "date": "APRIL 1, 2026",
  "generatedAt": "2026-04-01 07:00",
  "intro": "Short intro paragraph",
  "about": {
    "title": "Optional modal title",
    "body": "Optional modal body",
    "credit": {
      "label": "Optional label",
      "url": "https://example.com"
    }
  },
  "meetings": [
    {
      "id": "stable-anchor-id",
      "headline": "Section headline",
      "topic": "Meeting topic",
      "time": "09:00 AM",
      "duration": "45 min",
      "person": {
        "name": "Alice Chen",
        "role": "VP of Operations",
        "company": "Acme",
        "bio": "One short paragraph"
      },
      "context": "Editorial context paragraph",
      "prepNotes": ["Note 1", "Note 2"],
      "links": [{"label": "Last note", "url": "https://example.com"}]
    }
  ]
}
```

## Guidance

- Prefer concise, well-written narrative context over many fragmented bullets.
- Use `prepNotes` for the highest-value things to remember or ask.
- Keep links short and relevant.
- Optional fields may be omitted, but `meetings` should always be present.

## Why this exists

This pattern is more reliable than asking the model to regenerate the entire page from scratch on every run.
