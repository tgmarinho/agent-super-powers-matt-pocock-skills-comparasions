# Matt-Pocock-Style SPEC

## Ubiquitous Language

- `Task radar`: the daily control surface.
- `Pending task`: a task that still requires action.
- `Completed task`: a task that no longer counts toward remaining effort.
- `Next task`: the highest-priority pending task, with oldest task used as a tie breaker.

## Deep Module

Expose a narrow task API:

```ts
type TaskRadarModel = {
  addTask(input: TaskInput): TaskRadarModel;
  completeTask(taskId: string): TaskRadarModel;
  filterTasks(filter: TaskFilter): Task[];
  summarize(): TaskRadarSummary;
};
```

The UI should not know how next-task ordering works. That behavior belongs to the domain model.

## Slice Plan

1. Build the domain model.
2. Add a thin React shell.
3. Add summary output.
4. Add filters.
5. Review names against the domain language.

## Expected Matt Pocock Skills Behavior

Matt's skills should ask better questions, sharpen names, produce a PRD from the conversation, and prefer small adaptable skills over a large autonomous process. This is the most human-in-the-loop path.
