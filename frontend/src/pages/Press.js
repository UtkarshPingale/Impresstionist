import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from "@mui/material";
import { Launch as LaunchIcon } from "@mui/icons-material";

const pressReleases = [
  {
    title: "Artist Breaks New Ground with Innovative Exhibition",
    publication: "Art Weekly",
    date: "March 15, 2024",
    image: "/images/press/article1.jpg",
    excerpt:
      "The latest exhibition showcases a groundbreaking fusion of traditional and digital art techniques...",
    url: "#",
    tags: ["Exhibition", "Innovation"],
  },
  {
    title: "Interview: The Future of Digital Art",
    publication: "Modern Artist Magazine",
    date: "February 28, 2024",
    image: "/images/press/article2.jpg",
    excerpt:
      "In an exclusive interview, we discuss the evolving landscape of digital art and its impact...",
    url: "#",
    tags: ["Interview", "Digital Art"],
  },
  {
    title: "Rising Star in Contemporary Art Scene",
    publication: "Art & Culture Today",
    date: "January 10, 2024",
    image: "/images/press/article3.jpg",
    excerpt:
      "Profile feature on the emerging talent making waves in the contemporary art world...",
    url: "#",
    tags: ["Profile", "Contemporary Art"],
  },
];

const Press = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Press & Media
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Recent Coverage
              </Typography>
              <Grid container spacing={3}>
                {pressReleases.map((article, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card elevation={3}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={article.image}
                        alt={article.title}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h3"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {article.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          gutterBottom
                        >
                          {article.publication} - {article.date}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            mb: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {article.excerpt}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          {article.tags.map((tag, idx) => (
                            <Chip
                              key={idx}
                              label={tag}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                          ))}
                        </Box>
                        <Button
                          variant="outlined"
                          endIcon={<LaunchIcon />}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Press Kit
              </Typography>
              <Typography paragraph>
                Download our press kit for high-resolution images, artist bio,
                and recent press releases.
              </Typography>
              <Button variant="contained" color="primary">
                Download Press Kit
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Media Inquiries
              </Typography>
              <Typography paragraph>
                For press and media inquiries, please contact our media
                relations team:
              </Typography>
              <Typography>
                Email: press@example.com
                <br />
                Phone: +1 (555) 123-4567
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Press;
