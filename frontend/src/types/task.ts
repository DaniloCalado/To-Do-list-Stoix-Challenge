export interface Task {
    id: number;
    title: string;
    description: string;
    completed: number;
    created_at: string;
    completed_at: string | null;
  }