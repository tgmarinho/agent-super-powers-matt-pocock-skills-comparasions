# Agent-Skills-Style PRD

## Problem Statement

Coding-agent work often turns into scattered checklists. The user needs a compact daily task planner that makes priority, effort, progress, and next action visible in one place.

## Goals

- Provide a clear task entry flow.
- Provide fast filtering by status and priority.
- Provide a summary that supports daily planning.
- Keep logic typed, testable, and reusable.
- Keep UI accessible without extra dependencies.

## Non-Goals

- Account sync.
- Remote persistence.
- Notifications.
- Drag and drop.
- Analytics.

## User Stories

1. As an engineer, I want to add a task with priority and effort, so that I can plan a realistic day.
2. As an engineer, I want to mark tasks done, so that progress is visible.
3. As an engineer, I want to filter by status, so that I can focus on pending work.
4. As an engineer, I want to filter by priority, so that urgent work stays visible.
5. As a reviewer, I want the next task called out, so that execution order is clear.
6. As a developer, I want pure task logic, so that tests can cover behavior without React.

## Quality Bar

- TypeScript strict compatible.
- No dependency changes.
- Accessible form labels.
- Semantic summary structure.
- Domain logic isolated from component state.
- Easy to localize later because strings are concentrated in the component surface.
