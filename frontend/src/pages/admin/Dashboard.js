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
  People as UserIcon,
  ShoppingCart as OrderIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import AdminArtworks from "./Artworks";
import AdminExhibitions from "./Exhibitions";
import AdminOrders from "./Orders";
import AdminUsers from "./Users";
import AdminSettings from "./Settings";

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
    { text: "Orders", icon: <OrderIcon />, path: "/admin/orders" },
    { text: "Users", icon: <UserIcon />, path: "/admin/users" },
    { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
  ];

  const DashboardHome = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
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
        <Grid item xs={12} sm={6} md={3}>
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
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Orders
              </Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/admin/orders">
                View Orders
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/admin/users">
                Manage Users
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
            <Route path="/orders/*" element={<AdminOrders />} />
            <Route path="/users/*" element={<AdminUsers />} />
            <Route path="/settings/*" element={<AdminSettings />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
