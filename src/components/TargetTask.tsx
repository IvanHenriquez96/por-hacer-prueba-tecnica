import { useEffect, useState } from "react";
import { updateTasks } from "@/redux/features/taskSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const TargetTask = ({ task }: any) => {
  const dispatch = useAppDispatch();

  const [tasksState, setTasksState] = useState(task);
  console.log({ tasksState });
  // const [isExpirado, setIsExpirado] = useState(false);

  useEffect(() => {
    //pregunta si la tarea está expirada
    console.log("entra a checkisexpired");

    checkIsExpired();
  }, []);

  const checkIsExpired = () => {
    let expires_on = new Date(tasksState.expires_on).getTime() / 1000;
    let today = new Date().getTime() / 1000;

    if (today > expires_on) {
      setTasksState({ ...tasksState, estado: "atrasada" });
      dispatch(updateTasks(tasksState));
    } else {
      setTasksState({ ...tasksState, estado: "pendiente" });
      dispatch(updateTasks(tasksState));
    }
    // console.log("cjeckexpired", expires_on, today);
    // if (today > expires_on) {
    //   setIsExpirado(true);
    //   setTasksState({ ...tasksState, estado: "atrasada" });
    // } else {
    //   setIsExpirado(false);
    //   // setTasksState({ ...tasksState, estado: "pendiente" });
    // }
  };

  // const checkIsExpired = () => {
  //   let expires_on = new Date(tasksState.expires_on);
  //   let today = new Date();
  //   // console.log("cjeckexpired", expires_on, today);
  //   if (today > expires_on) {
  //     setIsExpirado(true);
  //     setTasksState({ ...tasksState, estado: "atrasada" });
  //   } else {
  //     setIsExpirado(false);
  //     // setTasksState({ ...tasksState, estado: "pendiente" });
  //   }
  // };

  console.log(tasksState);

  const handleChange = (e: any) => {
    // console.log("cambia fecha");
    if (e.target.name == "checked") {
      console.log("modifica checked");
      setTasksState({ ...tasksState, [e.target.name]: e.target.checked });
      dispatch(updateTasks({ ...tasksState, [e.target.name]: e.target.checked }));
    } else {
      console.log("modifica fecha");
      setTasksState({ ...tasksState, [e.target.name]: e.target.value });
      dispatch(updateTasks({ ...tasksState, [e.target.name]: e.target.value }));
    }
  };

  console.log(tasksState);

  return (
    <>
      <div
        className={`animate-fade border rounded p-2 flex my-4 ${
          task.estado == "atrasada" && "bg-red-300 text-gray-50"
        }`}
      >
        <div className="w-10/12 flex justify-between items-center">
          <input
            // className="text-white accent-green-500"
            type="checkbox"
            name="checked"
            checked={task.checked}
            onChange={handleChange}
          />
          <p className="ml-4 text-sm md:text-base">{task.title}</p>
          <input
            className={`border w-4/12 md:w-1/12 ${
              task.estado == "atrasada" && "text-red-400"
            }`}
            type="date"
            name="expires_on"
            value={tasksState.expires_on}
            onChange={handleChange}
          />
        </div>

        <div className="w-2/12 flex justify-center items-center ">
          {task.estado == "atrasada" ? (
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
          ) : task.completed ? (
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
          ) : (
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
        </div>
      </div>
    </>
  );
};

export default TargetTask;
