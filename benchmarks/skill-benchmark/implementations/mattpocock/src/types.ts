export type Priority = "low" | "medium" | "high";

export type StatusFilter = "all" | "active" | "completed";

export type PriorityFilter = "all" | Priority;

export interface Todo {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string | null;
  completed: boolean;
  createdAt: string;
}

export interface TodoDraft {
  title: string;
  priority: Priority;
  dueDate: string;
}

export interface Summary {
  totalCount: number;
  activeCount: number;
  completedCount: number;
  highPriorityActiveCount: number;
}
