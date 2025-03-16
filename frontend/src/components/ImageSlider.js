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
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => getImageIndex(prevIndex - 1));
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => getImageIndex(prevIndex + 1));
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        height: "auto",
        minHeight: "600px",
        bgcolor: "#f8f8f8",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        perspective: "1500px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "relative",
          height: "auto",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Previous Image */}
        <Box
          sx={{
            position: "absolute",
            left: "2%",
            width: "25%",
            height: "auto",
            opacity: isTransitioning ? 0.3 : 0.5,
            filter: "blur(2px)",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isTransitioning
              ? "translateX(-10%) translateZ(-150px) rotateY(55deg)"
              : "translateX(0) translateZ(-100px) rotateY(45deg)",
            transformOrigin: "left center",
          }}
        >
          <img
            src={images[getImageIndex(currentIndex - 1)]}
            alt="Previous"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </Box>

        {/* Current Image */}
        <Box
          sx={{
            width: "50%",
            height: "auto",
            margin: "0 auto",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isTransitioning
              ? "scale(0.95) translateY(2%) translateZ(50px)"
              : "scale(1.1) translateY(0) translateZ(150px)",
            transformOrigin: "center center",
            zIndex: 2,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          <img
            src={images[currentIndex]}
            alt="Current"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </Box>

        {/* Next Image */}
        <Box
          sx={{
            position: "absolute",
            right: "2%",
            width: "25%",
            height: "auto",
            opacity: isTransitioning ? 0.3 : 0.5,
            filter: "blur(2px)",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isTransitioning
              ? "translateX(10%) translateZ(-150px) rotateY(-55deg)"
              : "translateX(0) translateZ(-100px) rotateY(-45deg)",
            transformOrigin: "right center",
          }}
        >
          <img
            src={images[getImageIndex(currentIndex + 1)]}
            alt="Next"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </Box>
      </Box>

      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: "5%",
          zIndex: 3,
          bgcolor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.9)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <ArrowBack />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: "5%",
          zIndex: 3,
          bgcolor: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.9)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default ImageSlider;
