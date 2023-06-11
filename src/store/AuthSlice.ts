import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
}

interface userState {
  user: User | null;
}

const initialState: userState  = {
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice;
