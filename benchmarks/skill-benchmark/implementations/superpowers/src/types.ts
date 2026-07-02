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

export interface TodoDraft {
  title: string;
  priority: Priority;
  dueDate: string;
}

export interface Summary {
  total: number;
  active: number;
  completed: number;
  highPriorityActive: number;
}
