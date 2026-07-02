import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Priority, PriorityFilter, StatusFilter, Summary, Todo, TodoDraft } from "./types";

const STORAGE_KEY = "superpowers.todoDecisionBoard.todos";
const priorityOptions: Priority[] = ["low", "medium", "high"];
const statusFilters: StatusFilter[] = ["all", "active", "completed"];
const priorityFilters: PriorityFilter[] = ["all", "low", "medium", "high"];

const initialDraft: TodoDraft = {
  title: "",
  priority: "medium",
  dueDate: "",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPriority(value: unknown): value is Priority {
  return typeof value === "string" && priorityOptions.includes(value as Priority);
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
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (storedValue === null) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isTodo);
  } catch {
    return [];
  }
}

function createId(): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDate(value: string): string {
  if (value.length === 0) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getSummary(todos: Todo[]): Summary {
  return todos.reduce<Summary>(
    (summary, todo) => {
      summary.total += 1;

      if (todo.completed) {
        summary.completed += 1;
      } else {
        summary.active += 1;

        if (todo.priority === "high") {
          summary.highPriorityActive += 1;
        }
      }

      return summary;
    },
    {
      total: 0,
      active: 0,
      completed: 0,
      highPriorityActive: 0,
    },
  );
}

export function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [draft, setDraft] = useState<TodoDraft>(initialDraft);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const summary = useMemo(() => getSummary(todos), [todos]);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !todo.completed) ||
        (statusFilter === "completed" && todo.completed);

      const matchesPriority = priorityFilter === "all" || todo.priority === priorityFilter;

      return matchesStatus && matchesPriority;
    });
  }, [priorityFilter, statusFilter, todos]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = draft.title.trim();

    if (title.length === 0) {
      return;
    }

    const todo: Todo = {
      id: createId(),
      title,
      priority: draft.priority,
      dueDate: draft.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((currentTodos) => [todo, ...currentTodos]);
    setDraft(initialDraft);
  }

  function toggleTodo(todoId: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  }

  function deleteTodo(todoId: string) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
  }

  function clearCompleted() {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed));
  }

  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Superpowers benchmark</p>
          <h1 id="page-title">Todo Decision Board</h1>
          <p className="lede">
            Capture work, surface priorities, and keep completion status visible without
            leaving the board.
          </p>
        </div>
        <div className="hero-panel" aria-label="Board summary">
          <span>{summary.active}</span>
          <p>active decisions</p>
        </div>
      </section>

      <section className="dashboard" aria-label="Todo summaries">
        <SummaryCard label="Total" value={summary.total} />
        <SummaryCard label="Active" value={summary.active} />
        <SummaryCard label="Completed" value={summary.completed} />
        <SummaryCard label="High priority active" value={summary.highPriorityActive} />
      </section>

      <section className="workspace">
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Add todo</h2>
            <p>Title is required. Due date is optional.</p>
          </div>

          <label className="field">
            <span>Title</span>
            <input
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              placeholder="Write release notes"
              type="text"
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span>Priority</span>
              <select
                value={draft.priority}
                onChange={(event) =>
                  setDraft({ ...draft, priority: event.target.value as Priority })
                }
              >
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Due date</span>
              <input
                value={draft.dueDate}
                onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })}
                type="date"
              />
            </label>
          </div>

          <button className="primary-button" type="submit">
            Add todo
          </button>
        </form>

        <section className="board" aria-labelledby="board-title">
          <div className="board-header">
            <div>
              <h2 id="board-title">Decision queue</h2>
              <p>
                Showing {visibleTodos.length} of {todos.length} todos.
              </p>
            </div>
            <button
              className="ghost-button"
              type="button"
              onClick={clearCompleted}
              disabled={summary.completed === 0}
            >
              Clear completed
            </button>
          </div>

          <div className="filters" aria-label="Todo filters">
            <fieldset>
              <legend>Status</legend>
              <div className="segmented-control">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={filter === statusFilter ? "selected" : ""}
                    aria-pressed={filter === statusFilter}
                    onClick={() => setStatusFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Priority</legend>
              <div className="segmented-control">
                {priorityFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={filter === priorityFilter ? "selected" : ""}
                    aria-pressed={filter === priorityFilter}
                    onClick={() => setPriorityFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {visibleTodos.length > 0 ? (
            <ul className="todo-list">
              {visibleTodos.map((todo) => (
                <li key={todo.id} className={todo.completed ? "todo-item completed" : "todo-item"}>
                  <label className="todo-check">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span>{todo.completed ? "Completed" : "Active"}</span>
                  </label>

                  <div className="todo-content">
                    <h3>{todo.title}</h3>
                    <div className="todo-meta">
                      <span className={`priority-badge ${todo.priority}`}>
                        {todo.priority} priority
                      </span>
                      {todo.dueDate.length > 0 ? (
                        <span className="due-date">Due {formatDate(todo.dueDate)}</span>
                      ) : (
                        <span className="due-date muted">No due date</span>
                      )}
                    </div>
                  </div>

                  <button
                    className="delete-button"
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
              <p>Add a todo or adjust the filters to rebuild the board.</p>
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
      <span>{value}</span>
      <p>{label}</p>
    </article>
  );
}
