import { useState, useEffect, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Link, useParams } from "react-router-dom";
import { useProductContext } from "../Context/DataContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart } = useProductContext();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (product && quantity > 0) {
      setOpen(true);
      addToCart({ ...product, quantity });
      let data = localStorage.getItem(`${window.sessionStorage.getItem("email")}`);
      data = JSON.parse(data);
      data.cart.push(product);
      localStorage.setItem(
        `${window.sessionStorage.getItem("email")}`,
        JSON.stringify(data)
      )
    }
  }, [addToCart, product, quantity]);

  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }

    if (value <= 0) {
      alert("Quantity cannot be negative or zero");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <label>
          Quantity:
          <input type="text" onBlur={handleQuantityChange} />
        </label>
        {localStorage.getItem("token") ? (
          <Link onClick={handleAddToCart} className="Login_Button">
            Add to Cart
          </Link>
        ) : (
          <Link to="/login" className="Login_Button">
            Login to Buy this Product
          </Link>
        )}
        {open && (
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="Added To Cart"
          />
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
