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
import axios from "axios";

const API_URL = "http://localhost:5001"; // Match your backend port

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setError(""); // Clear any previous errors
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);

      // Store token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Set authorization header for future requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      navigate("/");
    } catch (err) {
      if (!err.response) {
        setError("Network error. Please check your connection.");
      } else if (err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError(
          err.response?.data?.message || "An error occurred during login"
        );
      }
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
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
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
              value={password}
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
