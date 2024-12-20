import { useProductContext } from "../Context/DataContext";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import "./Cart.css";
import { Link } from "react-router-dom";
import React from "react";
import ProductDetails from "./ProductDetails";

const CartPage = () => {
  const { removeFromCart } = useProductContext();
  const cartValue = localStorage.getItem(localStorage.getItem("email") as any);
  const cart = cartValue
    ? JSON.parse(cartValue)?.cart
    : useProductContext().cart;
  const total =
    cart &&
    cart.reduce(
      (acc: number, item: { price: number; quantity: number }) =>
        acc + item.price * item.quantity,
      0
    );

  const handleCheckout = () => {
    console.log("Checkout clicked!");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart && cart.length === 0 ? (
        <>
          <Typography variant="body1">Your cart is empty.</Typography>
          <Button variant="contained" color="primary">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Back to Home
            </Link>
          </Button>
        </>
      ) : (
        <div>
          <List>
            {cart &&
              cart.map(
                (item: {
                  id: number;
                  image: string;
                  title: string;
                  quantity: number;
                  price: number;
                }) => (
                  <ListItem key={item.id} className="cart-item">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-item-image"
                      />
                    </Link>
                    <div className="cart-item-content">
                      <ListItemText primary={item.title} />
                      <ListItemText secondary={`Quantity: ${item.quantity}`} />
                      <ListItemText
                        secondary={`Item Total: $${
                          item.quantity * item.price
                        }`}
                      />
                    </div>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </ListItem>
                )
              )}
          </List>
          <Typography variant="h6" gutterBottom align="right">
            Total: ${total?.toFixed(2)}
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              className="checkout-button"
            >
              Checkout
            </Button>
          </Box>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
