import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to every request
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
