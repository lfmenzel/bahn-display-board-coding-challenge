import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Station } from "@/api/stations.ts";
import { Connection } from "@/api/connections.ts";

interface BoardState {
  limit: string;
  stations: Station[];
  selectedStation?: Station;
  query?: string;
  departures: Connection[];
  arrivals: Connection[];
  vehicleType: string;
}

const initialState: BoardState = {
  stations: [],
  limit: "15",
  departures: [],
  arrivals: [],
  vehicleType: "T",
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
    clearStations: (state) => {
      state.query = "";
      state.stations = [];
      state.selectedStation = undefined;
    },
    clearQuery: (state) => {
      state.query = "";
    },
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.stations = action.payload;
    },
    setSelectedStation: (state, action: PayloadAction<Station | undefined>) => {
      state.selectedStation = action.payload;
      state.query = "";
    },
    setDepartures: (state, action: PayloadAction<Connection[]>) => {
      state.departures = action.payload;
    },
    setArrivals: (state, action: PayloadAction<Connection[]>) => {
      state.arrivals = action.payload;
    },
    setVehicleType: (state, action: PayloadAction<string>) => {
      state.vehicleType = action.payload;
    },
  },
});

export const {
  setLimit,
  queryStations,
  clearStations,
  clearQuery,
  setStations,
  setSelectedStation,
  setDepartures,
  setArrivals,
  setVehicleType,
} = boardSlice.actions;

export default boardSlice.reducer;
