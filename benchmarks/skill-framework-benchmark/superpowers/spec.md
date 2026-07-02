# Superpowers-Style SPEC

## Design

Split the work into two seams:

- `taskRadarDomain`: pure functions for creating, updating, filtering, and summarizing tasks.
- `TaskRadar`: React state and accessible controls.

## Data Model

```ts
type TaskPriority = "low" | "medium" | "high";
type TaskStatus = "pending" | "done";

type Task = {
  id: string;
  title: string;
  priority: TaskPriority;
  effort: number;
  project?: string;
  status: TaskStatus;
  createdAt: number;
};
```

## Plan

1. Write failing tests for domain functions.
2. Implement task creation and validation.
3. Implement filtering.
4. Implement summary calculation.
5. Wire React component.
6. Review for accessibility and edge cases.

## Verification

- Domain tests cover empty lists, filtering, toggling, effort totals, and next-task selection.
- React review checks labels, button names, and keyboard-friendly controls.

## Expected Superpowers Behavior

Superpowers should over-index on plan discipline, Test-Driven Development, and review after each step. It should avoid jumping into React before the pure domain seam is tested.
