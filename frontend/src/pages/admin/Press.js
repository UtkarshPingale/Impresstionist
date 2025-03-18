import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import ImageUpload from "../../components/common/ImageUpload";

const AdminPress = () => {
  const [pressItems, setPressItems] = useState([
    {
      id: 1,
      title: "The Evolution of Abstract Art",
      publication: "Art Weekly",
      date: "2023-05-15",
      description:
        "An in-depth look at the innovative approaches in contemporary abstract art",
      link: "https://artweekly.com/article",
      image: "https://source.unsplash.com/random/800x400?abstract-art",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    publication: "",
    date: "",
    description: "",
    link: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setPressItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...formData, id: editingId } : item
        )
      );
      setEditingId(null);
    } else {
      setPressItems((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setFormData({
      title: "",
      publication: "",
      date: "",
      description: "",
      link: "",
      image: "",
    });
    setPreviewUrl("");
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setPreviewUrl(item.image);
  };

  const handleDelete = (id) => {
    setPressItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Press & Media
      </Typography>

      <Card sx={{ mb: 4, p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Publication"
                name="publication"
                value={formData.publication}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUpload
                onFileSelect={handleFileSelect}
                previewUrl={previewUrl}
                label="Upload Press Image"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                {editingId ? "Update" : "Add"} Press Item
              </Button>
              {editingId && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      title: "",
                      publication: "",
                      date: "",
                      description: "",
                      link: "",
                      image: "",
                    });
                    setPreviewUrl("");
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Card>

      <Grid container spacing={3}>
        {pressItems.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card>
              {item.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: "cover" }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {item.publication} •{" "}
                  {new Date(item.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" paragraph>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
                <Button
                  size="small"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Article
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminPress;
