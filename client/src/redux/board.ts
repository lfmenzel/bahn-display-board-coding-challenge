import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoardState {
  limit: string;
}

const initialState: BoardState = {
  limit: "15",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<string>) => {
      state.limit = action.payload;
    },
  },
});

export const { setLimit } = boardSlice.actions;

export default boardSlice.reducer;
