"use client";

import TaskList from "@/components/TaskList";
import { useEffect, useState } from "react";

export default function Home() {
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    let actual_date = new Date();

    let year = actual_date.getFullYear();
    let month = actual_date.getMonth() + 1;
    let day = actual_date.getDate();

    setFecha(`${day}/${month}/${year}`);
  }, []);

  return (
    <main className="md:mx-32 mx-4">
      <div className="flex justify-between justify-items-center my-5">
        <h2 className="md:text-3xl text-xl">Cosas por Hacer</h2>
        <h3 className="my-auto">Hoy: {fecha}</h3>
      </div>

      <TaskList />
    </main>
  );
}
