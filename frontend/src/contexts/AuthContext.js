import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001";

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
          setUser(JSON.parse(storedUser));
        } else {
          // For regular users, verify with backend
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(`${API_URL}/api/auth/user`);
          if (response.data.success) {
            setUser(response.data.user);
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
    delete axios.defaults.headers.common["Authorization"];
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
        localStorage.setItem("token", "admin-token");
        localStorage.setItem("user", JSON.stringify(adminUser));
        setUser(adminUser);
        return adminUser;
      }

      // Regular user login
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user: userData } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        userData
      );

      if (response.data.success) {
        const { token, user: newUser } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(newUser));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

  const logout = () => {
    clearAuth();
  };

  const updateProfile = async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/api/auth/profile`, userData);
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
    logout,
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
