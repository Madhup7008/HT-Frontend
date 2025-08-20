import axios from "axios";

// Default backend URL (your deployed backend)
let baseURL = "https://ht-backend-5eby.onrender.com";

// ✅ Vite: check safely for import.meta.env
if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) {
  baseURL = import.meta.env.VITE_API_URL;
}

// ✅ CRA: check process.env
if (process.env.REACT_APP_API_URL) {
  baseURL = process.env.REACT_APP_API_URL;
}

const api = axios.create({
  baseURL,
  timeout: 15000,
});

// Interceptor for readable error messages
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Request failed";
    return Promise.reject({ ...err, message: msg });
  }
);

export default api;
