import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Rating,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Art Collector",
      rating: 5,
      comment:
        "The artwork I purchased is absolutely stunning. The attention to detail and the emotional depth in each piece is remarkable.",
      date: "2024-01-10",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 5,
    comment: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setTestimonials(
        testimonials.map((item) =>
          item.id === editingId ? { ...formData, id: editingId } : item
        )
      );
      setEditingId(null);
    } else {
      setTestimonials([...testimonials, { ...formData, id: Date.now() }]);
    }
    setFormData({
      name: "",
      role: "",
      rating: 5,
      comment: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Testimonials
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={(event, newValue) => handleRatingChange(newValue)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Testimonial"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {editingId ? "Update Testimonial" : "Add Testimonial"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Grid container spacing={3}>
        {testimonials.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {item.role} - {new Date(item.date).toLocaleDateString()}
                </Typography>
                <Rating value={item.rating} readOnly />
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {item.comment}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminTestimonials;
