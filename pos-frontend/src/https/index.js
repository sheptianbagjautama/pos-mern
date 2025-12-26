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

// Table endpoints
export const addTable = (data) => api.post("/api/table", data);
export const getTables = () => api.get("/api/table");

//Payment Endpoints
export const createOrderRazorpay = (data) => api.post("/api/payment/create-order", data);
export const verifyPaymentRazorpay = (data) => api.post("/api/payment/verify-payment", data);