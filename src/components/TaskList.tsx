"use client";

import { Task } from "@/types/types";
// import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const TaskList = () => {
  //   const [tasks, setTasks] = useState<Task[]>([]);
  const count = useAppSelector((state) => state.taskReducer.value);

  return (
    <div className="border rounded p-2">
      {tasks.length <= 0 && <p>No hay tareas por hacer!</p>}

      <p>LiSTA DE COSAS POR HACER</p>
    </div>
  );
};

export default TaskList;
