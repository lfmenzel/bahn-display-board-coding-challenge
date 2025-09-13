import { getAxios } from "./axios.ts";

const axios = getAxios();

export interface Meldung {
  prioritaet: string;
  text: string;
}

export interface Verkehrmittel {
  name: string;
  produktGattung: string;
}

export interface Connection {
  bahnhofsId: string;
  zeit: string;
  ezZeit: string;
  gleis: string;
  ezGleis?: string;
  ueber: string[];
  journeyId: string;
  meldungen: Meldung[];
  verkehrmittel: Verkehrmittel;
  terminus: string;
}
export const fetchDepartures = async (
  stationId: string,
  date: string,
  time: string,
  vehicleType: string,
): Promise<any> => {
  const params: any = {
    datum: date,
    zeit: time,
    vehicleType: vehicleType,
  };
  return axios.get(
    `http://localhost:3000/api/station/${stationId}/departures`,
    {
      params: params,
    },
  );
};

export const fetchArrivals = async (
  stationId: string,
  date: string,
  time: string,
  vehicleType: string,
): Promise<any> => {
  const params: any = {
    datum: date,
    zeit: time,
    vehicleType: vehicleType,
  };
  return axios.get(`http://localhost:3000/api/station/${stationId}/arrivals`, {
    params: params,
  });
};
