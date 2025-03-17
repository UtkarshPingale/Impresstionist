import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  ExitToApp,
  Dashboard,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Gallery", path: "/gallery" },
    { text: "Exhibitions", path: "/exhibitions" },
    { text: "Awards", path: "/awards" },
    { text: "Patron", path: "/patron" },
    { text: "About", path: "/about" },
    { text: "Press", path: "/press" },
    { text: "Testimonials", path: "/testimonials" },
    { text: "Studio", path: "/studio" },
    // ...(user?.role === "admin" ? [{ text: "Admin", path: "/admin" }] : []),
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          component={RouterLink}
          to={item.path}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow:
          "0 4px 20px rgba(0, 0, 0, 0.3), 0 6px 50px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            flexGrow: 0,
          }}
        >
          Impressionist
        </Typography>

        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexGrow: 1,
              mx: 4,
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  position: "relative",
                  padding: "6px 16px",
                  transition: "all 0.3s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(0px)",
                    WebkitBackdropFilter: "blur(0px)",
                    boxShadow: "0 0 15px 5px rgba(0, 0, 0, 0)",
                    borderRadius: "4px",
                    opacity: 0,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: "scale(0.95)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.7)",
                    boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    filter: "blur(4px)",
                  },
                  "& span": {
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.3s ease",
                  },
                  "&:hover": {
                    color: "white",
                    "&::before": {
                      opacity: 1,
                      transform: "scale(1)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      background: "rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.15)",
                    },
                    "&::after": {
                      width: "80%",
                      filter: "blur(2px)",
                      boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                    },
                    "& span": {
                      transform: "translateY(-1px)",
                    },
                  },
                  "&.active": {
                    "&::before": {
                      opacity: 0.5,
                    },
                    "&::after": {
                      width: "80%",
                      filter: "blur(1px)",
                      boxShadow: "0 0 12px rgba(255, 255, 255, 0.5)",
                    },
                  },
                }}
              >
                <span>{item.text}</span>
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={0} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ mr: 1 }}>
                  {user.name}
                </Typography>
                <IconButton color="inherit" onClick={handleMenu}>
                  <Person />
                </IconButton>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user.role === "admin" && (
                  <MenuItem
                    component={RouterLink}
                    to="/admin"
                    onClick={handleClose}
                  >
                    <Dashboard sx={{ mr: 1 }} />
                    Admin Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              sx={{ ml: 1 }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
