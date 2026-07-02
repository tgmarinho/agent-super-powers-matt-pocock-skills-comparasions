# React Todo Decision Board PRD

## Problem Statement

The benchmark needs a small React application that reveals how a workflow handles alignment, vertical delivery, type safety, validation, and review. The user needs a Todo Decision Board that is complete enough to exercise real product decisions without becoming a full product.

## Solution

Build a self-contained dark UI where a user can add todos, assign priority, optionally add a due date, track completion, filter the board, clear completed work, and see useful summaries. The app persists to `localStorage` and recovers gracefully if stored data is malformed.

## User Stories

1. As a benchmark reviewer, I want the app to run independently, so that I can compare it with other implementations fairly.
2. As a todo board user, I want to add a todo with a title, so that I can capture work.
3. As a todo board user, I want to choose low, medium, or high priority, so that I can decide what matters most.
4. As a todo board user, I want to add an optional due date, so that time-sensitive work is visible.
5. As a todo board user, I want to see all todos in a list, so that I can scan the board.
6. As a todo board user, I want each todo to show title, priority, due date when present, and completion state, so that status is not hidden.
7. As a todo board user, I want to toggle completion, so that the board reflects current progress.
8. As a todo board user, I want to delete a todo, so that irrelevant work leaves the board.
9. As a todo board user, I want to filter by all, active, or completed, so that I can focus the list.
10. As a todo board user, I want to filter by priority, so that I can focus on a decision tier.
11. As a todo board user, I want to clear completed todos, so that the board stays tidy.
12. As a todo board user, I want total, active, completed, and high-priority active counts, so that I can understand load at a glance.
13. As a returning user, I want todos to persist in `localStorage`, so that work survives refreshes.
14. As a returning user with malformed stored data, I want the app to recover safely, so that one bad storage value does not break the board.
15. As a keyboard user, I want all controls to be reachable and clearly labeled, so that I can operate the app without a mouse.
16. As an accessibility reviewer, I want status text beyond color, so that meaning remains available to assistive tech and color-blind users.
17. As a benchmark reviewer, I want strict TypeScript without `any`, `ts-ignore`, or `ts-expect-error`, so that type safety is visible in the code.

## Implementation Decisions

- The Todo Board is delivered as a self-contained React and TypeScript Vite-style app inside the competitor directory.
- The state model uses one deep module: a reducer plus small helpers that hide add, toggle, delete, clear, filter, summary, and storage-validation behavior behind simple action and selector interfaces.
- `localStorage` is treated as an adapter behind parsing and serialization helpers. Malformed JSON or invalid todo shapes reset the board to an empty list and surface a short warning.
- The public test seam for this benchmark is the app behavior plus strict TypeScript validation. No website source files are imported.
- Priority is a closed union: `low`, `medium`, and `high`.
- Due date is stored as an ISO date input string or `null`, keeping the interface simple and browser-native.

## Testing Decisions

- The primary validation is the benchmark TypeScript command, run against this directory only.
- A good test for this app would exercise user-visible behavior through the rendered interface, not reducer internals.
- If a test harness were allowed, the first tracer-bullet tests would cover add, persist/reload, malformed storage recovery, and filtering.
- For this benchmark, the implementation keeps logic readable enough for review and validates strict types without adding extra dependencies.

## Out of Scope

- Drag-and-drop ordering.
- Recurring tasks.
- Collaboration.
- Server persistence.
- Notifications.
- Categories or tags beyond priority.
- Editing existing todos after creation.

## Further Notes

This PRD is synthesized from the benchmark brief as if `/grill-with-docs` had already resolved the open branches. In a normal Matt Pocock Skills run, the form fields, storage adapter, validation seam, and issue breakdown would be confirmed with the human before implementation.
