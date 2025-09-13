import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  themeMode: string;
  language: string;
  breakpoint: string;
}

const initialState: AppState = {
  themeMode: "dark",
  language: "de",
  breakpoint: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setBreakpoint: (state, action: PayloadAction<string>) => {
      if (state.breakpoint !== action.payload) {
        state.breakpoint = action.payload;
      }
    },
  },
});

export const { setThemeMode, setLanguage, setBreakpoint } = appSlice.actions;

export default appSlice.reducer;
