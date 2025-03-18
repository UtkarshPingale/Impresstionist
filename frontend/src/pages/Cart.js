import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchCart();
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/cart");
      if (response.data.success) {
        setCart(response.data.cart);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
      // Don't show error toast for cart loading
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (artworkId, newQuantity) => {
    try {
      const response = await axios.put(`/api/cart/update/${artworkId}`, {
        quantity: newQuantity,
      });
      if (response.data.success) {
        setCart(response.data.cart);
        toast.success("Cart updated");
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (artworkId) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${artworkId}`);
      if (response.data.success) {
        setCart(response.data.cart);
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.error("Remove item error:", error);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete("/api/cart/clear");
      if (response.data.success) {
        setCart(response.data.cart);
        toast.success("Cart cleared");
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Failed to clear cart");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Please Login to View Your Cart
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You need to be logged in to view and manage your shopping cart
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Container>
    );
  }

  if (!cart.items.length) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Browse our gallery to find beautiful artworks that speak to you
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/gallery")}
            sx={{ mt: 2, mb: 4 }}
          >
            Browse Gallery
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1">
            Shopping Cart
          </Typography>
          <Button variant="contained" color="error" onClick={clearCart}>
            Clear Cart
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cart.items.map((item) => (
            <Box
              key={item.artworkId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: 1,
                bgcolor: "background.paper",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  component="img"
                  src={item.imageUrl}
                  alt={item.title}
                  sx={{
                    width: 96,
                    height: 96,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                <Box>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    ${item.price}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      updateQuantity(item.artworkId, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      updateQuantity(item.artworkId, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </Box>
                <Button
                  color="error"
                  onClick={() => removeItem(item.artworkId)}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography variant="h5">Total: ${cart.total}</Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;
