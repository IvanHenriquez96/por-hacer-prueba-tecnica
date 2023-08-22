import { useEffect, useState } from "react";

const TargetTask = ({ task }: any) => {
  const [tasksState, setTasksState] = useState(task);
  // const [create_at, setCreate_at] = useState("");
  const [expires_on, setExpires_on] = useState("");

  useEffect(() => {
    const expires_on_aux = new Date(tasksState.expires_on);
    setTasksState({
      ...tasksState,
      expires_on: expires_on_aux.toISOString().split("T")[0],
    });
  }, []);

  const handleChange = (e: any) => {
    console.log("cambia fecha");
    setTasksState({ ...tasksState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="border rounded p-2 flex my-4">
        <div className="w-10/12 flex justify-between items-center">
          <input type="checkbox" name="estado" onChange={handleChange} />
          <p className="ml-4 text-sm md:text-base">{task.title}</p>
          <input
            className="border"
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

      {/* <div className="border p-2 flex justify-between">
        <div className="grid md:flex md:justify-around ">
          <p>{task.title}</p>
          <p>tiempo</p>
        </div>

        <div className="my-auto">
          <p>logo</p>
        </div>
      </div> */}
    </>
    // <div className={`my-5 border rounded p-2 ${task.completed && "bg-green-300"}`}>
    //   <div className="flex justify-between">
    //     <div className="flex">
    //       <input type="checkbox" name="" />
    //       <p className={`ml-2 my-auto ${task.completed && "text-white"}`}>{task.title}</p>
    //     </div>

    //     <div className="flex">
    //       <input
    //         type="date"
    //         className="mx-5 border p-2  w-4/12 md:w-7/12"
    //         value={create_at}
    //         onChange={(e) => {
    //           setCreate_at(e.target.value);
    //         }}
    //       />
    //       <div className="my-auto mx-auto">
    //         {task.completed ? (
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={1.5}
    //             stroke="currentColor"
    //             className="w-6 h-6"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //             />
    //           </svg>
    //         ) : (
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={1.5}
    //             stroke="currentColor"
    //             className="w-6 h-6"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    //             />
    //           </svg>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TargetTask;
