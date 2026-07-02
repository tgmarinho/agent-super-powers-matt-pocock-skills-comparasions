# Superpowers-Style PRD

## Problem

The user needs a small planning surface that keeps one day of coding-agent work visible and actionable. The tool should show what is pending, what is done, and what should happen next.

## Desired Outcome

Build `TaskRadar`, a React component with a small pure domain layer. The component should make daily tasks easy to add, filter, complete, and summarize without adding dependencies.

## Users

1. As a solo engineer, I want to capture tasks quickly, so that I do not lose focus during an agent session.
2. As a reviewer, I want to see remaining effort, so that I can judge whether the plan is still realistic.
3. As a coding agent operator, I want a next-task signal, so that I can delegate work in order.
4. As a developer, I want task logic outside React, so that behavior can be tested without rendering.

## Success Criteria

- The component can add tasks with title, priority, effort, and optional project.
- The component can toggle tasks between pending and done.
- The component can filter tasks by status and priority.
- The summary reports total tasks, done tasks, remaining effort, and next task.
- The domain functions are pure and small.

## Out of Scope

- Persistence.
- Drag and drop.
- User accounts.
- Server APIs.
- Styling beyond usable semantic markup.
