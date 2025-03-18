import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardMedia,
  useTheme,
  Chip,
} from "@mui/material";
import { Check as CheckIcon, People as PeopleIcon } from "@mui/icons-material";

const patronTiers = [
  {
    title: "Friend",
    price: "100",
    period: "year",
    benefits: [
      "Early access to exhibitions",
      "Exclusive newsletter",
      "Member events invitations",
      "Recognition on website",
    ],
  },
  {
    title: "Supporter",
    price: "500",
    period: "year",
    benefits: [
      "All Friend benefits",
      "Private studio visits",
      "Limited edition prints",
      "Exhibition catalogs",
      "VIP exhibition previews",
    ],
  },
  {
    title: "Benefactor",
    price: "1000",
    period: "year",
    benefits: [
      "All Supporter benefits",
      "Custom artwork commission",
      "Dinner with the artist",
      "Name on exhibition plaques",
      "Exclusive collector events",
    ],
  },
];

const Patron = () => {
  const theme = useTheme();

  // This would typically come from a backend API
  const patrons = [
    {
      id: 1,
      name: "Robert Williams",
      title: "Lead Patron",
      organization: "Williams Art Foundation",
      image: "https://source.unsplash.com/random/400x300?portrait",
      contribution: "Major Contributor",
      testimonial:
        "Supporting emerging artists has always been our foundation's mission. The innovative work being produced here aligns perfectly with our vision for the future of art.",
      featured: true,
    },
    {
      id: 2,
      name: "Elizabeth Chang",
      title: "Arts Advocate",
      organization: "Contemporary Arts Society",
      image: "https://source.unsplash.com/random/400x300?portrait",
      contribution: "Sustaining Member",
      testimonial:
        "The dedication to pushing artistic boundaries while maintaining the highest standards of quality is truly remarkable.",
      featured: true,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          Our Patrons
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Supporting excellence in contemporary art
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {patrons.map((patron) => (
          <Grid item xs={12} md={6} key={patron.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={patron.image}
                alt={patron.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <PeopleIcon
                    sx={{
                      fontSize: 40,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography variant="h5" component="h2">
                      {patron.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {patron.title} • {patron.organization}
                    </Typography>
                  </Box>
                </Box>
                {patron.featured && (
                  <Chip
                    label="Featured Patron"
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
                <Typography variant="body1" paragraph>
                  {patron.testimonial}
                </Typography>
                <Typography variant="subtitle2" color="primary" sx={{ mt: 2 }}>
                  {patron.contribution}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Patron;
