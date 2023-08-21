import { useEffect, useState } from "react";

const TargetTask = ({ task }: any) => {
  const [create_at, setCreate_at] = useState("");

  useEffect(() => {
    let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    date.setUTCSeconds(task.create_at);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son base 0
    const day = String(date.getDate()).padStart(2, "0");

    const creado_el = `${year}-${month}-${day}`;
    setCreate_at(creado_el);
  }, []);

  return (
    <div className={`my-5 border rounded p-2 ${task.completed && "bg-green-300"}`}>
      <div className="flex justify-between">
        <div className="flex">
          <input type="checkbox" name="" />
          <p className={`ml-2 my-auto ${task.completed && "text-white"}`}>{task.title}</p>
        </div>

        <div className="flex">
          <input
            type="date"
            className="mx-5 border p-2  w-4/12 md:w-7/12"
            value={create_at}
            onChange={(e) => {
              setCreate_at(e.target.value);
            }}
          />
          <div className="my-auto mx-auto">
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
      </div>
    </div>
  );
};

export default TargetTask;
