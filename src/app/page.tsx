import TaskList from "@/components/TaskList";

async function getTasks() {
  const res = await fetch("http://45.236.128.210:4000/todos", {
    cache: "no-store", // I also tried "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const tasks = await getTasks();

  //Obtiene fecha actual
  let actual_date = new Date();
  let year = actual_date.getFullYear();
  let month = actual_date.getMonth() + 1;
  let day = actual_date.getDate();

  return (
    <main className="md:mx-32 mx-4">
      <div className="flex justify-between justify-items-center my-5">
        <h2 className="md:text-3xl text-xl font-semibold">Cosas por Hacer</h2>
        <h3 className="my-auto">Hoy: {`${day}/${month}/${year}`}</h3>
      </div>

      <TaskList tasks={tasks} />
    </main>
  );
}
