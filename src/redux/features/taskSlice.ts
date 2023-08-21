import { TaskListState, Task } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
tasks: []
} as TaskListState;

export const task = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: () => initialState, //BORRA TODAS LAS TAREAS
    add_task: (state, action: PayloadAction<Task>) => {
    //   state.value += 1;//AGREGA TAREA
    },
    update_task: (state, action: PayloadAction<Task>) => {
    //   state.value += 1;//ACTUALIZA TAREA
    },
    delete_task: (state, action: PayloadAction<Task>) => {
    //   state.value += 1;//ELIMINA TAREA
    },
  
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    // decrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value -= action.payload;
    // },
  },
});

export const {
  reset,
  add_task,
  update_task,
  delete_task,
} = task.actions;
export default task.reducer;
