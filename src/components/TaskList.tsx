"use client";
import {
  setInitialState,
  addTask,
  // fetchTasks,
  liberarTasks,
} from "@/redux/features/taskSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import TargetTask from "./TargetTask";
import Link from "next/link";
import Filtro from "./Filtro";
import IconoFiltro from "./icons/IconoFiltro";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasksState = useAppSelector((state) => state.taskReducer.tasks);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const res = await fetch("https://json-server-prueba-tecnica.onrender.com/tasks", {
      cache: "no-cache",
    });
    const data = await res.json();
    console.log("datos recibidos", data);
    dispatch(setInitialState(data));
    setIsLoading(false);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const liberarSeleccionadas = async () => {
    await dispatch(liberarTasks(tasksState));
  };

  return (
    <div className="border rounded p-2">
      <div className="flex justify-between">
        <div className="flex border-green-700  bg-green-500 p-2 rounded text-white">
          <button className="" onClick={liberarSeleccionadas}>
            Liberar Seleccionadas
          </button>
        </div>

        {/* Seccion Filtro */}
        {showFilter ? (
          <Filtro
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            setShowFilter={setShowFilter}
          />
        ) : (
          <div className="cursor-pointer" onClick={toggleFilter}>
            <IconoFiltro />
          </div>
        )}
      </div>

      {/* Lista de Tareas */}

      {isLoading ? (
        <div className="my-5 text-center font-semibold animate-pulse">Cargando...</div>
      ) : (
        <div>
          {tasksState.map((task: any, index) => {
            return <TargetTask key={index} task={task} />;
          })}

          {/* Agregar Nueva Tarea */}
          <Link href={"/createTask"}>
            <div className="my-5 border rounded p-2 text-center text-3xl font-extrabold">
              +
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TaskList;
