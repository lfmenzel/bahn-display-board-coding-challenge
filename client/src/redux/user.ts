import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username?: string;
  token?: string;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = undefined;
    },
  },
});

export const { setUsername, setToken, clearToken } = userSlice.actions;

export default userSlice.reducer;
