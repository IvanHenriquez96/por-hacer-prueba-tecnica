"use client";
import { setInitialState, addTask, fetchTasks } from "@/redux/features/taskSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import TargetTask from "./TargetTask";
import Link from "next/link";
import Filtro from "./Filtro";
// import { TaskList } from "@/types/types";

// interface Props {
//   tasks: any;
// }

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasksState = useAppSelector((state) => state.taskReducer.tasks);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    console.log("se imprime la lista");
    //se setean como initialState todas las tareas
    dispatch(fetchTasks());
    // console.log(tasksState);
  }, []);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="border rounded p-2">
      <div className="flex justify-between">
        <div className="flex border-green-700  bg-green-500 p-2 rounded text-white">
          <button className="">Liberar Seleccionadas</button>
        </div>

        {showFilter ? (
          <Filtro
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            setShowFilter={setShowFilter}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={toggleFilter}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
        )}
      </div>

      {tasksState.map((task: any, index) => {
        return <TargetTask key={index} task={task} />;
      })}

      <Link href={"/createTask"}>
        <div className="my-5 border rounded p-2 text-center text-3xl font-extrabold">
          +
        </div>
      </Link>
    </div>
  );
};

export default TaskList;
