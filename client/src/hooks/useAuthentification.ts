import { getAxios } from "@/api/axios";

const axios = getAxios();

axios.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if ([401, 403].includes(error.response.status)) {
    }
    return Promise.reject(error);
  },
);

export const useAuthentification = () => {
  return true;
};
