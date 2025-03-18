import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
} from "@mui/material";
import { EmojiEvents as AwardIcon } from "@mui/icons-material";

const Awards = () => {
  const theme = useTheme();

  // This would typically come from a backend API
  // For now, we'll use the same structure as the admin page
  const awards = [
    {
      id: 1,
      title: "Excellence in Abstract Art",
      year: "2023",
      organization: "International Art Association",
      description: "Awarded for outstanding contribution to abstract art",
    },
    {
      id: 2,
      title: "Best Contemporary Artist",
      year: "2022",
      organization: "Modern Art Foundation",
      description: "Recognition for innovative approaches in contemporary art",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          Awards & Recognition
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Celebrating artistic excellence and innovation
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {awards.map((award) => (
          <Grid item xs={12} md={6} key={award.id}>
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
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <AwardIcon
                    sx={{
                      fontSize: 40,
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  />
                  <Typography variant="h5" component="h2">
                    {award.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  {award.year} • {award.organization}
                </Typography>
                <Typography variant="body1" paragraph>
                  {award.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Awards;
