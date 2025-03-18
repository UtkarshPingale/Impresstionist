import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import axios from "axios";
import ImageUpload from "../../components/common/ImageUpload";

const AdminArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    style: "",
    year: "",
    dimensions: "",
    medium: "",
    image: null,
    arModel: null,
    featured: false,
    available: true,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [arModelName, setArModelName] = useState("");

  const categories = [
    "Painting",
    "Sculpture",
    "Photography",
    "Digital Art",
    "Mixed Media",
    "Other",
  ];

  const styles = [
    "Abstract",
    "Realistic",
    "Impressionist",
    "Contemporary",
    "Modern",
    "Traditional",
    "Other",
  ];

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get("/api/artworks");
      setArtworks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setLoading(false);
    }
  };

  const handleOpenDialog = (artwork = null) => {
    if (artwork) {
      setSelectedArtwork(artwork);
      setFormData({
        title: artwork.title,
        description: artwork.description,
        price: artwork.price,
        category: artwork.category,
        style: artwork.style,
        year: artwork.year,
        dimensions: artwork.dimensions,
        medium: artwork.medium,
        image: artwork.image,
        arModel: artwork.arModel,
        featured: artwork.featured,
        available: artwork.available,
      });
    } else {
      setSelectedArtwork(null);
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        style: "",
        year: "",
        dimensions: "",
        medium: "",
        image: null,
        arModel: null,
        featured: false,
        available: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedArtwork(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleArModelSelect = (file) => {
    if (file) {
      setArModelName(file.name);
      setFormData((prev) => ({
        ...prev,
        arModel: file,
      }));
    }
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

      if (selectedArtwork) {
        await axios.put(`/api/artworks/${selectedArtwork._id}`, formDataToSend);
      } else {
        await axios.post("/api/artworks", formDataToSend);
      }

      fetchArtworks();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving artwork:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        await axios.delete(`/api/artworks/${id}`);
        fetchArtworks();
      } catch (error) {
        console.error("Error deleting artwork:", error);
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Artworks</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Artwork
        </Button>
      </Box>

      <Grid container spacing={3}>
        {artworks.map((artwork) => (
          <Grid item xs={12} sm={6} md={4} key={artwork._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={artwork.image}
                alt={artwork.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {artwork.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {artwork.category} • {artwork.style}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ${artwork.price}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={artwork.available ? "Available" : "Sold"}
                    color={artwork.available ? "success" : "error"}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {artwork.featured && (
                    <Chip label="Featured" color="primary" size="small" />
                  )}
                </Box>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpenDialog(artwork)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(artwork._id)}>
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
          {selectedArtwork ? "Edit Artwork" : "Add New Artwork"}
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
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Style"
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                required
              >
                {styles.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Medium"
                name="medium"
                value={formData.medium}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUpload
                onFileSelect={handleImageSelect}
                previewUrl={imagePreviewUrl}
                label="Upload Artwork Image"
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUpload
                onFileSelect={handleArModelSelect}
                previewUrl={null}
                label="Upload AR Model"
                acceptedFiles=".glb,.gltf"
                helperText="Supported formats: GLB, GLTF"
                showPreview={false}
                customText={arModelName || "No file selected"}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedArtwork ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminArtworks;
