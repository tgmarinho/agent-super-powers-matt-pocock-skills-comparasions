import { FormEvent, useMemo, useReducer, useState } from "react";

type Priority = "low" | "medium" | "high";
type Status = "pending" | "done";

type Task = {
  id: string;
  title: string;
  project: string;
  priority: Priority;
  effort: number;
  status: Status;
  createdAt: number;
};

type Filters = {
  status: "all" | Status;
  priority: "all" | Priority;
};

type Action =
  | { type: "add"; task: Task }
  | { type: "toggle"; taskId: string };

const priorityWeight: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function reducer(tasks: Task[], action: Action): Task[] {
  if (action.type === "add") {
    return [...tasks, action.task];
  }

  return tasks.map((task) =>
    task.id === action.taskId
      ? { ...task, status: task.status === "done" ? "pending" : "done" }
      : task,
  );
}

function buildTask(form: FormData): Task {
  const title = String(form.get("title") ?? "").trim();

  if (!title) {
    throw new Error("Task title is required.");
  }

  return {
    id: crypto.randomUUID(),
    title,
    project: String(form.get("project") ?? "").trim(),
    priority: String(form.get("priority") ?? "medium") as Priority,
    effort: Math.max(1, Number(form.get("effort") ?? 1)),
    status: "pending",
    createdAt: Date.now(),
  };
}

function getVisibleTasks(tasks: Task[], filters: Filters) {
  return tasks.filter((task) => {
    return (
      (filters.status === "all" || task.status === filters.status) &&
      (filters.priority === "all" || task.priority === filters.priority)
    );
  });
}

function getSummary(tasks: Task[]) {
  const pending = tasks.filter((task) => task.status === "pending");
  const nextTask = [...pending].sort(
    (left, right) =>
      priorityWeight[right.priority] - priorityWeight[left.priority] ||
      left.createdAt - right.createdAt,
  )[0];

  return {
    total: tasks.length,
    done: tasks.length - pending.length,
    remainingEffort: pending.reduce((total, task) => total + task.effort, 0),
    nextTask,
  };
}

export function TaskRadar() {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [filters, setFilters] = useState<Filters>({
    status: "all",
    priority: "all",
  });
  const [error, setError] = useState("");

  const summary = useMemo(() => getSummary(tasks), [tasks]);
  const visibleTasks = useMemo(() => getVisibleTasks(tasks, filters), [tasks, filters]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      dispatch({ type: "add", task: buildTask(new FormData(event.currentTarget)) });
      event.currentTarget.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to add task.");
    }
  }

  return (
    <section aria-labelledby="task-radar-heading">
      <header>
        <p>Daily execution list</p>
        <h2 id="task-radar-heading">Task Radar</h2>
      </header>

      <dl aria-label="Task summary">
        <div>
          <dt>Total</dt>
          <dd>{summary.total}</dd>
        </div>
        <div>
          <dt>Done</dt>
          <dd>{summary.done}</dd>
        </div>
        <div>
          <dt>Remaining effort</dt>
          <dd>{summary.remainingEffort}</dd>
        </div>
        <div>
          <dt>Next task</dt>
          <dd>{summary.nextTask?.title ?? "None"}</dd>
        </div>
      </dl>

      <form onSubmit={onSubmit}>
        <label>
          Task title
          <input name="title" required />
        </label>
        <label>
          Project
          <input name="project" />
        </label>
        <label>
          Priority
          <select name="priority" defaultValue="medium">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label>
          Effort
          <input name="effort" type="number" min="1" defaultValue="1" />
        </label>
        <button type="submit">Add task</button>
      </form>

      {error ? <p role="alert">{error}</p> : null}

      <fieldset>
        <legend>Filters</legend>
        <label>
          Status
          <select
            value={filters.status}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                status: event.target.value as Filters["status"],
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
                priority: event.target.value as Filters["priority"],
              }))
            }
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
      </fieldset>

      <ul aria-label="Tasks">
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <span>{task.project || "Unassigned"}</span>
            <span>{task.priority}</span>
            <span>{task.effort} effort</span>
            <button type="button" onClick={() => dispatch({ type: "toggle", taskId: task.id })}>
              Mark as {task.status === "done" ? "pending" : "done"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
