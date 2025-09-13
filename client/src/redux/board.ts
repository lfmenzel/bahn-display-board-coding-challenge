import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Station } from "@/api/stations.ts";

interface BoardState {
  limit: string;
  stations: Station[];
  selectedStation?: Station;
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
    clearQuery: (state) => {
      console.log("clearQuery");
      state.query = "";
      state.stations = [];
      state.selectedStation = undefined;
    },
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.stations = action.payload;
    },
    setSelectedStation: (state, action: PayloadAction<Station | undefined>) => {
      state.selectedStation = action.payload;
    },
  },
});

export const {
  setLimit,
  queryStations,
  clearQuery,
  setStations,
  setSelectedStation,
} = boardSlice.actions;

export default boardSlice.reducer;
