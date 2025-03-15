import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  Pinterest,
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { text: 'Home', path: '/' },
        { text: 'Gallery', path: '/gallery' },
        { text: 'Exhibitions', path: '/exhibitions' },
        { text: 'About', path: '/about' },
        { text: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Information',
      links: [
        { text: 'Awards', path: '/awards' },
        { text: 'Patron', path: '/patron' },
        { text: 'Press', path: '/press' },
        { text: 'Testimonials', path: '/testimonials' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', path: '/privacy' },
        { text: 'Terms of Service', path: '/terms' },
        { text: 'Shipping Policy', path: '/shipping' },
        { text: 'Returns Policy', path: '/returns' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com' },
    { icon: <Instagram />, url: 'https://instagram.com' },
    { icon: <Twitter />, url: 'https://twitter.com' },
    { icon: <LinkedIn />, url: 'https://linkedin.com' },
    { icon: <Pinterest />, url: 'https://pinterest.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.title}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.text} sx={{ mb: 1 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="inherit"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
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

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {currentYear} Impress. All rights reserved.
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
                sx={{ ml: 1 }}
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