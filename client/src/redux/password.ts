import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PasswordState {
  password?: string;
}

const initialState: PasswordState = {};

export const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    clearPassword: (state) => {
      state.password = undefined;
    },
  },
});

export const { setPassword, clearPassword } = passwordSlice.actions;

export default passwordSlice.reducer;
