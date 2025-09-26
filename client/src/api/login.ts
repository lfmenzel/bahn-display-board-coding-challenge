import { getAxios } from "./axios.ts";

const axios = getAxios();

export const login = async (
  username: string,
  password: string,
): Promise<any> => {
  const serverHOST =
    import.meta.env.VITE_BAHN_SIMPLE_SERVER_HOST || "http://localhost";
  const serverPort = import.meta.env.VITE_BAHN_SIMPLE_SERVER_PORT || 3000;
  const serverURL = `${serverHOST}:${serverPort}`;

  const data = {
    username,
    password,
  };

  return axios.post(`${serverURL}/api/login`, data);
};
