import { getAxios } from "./axios.ts";

const axios = getAxios();

export interface Station {
  extId: string;
  id: string;
  lat: number;
  lon: number;
  name: string;
  products: string[];
  type: string;
}

export const fetchStations = async (
  query?: string,
  limit?: string,
): Promise<any> => {
  const params: any = {
    query: query,
    limit: limit,
  };

  const simpleServerHOST =
    import.meta.env.VITE_BAHN_SIMPLE_SERVER_HOST || "http://localhost";
  const simpleServerPort = import.meta.env.VITE_BAHN_SIMPLE_SERVER_PORT || 3000;
  const simpleServerURL = `${simpleServerHOST}:${simpleServerPort}`;

  return axios.get(`${simpleServerURL}/api/station/autocomplete`, {
    params: params,
  });
};
