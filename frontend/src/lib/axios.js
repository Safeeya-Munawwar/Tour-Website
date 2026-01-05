import axios from "axios";

const API_URL =
  process.env.REACT_APP_NODE_ENV === "development"
    ? process.env.REACT_APP_DEVELOPMENT_API_URL
    : process.env.REACT_APP_PRODUCTION_API_URL;

export const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach ADMIN or SUPER ADMIN token
axiosInstance.interceptors.request.use(
  (config) => {
    const adminToken = sessionStorage.getItem("adminToken");
    const superAdminToken = sessionStorage.getItem("superadminToken");

    // Prefer super admin token if available
    const token = superAdminToken || adminToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
