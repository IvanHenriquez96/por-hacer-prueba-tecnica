import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task, TaskList } from "../../types/types";

const initialState: TaskList = {
  tasks: [],
};

//Funciones Thunks
export const fetchTasks = createAsyncThunk("tasks/fetch", async (thunkAPI) => {
  const res = await fetch("https://json-server-prueba-tecnica.onrender.com/tasks", {
    cache: "no-store",
  });
  const data = await res.json();
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });

    builder.addCase(saveTasks.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });

    builder.addCase(updateTasks.fulfilled, (state, action) => {
      let indice = state.tasks.findIndex((task) => task.id === action.payload.id);
      console.log({ indice });

      state.tasks[indice] = {
        ...state.tasks[indice],
        ...action.payload,
      };
    });

    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      // state.tasks.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setInitialState, addTask } = taskSlice.actions;

export default taskSlice.reducer;
