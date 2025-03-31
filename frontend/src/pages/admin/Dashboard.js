import React from "react";
import {
  Routes,
  Route,
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Palette as ArtworkIcon,
  Collections as ExhibitionIcon,
  EmojiEvents as AwardsIcon,
  People as PatronIcon,
  Article as PressIcon,
  Star as TestimonialsIcon,
  Settings as SettingsIcon,
  VideoLibrary as VideosIcon,
} from "@mui/icons-material";
import AdminArtworks from "./Artworks";
import AdminExhibitions from "./Exhibitions";
import AdminAwards from "./Awards";
import AdminPress from "./Press";
import AdminTestimonials from "./Testimonials";
import AdminPatron from "./Patron";
import AdminSettings from "./Settings";
import AdminVideos from "./Videos";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Artworks", icon: <ArtworkIcon />, path: "/admin/artworks" },
    {
      text: "Exhibitions",
      icon: <ExhibitionIcon />,
      path: "/admin/exhibitions",
    },
    { text: "Awards", icon: <AwardsIcon />, path: "/admin/awards" },
    { text: "Patron", icon: <PatronIcon />, path: "/admin/patron" },
    { text: "Press & Media", icon: <PressIcon />, path: "/admin/press" },
    {
      text: "Testimonials",
      icon: <TestimonialsIcon />,
      path: "/admin/testimonials",
    },
    { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
    { text: "Home Videos", icon: <VideosIcon />, path: "/admin/videos" },
  ];

  const DashboardHome = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Artworks
              </Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/admin/artworks">
                Manage Artworks
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Exhibitions
              </Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={RouterLink}
                to="/admin/exhibitions"
              >
                Manage Exhibitions
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Awards
              </Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Patrons
              </Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Home Videos
              </Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/admin/videos">
                Manage Home Videos
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: { xs: isMobile ? "none" : "block" },
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Admin Menu
              </Typography>
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    selected={window.location.pathname === item.path}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/artworks/*" element={<AdminArtworks />} />
            <Route path="/exhibitions/*" element={<AdminExhibitions />} />
            <Route path="/awards/*" element={<AdminAwards />} />
            <Route path="/patron/*" element={<AdminPatron />} />
            <Route path="/press/*" element={<AdminPress />} />
            <Route path="/testimonials/*" element={<AdminTestimonials />} />
            <Route path="/settings/*" element={<AdminSettings />} />
            <Route path="/videos/*" element={<AdminVideos />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
