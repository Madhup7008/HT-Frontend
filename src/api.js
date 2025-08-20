import axios from "axios";

// Works with both Vite (import.meta.env) and CRA (.env)
let baseURL = "https://ht-backend-5eby.onrender.com";

// If using Vite, check import.meta.env
if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) {
  baseURL = import.meta.env.VITE_API_URL;
}

// If using CRA, fallback to process.env
if (process.env.REACT_APP_API_URL) {
  baseURL = process.env.REACT_APP_API_URL;
}

const api = axios.create({
  baseURL,
  // If you ever add cookies/sessions, toggle the next line:
  // withCredentials: true,
  timeout: 15000,
});

// (Optional) tiny response helper so 4xx/5xx show a readable message
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
