import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log(API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
