import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Interceptor untuk menyisipkan token Authorization
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || "1|ykOtaTePvjQ7WeHTkT3fDIQ1cPbKngDPqYdfdr0f2ec7d369";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
