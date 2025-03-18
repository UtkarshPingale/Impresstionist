import React from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PreviewImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  maxHeight: "200px",
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
}));

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: "center",
  backgroundColor: theme.palette.background.default,
  transition: "border-color 0.2s ease-in-out",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const ImageUpload = ({
  onFileSelect,
  previewUrl,
  label = "Upload Image",
  acceptedFiles = "image/*",
  helperText = "Supported formats: JPG, PNG, GIF",
  showPreview = true,
  customText = null,
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <Box>
      <UploadBox>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            mb: 2,
            backgroundColor: (theme) => theme.palette.primary.main,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          {label}
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept={acceptedFiles}
          />
        </Button>
        {customText ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              p: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {customText}
          </Typography>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              Drag and drop here or click to select
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              {helperText}
            </Typography>
          </>
        )}
      </UploadBox>
      {showPreview && previewUrl && (
        <Box mt={2} display="flex" justifyContent="center">
          <PreviewImage src={previewUrl} alt="Preview" />
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
