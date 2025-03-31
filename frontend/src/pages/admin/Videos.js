import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "../../config/axios";
import ImageUpload from "../../components/common/ImageUpload";

const AdminVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    thumbnail: null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/api/videos");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
      setFormData((prev) => ({ ...prev, thumbnail: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Submitting video form data:", formData);
      
      const formDataToSend = new FormData();
      formDataToSend.append("url", formData.url);
      formDataToSend.append("title", formData.title || `Video ${new Date().getTime()}`);
      
      if (formData.thumbnail) {
        formDataToSend.append("thumbnail", formData.thumbnail);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      let response;
      if (editingIndex !== null) {
        response = await axios.put(
          `/api/videos/${videos[editingIndex]._id}`,
          formDataToSend,
          config
        );
        console.log("Video updated successfully:", response.data);
      } else {
        response = await axios.post("/api/videos", formDataToSend, config);
        console.log("Video added successfully:", response.data);
      }
      
      // Refresh videos list
      fetchVideos();
      
      // Reset form
      setFormData({ url: "", title: "", thumbnail: null });
      setThumbnailPreview(null);
      setEditingIndex(null);
      setShowSuccess(true);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video. Please check console for details.");
    }
  };

  const handleViewOnHomePage = () => {
    // Navigate to the home page to see the new video
    navigate('/');
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({ url: videos[index].url, title: videos[index].title, thumbnail: null });
    setThumbnailPreview(videos[index].thumbnail);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Home Videos
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Video URL"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              helperText="Enter YouTube or Instagram URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID or https://www.instagram.com/reels/...)"
              placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://www.instagram.com/reels/..."
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Video Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageUpload
              onFileSelect={handleThumbnailSelect}
              previewUrl={thumbnailPreview}
              label="Upload Thumbnail"
              sx={{ height: "200px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              {editingIndex !== null ? "Update Video" : "Add Video"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {showSuccess && (
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          Video uploaded successfully!
        </Typography>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Video uploaded successfully!
        </Alert>
      </Snackbar>

      <Grid container spacing={3}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={video._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Video {index + 1}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Title: {video.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  URL: {video.url}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Thumbnail:
                </Typography>
                <img
                  src={video.thumbnail}
                  alt={`Thumbnail for video ${index + 1}`}
                  style={{ width: "100%", height: "auto", marginTop: "8px" }}
                />
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(video._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={handleViewOnHomePage}>
        View on Home Page
      </Button>
    </Box>
  );
};

export default AdminVideos;
