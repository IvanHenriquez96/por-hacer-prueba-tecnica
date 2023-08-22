"use client";
import { setInitialState, addTask } from "@/redux/features/taskSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import TargetTask from "./TargetTask";
import Link from "next/link";

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
    // dispatch(setInitialState(tasks));
  }, []);

  return (
    <div className="border rounded p-2">
      <div className="flex justify-between">
        <div className="flex border-red-700  bg-red-400 p-2 rounded text-white">
          <button className="">Liberar Seleccionadas</button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className=" ml-1 w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
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
