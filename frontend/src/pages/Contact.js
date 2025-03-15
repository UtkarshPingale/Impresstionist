import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", formData);
      setStatus({
        type: "success",
        message: "Message sent successfully! We will get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ my: 3 }}>
                <IconButton color="primary">
                  <PhoneIcon />
                </IconButton>
                <Typography>+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ my: 3 }}>
                <IconButton color="primary">
                  <EmailIcon />
                </IconButton>
                <Typography>contact@example.com</Typography>
              </Box>
              <Box sx={{ my: 3 }}>
                <IconButton color="primary">
                  <LocationIcon />
                </IconButton>
                <Typography>
                  123 Art Gallery Street
                  <br />
                  New York, NY 10001
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Send us a Message
              </Typography>
              {status.message && (
                <Alert severity={status.type} sx={{ mb: 2 }}>
                  {status.message}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact;
