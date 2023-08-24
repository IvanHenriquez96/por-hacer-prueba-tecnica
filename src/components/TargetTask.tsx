import { useEffect, useState } from "react";
import { updateTasks } from "@/redux/features/taskSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const TargetTask = ({ task }: any) => {
  const dispatch = useAppDispatch();

  const [tasksState, setTasksState] = useState(task);

  useEffect(() => {
    if (task.estado != "liberada") {
      let today = Math.round(new Date().getTime() / 1000) - 14400;
      let expira_el = Math.round(new Date(task.expires_on).getTime() / 1000);

      if (today > expira_el) {
        dispatch(
          updateTasks({ ...task, estado: "atrasada", expires_on: task.expires_on })
        );
        setTasksState({ ...tasksState, estado: "atrasada", expires_on: task.expires_on });
      } else {
        dispatch(
          updateTasks({ ...task, estado: "pendiente", expires_on: task.expires_on })
        );
        setTasksState({ ...tasksState, estado: "atrasada", expires_on: task.expires_on });
      }
    }
  }, []);

  const cambiaFechaYEstado = (fecha_expiracion: any) => {
    let today = Math.round(new Date().getTime() / 1000) - 14400;
    let expira_el = Math.round(new Date(fecha_expiracion).getTime() / 1000);

    if (today > expira_el) {
      dispatch(
        updateTasks({ ...task, estado: "atrasada", expires_on: fecha_expiracion })
      );
      setTasksState({ ...tasksState, estado: "atrasada", expires_on: fecha_expiracion });
    } else {
      dispatch(
        updateTasks({ ...task, estado: "pendiente", expires_on: fecha_expiracion })
      );
      setTasksState({ ...tasksState, estado: "atrasada", expires_on: fecha_expiracion });
    }
  };

  const handleChange = (e: any) => {
    if (e.target.name == "checked") {
      console.log("modifica checked");
      setTasksState({ ...tasksState, [e.target.name]: e.target.checked });
      dispatch(updateTasks({ ...tasksState, [e.target.name]: e.target.checked }));
    } else {
      console.log("modifica fecha");
      cambiaFechaYEstado(e.target.value);
    }
  };

  return (
    <>
      <div
        className={`animate-fade border rounded p-2 flex my-4 ${
          task.estado == "atrasada" && "bg-red-300 text-gray-50"
        } ${task.estado == "liberada" && "bg-green-400 text-gray-50"}`}
      >
        <div className="w-10/12 flex justify-between items-center">
          {task.estado != "liberada" ? (
            <input
              // className="text-white accent-green-500"
              type="checkbox"
              name="checked"
              checked={task.checked}
              onChange={handleChange}
            />
          ) : (
            <div></div>
          )}
          <p className="ml-4 text-sm md:text-base">{task.title}</p>
          <input
            className={`border w-4/12 md:w-1/12 ${
              task.estado == "atrasada" && "text-red-400"
            } ${task.estado == "liberada" && "text-green-400"} `}
            type="date"
            name="expires_on"
            value={tasksState.expires_on}
            onChange={handleChange}
          />
        </div>

        <div className="w-2/12 flex justify-center items-center ">
          {/* ICONOO ATRASADA */}
          {task.estado == "atrasada" && (
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
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {/* ICONOO PENDIENT */}
          {task.estado == "pendiente" && (
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
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {/* ICONOO LIBERADA */}
          {task.estado == "liberada" && (
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
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

export default TargetTask;
