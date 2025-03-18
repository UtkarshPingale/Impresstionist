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
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const AdminAwards = () => {
  const [awards, setAwards] = useState([
    {
      id: 1,
      title: "Best Abstract Artist",
      year: "2023",
      organization: "International Art Society",
      description: "Awarded for exceptional contribution to abstract art",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    organization: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setAwards(
        awards.map((award) =>
          award.id === editingId ? { ...formData, id: editingId } : award
        )
      );
      setEditingId(null);
    } else {
      setAwards([...awards, { ...formData, id: Date.now() }]);
    }
    setFormData({ title: "", year: "", organization: "", description: "" });
  };

  const handleEdit = (award) => {
    setFormData(award);
    setEditingId(award.id);
  };

  const handleDelete = (id) => {
    setAwards(awards.filter((award) => award.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Awards
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Award Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {editingId ? "Update Award" : "Add Award"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Grid container spacing={3}>
        {awards.map((award) => (
          <Grid item xs={12} sm={6} md={4} key={award.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {award.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {award.year} - {award.organization}
                </Typography>
                <Typography variant="body2">{award.description}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(award)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(award.id)}>
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

export default AdminAwards;
