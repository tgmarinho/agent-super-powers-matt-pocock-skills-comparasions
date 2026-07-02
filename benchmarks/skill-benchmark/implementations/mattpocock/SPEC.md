# React Todo Decision Board SPEC

## Product Contract

The app presents one usable screen with three regions:

1. A todo creation form.
2. Summary and filter controls.
3. A responsive todo list.

The screen must work without external services, without importing from the website, and without dependencies beyond a normal React and TypeScript app setup.

## Domain Model

### Todo

- `id`: unique string generated in the browser.
- `title`: non-empty text after trimming.
- `priority`: `low`, `medium`, or `high`.
- `dueDate`: browser date input value or `null`.
- `completed`: boolean.
- `createdAt`: ISO timestamp.

### Filters

- Status filter: `all`, `active`, `completed`.
- Priority filter: `all`, `low`, `medium`, `high`.

### Summary

- `totalCount`
- `activeCount`
- `completedCount`
- `highPriorityActiveCount`

## Tracer-Bullet Slices

1. Add and render one todo.
   - User submits title, priority, and optional due date.
   - Todo appears with visible title, priority badge, due date text when present, and active state.

2. Change board state.
   - User toggles completion.
   - User deletes a todo.
   - User clears all completed todos.

3. Filter and summarize.
   - User filters by status.
   - User filters by priority.
   - Summary counts update from the same todo list.

4. Persist and recover.
   - Todos are written to `localStorage`.
   - Valid stored todos load on refresh.
   - Malformed or shape-invalid stored data is ignored with a visible warning.

5. Accessibility and responsive polish.
   - Every field has a label.
   - Buttons and inputs are keyboard reachable.
   - Icon-free buttons use clear text or `aria-label`.
   - Completion and priority are communicated with text, not only color.
   - Layout remains readable on narrow and wide screens.

## Module Design

### Deep Module

The board state module lives inside `App.tsx` for this small benchmark. Its interface is the reducer action union, selectors, and storage helpers. The implementation hides validation, filtering, summary derivation, and localStorage recovery.

### Why This Seam

The highest useful seam is the board behavior itself. Splitting into many tiny files would make the benchmark app shallower: more interfaces for little behavior. Keeping the reducer and selectors together gives locality and a small surface for review.

## Acceptance Criteria

- A user can add a todo with title, priority, and optional due date.
- A user can see todos with title, priority, due date when present, and completion state.
- A user can toggle completion, delete todos, filter by status, filter by priority, and clear completed todos.
- Summary counts update correctly after every action.
- Todos persist in `localStorage`.
- Malformed stored JSON does not crash the app.
- The UI is polished, dark, responsive, and accessible.
- Strict TypeScript validation passes without `any`, `@ts-ignore`, or `@ts-expect-error`.

## Human-in-the-loop Checkpoints

- Confirm whether "Decision Board" means a single list or multiple priority lanes. Recommendation: a single filtered list because the requirements name a todo list.
- Confirm whether editing todos is in scope. Recommendation: out of scope for this benchmark.
- Confirm whether due dates should affect sorting. Recommendation: preserve creation order and display due dates only.
- Confirm whether storage recovery should silently reset or show a warning. Recommendation: show a short warning so behavior is explainable.

## Validation Command

```bash
bunx tsc --noEmit --jsx react-jsx --lib DOM,DOM.Iterable,ES2022 --module ESNext --moduleResolution Bundler --target ES2022 --strict .context/skill-benchmark/implementations/mattpocock/src/*.tsx .context/skill-benchmark/implementations/mattpocock/src/*.ts
```
