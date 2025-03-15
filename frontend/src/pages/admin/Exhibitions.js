import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import axios from "axios";

const AdminExhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    location: "",
    address: "",
    city: "",
    state: "",
    country: "",
    admissionType: "free",
    admissionPrice: "",
    image: null,
    status: "upcoming",
  });

  const admissionTypes = ["free", "paid", "donation"];
  const statusOptions = ["upcoming", "current", "past"];

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const response = await axios.get("/api/exhibitions");
      setExhibitions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
      setLoading(false);
    }
  };

  const handleOpenDialog = (exhibition = null) => {
    if (exhibition) {
      setSelectedExhibition(exhibition);
      setFormData({
        title: exhibition.title,
        description: exhibition.description,
        startDate: new Date(exhibition.startDate),
        endDate: new Date(exhibition.endDate),
        location: exhibition.location,
        address: exhibition.address,
        city: exhibition.city,
        state: exhibition.state,
        country: exhibition.country,
        admissionType: exhibition.admissionType,
        admissionPrice: exhibition.admissionPrice,
        image: exhibition.image,
        status: exhibition.status,
      });
    } else {
      setSelectedExhibition(null);
      setFormData({
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        location: "",
        address: "",
        city: "",
        state: "",
        country: "",
        admissionType: "free",
        admissionPrice: "",
        image: null,
        status: "upcoming",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedExhibition(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (selectedExhibition) {
        await axios.put(
          `/api/exhibitions/${selectedExhibition._id}`,
          formDataToSend
        );
      } else {
        await axios.post("/api/exhibitions", formDataToSend);
      }

      fetchExhibitions();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving exhibition:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exhibition?")) {
      try {
        await axios.delete(`/api/exhibitions/${id}`);
        fetchExhibitions();
      } catch (error) {
        console.error("Error deleting exhibition:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "current":
        return "success";
      case "upcoming":
        return "primary";
      case "past":
        return "default";
      default:
        return "default";
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Exhibitions</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Exhibition
        </Button>
      </Box>

      <Grid container spacing={3}>
        {exhibitions.map((exhibition) => (
          <Grid item xs={12} sm={6} md={4} key={exhibition._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {exhibition.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {exhibition.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(exhibition.startDate).toLocaleDateString()} -{" "}
                  {new Date(exhibition.endDate).toLocaleDateString()}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={
                      exhibition.status.charAt(0).toUpperCase() +
                      exhibition.status.slice(1)
                    }
                    color={getStatusColor(exhibition.status)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={
                      exhibition.admissionType.charAt(0).toUpperCase() +
                      exhibition.admissionType.slice(1)
                    }
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpenDialog(exhibition)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(exhibition._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedExhibition ? "Edit Exhibition" : "Add New Exhibition"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(date) => handleDateChange(date, "startDate")}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(date) => handleDateChange(date, "endDate")}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Admission Type"
                name="admissionType"
                value={formData.admissionType}
                onChange={handleInputChange}
                required
              >
                {admissionTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Admission Price"
                name="admissionPrice"
                type="number"
                value={formData.admissionPrice}
                onChange={handleInputChange}
                disabled={formData.admissionType === "free"}
                required={formData.admissionType !== "free"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedExhibition ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminExhibitions;
