import { createSlice } from "@reduxjs/toolkit";

type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  created_at: number;
  expires_on: number;
};

export const taskSlice = createSlice({
  name: "counter",
  initialState: {
    value: [],
  },
  reducers: {
    setInitialState: (state, action) => {
      state.value = action.payload;
    },
    addTask: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push();
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
    // reset: (state) => {
    //   state.value = 0;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setInitialState, addTask } = taskSlice.actions;

export default taskSlice.reducer;
