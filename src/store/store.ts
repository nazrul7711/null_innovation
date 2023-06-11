import { configureStore } from "@reduxjs/toolkit";

import TodoSlice from "./TodoSlice";
import AuthSlice from "./AuthSlice";

export const store = configureStore({
  reducer: {
    Todo: TodoSlice.reducer,
    Auth:AuthSlice.reducer
  },
});

export type appDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;


