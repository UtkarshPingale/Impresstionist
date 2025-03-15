import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  TextField,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import { Visibility as ViewIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    trackingNumber: "",
    notes: "",
  });

  const statusOptions = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setFormData({
      status: order.status,
      trackingNumber: order.trackingNumber || "",
      notes: order.notes || "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/orders/${selectedOrder._id}`, formData);
      fetchOrders();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  {order.user.firstName} {order.user.lastName}
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={
                      order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)
                    }
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(order)}>
                    <ViewIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog(order)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Order Details - {selectedOrder?._id.slice(-6).toUpperCase()}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Typography>
                  {selectedOrder.user.firstName} {selectedOrder.user.lastName}
                </Typography>
                <Typography>{selectedOrder.user.email}</Typography>
                <Typography>{selectedOrder.user.phone}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                <Typography>{selectedOrder.shippingAddress.street}</Typography>
                <Typography>
                  {selectedOrder.shippingAddress.city},{" "}
                  {selectedOrder.shippingAddress.state}{" "}
                  {selectedOrder.shippingAddress.zipCode}
                </Typography>
                <Typography>{selectedOrder.shippingAddress.country}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                {selectedOrder.items.map((item) => (
                  <Box key={item._id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">
                      {item.artwork.title}
                    </Typography>
                    <Typography color="textSecondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography color="textSecondary">
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                    <Typography color="textSecondary">
                      Subtotal: ${(item.quantity * item.price).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Typography>
                  Subtotal: ${selectedOrder.subtotal.toFixed(2)}
                </Typography>
                <Typography>
                  Shipping: ${selectedOrder.shipping.toFixed(2)}
                </Typography>
                <Typography variant="h6">
                  Total: ${selectedOrder.total.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Update Order Status
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tracking Number"
                      name="trackingNumber"
                      value={formData.trackingNumber}
                      onChange={handleInputChange}
                      disabled={formData.status !== "shipped"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminOrders;
