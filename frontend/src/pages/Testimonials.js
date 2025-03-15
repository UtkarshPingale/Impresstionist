import React from "react";
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
} from "@mui/material";
import { FormatQuote as QuoteIcon } from "@mui/icons-material";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Art Collector",
    avatar: "/images/testimonials/sarah.jpg",
    rating: 5,
    text: "The attention to detail and emotional depth in each piece is remarkable. Working with this artist has been an absolute pleasure, and the artwork has become the centerpiece of my collection.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Gallery Director",
    avatar: "/images/testimonials/michael.jpg",
    rating: 5,
    text: "The artist's unique vision and professional approach have made our exhibitions incredibly successful. Their work consistently draws crowds and sparks meaningful conversations.",
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Interior Designer",
    avatar: "/images/testimonials/emma.jpg",
    rating: 5,
    text: "I've commissioned multiple pieces for my clients, and each time the results have exceeded expectations. The ability to capture the essence of a space through art is truly remarkable.",
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Private Collector",
    avatar: "/images/testimonials/david.jpg",
    rating: 5,
    text: "Not only is the artwork stunning, but the entire experience of working with the artist has been exceptional. Their passion for art and dedication to client satisfaction is evident.",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Museum Curator",
    avatar: "/images/testimonials/lisa.jpg",
    rating: 5,
    text: "The artist's work has brought a fresh perspective to our contemporary collection. Their innovative approach to combining traditional and digital techniques is truly groundbreaking.",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Corporate Art Consultant",
    avatar: "/images/testimonials/james.jpg",
    rating: 5,
    text: "We've placed several pieces in major corporate collections, and the feedback has been overwhelmingly positive. The artist's ability to create work that resonates in professional spaces is outstanding.",
  },
];

const Testimonials = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Client Testimonials
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
          sx={{ mb: 6 }}
        >
          What collectors and art professionals are saying
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item key={testimonial.id} xs={12} md={6}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{ width: 64, height: 64, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {testimonial.name}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {testimonial.role}
                      </Typography>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        size="small"
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <QuoteIcon
                      color="primary"
                      sx={{ fontSize: 40, mr: 2, mt: -1 }}
                    />
                    <Typography variant="body1" paragraph>
                      {testimonial.text}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Share Your Experience
          </Typography>
          <Typography align="center" paragraph>
            If you've collected or commissioned artwork, we'd love to hear about
            your experience. Please contact us to share your testimonial.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Testimonials;
