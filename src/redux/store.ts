import { configureStore, applyMiddleware  } from "@reduxjs/toolkit";
import counterReducer from "../redux/features/counterSlice";
import taskReducer from "../redux/features/taskSlice";


export const store = configureStore({
  reducer: {
    counterReducer,
    taskReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
