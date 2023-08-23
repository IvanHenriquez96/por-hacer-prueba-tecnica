"use client";
import { addTask, saveTasks } from "@/redux/features/taskSlice";
import { useAppDispatch } from "../redux/hooks";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FormTask = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    title: "",
    estado: "pendiente",
    create_at: "",
    expires_on: "",
    checked: false,
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const aux = { ...form, [name]: value };
    setForm(aux);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Obtener la fecha y hora actual
    const now = new Date();

    // Obtener los componentes de la fecha y hora
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Formatear en el formato deseado
    const hora_actual = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const aux = { ...form, create_at: hora_actual };
    setForm(aux);
    console.log({ aux });

    dispatch(saveTasks(form));
    router.push("/");
  };

  //   console.log(form);

  return (
    <form className="border p-5 rounded mt-5 " onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="">Título:</label>
        <input
          className="border ml-3 rounded p-1"
          type="text"
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="">Expira el:</label>
        <input
          className="border ml-3 rounded p-1"
          type="date"
          name="expires_on"
          onChange={handleChange}
        />
      </div>

      <button className="border rounded p-1 bg-[#F45432] text-white px-3 py-1">
        Crear
      </button>
    </form>
  );
};

export default FormTask;
