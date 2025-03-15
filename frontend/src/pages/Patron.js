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
} from "@mui/material";
import { Check as CheckIcon } from "@mui/icons-material";

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
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Become a Patron
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Support the arts and receive exclusive benefits
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {patronTiers.map((tier) => (
            <Grid item key={tier.title} xs={12} md={4}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    align="center"
                  >
                    {tier.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    align="center"
                    color="primary"
                    gutterBottom
                  >
                    ${tier.price}
                    <Typography
                      component="span"
                      variant="h6"
                      color="textSecondary"
                    >
                      /{tier.period}
                    </Typography>
                  </Typography>
                  <List>
                    {tier.benefits.map((benefit) => (
                      <ListItem key={benefit}>
                        <ListItemIcon>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                  <Button variant="contained" color="primary" size="large">
                    Join {tier.title} Circle
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
              <Typography variant="h4" gutterBottom>
                Additional Information
              </Typography>
              <Typography paragraph>
                Your patronage helps support our ongoing artistic endeavors,
                exhibitions, and community outreach programs. All contributions
                are tax-deductible to the extent allowed by law.
              </Typography>
              <Typography paragraph>
                For custom patronage options or corporate sponsorship
                opportunities, please contact our development team at
                patron@example.com or call (555) 123-4567.
              </Typography>
              <Button variant="outlined" color="primary" size="large">
                Download Patron Program Guide
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Patron;
