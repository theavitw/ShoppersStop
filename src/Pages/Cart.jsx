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

const CartPage = () => {
  const { cart, removeFromCart } = useProductContext();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const handleCheckout = () => {
    console.log("Checkout clicked!");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <>
          <Typography variant="body1">Your cart is empty.</Typography>
          <Button variant="contained" color="primary">
            <Link to="/" style={{ color: "white" , textDecoration: "none"}}>Back to Home</Link>
          </Button>
          
        </>
      ) : (
        <div>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-content">
                  <ListItemText primary={item.title} />
                  <ListItemText secondary={`Quantity: ${item.quantity}`} />
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
            ))}
          </List>
          <Typography variant="h6" gutterBottom align="right">
            Total: ${total.toFixed(2)}
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
