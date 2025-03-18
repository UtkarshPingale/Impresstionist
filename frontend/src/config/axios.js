import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Handle admin token
      if (token === "admin-token") {
        config.headers.Authorization = "Bearer admin-token";
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response?.status === 401) {
      // Don't handle cart-related endpoints in the interceptor
      const isCartEndpoint = error.config.url.includes("/api/cart");
      if (!isCartEndpoint) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
