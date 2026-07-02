# Spec: React Todo Decision Board

## Objective

Implement a self-contained React and TypeScript todo board in `.context/skill-benchmark/implementations/addyosmani/`. The app must satisfy the benchmark feature requirements and document an addyosmani Agent Skills workflow.

## Tech Stack

- React 19 style functional components.
- TypeScript with strict validation.
- Vite-compatible entry files for local development.
- Plain CSS, no external UI framework.
- Browser `localStorage` for persistence.

## Commands

```bash
bunx tsc --noEmit --jsx react-jsx --lib DOM,DOM.Iterable,ES2022 --module ESNext --moduleResolution Bundler --target ES2022 --strict .context/skill-benchmark/implementations/addyosmani/src/*.tsx .context/skill-benchmark/implementations/addyosmani/src/*.ts
```

Optional from this directory:

```bash
bun run dev
bun run validate
```

If the benchmark command is run from a parent directory with a discovered `tsconfig.json`, TypeScript may require the equivalent `--ignoreConfig` form:

```bash
bunx tsc --ignoreConfig --noEmit --jsx react-jsx --lib DOM,DOM.Iterable,ES2022 --module ESNext --moduleResolution Bundler --target ES2022 --strict .context/skill-benchmark/implementations/addyosmani/src/*.tsx .context/skill-benchmark/implementations/addyosmani/src/*.ts
```

## Project Structure

```text
.context/skill-benchmark/implementations/addyosmani/
  PRD.md                    Product requirements and success criteria
  SPEC.md                   Technical spec and task plan
  IMPLEMENTATION_NOTES.md   Workflow evidence and validation results
  index.html                Vite HTML entry
  package.json              Self-contained scripts and dependencies
  src/
    App.tsx                 Todo board UI and behavior
    main.tsx                React root bootstrap
    styles.css              Dark responsive UI
    types.ts                Shared domain types
```

## Code Style

Use small typed helpers at data boundaries and straightforward local component state. Avoid speculative abstraction.

```ts
export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}
```

Conventions:

- Use `unknown` plus type guards for untrusted persisted data.
- Keep UI state local because this app has one screen and no server state.
- Use semantic HTML controls and labels.
- Use CSS class names with domain intent.
- Comments only for non-obvious constraints.

## Testing Strategy

Minimum benchmark validation is strict TypeScript compilation. Manual smoke checks for runtime behavior:

- Add a todo with and without a due date.
- Toggle completion and verify summary counts update.
- Filter by status and priority.
- Delete a todo.
- Clear completed todos.
- Put malformed JSON under the storage key and verify the app loads with an empty list.

If this were expanded beyond the benchmark, pure parsing and filtering helpers would get unit tests first, then a small browser test for the critical add/filter/clear flow.

## Boundaries

- Always: stay inside the assigned directory, keep strict types, preserve accessibility basics, and validate before final response.
- Ask first: dependency changes beyond React, React DOM, TypeScript, Vite, and type packages.
- Never: modify website source files, modify another competitor directory, import website app code, use `any`, use `@ts-ignore`, or use external services.

## Implementation Plan

### Phase 1: Foundation

Task 1: Create docs, package metadata, and shared types.

- Acceptance: required files exist and define the domain model.
- Verification: file inspection.
- Dependencies: none.

Task 2: Implement localStorage parsing and persistence boundary.

- Acceptance: valid todo arrays load, malformed JSON and invalid shapes produce an empty array.
- Verification: TypeScript validation plus code review against parser paths.
- Dependencies: Task 1.

### Phase 2: Core Vertical Slice

Task 3: Implement add and render flow.

- Acceptance: user can submit a titled todo with priority and optional due date, then see it in the list.
- Verification: TypeScript validation and manual smoke path.
- Dependencies: Task 2.

Task 4: Implement state-changing controls.

- Acceptance: toggle complete, delete, and clear completed update the list and persisted state.
- Verification: TypeScript validation and manual smoke path.
- Dependencies: Task 3.

### Phase 3: Decision Board Polish

Task 5: Add filters and summaries.

- Acceptance: status and priority filters work together, and four required summary counts are shown.
- Verification: TypeScript validation and manual smoke path.
- Dependencies: Task 4.

Task 6: Apply accessible responsive dark UI.

- Acceptance: form labels exist, controls are keyboard reachable, status is not color-only, and layout adapts on narrow screens.
- Verification: code review and manual responsive inspection when running locally.
- Dependencies: Task 5.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---:|---|
| Malformed persisted data crashes render | High | Treat storage as `unknown`, catch JSON errors, validate every field |
| UI communicates priority only by color | Medium | Include visible priority text and completion text |
| Over-engineering for a benchmark | Medium | Keep a single screen and simple helpers |
| Root project mutation | High | Run commands against assigned paths only |

## Ship Checklist

- [x] Required files created in the assigned directory.
- [x] No website source files touched.
- [x] No external UI library.
- [x] No `any`, `@ts-ignore`, or `@ts-expect-error`.
- [x] Strict TypeScript validation recorded in `IMPLEMENTATION_NOTES.md`.
