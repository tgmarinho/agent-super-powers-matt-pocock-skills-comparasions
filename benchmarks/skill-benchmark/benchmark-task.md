# Skill Framework Benchmark Task

Date: 2026-07-01

Competitors:

- `addyosmani/agent-skills`
- `obra/superpowers`
- `mattpocock/skills`

## Objective

Implement the same small React application three times, once per competitor workflow, and compare process quality, human-in-the-loop posture, delegation, automation, and implementation quality.

## Task

Build a self-contained **React Todo Decision Board**.

This is not a full product. It is a focused benchmark feature that should reveal how each framework handles requirements, planning, implementation, validation, and review.

## Required Output Per Competitor

Each competitor must write only inside its assigned directory:

- `.context/skill-benchmark/implementations/addyosmani/`
- `.context/skill-benchmark/implementations/superpowers/`
- `.context/skill-benchmark/implementations/mattpocock/`

Each directory must contain:

- `PRD.md`
- `SPEC.md`
- `IMPLEMENTATION_NOTES.md`
- `src/App.tsx`
- `src/styles.css`
- `src/main.tsx`
- `src/types.ts`
- `index.html`
- `package.json`
- Optional helper files if useful.

## App Requirements

The app must provide:

1. Add a todo with:
   - title
   - priority: low, medium, high
   - optional due date

2. Show todo list with:
   - title
   - priority badge
   - due date if present
   - completed state

3. Interactions:
   - add todo
   - toggle complete
   - delete todo
   - filter by all, active, completed
   - filter by priority
   - clear completed

4. Derived summaries:
   - total count
   - active count
   - completed count
   - high priority active count

5. Persistence:
   - use `localStorage`
   - handle malformed stored JSON gracefully

6. Accessibility:
   - form labels
   - keyboard reachable controls
   - clear button text or `aria-label`
   - no color-only status communication

7. Visual design:
   - polished dark UI
   - responsive layout
   - no external UI library
   - no dependency installs beyond React and TypeScript style app dependencies already declared in each competitor's own `package.json`

## Constraints

- Keep implementation self-contained.
- Do not import files from the website app.
- Do not modify website source files.
- Do not modify another competitor's directory.
- Do not use external services.
- Do not use `any`.
- Do not use `@ts-ignore` or `@ts-expect-error`.
- Code comments only when they explain non-obvious intent.

## Expected Workflow Evidence

Each `IMPLEMENTATION_NOTES.md` must include:

- Which skills from that framework were applied.
- Which steps were human-in-the-loop in principle.
- Which steps were automated or delegated in principle.
- What validation was run.
- Known limitations.
- Time markers if available:
  - first code-writing moment
  - completion moment

## Validation

At minimum, each implementation should pass:

```bash
bunx tsc --noEmit --jsx react-jsx --lib DOM,DOM.Iterable,ES2022 --module ESNext --moduleResolution Bundler --target ES2022 --strict .context/skill-benchmark/implementations/<competitor>/src/*.tsx .context/skill-benchmark/implementations/<competitor>/src/*.ts
```

Optional:

```bash
bun install
bun run build
```

Only run install/build inside a competitor directory if needed and only if it does not mutate the root project.

## Scoring Rubric

Score each implementation from 1 to 5:

| Criterion | What to evaluate |
|---|---|
| Requirement coverage | Required app behavior works in code |
| Type safety | Strict TypeScript, no `any`, safe localStorage parsing |
| UI quality | Responsive, polished, readable, accessible |
| Simplicity | Clear state model, minimal unnecessary abstraction |
| Workflow evidence | PRD, SPEC, notes match the framework's philosophy |
| Human-in-loop clarity | Clear checkpoints where a human would approve or steer |
| Automation/delegation | Clear places where the framework delegates or automates |
| Validation | Concrete commands and evidence |

## Final Analysis Questions

After all three are done, answer:

1. Which framework is most human-in-the-loop?
2. Which framework is most automated?
3. Which delegates most naturally to agents?
4. Which is best for ambiguous product work?
5. Which is best for straightforward feature delivery?
6. Which is best for daily senior-engineer workflow?
7. Which produced the best implementation for this benchmark?
8. What would be a fairer second benchmark?

