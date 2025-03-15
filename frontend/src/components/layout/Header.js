import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  ExitToApp,
  Dashboard,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Gallery', path: '/gallery' },
    { text: 'Exhibitions', path: '/exhibitions' },
    { text: 'Awards', path: '/awards' },
    { text: 'Patron', path: '/patron' },
    { text: 'About', path: '/about' },
    { text: 'Press', path: '/press' },
    { text: 'Testimonials', path: '/testimonials' },
    { text: 'Contact', path: '/contact' },
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
    <AppBar position="sticky">
      <Toolbar>
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
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Impress
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
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
              <IconButton
                color="inherit"
                onClick={handleMenu}
                sx={{ ml: 1 }}
              >
                <Person />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user.role === 'admin' && (
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