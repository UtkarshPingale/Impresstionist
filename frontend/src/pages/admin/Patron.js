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
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const AdminPatron = () => {
  const [patrons, setPatrons] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Art Foundation Director",
      organization: "Global Arts Foundation",
      contribution: "Sponsored the Abstract Expressions Exhibition 2023",
      featured: true,
      image: "https://example.com/patron1.jpg",
      testimonial:
        "Supporting Impressionist has been a rewarding journey in promoting abstract art.",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    organization: "",
    contribution: "",
    featured: false,
    image: "",
    testimonial: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setPatrons(
        patrons.map((patron) =>
          patron.id === editingId ? { ...formData, id: editingId } : patron
        )
      );
      setEditingId(null);
    } else {
      setPatrons([...patrons, { ...formData, id: Date.now() }]);
    }
    setFormData({
      name: "",
      title: "",
      organization: "",
      contribution: "",
      featured: false,
      image: "",
      testimonial: "",
    });
  };

  const handleEdit = (patron) => {
    setFormData(patron);
    setEditingId(patron.id);
  };

  const handleDelete = (id) => {
    setPatrons(patrons.filter((patron) => patron.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Patrons
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
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contribution"
                name="contribution"
                value={formData.contribution}
                onChange={handleChange}
                multiline
                rows={2}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Testimonial"
                name="testimonial"
                value={formData.testimonial}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.featured}
                    onChange={handleChange}
                    name="featured"
                  />
                }
                label="Featured Patron"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {editingId ? "Update Patron" : "Add Patron"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Grid container spacing={3}>
        {patrons.map((patron) => (
          <Grid item xs={12} sm={6} md={4} key={patron.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {patron.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {patron.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {patron.organization}
                </Typography>
                {patron.featured && (
                  <Typography
                    color="primary"
                    variant="subtitle2"
                    sx={{ mb: 1 }}
                  >
                    Featured Patron
                  </Typography>
                )}
                <Typography variant="body2" paragraph>
                  <strong>Contribution:</strong> {patron.contribution}
                </Typography>
                <Typography variant="body2">
                  <strong>Testimonial:</strong> {patron.testimonial}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(patron)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(patron.id)}>
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

export default AdminPatron;
