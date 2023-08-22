export type Task = {
  id: number;
  title: string;
  completed: boolean;
  create_at: string;
  expires_on: string;
};

export type TaskList = {
  tasks: Task[];
};
