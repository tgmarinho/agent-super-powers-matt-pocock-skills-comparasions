# Matt-Pocock-Style PRD

## Problem Statement

The user has one day of work and needs a small tool that turns loose tasks into a clear execution queue.

## Solution

Create `TaskRadar`: a compact React component backed by a small task domain model. The domain language is:

- `Task`: one item of work.
- `Effort`: rough cost for the day.
- `Next task`: the pending task with the highest priority, then oldest creation time.
- `Task radar`: the visible summary of the day.

## User Stories

1. As an engineer, I want to add a task, so that I can capture work without leaving the planning surface.
2. As an engineer, I want to set priority, so that important work rises to the top.
3. As an engineer, I want to set effort, so that I can avoid overloading the day.
4. As an engineer, I want to mark a task done, so that progress is explicit.
5. As an engineer, I want filters, so that I can focus the list.
6. As an engineer, I want a next-task recommendation, so that I can keep moving.

## Implementation Decisions

- Use one deep module for task behavior.
- Keep the React component as a thin adapter.
- Prefer domain words in names: `effort`, `nextTask`, `pending`, `completeTask`.
- No persistence until the core flow proves useful.

## Testing Decisions

Test the task radar domain at the highest seam: summary and filtering behavior. Avoid tests that know about React state shape.

## Out of Scope

- Project management features.
- Backend storage.
- Collaboration.
- Calendar scheduling.
