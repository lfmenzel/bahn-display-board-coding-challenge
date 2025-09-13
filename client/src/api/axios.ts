import axios from "axios";
import QueryString from "qs";

const instance = axios.create({
  baseURL: "/",
  timeout: 20000,
  paramsSerializer: (params) => {
    return QueryString.stringify(params, { arrayFormat: "repeat" });
  },
});

export const getAxios = () => instance;
