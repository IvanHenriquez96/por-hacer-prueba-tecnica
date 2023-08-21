import { addTask } from "@/redux/features/taskSlice";
import { useAppDispatch } from "../../redux/hooks";
import React from "react";

const page = () => {
  // const dispatch = useAppDispatch;
  return (
    <div className="md:mx-32 mx-4">
      <h3>Crear nueva Tarea</h3>
      <form>
        <div>
          <label htmlFor="">Título</label>
        </div>
        <div>
          <input type="date" name="" id="" />
        </div>

        <button className="border rounded p-1">Crear</button>
      </form>
    </div>
  );
};

export default page;
