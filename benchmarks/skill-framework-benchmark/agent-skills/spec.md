# Agent-Skills-Style SPEC

## Architecture

Use a small static domain module plus a React component.

- Domain: task types, creation, filtering, toggling, summary.
- UI: form, filters, summary cards, task list.

## Functional Behavior

- Empty title blocks submission.
- Effort is clamped to at least `1`.
- `high` priority wins for the next task, then `medium`, then `low`.
- Older pending tasks win ties within the same priority.
- Completed tasks do not count toward remaining effort.

## Accessibility

- `section` has an accessible heading.
- Form controls use visible labels.
- Filter group has an accessible label.
- Task action button names include the resulting state.

## Validation Plan

- Unit test pure domain functions.
- Manual React check for keyboard flow and labels.
- Run lint after integration.

## Expected Agent Skills Behavior

Agent Skills should create the broadest delivery artifact: PRD, SPEC, implementation, accessibility notes, test plan, and final checklist. It should be fastest once the task is clear.
