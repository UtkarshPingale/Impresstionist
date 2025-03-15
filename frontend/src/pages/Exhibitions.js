import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`exhibition-tabpanel-${index}`}
      aria-labelledby={`exhibition-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState({
    current: [],
    upcoming: [],
    past: [],
  });
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const [currentRes, upcomingRes, pastRes] = await Promise.all([
        axios.get("/api/exhibitions/current"),
        axios.get("/api/exhibitions/upcoming"),
        axios.get("/api/exhibitions/past"),
      ]);

      setExhibitions({
        current: currentRes.data,
        upcoming: upcomingRes.data,
        past: pastRes.data,
      });
    } catch (error) {
      console.error("Error fetching exhibitions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderExhibitionCard = (exhibition) => (
    <Card
      key={exhibition._id}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-8px)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={exhibition.images[0]?.url || "/placeholder.jpg"}
        alt={exhibition.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {exhibition.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {exhibition.description.substring(0, 150)}...
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {new Date(exhibition.startDate).toLocaleDateString()} -{" "}
            {new Date(exhibition.endDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {exhibition.location.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Chip
            label={
              exhibition.admission === "free" ? "Free Entry" : "Paid Entry"
            }
            color={exhibition.admission === "free" ? "success" : "primary"}
            size="small"
          />
          {exhibition.admission === "paid" && (
            <Chip
              label={`$${exhibition.price.amount}`}
              color="secondary"
              size="small"
            />
          )}
        </Box>
        <Button
          component={RouterLink}
          to={`/exhibitions/${exhibition._id}`}
          variant="contained"
          color="primary"
          fullWidth
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Exhibitions
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="exhibition tabs"
          centered
        >
          <Tab label="Current" />
          <Tab label="Upcoming" />
          <Tab label="Past" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          {exhibitions.current.map(renderExhibitionCard)}
          {exhibitions.current.length === 0 && (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                No current exhibitions at the moment.
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={4}>
          {exhibitions.upcoming.map(renderExhibitionCard)}
          {exhibitions.upcoming.length === 0 && (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                No upcoming exhibitions scheduled.
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={4}>
          {exhibitions.past.map(renderExhibitionCard)}
          {exhibitions.past.length === 0 && (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                No past exhibitions to display.
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default Exhibitions;
