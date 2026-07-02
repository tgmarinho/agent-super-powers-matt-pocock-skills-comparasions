import { FormEvent, useMemo, useState } from "react";

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

type TaskFilters = {
  status: "all" | TaskStatus;
  priority: "all" | TaskPriority;
};

function createTask(input: {
  title: string;
  priority: TaskPriority;
  effort: number;
  project?: string;
}): Task {
  const title = input.title.trim();

  if (!title) {
    throw new Error("Task title is required.");
  }

  return {
    id: crypto.randomUUID(),
    title,
    priority: input.priority,
    effort: Math.max(1, input.effort),
    project: input.project?.trim() || undefined,
    status: "pending",
    createdAt: Date.now(),
  };
}

function toggleTask(tasks: Task[], taskId: string): Task[] {
  return tasks.map((task) =>
    task.id === taskId
      ? { ...task, status: task.status === "done" ? "pending" : "done" }
      : task,
  );
}

function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter((task) => {
    const statusMatches = filters.status === "all" || task.status === filters.status;
    const priorityMatches =
      filters.priority === "all" || task.priority === filters.priority;

    return statusMatches && priorityMatches;
  });
}

function summarizeTasks(tasks: Task[]) {
  const pending = tasks.filter((task) => task.status === "pending");
  const priorityRank: Record<TaskPriority, number> = { high: 3, medium: 2, low: 1 };
  const nextTask = [...pending].sort(
    (a, b) => priorityRank[b.priority] - priorityRank[a.priority] || a.createdAt - b.createdAt,
  )[0];

  return {
    total: tasks.length,
    completed: tasks.length - pending.length,
    remainingEffort: pending.reduce((sum, task) => sum + task.effort, 0),
    nextTask,
  };
}

export function TaskRadar() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
  });

  const visibleTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
  const summary = useMemo(() => summarizeTasks(tasks), [tasks]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const task = createTask({
      title: String(form.get("title") ?? ""),
      priority: String(form.get("priority") ?? "medium") as TaskPriority,
      effort: Number(form.get("effort") ?? 1),
      project: String(form.get("project") ?? ""),
    });

    setTasks((current) => [...current, task]);
    event.currentTarget.reset();
  }

  return (
    <section aria-labelledby="task-radar-title">
      <h2 id="task-radar-title">Task Radar</h2>

      <dl>
        <div>
          <dt>Total</dt>
          <dd>{summary.total}</dd>
        </div>
        <div>
          <dt>Done</dt>
          <dd>{summary.completed}</dd>
        </div>
        <div>
          <dt>Remaining effort</dt>
          <dd>{summary.remainingEffort}</dd>
        </div>
        <div>
          <dt>Next</dt>
          <dd>{summary.nextTask?.title ?? "No pending tasks"}</dd>
        </div>
      </dl>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" required />
        </label>
        <label>
          Project
          <input name="project" />
        </label>
        <label>
          Priority
          <select name="priority" defaultValue="medium">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Effort
          <input name="effort" type="number" min="1" defaultValue="1" />
        </label>
        <button type="submit">Add task</button>
      </form>

      <div aria-label="Task filters">
        <label>
          Status
          <select
            value={filters.status}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                status: event.target.value as TaskFilters["status"],
              }))
            }
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </label>
        <label>
          Priority
          <select
            value={filters.priority}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                priority: event.target.value as TaskFilters["priority"],
              }))
            }
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <ul>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <span>{task.project ?? "No project"}</span>
            <span>{task.priority}</span>
            <button type="button" onClick={() => setTasks((current) => toggleTask(current, task.id))}>
              Mark {task.status === "done" ? "pending" : "done"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
