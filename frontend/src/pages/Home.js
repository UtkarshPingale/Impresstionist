import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  const [currentExhibition, setCurrentExhibition] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Gallery images for the slider
  const sliderImages = [
    "/gallery-images/gallery1.jpg",
    "/gallery-images/gallery2.jpg",
    "/gallery-images/gallery3.jpg",
    "/gallery-images/gallery4.png",
    "/gallery-images/gallery5.png",
    "/gallery-images/gallery6.png",
    "/gallery-images/gallery7.png",
    "/gallery-images/gallery8.png",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exhibitionRes = await axios.get("/api/exhibitions/current");
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
          height: { xs: "100vh", md: "100vh" },
          position: "relative",
          overflow: "hidden",
          backgroundImage: "url('/banner-image-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          bgcolor: "primary.main",
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          },
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
              color: "black",
              mb: 2,
              ml: -15,
            }}
          >
            ABSTRACT
            <br />
            IMPERSSIONIST
            <br />
            ARTIST
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 4, maxWidth: "600px", ml: -15, color: "black" }}
          >
            Art is a creative expression that communicates ideas and emotions
            through various forms, such as painting and sculpture. Abstract Art
            goes beyond realistic representation, using shapes, colors, and
            lines to evoke emotions and invite personal interpretation.
          </Typography>
        </Container>
      </Box>

      {/* Image Slider Section */}
      <Box sx={{ py: 8, bgcolor: "#f8f8f8" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 6,
              fontFamily: '"Times New Roman", serif',
              fontWeight: "normal",
              color: "#000000",
            }}
          >
            Featured Works
          </Typography>
          <ImageSlider images={sliderImages} />
        </Container>
      </Box>

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

      {/* Studio & Details Section */}
      <Box sx={{ py: 12, bgcolor: "#ffffff" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 0 } }}>
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Times New Roman", serif',
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Studio & Details
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                maxWidth: "600px",
              }}
            >
              More details about artist and total awards, press & media. Each
              piece invites viewers to look deeper, sparking personal
              interpretations and fresh perspectives on modern abstraction.
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              mx: "auto",
              "&::before": {
                content: '""',
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: "100%",
                bgcolor: "#e0e0e0",
                zIndex: 0,
              },
            }}
          >
            {[
              {
                icon: "🎨",
                title: "Studio",
                description:
                  "A creative space where imagination meets canvas, bringing abstract visions to life.",
              },
              {
                icon: "🏆",
                title: "Awards",
                description:
                  "Recognition for innovative contributions to contemporary abstract art.",
              },
              {
                icon: "👤",
                title: "About Me",
                description:
                  "Dedicated artist with a passion for exploring new dimensions in abstract expression.",
              },
              {
                icon: "📰",
                title: "Press & Media",
                description:
                  "Featured in leading art publications and media coverage worldwide.",
              },
              {
                icon: "🤝",
                title: "Patron",
                description:
                  "Join our community of art enthusiasts and collectors supporting creative innovation.",
              },
              {
                icon: "⭐",
                title: "Testimonials",
                description:
                  "Hear from collectors and critics about their experience with our artwork.",
              },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
                  position: "relative",
                  mb: -4,
                  mt: index === 0 ? 0 : -2,
                  zIndex: 6 - index,
                  width: "100%",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    [index % 2 === 0 ? "left" : "right"]: "calc(50% - 1px)",
                    width: "40px",
                    height: "2px",
                    bgcolor: "#e0e0e0",
                    transform: "translateY(-50%)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "90%", sm: "45%", md: "40%" },
                    display: "flex",
                    alignItems: "center",
                    p: 2.5,
                    bgcolor: "#f8f8f8",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    "&:hover": {
                      transform:
                        index % 2 === 0
                          ? "translateX(-12px)"
                          : "translateX(12px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      bgcolor: "#ffffff",
                      zIndex: 10,
                    },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: "2.5rem",
                      mx: 2,
                      minWidth: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Typography>
                  <Box
                    sx={{
                      textAlign: index % 2 === 0 ? "right" : "left",
                      flex: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 1,
                        fontFamily: '"Times New Roman", serif',
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#666",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* AR Preview Section */}
      <Container maxWidth="lg" sx={{ py: 8, bgcolor: "#f8f8f8" }}>
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
