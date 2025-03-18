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
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shouldShowRegister, setShouldShowRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    setError("");
    setShouldShowRegister(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShouldShowRegister(false);
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Invalid email or password");
        setShouldShowRegister(result.shouldRegister || false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Invalid email or password"
      );
      setShouldShowRegister(error.response?.data?.shouldRegister || false);
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff2f0",
                padding: "6px 16px",
                borderRadius: "8px",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    color: "#FF4842",
                    "& svg": {
                      width: 20,
                      height: 20,
                    },
                  }}
                >
                  ⚠
                </Box>
                <Typography
                  sx={{
                    color: "#212B36",
                    fontSize: "0.875rem",
                  }}
                >
                  {error}
                </Typography>
                {shouldShowRegister && (
                  <Button
                    variant="text"
                    size="small"
                    component={Link}
                    to="/register"
                    sx={{
                      ml: -1.5,
                      color: "#212B36",
                      backgroundColor: "transparent",
                      textTransform: "none",
                      fontSize: "0.875rem",
                      padding: "3px 8px",
                      minWidth: "auto",
                      "&:hover": {
                        textDecoration: "underline",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    Register now
                  </Button>
                )}
              </Box>
              <Box
                component="button"
                onClick={() => {
                  setError("");
                  setShouldShowRegister(false);
                }}
                sx={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "#212B36",
                  opacity: 0.8,
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                ✕
              </Box>
            </Box>
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
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#212B36",
                height: "48px",
                "&:hover": {
                  bgcolor: "#454F5B",
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "LOGIN"
              )}
            </Button>
            <Typography align="center">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "#7635dc",
                  fontWeight: 600,
                }}
              >
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
