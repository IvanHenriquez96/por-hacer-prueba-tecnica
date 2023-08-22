"use client";
import { addTask } from "@/redux/features/taskSlice";
import { useAppDispatch } from "../redux/hooks";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FormTask = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    title: "",
    completed: false,
    create_at: "",
    expires_on: "",
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const aux = { ...form, [name]: value };
    setForm(aux);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let hora_actual = new Date().getTime() / 1000; // Divide by 1000 to convert milliseconds to seconds
    const aux = { ...form, create_at: hora_actual.toString() };
    setForm(aux);

    dispatch(addTask(form));
    router.push("/");
  };

  //   console.log(form);

  return (
    <form className="border p-2 rounded" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Título:</label>
        <input
          className="border"
          type="text"
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="">Expira el:</label>
        <input
          className="border"
          type="date"
          name="expires_on"
          onChange={handleChange}
        />
      </div>

      <button className="border rounded p-1">Crear</button>
    </form>
  );
};

export default FormTask;
