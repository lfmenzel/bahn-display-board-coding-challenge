import { getAxios } from "./axios.ts";

const axios = getAxios();

export const fetchStatistics = async (token?: string): Promise<any> => {
  const simpleServerHOST =
    import.meta.env.VITE_BAHN_SIMPLE_SERVER_HOST || "http://localhost";
  const simpleServerPort = import.meta.env.VITE_BAHN_SIMPLE_SERVER_PORT || 3000;
  const simpleServerURL = `${simpleServerHOST}:${simpleServerPort}`;

  let headers = {};
  if (token) {
    headers = {
      Authorization: `token ${token}`,
    };
  }

  return axios.get(`${simpleServerURL}/api/statistics`, {
    headers: headers,
  });
};
