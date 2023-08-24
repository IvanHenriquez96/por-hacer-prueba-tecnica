"use client";
import { addTask, saveTasks } from "@/redux/features/taskSlice";
import { useAppDispatch } from "../redux/hooks";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FormTask = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const today = new Date().toISOString().split("T")[0]; // Obtener la fecha de hoy en el formato YYYY-MM-DD

  const [form, setForm] = useState({
    title: "",
    estado: "pendiente",
    create_at: "",
    expires_on: "",
    checked: false,
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    const fecha = getFechaActual();
    setForm({ ...form, create_at: fecha, expires_on: fecha });
  }, []);

  const handleChange = (e: any) => {
    setError(false);
    const name = e.target.name;
    const value = e.target.value;
    const aux = { ...form, [name]: value };
    setForm(aux);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (form.title.trim() == "") {
      setError(true);
      return;
    }

    const hora_actual = getFechaActual();
    const aux = { ...form, create_at: hora_actual };
    setForm(aux);
    console.log({ aux });

    dispatch(saveTasks(form));
    router.push("/");
  };

  const getFechaActual = () => {
    // Obtener la fecha y hora actual
    const now = new Date();

    // Obtener los componentes de la fecha y hora
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    const day = String(now.getDate()).padStart(2, "0");

    // Formatear en el formato deseado
    const hora_actual = `${year}-${month}-${day}`;
    return hora_actual;
  };

  return (
    <div>
      <form
        className="border p-5 rounded mt-10 md:w-4/12 md:mx-auto   "
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="">Título:</label>
          <input
            className="border mx-auto rounded p-1 w-full "
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
            value={form.expires_on}
            min={today}
            onChange={handleChange}
          />
        </div>

        {error && (
          <div className="border rounded p-2 mb-5 bg-red-400 text-gray-50">
            <p>Atención! el campo título no puede estar vacío!</p>
          </div>
        )}

        <button className="border rounded p-1 bg-[#F45432] text-white px-3 py-1 w-full">
          Crear
        </button>
      </form>
    </div>
  );
};

export default FormTask;
