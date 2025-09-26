import { getAxios } from "./axios.ts";

const axios = getAxios();

const simpleServerHOST =
  import.meta.env.VITE_BAHN_SIMPLE_SERVER_HOST || "http://localhost";
const simpleServerPort = import.meta.env.VITE_BAHN_SIMPLE_SERVER_PORT || 3000;
const simpleServerURL = `${simpleServerHOST}:${simpleServerPort}`;

export interface Meldung {
  prioritaet: string;
  text: string;
}

export interface Verkehrmittel {
  name: string;
  produktGattung: string;
}

export interface Connection {
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

export interface ResultConnection {
  data: {
    entries: Connection[];
  };
}

export const fetchDepartures = async (
  stationId: string,
  date: string,
  time: string,
  limit: string,
  vehicleType: string,
  token?: string,
): Promise<ResultConnection> => {
  const params = {
    datum: date,
    zeit: time,
    limit: limit,
    vehicleType: vehicleType,
  };

  let headers = {};
  if (token) {
    headers = {
      Authorization: `token ${token}`,
    };
  }

  return axios.get(`${simpleServerURL}/api/station/${stationId}/departures`, {
    params: params,
    headers: headers,
  });
};

export const fetchArrivals = async (
  stationId: string,
  date: string,
  time: string,
  limit: string,
  vehicleType: string,
  token?: string,
): Promise<ResultConnection> => {
  const params = {
    datum: date,
    zeit: time,
    limit: limit,
    vehicleType: vehicleType,
  };

  let headers = {};
  if (token) {
    headers = {
      Authorization: `token ${token}`,
    };
  }

  return axios.get(`${simpleServerURL}/api/station/${stationId}/arrivals`, {
    params: params,
    headers: headers,
  });
};
