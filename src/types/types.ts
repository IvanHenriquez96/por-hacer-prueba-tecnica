export type Task = {
  id?: number;
  title: string;
  estado: string;
  create_at: string;
  expires_on: string;
  checked: boolean;
};

export type TaskList = {
  tasks: Task[];
};
