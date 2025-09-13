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
  return axios.get("http://localhost:3000/api/station/autocomplete", {
    params: params,
  });
};
