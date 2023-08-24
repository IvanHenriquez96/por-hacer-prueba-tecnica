import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task, TaskList } from "../../types/types";

var _state: Task[] = [];

const initialState: TaskList = {
  tasks: [],
};

//Funciones Thunks
export const fetchTasks = createAsyncThunk("tasks/fetch", async (thunkAPI) => {
  const res = await fetch("https://json-server-prueba-tecnica.onrender.com/tasks", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log("fetchTask", data);

  return data;
});

export const saveTasks = createAsyncThunk("tasks/save", async (task: Task, thunkAPI) => {
  const res = await fetch("https://json-server-prueba-tecnica.onrender.com/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await res.json();
  return data;
});

export const updateTasks = createAsyncThunk(
  "tasks/update",
  async (task: Task, thunkAPI) => {
    const res = await fetch(
      `https://json-server-prueba-tecnica.onrender.com/tasks/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const data = await res.json();
    return data;
  }
);

export const deleteTasks = createAsyncThunk(
  "tasks/delete",
  async (task: Task, thunkAPI) => {
    const res = await fetch(
      `https://json-server-prueba-tecnica.onrender.com/tasks/${task.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const data = await res.json();
    return data;
  }
);

export const liberarTasks = createAsyncThunk(
  "tasks/liberar",
  async (tasks: Task[], thunkAPI) => {
    tasks.forEach(async (task) => {
      if (task.checked) {
        console.log("se tiene q liberar", task);
        await fetch(`https://json-server-prueba-tecnica.onrender.com/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...task, estado: "liberada", checked: false }),
        });
      }
    });

    // const res = await fetch(
    //   `https://json-server-prueba-tecnica.onrender.com/tasks/${task.id}`,
    //   {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(task),
    //   }
    // );
    // const data = await res.json();
    // return data;
  }
);

//FIN Funciones Thunks

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    filtrarTask: (state, action) => {
      console.log("DESDE SLICE", { state }, { action }, _state);

      //Primero verifica que estados quiere ver
      let datos_filtrados_1: any = [];

      if (action.payload.filtrar_estado != "") {
        datos_filtrados_1 = _state.filter(
          (objeto) => objeto.estado == action.payload.filtrar_estado
        );
      } else {
        datos_filtrados_1 = _state;
      }

      //Segundo, los ordena por fecha de vencimiento si es que asi se seleccionó
      let datos_filtrados_2: any = [];

      if (action.payload.ordenar_por != "fecha_creacion") {
        let arrayForSort = [...datos_filtrados_1];
        datos_filtrados_2 = arrayForSort.sort((a: any, b: any) => {
          let da: any = new Date(a.expires_on),
            db: any = new Date(b.expires_on);
          return da - db;
        });
      } else {
        datos_filtrados_2 = datos_filtrados_1;
      }

      //Tercero, selecciona los que tienen el texto buscado
      let datos_filtrados_3: any = [];
      if (action.payload.titulo != "") {
        datos_filtrados_3 = datos_filtrados_2.filter((task: any) => {
          return task.title.includes(action.payload.titulo);
        });
      } else {
        datos_filtrados_3 = datos_filtrados_2;
      }

      state.tasks = datos_filtrados_3;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      console.log("redux", action.payload);
      state.tasks = action.payload;
      _state = state.tasks;
    });

    builder.addCase(saveTasks.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
      // _state = state.tasks;
    });

    builder.addCase(updateTasks.fulfilled, (state, action) => {
      let indice = state.tasks.findIndex((task) => task.id === action.payload.id);
      console.log({ indice }, state.tasks);

      state.tasks[indice] = {
        ...state.tasks[indice],
        ...action.payload,
      };
      // _state = state.tasks;
    });

    builder.addCase(liberarTasks.fulfilled, (state, action) => {
      console.log("se librea en la API, ahora la vista");
      state.tasks.forEach((task, indice) => {
        if (task.checked) {
          state.tasks[indice] = {
            ...state.tasks[indice],
            estado: "liberada",

            checked: false,
          };
          console.log("3", state.tasks[indice]);
        }
      });

      // _state = state.tasks;
    });

    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      // state.tasks.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setInitialState, addTask, filtrarTask } = taskSlice.actions;

export default taskSlice.reducer;
