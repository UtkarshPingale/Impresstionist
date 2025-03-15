import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { EmojiEvents as TrophyIcon } from "@mui/icons-material";

const awards = [
  {
    year: "2023",
    title: "Excellence in Contemporary Art",
    organization: "International Art Foundation",
    description:
      "Awarded for outstanding contribution to contemporary art through innovative techniques and meaningful storytelling.",
  },
  {
    year: "2022",
    title: "Best Solo Exhibition",
    organization: "National Gallery Association",
    description:
      'Recognized for the groundbreaking solo exhibition "Reflections of Tomorrow".',
  },
  {
    year: "2021",
    title: "Artist of the Year",
    organization: "Modern Art Society",
    description:
      "Selected as Artist of the Year for exceptional creativity and influence in the modern art scene.",
  },
  {
    year: "2020",
    title: "Innovation in Digital Art",
    organization: "Digital Arts Foundation",
    description:
      "Honored for pioneering work in combining traditional and digital art forms.",
  },
];

const Awards = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Awards & Recognition
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Timeline position="alternate">
                {awards.map((award, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color="primary">
                        <TrophyIcon />
                      </TimelineDot>
                      {index < awards.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" component="h3">
                          {award.title}
                        </Typography>
                        <Typography color="textSecondary">
                          {award.year} - {award.organization}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                          {award.description}
                        </Typography>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Additional Honors
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Residencies
                  </Typography>
                  <ul>
                    <li>
                      <Typography>
                        Artist in Residence, Paris Art Institute (2022)
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Guest Artist, Tokyo Contemporary Arts Center (2021)
                      </Typography>
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Grants & Fellowships
                  </Typography>
                  <ul>
                    <li>
                      <Typography>
                        Arts Council Fellowship Grant (2023)
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Creative Development Fund Recipient (2022)
                      </Typography>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Awards;
