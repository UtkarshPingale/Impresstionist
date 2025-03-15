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
  TextField,
  MenuItem,
  Slider,
  FormControl,
  InputLabel,
  Select,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import axios from "axios";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    style: "",
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    year: "",
  });
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [showARPreview, setShowARPreview] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, artworks]);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get("/api/artworks");
      setArtworks(response.data);
      setFilteredArtworks(response.data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...artworks];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          artwork.description
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    // Style filter
    if (filters.style) {
      filtered = filtered.filter((artwork) => artwork.style === filters.style);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (artwork) => artwork.category === filters.category
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (artwork) =>
        artwork.price >= filters.minPrice && artwork.price <= filters.maxPrice
    );

    // Year filter
    if (filters.year) {
      filtered = filtered.filter(
        (artwork) => artwork.year === parseInt(filters.year)
      );
    }

    setFilteredArtworks(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleARPreview = (artwork) => {
    setSelectedArtwork(artwork);
    setShowARPreview(true);
  };

  const styles = [
    "Contemporary",
    "Abstract",
    "Realistic",
    "Impressionist",
    "Modern",
    "Other",
  ];

  const categories = [
    "Painting",
    "Sculpture",
    "Photography",
    "Digital Art",
    "Mixed Media",
    "Other",
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => 1900 + i
  ).reverse();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Gallery
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Style</InputLabel>
              <Select
                value={filters.style}
                label="Style"
                onChange={(e) => handleFilterChange("style", e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {styles.map((style) => (
                  <MenuItem key={style} value={style}>
                    {style}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={filters.year}
                label="Year"
                onChange={(e) => handleFilterChange("year", e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onChange={(_, newValue) => {
              handleFilterChange("minPrice", newValue[0]);
              handleFilterChange("maxPrice", newValue[1]);
            }}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            step={100}
            marks
          />
        </Box>
      </Box>

      {/* Artworks Grid */}
      <Grid container spacing={4}>
        {filteredArtworks.map((artwork) => (
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
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Chip label={artwork.style} size="small" />
                  <Chip label={artwork.category} size="small" />
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    component={RouterLink}
                    to={`/gallery/${artwork._id}`}
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleARPreview(artwork)}
                  >
                    AR Preview
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* AR Preview Modal */}
      {showARPreview && selectedArtwork && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              width: "90%",
              height: "90%",
              bgcolor: "white",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Button
              onClick={() => setShowARPreview(false)}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 1,
              }}
            >
              Close
            </Button>
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls />
              {/* Add 3D model here */}
            </Canvas>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Gallery;
