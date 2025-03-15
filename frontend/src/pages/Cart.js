import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (artworkId, newQuantity) => {
    try {
      await axios.put(
        `/api/cart/items/${artworkId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (artworkId) => {
    try {
      await axios.delete(`/api/cart/items/${artworkId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    try {
      // Update cart with shipping address
      await axios.put(
        "/api/cart/checkout",
        { shippingAddress },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCheckoutStep(2);
    } catch (error) {
      console.error("Error proceeding to checkout:", error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "/api/cart/payment",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // Handle successful payment
      navigate("/payment-success");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your cart is empty
        </Typography>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/gallery")}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {cart.items.map((item) => (
            <Card key={item.artwork._id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={item.artwork.images[0]?.url || "/placeholder.jpg"}
                      alt={item.artwork.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="h6">{item.artwork.title}</Typography>
                    <Typography color="text.secondary">
                      ${item.price.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.artwork._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.artwork._id, item.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => removeItem(item.artwork._id)}
                        sx={{ ml: "auto" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>${cart.totalAmount.toLocaleString()}</Typography>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography>Shipping</Typography>
                  <Typography>Free</Typography>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">
                    ${cart.totalAmount.toLocaleString()}
                  </Typography>
                </Grid>
              </Box>

              {checkoutStep === 1 ? (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    Shipping Address
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="Street Address"
                      value={shippingAddress.street}
                      onChange={(e) =>
                        handleAddressChange("street", e.target.value)
                      }
                      sx={{ mb: 2 }}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="City"
                          value={shippingAddress.city}
                          onChange={(e) =>
                            handleAddressChange("city", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="State"
                          value={shippingAddress.state}
                          onChange={(e) =>
                            handleAddressChange("state", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="ZIP Code"
                          value={shippingAddress.zipCode}
                          onChange={(e) =>
                            handleAddressChange("zipCode", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Country"
                          value={shippingAddress.country}
                          onChange={(e) =>
                            handleAddressChange("country", e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 4 }}
                    onClick={handleCheckout}
                  >
                    Proceed to Payment
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 4 }}
                  onClick={handlePayment}
                >
                  Pay Now
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
