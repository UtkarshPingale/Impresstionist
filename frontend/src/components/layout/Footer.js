import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Pinterest,
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", path: "/" },
        { text: "Gallery", path: "/gallery" },
        { text: "Exhibitions", path: "/exhibitions" },
        { text: "About", path: "/about" },
        { text: "Studio", path: "/Studio" },
      ],
    },
    {
      title: "Information",
      links: [
        { text: "Awards", path: "/awards" },
        { text: "Patron", path: "/patron" },
        { text: "Press", path: "/press" },
        { text: "Testimonials", path: "/testimonials" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", path: "/privacy" },
        { text: "Terms of Service", path: "/terms" },
        { text: "Shipping Policy", path: "/shipping" },
        { text: "Returns Policy", path: "/returns" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, url: "https://www.facebook.com/balasaheb.abhang/" },
    { icon: <Instagram />, url: "https://www.instagram.com/impressionist20/" },
    { icon: <Twitter />, url: "https://x.com/AbhangBalasahe2?s=08" },
    { icon: <YouTube />, url: "https://www.youtube.com/channel/UCcYAVAlswXE6Bqw5abPi0YQ" },
    { icon: <Pinterest />, url: "https://in.pinterest.com/impressionist14/" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 6,
        mt: "auto",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow:
          "0 4px 20px rgba(0, 0, 0, 0.3), 0 6px 50px rgba(0, 0, 0, 0.3)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.title}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.text} sx={{ mb: 1 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="inherit"
                      sx={{
                        textDecoration: "none",
                        position: "relative",
                        padding: "2px 0",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -2,
                          left: "50%",
                          width: "0",
                          height: "1px",
                          background: "rgba(255, 255, 255, 0.8)",
                          transition: "all 0.3s ease",
                          transform: "translateX(-50%)",
                          filter: "blur(0.5px)",
                          boxShadow: "0 0 2px rgba(255, 255, 255, 0)",
                        },
                        "&:hover": {
                          textDecoration: "none",
                          "&::after": {
                            width: "100%",
                            filter: "blur(1px)",
                            boxShadow: "0 0 4px rgba(255, 255, 255, 0.5)",
                          },
                        },
                      }}
                    >
                      {link.text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "rgba(255, 255, 255, 0.1)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
            © Copyright Impressionist - 2006
          </Typography>
          <Box>
            {socialLinks.map((social) => (
              <IconButton
                key={social.url}
                color="inherit"
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  ml: 1,
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    width: "0",
                    height: "1px",
                    background: "rgba(255, 255, 255, 0.8)",
                    transition: "all 0.3s ease",
                    transform: "translateX(-50%)",
                    filter: "blur(0.5px)",
                    boxShadow: "0 0 2px rgba(255, 255, 255, 0)",
                  },
                  "&:hover": {
                    background: "transparent",
                    transform: "translateY(-2px)",
                    "&::after": {
                      width: "80%",
                      filter: "blur(1px)",
                      boxShadow: "0 0 4px rgba(255, 255, 255, 0.5)",
                    },
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
