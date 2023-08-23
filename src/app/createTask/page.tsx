// import { addTask } from "@/redux/features/taskSlice";
// import { useAppDispatch } from "../../redux/hooks";
import FormTask from "@/components/FormTask";

const page = () => {
  // const dispatch = useAppDispatch;
  return (
    <div className="md:mx-32 mx-4">
      <h2 className="md:text-3xl text-xl font-semibold mt-5">Crear Nueva Tarea</h2>
      <FormTask />
    </div>
  );
};

export default page;
