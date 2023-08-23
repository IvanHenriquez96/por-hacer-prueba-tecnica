"use client";

const Filtro = ({ showFilter, setShowFilter, toggleFilter }: any) => {
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
            <input className="border w-11/12 rounded p-1" type="text" name="" id="" />
          </div>
          <div>
            <label>Ordenar por:</label>
            <select className="border w-11/12 rounded p-1" name="">
              <option value="">Fecha creación</option>
              <option value="">Fecha vencimiento</option>
            </select>
            {/* <input className="" type="text" name="" id="" /> */}
          </div>

          <div>
            <label>Estado:</label>
            <select className="border w-11/12 rounded p-1" name="">
              <option value="">Todos</option>
              <option value="">Liberada</option>
              <option value="">Pendiente</option>
              <option value="">Atrasadas</option>
            </select>
            {/* <input className="" type="text" name="" id="" /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filtro;
