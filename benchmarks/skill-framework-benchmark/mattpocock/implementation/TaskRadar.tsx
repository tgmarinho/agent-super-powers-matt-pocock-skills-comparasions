import { FormEvent, useMemo, useState } from "react";

type Priority = "low" | "medium" | "high";
type Status = "pending" | "completed";

type Task = {
  id: string;
  title: string;
  project: string;
  priority: Priority;
  effort: number;
  status: Status;
  createdAt: number;
};

type TaskInput = {
  title: string;
  project: string;
  priority: Priority;
  effort: number;
};

type TaskFilter = {
  status: "all" | Status;
  priority: "all" | Priority;
};

const priorityScore: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function makeTask(input: TaskInput): Task {
  return {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    project: input.project.trim(),
    priority: input.priority,
    effort: Math.max(1, input.effort),
    status: "pending",
    createdAt: Date.now(),
  };
}

function completeTask(tasks: Task[], taskId: string): Task[] {
  return tasks.map((task) =>
    task.id === taskId
      ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
      : task,
  );
}

function readRadar(tasks: Task[]) {
  const pending = tasks.filter((task) => task.status === "pending");
  const nextTask = [...pending].sort(
    (a, b) => priorityScore[b.priority] - priorityScore[a.priority] || a.createdAt - b.createdAt,
  )[0];

  return {
    taskCount: tasks.length,
    completedCount: tasks.length - pending.length,
    remainingEffort: pending.reduce((total, task) => total + task.effort, 0),
    nextTask,
  };
}

function applyFilter(tasks: Task[], filter: TaskFilter) {
  return tasks.filter((task) => {
    const statusMatch = filter.status === "all" || task.status === filter.status;
    const priorityMatch = filter.priority === "all" || task.priority === filter.priority;

    return statusMatch && priorityMatch;
  });
}

export function TaskRadar() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({
    status: "all",
    priority: "all",
  });

  const radar = useMemo(() => readRadar(tasks), [tasks]);
  const filteredTasks = useMemo(() => applyFilter(tasks, filter), [tasks, filter]);

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();

    if (!title) {
      return;
    }

    setTasks((current) => [
      ...current,
      makeTask({
        title,
        project: String(form.get("project") ?? ""),
        priority: String(form.get("priority") ?? "medium") as Priority,
        effort: Number(form.get("effort") ?? 1),
      }),
    ]);
    event.currentTarget.reset();
  }

  return (
    <section aria-labelledby="task-radar">
      <h2 id="task-radar">Task Radar</h2>

      <dl>
        <div>
          <dt>Tasks</dt>
          <dd>{radar.taskCount}</dd>
        </div>
        <div>
          <dt>Completed</dt>
          <dd>{radar.completedCount}</dd>
        </div>
        <div>
          <dt>Remaining effort</dt>
          <dd>{radar.remainingEffort}</dd>
        </div>
        <div>
          <dt>Next task</dt>
          <dd>{radar.nextTask?.title ?? "Nothing pending"}</dd>
        </div>
      </dl>

      <form onSubmit={addTask}>
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

      <fieldset>
        <legend>Focus</legend>
        <label>
          Status
          <select
            value={filter.status}
            onChange={(event) =>
              setFilter((current) => ({
                ...current,
                status: event.target.value as TaskFilter["status"],
              }))
            }
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Priority
          <select
            value={filter.priority}
            onChange={(event) =>
              setFilter((current) => ({
                ...current,
                priority: event.target.value as TaskFilter["priority"],
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

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <span>{task.project || "No project"}</span>
            <span>{task.priority}</span>
            <button type="button" onClick={() => setTasks((current) => completeTask(current, task.id))}>
              Mark {task.status === "completed" ? "pending" : "completed"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
