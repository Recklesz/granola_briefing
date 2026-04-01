# Editorial Template Migration Implementation Plan

## Overview

Adopt the visual language of the imported `daily-brief-import` design while preserving this repo's local-first rendering model: generate structured meeting JSON, copy a bundled template into an output folder, inline the JSON, and open the result locally. The plan explicitly avoids React migration, Vite runtime dependencies, and any setup complexity that would make the daily workflow harder to run.

## Current State Analysis

The current repo is intentionally built around a stable static template plus replaceable JSON. The setup/runtime docs repeat that the bundled UI should remain stable and the payload should be swapped in per run rather than regenerating the full page from scratch (`docs/common/template-contract.md:3`, `docs/common/overview.md:16`, `docs/common/automation-principles.md:35`).

The current runtime path is:
- `/daily-briefing` skill delegates to the `daily-briefing` agent (`.claude/skills/daily-briefing/SKILL.md:1`, `.claude/agents/daily-briefing.md:1`)
- the agent creates a structured JSON payload and calls `python3 scripts/generate_report.py --input <payload> --output <dir> --open` (`.claude/skills/daily-briefing/SKILL.md:27`, `.claude/agents/daily-briefing.md:20`)
- `scripts/generate_report.py` copies `shared/template-site/`, writes `data/briefing.json`, and injects `window.__BRIEFING_DATA__` into `index.html` (`scripts/generate_report.py:24`)
- the front-end is a plain HTML/CSS/JS site that renders from the payload (`shared/template-site/index.html:1`, `shared/template-site/assets/app.js:1`, `shared/template-site/assets/styles.css:1`)

The imported app is not a drop-in replacement. It is a Vite + React + TypeScript + Tailwind v4 demo with hardcoded meeting content in `src/App.tsx` and local dev assumptions in `package.json`/`README.md` (`daily-brief-import/package.json:1`, `daily-brief-import/README.md:11`, `daily-brief-import/src/App.tsx:54`). It also references custom fonts that are not bundled and uses remote imagery (`daily-brief-import/src/index.css:3`, `daily-brief-import/src/App.tsx:210`). Since the software has not been used in production yet, we do not need to preserve the current template or payload shape for compatibility.

### Key Discoveries
- The current renderer is deterministic and static-first: `scripts/generate_report.py:22`.
- The current payload schema is much thinner than the imported UI expects: `examples/briefing.sample.json:1`.
- The imported UI assumes richer editorial fields like `headline`, `topic`, `duration`, `person.role`, `person.company`, `person.bio`, `context`, and `prepNotes`: `daily-brief-import/src/App.tsx:54`.
- The imported Vite app is not configured for file-relative static exports out of the box because `index.html` references `/src/main.tsx` and `vite.config.ts` does not set a relative `base`: `daily-brief-import/index.html:10`, `daily-brief-import/vite.config.ts:6`.

## Desired End State

The repo should render a locally viewable briefing that feels like the imported editorial design while still being generated from structured meeting JSON and opened from `dist/today`. The default daily flow should stay simple:
- generate or gather briefing data
- write it to a known JSON structure
- copy a bundled template into `dist/today`
- inline the JSON for file/local viewing
- optionally serve or open the generated output locally

The UI should match the imported editorial presentation as closely as practical using simple static HTML/CSS/JS. The payload contract can be updated to fit that design directly because there is no production compatibility burden yet.

### Key Discoveries
- The existing HTML/JS/CSS template can already render from `window.__BRIEFING_DATA__`, which is the key mechanism to preserve: `shared/template-site/assets/app.js:1`.
- The docs currently teach a static-template workflow and should be updated to keep the documentation aligned with the chosen implementation: `README.md:38`, `docs/common/template-contract.md:7`.

## What We're NOT Doing

- Not making the daily runtime require Vite dev server or `npm run dev`.
- Not moving the repo to React.
- Not depending on Gemini, Express, or any backend service from the imported archive.
- Not requiring proprietary/local-only fonts as a hard dependency for correct rendering.
- Not redesigning the data gathering workflow from Google Calendar and Granola in the same change.

## Implementation Approach

Use the imported archive as a design reference, not as production runtime code. Port the editorial layout into `shared/template-site/` in plain HTML/CSS/JS, and simplify the payload contract so it directly matches the new UI rather than forcing the old structure to survive. This approach preserves the repo's current strengths, reduces build complexity, and keeps local generation reliable.

## Phase 1: Validate the Design Port Strategy

### Overview

Confirm the exact imported sections worth keeping and define the simpler target payload shape the new static template should render directly.

### Changes Required:

#### 1. Document the imported design mapping
**Files**:
- `daily-brief-import/src/App.tsx`
- `examples/briefing.sample.json`
- `shared/template-site/assets/app.js`

**Changes**:
- Extract the imported design sections we actually want to reproduce locally:
  - masthead / issue header
  - meeting table of contents
  - long-form per-meeting editorial cards
  - optional about section/modal
- Define the target payload shape for the new editorial template.
- Decide which imported demo details become optional or are removed entirely.

### Open Implementation Tasks
- [x] Define the target meeting shape for the new editorial template.
- [x] Decide which current fields should be renamed or replaced.
- [x] Decide whether the about modal and cover art are part of V1.
- [x] Decide whether remote images are allowed or must be replaced with local assets/placeholders.

### Success Criteria:

#### Automated Verification:
- [ ] No code changes required in this phase.

#### Manual Verification:
- [ ] We have an agreed list of imported UI sections to keep.
- [ ] We have an agreed target data contract for the new template.

**Implementation Note**: Pause after this phase if product/design choices are still unresolved.

---

## Phase 2: Port the Editorial Layout Into the Static Template

### Overview

Rebuild the imported visual style in the existing static template system so `scripts/generate_report.py` can continue generating a local report without a Node build step.

### Changes Required:

#### 1. Replace the current static template structure
**File**: `shared/template-site/index.html`
**Changes**:
- Replace the current hero/summary/list layout with an editorial page shell inspired by the imported design.
- Add semantic containers for:
  - issue/date header
  - optional summary or intro block
  - meeting TOC
  - article-style meeting sections
  - optional informational/footer block

#### 2. Rebuild styling in plain CSS
**File**: `shared/template-site/assets/styles.css`
**Changes**:
- Port the theme, spacing, typography rhythm, and card/article treatment from the imported design into plain CSS.
- Avoid requiring Tailwind at runtime.
- Replace missing custom fonts with robust fallback stacks first; optionally bundle fonts later if licensing/availability allows.
- Ensure the output still works cleanly on mobile and desktop.

#### 3. Add a simple rendering layer for the new contract
**File**: `shared/template-site/assets/app.js`
**Changes**:
- Read the new payload shape directly.
- Render the editorial sections with straightforward fallbacks for optional fields.
- Keep the existing `window.__BRIEFING_DATA__` / `fetch('./data/briefing.json')` logic.

#### 4. Update the sample payload
**File**: `examples/briefing.sample.json`
**Changes**:
- Reshape the sample data to match the new editorial contract.
- Ensure the sample fully exercises the layout we want to ship.

### Open Implementation Tasks
- [x] Build the new static HTML skeleton.
- [x] Port the editorial styling to plain CSS.
- [x] Implement direct rendering from the new payload shape in `app.js`.
- [x] Confirm rendering still works when opened directly from generated output.
- [ ] Confirm rendering still works when served over HTTP.

### Success Criteria:

#### Automated Verification:
- [x] Static render succeeds: `python3 scripts/generate_report.py --input examples/briefing.sample.json --output dist/today`
- [ ] Optional local serve succeeds: `python3 -m http.server --directory dist/today 8000`

#### Manual Verification:
- [ ] The generated page visually reflects the imported editorial direction.
- [ ] The page works on desktop and mobile widths.
- [ ] Missing fields degrade gracefully without broken layout.
- [ ] The generated output opens locally from `dist/today/index.html`.

**Implementation Note**: After this phase and verification, pause for human review of the look and feel before evolving the upstream contract.

---

## Phase 3: Enrich the Briefing Data Contract

### Overview

Upgrade the payload contract so the design is filled with higher-quality editorial data directly, without carrying forward an older shape we no longer need.

### Changes Required:

#### 1. Define the richer contract
**Files**:
- `docs/common/template-contract.md`
- `examples/briefing.sample.json`

**Changes**:
- Document optional richer fields for each meeting, such as:
  - `topic`
  - `duration`
  - `person` object with `name`, `role`, `company`, `bio`, `avatarUrl?`
  - `context`
  - `prepNotes`
- Replace the old sample/data contract with the new one since there is no production compatibility burden.

#### 2. Align runtime instructions
**Files**:
- `.claude/skills/daily-briefing/SKILL.md`
- `.claude/agents/daily-briefing.md`
- `.claude/commands/daily-briefing.md`

**Changes**:
- Update the skill/agent guidance so generated payloads prefer the richer schema.
- Explicitly instruct the agent to provide concise narrative context and editorial prep notes when the source data supports it.

#### 3. Update docs for local-first usage
**Files**:
- `README.md`
- `docs/common/overview.md`
- `docs/common/template-contract.md`

**Changes**:
- Update the docs to describe the new editorial template while preserving the same local generation workflow.
- Clarify that the imported Vite app is reference material only if it remains in the repo.

### Open Implementation Tasks
- [x] Document the richer optional payload shape.
- [x] Update the skill and subagent prompts.
- [x] Refresh sample data and screenshots/examples if needed.
- [x] Verify the new payload contract is documented clearly enough for future generation runs.

### Success Criteria:

#### Automated Verification:
- [x] Static render still succeeds with the existing sample command.
- [x] Any lint/type/test command introduced by the implementation passes.

#### Manual Verification:
- [ ] The new payload fills the design cleanly without heavy client-side derivation logic.
- [ ] The runtime instructions are clear enough for future local runs.
- [ ] The README and setup docs no longer conflict with the implementation.

**Implementation Note**: Pause after this phase for approval; React/Vite migration is explicitly out of scope.

## Testing Strategy

### Static Renderer Tests
- Render from the sample payload and confirm the output directory is regenerated cleanly.
- Open the resulting `index.html` directly and through a lightweight local server.
- Test with a sparse payload to ensure graceful degradation.

### Data Contract Tests
- Verify the new sample payload renders correctly.
- Verify sparse optional fields still degrade gracefully.
- Verify links, headings, and generated summary/date values render safely.

### Manual Testing Steps
1. Run `python3 scripts/generate_report.py --input examples/briefing.sample.json --output dist/today`.
2. Open `dist/today/index.html` directly.
3. Serve `dist/today` locally and compare behavior.
4. Check mobile and desktop layouts.
5. Review a sparse payload and a rich payload.

## Performance Considerations

- Keep the final page static and lightweight.
- Avoid introducing a mandatory frontend build into the daily render path.
- Prefer local assets over remote ones to make the output more robust and repeatable.

## Migration Notes

- Keep `shared/template-site/` as the canonical runtime template.
- If `daily-brief-import/` remains in the repo, label it clearly as a design reference to prevent confusion.
- No backward-compatibility layer is required unless we later discover an external dependency on the old shape.

## References

- `scripts/generate_report.py`
- `shared/template-site/index.html`
- `shared/template-site/assets/app.js`
- `shared/template-site/assets/styles.css`
- `examples/briefing.sample.json`
- `docs/common/template-contract.md`
- `docs/common/overview.md`
- `.claude/skills/daily-briefing/SKILL.md`
- `.claude/agents/daily-briefing.md`
- `daily-brief-import/src/App.tsx`
- `daily-brief-import/src/index.css`
