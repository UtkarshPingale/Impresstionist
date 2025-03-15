import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import axios from "axios";

const Home = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [currentExhibition, setCurrentExhibition] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artworksRes, exhibitionRes] = await Promise.all([
          axios.get("/api/artworks/featured"),
          axios.get("/api/exhibitions/current"),
        ]);
        setFeaturedArtworks(artworksRes.data);
        setCurrentExhibition(exhibitionRes.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "60vh", md: "80vh" },
          position: "relative",
          overflow: "hidden",
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Welcome to Impress
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: "600px" }}>
            Discover unique artworks and immerse yourself in contemporary art
            exhibitions
          </Typography>
          <Button
            component={RouterLink}
            to="/gallery"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Explore Gallery
          </Button>
        </Container>
      </Box>

      {/* Featured Artworks Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" align="center" sx={{ mb: 6 }}>
          Featured Artworks
        </Typography>
        <Grid container spacing={4}>
          {featuredArtworks.map((artwork) => (
            <Grid item xs={12} sm={6} md={4} key={artwork._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={artwork.images[0]?.url || "/placeholder.jpg"}
                  alt={artwork.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {artwork.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {artwork.description.substring(0, 100)}...
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    ${artwork.price.toLocaleString()}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={`/gallery/${artwork._id}`}
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Current Exhibition Section */}
      {currentExhibition && (
        <Box sx={{ bgcolor: "grey.100", py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" gutterBottom>
                  Current Exhibition
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  {currentExhibition.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {currentExhibition.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {new Date(currentExhibition.startDate).toLocaleDateString()} -{" "}
                  {new Date(currentExhibition.endDate).toLocaleDateString()}
                </Typography>
                <Button
                  component={RouterLink}
                  to={`/exhibitions/${currentExhibition._id}`}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Learn More
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    height: "400px",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  <img
                    src={currentExhibition.images[0]?.url || "/placeholder.jpg"}
                    alt={currentExhibition.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* AR Preview Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" align="center" sx={{ mb: 6 }}>
          Try AR Preview
        </Typography>
        <Box
          sx={{
            height: "400px",
            bgcolor: "grey.200",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            {/* Add 3D model here */}
          </Canvas>
        </Box>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1" paragraph>
            Experience how the artwork would look in your space using our AR
            preview feature
          </Typography>
          <Button
            component={RouterLink}
            to="/gallery"
            variant="contained"
            color="primary"
            size="large"
          >
            Try AR Preview
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
