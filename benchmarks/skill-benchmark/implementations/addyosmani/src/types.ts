export type Priority = "low" | "medium" | "high";

export type StatusFilter = "all" | "active" | "completed";

export type PriorityFilter = "all" | Priority;

export interface Todo {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoSummary {
  total: number;
  active: number;
  completed: number;
  activeHighPriority: number;
}
