import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Rating,
  Card,
  CardContent,
  useTheme,
  TextField,
  Button,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import { FormatQuote as QuoteIcon } from "@mui/icons-material";

const Testimonials = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 5,
    comment: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // This would typically come from a backend API
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Art Collector",
      rating: 5,
      date: "2023-06-15",
      comment:
        "The artwork exceeded my expectations. The attention to detail and the emotional depth captured in each piece is remarkable.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Gallery Owner",
      rating: 5,
      date: "2023-05-20",
      comment:
        "Working with this artist has been an absolute pleasure. Their unique vision and professional approach make them stand out in the contemporary art scene.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This would typically be an API call
      console.log("Submitting testimonial:", formData);

      // Show success message
      setSnackbarMessage(
        "Thank you for your testimonial! It will be reviewed by our team."
      );
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Reset form
      setFormData({
        name: "",
        role: "",
        rating: 5,
        comment: "",
      });
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setSnackbarMessage(
        "There was an error submitting your testimonial. Please try again."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          Client Testimonials
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          What collectors and art enthusiasts are saying
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {testimonials.map((testimonial) => (
          <Grid item xs={12} md={6} key={testimonial.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="center" mb={3}>
                  <QuoteIcon
                    sx={{
                      fontSize: 60,
                      color: theme.palette.primary.main,
                      opacity: 0.2,
                    }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontStyle: "italic",
                    textAlign: "center",
                    mb: 3,
                  }}
                >
                  "{testimonial.comment}"
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: theme.palette.primary.main,
                      mb: 1,
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" component="h3">
                    {testimonial.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {testimonial.role}
                  </Typography>
                  <Rating value={testimonial.rating} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={8} mb={4}>
        <Divider />
      </Box>

      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h2" gutterBottom>
          Share Your Experience
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          We'd love to hear about your experience with our artwork
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} maxWidth="md" mx="auto">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              placeholder="e.g., Art Collector, Gallery Owner"
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend" gutterBottom>
                Your Rating
              </Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={(event, newValue) => handleRatingChange(newValue)}
                size="large"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Testimonial"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              required
              placeholder="Share your experience with our artwork..."
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  minWidth: 200,
                  mt: 2,
                }}
              >
                Submit Testimonial
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Testimonials;
