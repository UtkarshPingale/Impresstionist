import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../config/axios";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        // If it's the admin token, set the admin user directly
        if (token === "admin-token") {
          const adminUser = JSON.parse(storedUser);
          setUser(adminUser);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
        } else {
          // For regular users, verify with backend
          const response = await axiosInstance.get("/api/auth/user");
          if (response.data.success) {
            setUser(response.data.user);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
          } else {
            clearAuth();
          }
        }
      } else {
        clearAuth();
      }
    } catch (error) {
      console.error("Auth check error:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const login = async (email, password) => {
    try {
      // Check for admin login
      if (email === "admin" && password === "admin") {
        const adminUser = {
          name: "Administrator",
          email: "admin",
          role: "admin",
        };
        const adminToken = "admin-token";
        localStorage.setItem("token", adminToken);
        localStorage.setItem("user", JSON.stringify(adminUser));
        // Set the auth header immediately
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${adminToken}`;
        setUser(adminUser);
        return adminUser;
      }

      // Regular user login
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user: userData } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        setUser(userData);
        return userData;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error in context:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", userData);

      if (response.data.success) {
        const { token, user: newUser } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(newUser));
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        setUser(newUser);
        return newUser;
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await axiosInstance.put("/api/auth/profile", userData);
      if (response.data.success) {
        setUser(response.data.user);
        return response.data.user;
      } else {
        throw new Error(response.data.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout: clearAuth,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
