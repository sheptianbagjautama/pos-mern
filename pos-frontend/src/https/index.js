import axios from "axios";

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Include cookies in requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// API endpoints
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");
