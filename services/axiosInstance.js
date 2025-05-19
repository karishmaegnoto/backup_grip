import axios from "axios";
import { axiosError } from "./errorHandler";
import { BASE_URL } from "./path";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (!token) {
    return config;
  }
  config = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` },
  };
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("axiosInstance err:", err);
    axiosError(err);
    return Promise.reject(err); //debugging
  }
);

export { axiosInstance };
