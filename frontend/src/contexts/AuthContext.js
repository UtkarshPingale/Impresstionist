import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get("/api/auth/me");
        setUser(response.data);
      }
    } catch (error) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await axios.post("/api/auth/login", { email, password });
    const { token, user: userData } = response.data;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
    return userData;
  };

  const register = async (userData) => {
    const response = await axios.post("/api/auth/register", userData);
    const { token, user: newUser } = response.data;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("/api/auth/profile", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Profile update failed";
    }
  };

  const value = {
    user,
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
