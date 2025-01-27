import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_BACKEND_URL
    : import.meta.env.VITE_PROD_BACKEND_URL;

console.log("Base URL:", API_URL);
console.log("Environment Variables:", import.meta.env.VITE_PROD_BACKEND_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
