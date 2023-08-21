export type Task = {
  id: number;
  title: string;
  limit_time: string;
  isComplete: boolean;
};

export type TaskListState = {
  tasks: Task[];
};
