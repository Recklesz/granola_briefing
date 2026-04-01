---
description: Build or refresh the daily meeting briefing using the bundled template and structured data.
argument-hint: [optional output directory]
---

Use the `daily-briefing` subagent for this task.

Follow these rules:

1. Read `docs/common/template-contract.md`.
2. Use the bundled template in `shared/template-site/`.
3. Prefer editing or replacing `data/briefing.json` over rewriting the whole page.
4. If a structured input payload is available, use it.
5. If no structured payload is provided, gather data from connected tools and then create a structured editorial payload before rendering.
6. Write the result to `${ARGUMENTS:-dist/today}`.
7. Summarize what was generated and where it was written.

If you need a local deterministic render step, you may use:

```bash
python3 scripts/generate_report.py --input examples/briefing.sample.json --output dist/today
```
