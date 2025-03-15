import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
} from "@mui/material";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "Artist Portfolio",
    contactEmail: "contact@example.com",
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Art Gallery Street, New York, NY 10001",
    enableNotifications: true,
    maintenanceMode: false,
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setSettings({
      ...settings,
      [name]: e.target.type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to update settings would go here
      // await axios.put('/api/admin/settings', settings);
      setStatus({
        type: "success",
        message: "Settings updated successfully",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Failed to update settings",
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Site Settings
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          {status.message && (
            <Alert severity={status.type} sx={{ mb: 3 }}>
              {status.message}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Site Name"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={settings.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  multiline
                  rows={2}
                  value={settings.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableNotifications}
                      onChange={handleChange}
                      name="enableNotifications"
                    />
                  }
                  label="Enable Email Notifications"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                      name="maintenanceMode"
                    />
                  }
                  label="Maintenance Mode"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Save Settings
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings;
