import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getImageIndex = (index) => {
    if (index < 0) return images.length - 1;
    if (index >= images.length) return 0;
    return index;
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => getImageIndex(prevIndex - 1));
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => getImageIndex(prevIndex + 1));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        height: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fff",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onTransitionEnd={() => {
              if (currentIndex === index) {
                setIsTransitioning(false);
              }
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                border: "2px solid rgba(0, 0, 0, 0.3)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>
        ))}

        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "15%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(255,255,255,0.5), transparent)",
            opacity: 0,
            transition: "opacity 0.3s",
            "&:hover": {
              opacity: 1,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            pl: 2,
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "transparent",
              border: "none",
              color: "rgba(0, 0, 0, 0.7)",
              "&:hover": {
                bgcolor: "transparent",
              },
              cursor: isTransitioning ? "default" : "pointer",
            }}
          >
            <ArrowBack sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>

        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "15%",
            height: "100%",
            background:
              "linear-gradient(to left, rgba(255,255,255,0.5), transparent)",
            opacity: 0,
            transition: "opacity 0.3s",
            "&:hover": {
              opacity: 1,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pr: 2,
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={handleNext}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "transparent",
              border: "none",
              color: "rgba(0, 0, 0, 0.7)",
              "&:hover": {
                bgcolor: "transparent",
              },
              cursor: isTransitioning ? "default" : "pointer",
            }}
          >
            <ArrowForward sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageSlider;
