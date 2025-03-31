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
import axios from "../config/axios";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  const [currentExhibition, setCurrentExhibition] = useState(null);
  const [videos, setVideos] = useState([]);
  const [popupVideo, setPopupVideo] = useState(null);
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
        if (exhibitionRes.data && exhibitionRes.data.length > 0) {
          setCurrentExhibition(exhibitionRes.data[0]);
        }
        
        // Fetch videos
        const videosRes = await axios.get("/api/videos");
        if (videosRes.data) {
          // Ensure we're loading the latest data
          console.log("Loaded videos:", videosRes.data);
          setVideos(videosRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    
    // This will ensure videos get refreshed when we return to home page
    return () => {
      // Clean up function runs when component unmounts
      console.log("Home component unmounting - will refresh on next visit");
    };
  }, []);

  return (
    <Box>
      {/* Image Slider Section */}
      <Box sx={{ bgcolor: "#f8f8f8", width: "100%", overflow: "hidden" }}>
        <Container maxWidth="lg">
          <ImageSlider images={sliderImages} />
        </Container>
      </Box>

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

      {/* Current Exhibition Section */}
      {currentExhibition && (
        <Box
          sx={{ bgcolor: "grey.100", py: 8, width: "100%", overflow: "hidden" }}
        >
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
      <Box
        sx={{ py: 12, bgcolor: "#ffffff", width: "100%", overflow: "hidden" }}
      >
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
                  mb: 2,
                  mt: index === 0 ? 0 : 2,
                  zIndex: 6 - index,
                  width: "100%",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    [index % 2 === 0 ? "left" : "right"]: "calc(50% - 1px)",
                    width: "110px",
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
                    p: 3.5,
                    mb: 2,
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

      {/* Video Section */}
      <Box sx={{ py: 8, bgcolor: "#f8f8f8", width: "100%", overflow: "hidden" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Times New Roman", serif',
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              textAlign: "center",
            }}
          >
            Explore the Artist's Vision
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 3,
              mt: 4,
            }}
          >
            {videos.length > 0 ? (
              videos.map((video) => (
                <Box
                  key={video._id}
                  sx={{
                    height: "200px",
                    bgcolor: "grey.200",
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                  onClick={() => setPopupVideo(video.url)}
                >
                  <img
                    src={video.thumbnail || "/thumbnails/default-video.jpg"}
                    alt={video.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 1.5,
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                    }}
                  >
                    <Typography variant="subtitle1">{video.title}</Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ gridColumn: "1 / -1", textAlign: "center" }}>
                No videos available at the moment.
              </Typography>
            )}
          </Box>

          {/* Popup Video */}
          {popupVideo && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
              onClick={() => setPopupVideo(null)}
            >
              <Box 
                sx={{ 
                  width: "80%", 
                  height: "80%",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={popupVideo}
                  title="Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ 
                    position: "absolute", 
                    top: "-40px", 
                    right: "0",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopupVideo(null);
                  }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body1" paragraph>
              Discover the inspiration and process behind the artist's creations
              through these exclusive videos.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
