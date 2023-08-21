"use client";
import { setInitialState, addTask } from "@/redux/features/taskSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import TargetTask from "./TargetTask";

interface Props {
  tasks: any;
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  const dispatch = useAppDispatch();
  const tasksState = useAppSelector((state) => state.taskReducer.value);
  console.log(tasks, tasksState);

  useEffect(() => {
    console.log("se imprime la lista");
    //se setean como initialState todas las tareas
    dispatch(setInitialState(tasks));
  }, []);

  // const tasks = useAppSelector((state) => state.taskReducer.value);
  // const dispatch = useAppDispatch();

  // console.log("clggg", tasks);

  return (
    <div className="border rounded p-2">
      {/* {tasks.length <= 0 && <p>No hay tareas por hacer!</p>} */}

      <p>LiSTA DE COSAS POR HACER</p>

      {tasksState.map((task: { id: number; title: string }) => {
        return <TargetTask key={task.id} title={task.title} />;
      })}

      <div className="my-5 border rounded p-2 text-center text-3xl font-extrabold">+</div>
    </div>
  );
};

export default TaskList;
