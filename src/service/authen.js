import axios from "axios";
import { loginUrl, registerUrl } from "./api";
export const registerApi = ({ username, password,email,phoneNumber }) => {
  const registerRequest = axios({
    method: "POST",
    url: registerUrl,
    params: { username, password,email,phoneNumber },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return registerRequest;
};

export const loginApi = ({username, password }) => {
  const loginRequest = axios({
    method: "POST",
    url: loginUrl,
    data: { username, password },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return loginRequest;
};
export const addTokenToAxios = (accessToken) => {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
export const removeTokenFromAxios = () => {
  localStorage.removeItem("accessToken");
  const removeInterceptor = axios.interceptors.request.use(
    function (config) {
      delete config.headers.Authorization;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.request.eject(removeInterceptor);
};
