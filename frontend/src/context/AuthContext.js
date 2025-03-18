import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../config/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Handle admin token
        if (token === "admin-token") {
          const adminUser = {
            name: "Administrator",
            email: "admin",
            role: "admin",
          };
          setUser(adminUser);
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        // Regular user token
        const response = await axios.get("/api/auth/me");
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Handle admin login
      if (email === "admin" && password === "admin") {
        const adminUser = {
          name: "Administrator",
          email: "admin",
          role: "admin",
        };
        const adminToken = "admin-token";
        localStorage.setItem("token", adminToken);
        setUser(adminUser);
        setIsAuthenticated(true);
        return { success: true };
      }

      // Regular user login
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
