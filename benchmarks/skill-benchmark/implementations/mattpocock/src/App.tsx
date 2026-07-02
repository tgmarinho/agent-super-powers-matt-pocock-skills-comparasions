import { FormEvent, useEffect, useMemo, useReducer } from "react";
import type {
  Priority,
  PriorityFilter,
  StatusFilter,
  Summary,
  Todo,
  TodoDraft,
} from "./types";

const STORAGE_KEY = "mattpocock.todo-decision-board.todos";
const WRITE_FAILED_MESSAGE =
  "Changes are visible here, but this browser blocked local saving.";

const priorities: Priority[] = ["low", "medium", "high"];
const statusFilters: StatusFilter[] = ["all", "active", "completed"];
const priorityFilters: PriorityFilter[] = ["all", "low", "medium", "high"];

interface BoardState {
  todos: Todo[];
  draft: TodoDraft;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  storageMessage: string | null;
}

type BoardAction =
  | { type: "draft/titleChanged"; title: string }
  | { type: "draft/priorityChanged"; priority: Priority }
  | { type: "draft/dueDateChanged"; dueDate: string }
  | { type: "todo/added" }
  | { type: "todo/toggled"; id: string }
  | { type: "todo/deleted"; id: string }
  | { type: "todo/completedCleared" }
  | { type: "filter/statusChanged"; statusFilter: StatusFilter }
  | { type: "filter/priorityChanged"; priorityFilter: PriorityFilter }
  | { type: "storage/writeFailed" }
  | { type: "storage/writeRecovered" };

interface StorageReadResult {
  todos: Todo[];
  warning: string | null;
}

const emptyDraft: TodoDraft = {
  title: "",
  priority: "medium",
  dueDate: "",
};

function createInitialState(): BoardState {
  const storageResult = readStoredTodos();

  return {
    todos: storageResult.todos,
    draft: emptyDraft,
    statusFilter: "all",
    priorityFilter: "all",
    storageMessage: storageResult.warning,
  };
}

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "draft/titleChanged":
      return {
        ...state,
        draft: {
          ...state.draft,
          title: action.title,
        },
      };

    case "draft/priorityChanged":
      return {
        ...state,
        draft: {
          ...state.draft,
          priority: action.priority,
        },
      };

    case "draft/dueDateChanged":
      return {
        ...state,
        draft: {
          ...state.draft,
          dueDate: action.dueDate,
        },
      };

    case "todo/added": {
      const title = state.draft.title.trim();

      if (!title) {
        return state;
      }

      const todo: Todo = {
        id: createTodoId(),
        title,
        priority: state.draft.priority,
        dueDate: state.draft.dueDate || null,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      return {
        ...state,
        todos: [todo, ...state.todos],
        draft: emptyDraft,
      };
    }

    case "todo/toggled":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
        ),
      };

    case "todo/deleted":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case "todo/completedCleared":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    case "filter/statusChanged":
      return {
        ...state,
        statusFilter: action.statusFilter,
      };

    case "filter/priorityChanged":
      return {
        ...state,
        priorityFilter: action.priorityFilter,
      };

    case "storage/writeFailed":
      return {
        ...state,
        storageMessage: WRITE_FAILED_MESSAGE,
      };

    case "storage/writeRecovered":
      return state.storageMessage === WRITE_FAILED_MESSAGE
        ? {
            ...state,
            storageMessage: null,
          }
        : state;
  }
}

function getVisibleTodos(
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

function getSummary(todos: Todo[]): Summary {
  return todos.reduce<Summary>(
    (summary, todo) => {
      summary.totalCount += 1;

      if (todo.completed) {
        summary.completedCount += 1;
      } else {
        summary.activeCount += 1;

        if (todo.priority === "high") {
          summary.highPriorityActiveCount += 1;
        }
      }

      return summary;
    },
    {
      totalCount: 0,
      activeCount: 0,
      completedCount: 0,
      highPriorityActiveCount: 0,
    },
  );
}

function readStoredTodos(): StorageReadResult {
  if (typeof window === "undefined") {
    return { todos: [], warning: null };
  }

  const rawTodos = window.localStorage.getItem(STORAGE_KEY);

  if (!rawTodos) {
    return { todos: [], warning: null };
  }

  try {
    const parsed: unknown = JSON.parse(rawTodos);

    if (!Array.isArray(parsed)) {
      return {
        todos: [],
        warning: "Saved todos were not in the expected shape and were reset.",
      };
    }

    const todos = parsed.filter(isTodo);

    if (todos.length !== parsed.length) {
      return {
        todos,
        warning:
          "Some saved todos were invalid and were left out of this session.",
      };
    }

    return { todos, warning: null };
  } catch {
    return {
      todos: [],
      warning: "Saved todos were malformed and were reset for this session.",
    };
  }
}

function writeStoredTodos(todos: Todo[]): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch {
    return false;
  }
}

function isTodo(value: unknown): value is Todo {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    isPriority(value.priority) &&
    (typeof value.dueDate === "string" || value.dueDate === null) &&
    typeof value.completed === "boolean" &&
    typeof value.createdAt === "string"
  );
}

function isPriority(value: unknown): value is Priority {
  return value === "low" || value === "medium" || value === "high";
}

function isStatusFilter(value: string): value is StatusFilter {
  return value === "all" || value === "active" || value === "completed";
}

function isPriorityFilter(value: string): value is PriorityFilter {
  return value === "all" || isPriority(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function createTodoId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatPriority(priority: Priority): string {
  return `${priority[0]?.toUpperCase() ?? ""}${priority.slice(1)} priority`;
}

function formatDueDate(dueDate: string | null): string {
  if (!dueDate) {
    return "No due date";
  }

  const [year, month, day] = dueDate.split("-");

  if (!year || !month || !day) {
    return dueDate;
  }

  return `${month}/${day}/${year}`;
}

export function App() {
  const [state, dispatch] = useReducer(boardReducer, undefined, createInitialState);

  const summary = useMemo(() => getSummary(state.todos), [state.todos]);
  const visibleTodos = useMemo(
    () =>
      getVisibleTodos(
        state.todos,
        state.statusFilter,
        state.priorityFilter,
      ),
    [state.priorityFilter, state.statusFilter, state.todos],
  );

  useEffect(() => {
    if (writeStoredTodos(state.todos)) {
      dispatch({ type: "storage/writeRecovered" });
    } else {
      dispatch({ type: "storage/writeFailed" });
    }
  }, [state.todos]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ type: "todo/added" });
  }

  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Matt Pocock Skills Benchmark</p>
          <h1 id="page-title">Todo Decision Board</h1>
          <p className="hero-copy">
            Capture the next thing, rank its priority, and keep the active load
            visible.
          </p>
        </div>
        <div className="hero-card" aria-label="Active high priority summary">
          <span className="hero-card-number">
            {summary.highPriorityActiveCount}
          </span>
          <span className="hero-card-label">high priority active</span>
        </div>
      </section>

      {state.storageMessage ? (
        <p className="storage-alert" role="status">
          {state.storageMessage}
        </p>
      ) : null}

      <section className="board-grid">
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <h2>Add todo</h2>
            <p>One clear next action is enough.</p>
          </div>

          <label className="field">
            <span>Title</span>
            <input
              required
              type="text"
              value={state.draft.title}
              placeholder="Review launch checklist"
              onChange={(event) =>
                dispatch({
                  type: "draft/titleChanged",
                  title: event.currentTarget.value,
                })
              }
            />
          </label>

          <label className="field">
            <span>Priority</span>
            <select
              value={state.draft.priority}
              onChange={(event) => {
                const value = event.currentTarget.value;

                if (isPriority(value)) {
                  dispatch({
                    type: "draft/priorityChanged",
                    priority: value,
                  });
                }
              }}
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {formatPriority(priority)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Due date (optional)</span>
            <input
              type="date"
              value={state.draft.dueDate}
              onChange={(event) =>
                dispatch({
                  type: "draft/dueDateChanged",
                  dueDate: event.currentTarget.value,
                })
              }
            />
          </label>

          <button className="primary-action" type="submit">
            Add todo
          </button>
        </form>

        <section className="panel" aria-labelledby="summary-title">
          <div className="panel-heading">
            <div>
              <h2 id="summary-title">Board summary</h2>
              <p>Counts update from the same todo list.</p>
            </div>
            <button
              className="secondary-action"
              type="button"
              disabled={summary.completedCount === 0}
              onClick={() => dispatch({ type: "todo/completedCleared" })}
            >
              Clear completed
            </button>
          </div>

          <dl className="summary-grid">
            <div>
              <dt>Total</dt>
              <dd>{summary.totalCount}</dd>
            </div>
            <div>
              <dt>Active</dt>
              <dd>{summary.activeCount}</dd>
            </div>
            <div>
              <dt>Completed</dt>
              <dd>{summary.completedCount}</dd>
            </div>
            <div>
              <dt>High active</dt>
              <dd>{summary.highPriorityActiveCount}</dd>
            </div>
          </dl>

          <div className="filters" aria-label="Todo filters">
            <fieldset>
              <legend>Status</legend>
              <div className="segmented-control">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={state.statusFilter === filter ? "is-active" : ""}
                    aria-pressed={state.statusFilter === filter}
                    onClick={() =>
                      dispatch({
                        type: "filter/statusChanged",
                        statusFilter: filter,
                      })
                    }
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="field compact-field">
              <span>Priority filter</span>
              <select
                value={state.priorityFilter}
                onChange={(event) => {
                  const value = event.currentTarget.value;

                  if (isPriorityFilter(value)) {
                    dispatch({
                      type: "filter/priorityChanged",
                      priorityFilter: value,
                    });
                  }
                }}
              >
                {priorityFilters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter === "all" ? "All priorities" : formatPriority(filter)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
      </section>

      <section className="todo-list-panel" aria-labelledby="todo-list-title">
        <div className="panel-heading">
          <div>
            <h2 id="todo-list-title">Todos</h2>
            <p>
              Showing {visibleTodos.length} of {state.todos.length} saved todos.
            </p>
          </div>
        </div>

        {visibleTodos.length === 0 ? (
          <div className="empty-state">
            <h3>No todos match these filters</h3>
            <p>Add a todo or change the filters to widen the board.</p>
          </div>
        ) : (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <label className="todo-toggle">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      dispatch({ type: "todo/toggled", id: todo.id })
                    }
                  />
                  <span>
                    Mark {todo.title} as{" "}
                    {todo.completed ? "active" : "completed"}
                  </span>
                </label>

                <div className="todo-content">
                  <div className="todo-title-row">
                    <h3 className={todo.completed ? "is-completed" : ""}>
                      {todo.title}
                    </h3>
                    <span className={`priority-badge ${todo.priority}`}>
                      {formatPriority(todo.priority)}
                    </span>
                  </div>
                  <div className="todo-meta">
                    <span>{todo.completed ? "Completed" : "Active"}</span>
                    <span>{formatDueDate(todo.dueDate)}</span>
                  </div>
                </div>

                <button
                  className="delete-action"
                  type="button"
                  aria-label={`Delete ${todo.title}`}
                  onClick={() => dispatch({ type: "todo/deleted", id: todo.id })}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
