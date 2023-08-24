"use client";
import { filtrarTask } from "@/redux/features/taskSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

const Filtro = ({ showFilter, setShowFilter, toggleFilter }: any) => {
  const [datosFiltro, setDatosFiltro] = useState({
    titulo: "",
    ordenar_por: "fecha_creacion",
    filtrar_estado: "",
  });
  const dispatch = useAppDispatch();

  const filtrarTareas = (e: any) => {
    setDatosFiltro({ ...datosFiltro, [e.target.name]: e.target.value });
    dispatch(filtrarTask({ ...datosFiltro, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <div
        className={`absolute top-0 right-0 p-4 bg-gray-50 md:w-3/12 w-8/12 h-screen shadow-xl z-10 animate-fade-left`}
      >
        <div className="flex justify-between">
          <h3 className="font-bold">Filtrar</h3>
          <p className="font-bold" onClick={() => setShowFilter(!showFilter)}>
            X CERRAR
          </p>
        </div>

        <form className="grid gap-y-4">
          <div>
            <label>Título:</label>
            <input
              className="border w-11/12 rounded p-1"
              type="text"
              name="titulo"
              onChange={filtrarTareas}
            />
          </div>
          <div>
            <label>Ordenar por:</label>
            <select
              className="border w-11/12 rounded p-1"
              name="ordenar_por"
              onChange={filtrarTareas}
            >
              <option value="fecha_creacion">Fecha creación</option>
              <option value="fecha_vencimiento">Fecha vencimiento</option>
            </select>
            {/* <input className="" type="text" name="" id="" /> */}
          </div>

          <div>
            <label>Estado:</label>
            <select
              className="border w-11/12 rounded p-1"
              name="filtrar_estado"
              onChange={filtrarTareas}
            >
              <option value="">Todos</option>
              <option value="liberada">Liberada</option>
              <option value="pendiente">Pendiente</option>
              <option value="atrasada">Atrasadas</option>
            </select>
            {/* <input className="" type="text" name="" id="" /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filtro;
