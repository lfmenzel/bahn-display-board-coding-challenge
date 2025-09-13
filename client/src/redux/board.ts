import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Station } from "@/api/stations.ts";

interface BoardState {
  limit: string;
  stations: Station[];
  query?: string;
}

const initialState: BoardState = {
  stations: [],
  limit: "15",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<string>) => {
      state.limit = action.payload;
    },
    queryStations: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.stations = action.payload;
    },
  },
});

export const { setLimit, queryStations, setStations } = boardSlice.actions;

export default boardSlice.reducer;
