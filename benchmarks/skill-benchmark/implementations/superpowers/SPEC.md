# React Todo Decision Board Spec

## Workflow Design

Applied Superpowers sequence:

1. `brainstorming`: interpret the benchmark brief as the approved design input.
2. `using-git-worktrees`: detect that the current Conductor workspace is already an isolated git worktree.
3. `writing-plans`: reduce implementation into small tasks: scaffold, typed model and persistence, board interactions, responsive styling, validation notes.
4. `test-driven-development`: define behavior checks before production code. Because the benchmark only requires the TypeScript validation command and forbids extra dependency installs, the executable verification is strict TypeScript. Behavior checks are captured below as acceptance tests.
5. `executing-plans` conceptually: execute tasks inline in this session because the benchmark has one assigned directory and no real subagent handoff.
6. `requesting-code-review` conceptually: self-review against the rubric before completion.
7. `verification-before-completion`: run the required TypeScript command and record the evidence.
8. `finishing-a-development-branch` conceptually: no commit, merge, PR, or cleanup because the benchmark asks only for files in the assigned directory.

## Product Behavior

### Todo Creation

- The add form has labeled controls for `title`, `priority`, and `due date`.
- `title` is required after trimming whitespace.
- `priority` accepts `low`, `medium`, and `high`, with `medium` as the default.
- `dueDate` is stored as an empty string when omitted.
- New todos start as active and appear at the top of the list.

### Todo Display

- Each todo shows the title, completion state text, priority badge text, and either a formatted due date or "No due date".
- Completed todos remain visible unless filtered out.
- Completed todos use text plus visual treatment, so state is not color-only.

### Interactions

- Users can toggle completion with a checkbox.
- Users can delete a todo with a button whose accessible name includes the todo title.
- Users can filter by status: all, active, completed.
- Users can filter by priority: all, low, medium, high.
- Users can clear all completed todos.

### Derived Summary

The app derives these values from the full todo list:

- Total count.
- Active count.
- Completed count.
- High priority active count.

### Persistence

- Todos are serialized to `localStorage` under one app-specific key.
- On load, missing storage returns an empty list.
- Malformed JSON, non-array JSON, and array entries that do not match the `Todo` shape are ignored without crashing the app.

## Type Model

- `Priority = "low" | "medium" | "high"`.
- `StatusFilter = "all" | "active" | "completed"`.
- `PriorityFilter = "all" | Priority`.
- `Todo` contains `id`, `title`, `priority`, `dueDate`, `completed`, and `createdAt`.
- Runtime storage parsing narrows from `unknown`; it does not use `any`.

## Acceptance Checks

- Given empty storage, the board renders with zero counts and an empty state.
- Given malformed storage, the board renders with zero counts and no exception.
- Given a valid todo is added, total and active increase by one.
- Given a high priority active todo exists, high priority active count increases by one.
- Given a todo is toggled complete, active decreases and completed increases.
- Given completed todos exist, clear completed removes only completed todos.
- Given filters are applied, the visible list reflects the selected status and priority.
- Given keyboard navigation, form fields and buttons are reachable and named.

## File Plan

- `package.json`: isolated app metadata and validation scripts.
- `index.html`: Vite entry document.
- `src/types.ts`: shared TypeScript model.
- `src/main.tsx`: React root bootstrap.
- `src/App.tsx`: state, persistence parsing, derived summaries, interactions, and markup.
- `src/styles.css`: self-contained responsive dark UI.
- `PRD.md`, `SPEC.md`, `IMPLEMENTATION_NOTES.md`: workflow evidence.
