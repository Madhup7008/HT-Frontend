// Centralized axios instance for your deployed backend
import axios from "axios";

// Works with both Vite and CRA env vars, with a safe fallback.
const baseURL =
  (typeof import !== "undefined" &&
    import.meta &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  process.env.REACT_APP_API_URL ||
  "https://ht-backend-5eby.onrender.com";

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
