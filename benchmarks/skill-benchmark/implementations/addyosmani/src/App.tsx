import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type {
  Priority,
  PriorityFilter,
  StatusFilter,
  Todo,
  TodoSummary,
} from "./types";

const STORAGE_KEY = "addyosmani.todo-decision-board.todos";
const priorities: Priority[] = ["low", "medium", "high"];
const statusFilters: StatusFilter[] = ["all", "active", "completed"];
const priorityFilters: PriorityFilter[] = ["all", "low", "medium", "high"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPriority(value: unknown): value is Priority {
  return value === "low" || value === "medium" || value === "high";
}

function isTodo(value: unknown): value is Todo {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    isPriority(value.priority) &&
    typeof value.dueDate === "string" &&
    typeof value.completed === "boolean" &&
    typeof value.createdAt === "string"
  );
}

function loadTodos(): Todo[] {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isTodo);
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createTodo(title: string, priority: Priority, dueDate: string): Todo {
  const id =
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    id,
    title,
    priority,
    dueDate,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

function formatPriority(priority: Priority): string {
  return `${priority.charAt(0).toUpperCase()}${priority.slice(1)} priority`;
}

function formatStatusFilter(filter: StatusFilter): string {
  if (filter === "all") {
    return "All";
  }

  return filter === "active" ? "Active" : "Completed";
}

function formatPriorityFilter(filter: PriorityFilter): string {
  return filter === "all" ? "All priorities" : formatPriority(filter);
}

function getSummary(todos: Todo[]): TodoSummary {
  return todos.reduce<TodoSummary>(
    (summary, todo) => {
      summary.total += 1;

      if (todo.completed) {
        summary.completed += 1;
      } else {
        summary.active += 1;
        if (todo.priority === "high") {
          summary.activeHighPriority += 1;
        }
      }

      return summary;
    },
    { total: 0, active: 0, completed: 0, activeHighPriority: 0 },
  );
}

function getFilteredTodos(
  todos: Todo[],
  statusFilter: StatusFilter,
  priorityFilter: PriorityFilter,
): Todo[] {
  return todos.filter((todo) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && !todo.completed) ||
      (statusFilter === "completed" && todo.completed);

    const matchesPriority =
      priorityFilter === "all" || todo.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });
}

export function App() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>("all");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const summary = useMemo(() => getSummary(todos), [todos]);
  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, statusFilter, priorityFilter),
    [todos, statusFilter, priorityFilter],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setFormError("Enter a todo title before adding it.");
      return;
    }

    setTodos((currentTodos) => [
      createTodo(trimmedTitle, priority, dueDate),
      ...currentTodos,
    ]);
    setTitle("");
    setPriority("medium");
    setDueDate("");
    setFormError("");
  }

  function toggleTodo(todoId: string): void {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(todoId: string): void {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId),
    );
  }

  function clearCompleted(): void {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed));
  }

  return (
    <main className="app-shell">
      <section className="board" aria-labelledby="board-title">
        <header className="board-header">
          <div>
            <p className="eyebrow">Decision board</p>
            <h1 id="board-title">Todo priorities</h1>
            <p className="lede">
              Capture tasks, separate active work from completed items, and keep
              high-priority decisions visible.
            </p>
          </div>
          <div className="storage-note" aria-label="Persistence status">
            Saved in this browser
          </div>
        </header>

        <section className="summary-grid" aria-label="Todo summary">
          <SummaryCard label="Total" value={summary.total} />
          <SummaryCard label="Active" value={summary.active} />
          <SummaryCard label="Completed" value={summary.completed} />
          <SummaryCard
            label="High priority active"
            value={summary.activeHighPriority}
          />
        </section>

        <form className="todo-form" onSubmit={handleSubmit} noValidate>
          <div className="field field-title">
            <label htmlFor="todo-title">Title</label>
            <input
              id="todo-title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (formError) {
                  setFormError("");
                }
              }}
              placeholder="Review the launch checklist"
              aria-describedby={formError ? "form-error" : undefined}
            />
          </div>

          <div className="field">
            <label htmlFor="todo-priority">Priority</label>
            <select
              id="todo-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value as Priority)}
            >
              {priorities.map((priorityOption) => (
                <option key={priorityOption} value={priorityOption}>
                  {formatPriority(priorityOption)}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="todo-due-date">Due date optional</label>
            <input
              id="todo-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>

          <button className="primary-action" type="submit">
            Add todo
          </button>

          {formError ? (
            <p className="form-error" id="form-error" role="alert">
              {formError}
            </p>
          ) : null}
        </form>

        <section className="toolbar" aria-label="Todo filters">
          <fieldset>
            <legend>Status</legend>
            <div className="segmented-control">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={statusFilter === filter ? "is-selected" : ""}
                  onClick={() => setStatusFilter(filter)}
                  aria-pressed={statusFilter === filter}
                >
                  {formatStatusFilter(filter)}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="field compact-field">
            <label htmlFor="priority-filter">Priority filter</label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value as PriorityFilter)
              }
            >
              {priorityFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {formatPriorityFilter(filter)}
                </option>
              ))}
            </select>
          </div>

          <button
            className="secondary-action"
            type="button"
            onClick={clearCompleted}
            disabled={summary.completed === 0}
          >
            Clear completed
          </button>
        </section>

        <section className="list-panel" aria-labelledby="list-heading">
          <div className="list-heading-row">
            <h2 id="list-heading">Todos</h2>
            <p aria-live="polite">
              Showing {filteredTodos.length} of {summary.total}
            </p>
          </div>

          {filteredTodos.length > 0 ? (
            <ul className="todo-list" aria-label="Filtered todo list">
              {filteredTodos.map((todo) => (
                <li
                  className={todo.completed ? "todo-item is-complete" : "todo-item"}
                  key={todo.id}
                >
                  <div className="todo-main">
                    <label className="completion-control">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                      />
                      <span>
                        {todo.completed ? "Completed" : "Active"}
                      </span>
                    </label>
                    <div className="todo-copy">
                      <h3>{todo.title}</h3>
                      <div className="todo-meta">
                        <span className={`priority-badge priority-${todo.priority}`}>
                          {formatPriority(todo.priority)}
                        </span>
                        {todo.dueDate ? (
                          <span className="due-date">Due {todo.dueDate}</span>
                        ) : (
                          <span className="due-date muted">No due date</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="delete-action"
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label={`Delete ${todo.title}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state" role="status">
              <h3>No todos match these filters</h3>
              <p>Add a todo or adjust the filters to see work on the board.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

interface SummaryCardProps {
  label: string;
  value: number;
}

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <article className="summary-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
