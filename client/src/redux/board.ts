import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Station } from "@/api/stations.ts";
import { BoardEvent } from "@/api/events.ts";

interface BoardState {
  limit: string;
  stations: Station[];
  selectedStation?: Station;
  query?: string;
  departures: BoardEvent[];
  arrivals: BoardEvent[];
}

const initialState: BoardState = {
  stations: [],
  limit: "15",
  departures: [],
  arrivals: [],
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
    setDepartures: (state, action: PayloadAction<BoardEvent[]>) => {
      state.departures = action.payload;
    },
    setArrivals: (state, action: PayloadAction<BoardEvent[]>) => {
      state.arrivals = action.payload;
    },
  },
});

export const {
  setLimit,
  queryStations,
  clearQuery,
  setStations,
  setSelectedStation,
  setDepartures,
  setArrivals,
} = boardSlice.actions;

export default boardSlice.reducer;
