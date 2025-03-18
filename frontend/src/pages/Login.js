import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Check for admin credentials
      if (formData.email === "admin" && formData.password === "admin") {
        // Use the login function to properly set auth state
        const result = await login("admin", "admin");
        if (result.success) {
          navigate("/");
        } else {
          setError(result.message || "Admin login failed");
        }
        return;
      }

      // Regular user login
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username/Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              error={!!error}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              error={!!error}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
            <Typography align="center">
              Don't have an account?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                Register here
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
