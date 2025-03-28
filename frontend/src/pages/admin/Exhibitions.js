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
  Image as ImageIcon,
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
    exhibitionType: "offline",
    location: "",
    address: "",
    city: "",
    state: "",
    country: "",
    image: null,
    status: "upcoming",
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [openGalleryDialog, setOpenGalleryDialog] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const statusOptions = ["upcoming", "current", "past"];
  const exhibitionTypes = ["online", "offline"];

  useEffect(() => {
    fetchExhibitions();
    fetchGalleryImages();

    // Check status updates every hour
    const statusInterval = setInterval(updateExhibitionStatuses, 3600000);
    return () => clearInterval(statusInterval);
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

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get("/api/gallery");
      setGalleryImages(response.data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const updateExhibitionStatuses = async () => {
    const now = new Date();
    const updatedExhibitions = exhibitions.map((exhibition) => {
      const startDate = new Date(exhibition.startDate);
      const endDate = new Date(exhibition.endDate);
      let newStatus = exhibition.status;

      if (now > endDate) {
        newStatus = "past";
      } else if (now >= startDate && now <= endDate) {
        newStatus = "current";
      } else if (now < startDate) {
        newStatus = "upcoming";
      }

      return { ...exhibition, status: newStatus };
    });

    // Update any exhibitions whose status has changed
    const changes = updatedExhibitions.filter(
      (exhibition, index) => exhibition.status !== exhibitions[index].status
    );

    for (const exhibition of changes) {
      try {
        await axios.put(`/api/exhibitions/${exhibition._id}`, {
          status: exhibition.status,
        });
      } catch (error) {
        console.error("Error updating exhibition status:", error);
      }
    }

    if (changes.length > 0) {
      fetchExhibitions();
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
        exhibitionType: exhibition.exhibitionType || "offline",
        location: exhibition.location,
        address: exhibition.address,
        city: exhibition.city,
        state: exhibition.state,
        country: exhibition.country,
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
        exhibitionType: "offline",
        location: "",
        address: "",
        city: "",
        state: "",
        country: "",
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

  const handleSelectImage = (image) => {
    setFormData((prev) => ({
      ...prev,
      image: image.url,
    }));
    setPreviewUrl(image.url);
    setOpenGalleryDialog(false);
  };

  const handleOpenGalleryDialog = () => {
    setOpenGalleryDialog(true);
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
                {exhibition.exhibitionType === "offline" && (
                  <Typography color="textSecondary" gutterBottom>
                    {exhibition.location}
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary">
                  {new Date(exhibition.startDate).toLocaleDateString()} -{" "}
                  {new Date(exhibition.endDate).toLocaleDateString()}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={exhibition.exhibitionType}
                    color="secondary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={exhibition.status}
                    color={getStatusColor(exhibition.status)}
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
              <TextField
                fullWidth
                select
                label="Exhibition Type"
                name="exhibitionType"
                value={formData.exhibitionType}
                onChange={handleInputChange}
                required
              >
                {exhibitionTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
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
            {formData.exhibitionType === "offline" && (
              <>
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
              </>
            )}
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
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  onClick={handleOpenGalleryDialog}
                  fullWidth
                >
                  Select Image from Gallery
                </Button>
                {previewUrl && (
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Preview"
                    sx={{ width: "100%", height: 200, objectFit: "cover" }}
                  />
                )}
              </Box>
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

      <Dialog
        open={openGalleryDialog}
        onClose={() => setOpenGalleryDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select Image from Gallery</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {galleryImages.map((image) => (
              <Grid item xs={4} key={image._id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                  onClick={() => handleSelectImage(image)}
                >
                  <Box
                    component="img"
                    src={image.url}
                    alt={image.title}
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGalleryDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminExhibitions;
