import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
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

const About = () => {
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
          About the Artist
        </Typography>

        {/* About Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4,  height: "100%"  }}>
              <Typography variant="h5" gutterBottom>
                Biography
              </Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography paragraph>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Education & Training
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Master of Fine Arts"
                    secondary="University of Arts, 2015-2017"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Bachelor of Arts"
                    secondary="National Art Academy, 2011-2015"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Advanced Studio Practice"
                    secondary="International Art Studio, 2018"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Artist Statement
              </Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography paragraph>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Typography>
              <Typography paragraph>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Contact Section */}
        <Box fullheight sx={{ mt: 8 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
                <Typography variant="h5" gutterBottom>
                  Contact Information
                </Typography>
                <Box sx={{ my: 3 }}>
                  <IconButton color="primary">
                    <PhoneIcon />
                  </IconButton>
                  <Typography> +91 9881700425 / 9422563261</Typography>
                </Box>
                <Box sx={{ my: 3 }}>
                  <IconButton color="primary">
                    <EmailIcon />
                  </IconButton>
                  <Typography>abhang14@gmail.com</Typography>
                </Box>
                <Box sx={{ my: 3 }}>
                  <IconButton color="primary">
                    <LocationIcon />
                  </IconButton>
                  <Typography>
                  Jasminium, C-1102,<br / >
                  Magarpatta City, Hadapsar,<br / > 
                  Pune - 411028, Maharashtra.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
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
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Send Message
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
