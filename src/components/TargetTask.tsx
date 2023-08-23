import { useEffect, useState } from "react";
import { updateTasks } from "@/redux/features/taskSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const TargetTask = ({ task }: any) => {
  const dispatch = useAppDispatch();

  const [tasksState, setTasksState] = useState(task);
  const [isExpirado, setIsExpirado] = useState(false);

  useEffect(() => {
    const expires_on_aux = new Date(tasksState.expires_on);
    setTasksState({
      ...tasksState,
      expires_on: expires_on_aux.toISOString().split("T")[0],
    });
  }, []);

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
        className={`border rounded p-2 flex my-4 ${
          isExpirado && "bg-red-300 text-gray-50"
        }`}
      >
        <div className="w-10/12 flex justify-between items-center">
          <input
            type="checkbox"
            name="checked"
            checked={task.checked}
            onChange={handleChange}
          />
          <p className="ml-4 text-sm md:text-base">{task.title}</p>
          <input
            className={`border ${isExpirado && "text-red-400"}`}
            type="date"
            name="expires_on"
            value={tasksState.expires_on}
            onChange={handleChange}
          />
        </div>

        <div className="w-2/12 flex justify-center items-center ">
          {task.completed ? (
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
