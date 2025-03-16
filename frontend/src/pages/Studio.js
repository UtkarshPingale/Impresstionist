import React from "react";
import { Container, Typography, Box, Paper, Button, Grid } from "@mui/material";

const Studio = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom
          sx={{fontFamily: '"Times New Roman", serif',
          fontWeight: "bold",
          mb: 3,
          fontSize: { xs: "2.5rem", md: "3.5rem" }}}
          >
          Studio
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Where Vision Meets Canvas
        </Typography>

        {/* Google Maps Section */}
        <Box sx={{ mb: 6, width: "100%", height: "450px" }}>
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1t5GxFrWmjTMhC6ihvBWbcLPylS0Mrag&ehbc=2E312F"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Studio Location"
          />
        </Box>

        {/* Studio Visit Section */}
        <Paper
          elevation={3}
          sx={{
            p: 6,
            background:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/studio/studio-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              textAlign: "left",
              letterSpacing: "0.1em",
              mb: 4,
            }}
          >
            IMPRESSIONIST STUDIO
          </Typography>

          <Box sx={{ textAlign: "left", mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ display: "inline", fontWeight: "bold" }}
            >
              Artist :
            </Typography>
            <Typography variant="h6" sx={{ display: "inline", ml: 1 }}>
              Abhang Balasaheb
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left", mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ display: "inline", fontWeight: "bold" }}
            >
              Address :
            </Typography>
            <Typography variant="h6" sx={{ display: "inline", ml: 1 }}>
              Jasminium, C-1102,
            </Typography>
            <Typography variant="h6">Magarpatta City, Hadapsar,</Typography>
            <Typography variant="h6">Pune - 411028, Maharashtra.</Typography>
          </Box>

          <Box sx={{ textAlign: "left", mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ display: "inline", fontWeight: "bold" }}
            >
              Contact No :
            </Typography>
            <Typography variant="h6" sx={{ display: "inline", ml: 1 }}>
              020 - 67220137
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left", mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ display: "inline", fontWeight: "bold" }}
            >
              Mobile No :
            </Typography>
            <Typography variant="h6" sx={{ display: "inline", ml: 1 }}>
              +91 9881700425 / 9422563261
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left", mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ display: "inline", fontWeight: "bold" }}
            >
              Email :
            </Typography>
            <Typography
              variant="h6"
              sx={{
                display: "inline",
                ml: 1,
                color: "#e6b800",
              }}
            >
              abhang14@gmail.com
            </Typography>
          </Box>

          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              component="a"
              href="/about#contact"
              sx={{
                bgcolor: "white",
                color: "black",
                px: 4,
                py: 1.5,
                "&:hover": {
                  bgcolor: "rgba(230, 230, 230, 0.9)",
                },
                width: 1000,
              }}
            >
              Schedule a Visit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Studio;
