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
  CardActions,
  useTheme,
} from "@mui/material";
import {
  Launch as LaunchIcon,
  Article as ArticleIcon,
} from "@mui/icons-material";

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
  const theme = useTheme();

  // This would typically come from a backend API
  const pressItems = [
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
    {
      id: 2,
      title: "Breaking Boundaries in Modern Art",
      publication: "Creative Magazine",
      date: "2023-04-01",
      description:
        "Feature article exploring the intersection of traditional and contemporary techniques",
      link: "https://creativemag.com/article",
      image: "https://source.unsplash.com/random/800x400?modern-art",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          Press & Media
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Featured articles and media coverage
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {pressItems.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
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
              <CardMedia
                component="img"
                height="240"
                image={item.image}
                alt={item.title}
                sx={{
                  objectFit: "cover",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <ArticleIcon
                    sx={{
                      fontSize: 40,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  />
                  <Typography variant="h5" component="h2">
                    {item.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  {item.publication} •{" "}
                  {new Date(item.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" paragraph>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Article
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Press;
