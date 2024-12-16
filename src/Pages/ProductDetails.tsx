import { useState, useEffect, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Link, useParams } from "react-router-dom";

import { useProductContext } from "../Context/DataContext";
import "./ProductDetails.css";
import React from "react";
import CartButton from "../Counter";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProductContext();
  const [product, setProduct] = useState<Product | null>(null);
  // const [quantity, setQuantity] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  let data: any = localStorage.getItem(
    `${window.sessionStorage.getItem("email")}`
  );

  useEffect(() => {
    if (data) {
      data = JSON.parse(data);
      const foundProduct = data?.cart?.find(
        (product: any) => product.id === parseInt(id || "")
      );
      if (foundProduct) {
        setCount(foundProduct.quantity);
        setIsAddedToCart(true);
      } else {
        setIsAddedToCart(false);
      }
    }
  }, []);

  const handleAddToCart = useCallback(() => {
    if (product && count >= 0) {
      if (data) {
        data = JSON.parse(data);

        // Update cart logic
        const updatedCart = data?.cart || [];
        const filteredCart = updatedCart.filter(
          (item: { id: number }) => item.id !== product.id
        ); // Remove all items with the same ID

        if (count > 0) {
          filteredCart.push({ ...product, quantity: count }); // Add the product if count > 0
        }

        // Update local storage
        data.cart = filteredCart;
        localStorage.setItem(
          `${window.sessionStorage.getItem("email")}`,
          JSON.stringify(data)
        );
      }
    }
  }, [product, count]);

  useEffect(() => {
    handleAddToCart();
  }, [count, handleAddToCart]);

  const increment = (e) => {
    if (count === 0) {
      setOpen(true);
    }
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = (e) => {
    setCount((prevCount) => Math.max(prevCount - 1, 0)); // Prevent count from going below 0
  };

  useEffect(() => {
    const foundProduct = products.find(
      (product: any) => product.id === parseInt(id || "")
    );
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(e.target.value);
  //   if (!isNaN(value) && value > 0) {
  //     setQuantity(value);
  //   } else if (value <= 0) {
  //     alert("Quantity cannot be negative or zero");
  //   }
  // };

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

        {localStorage.getItem("token") ? (
          <>
            {/* Prevent default behavior to avoid reload */}
            <div
              className="cart-actions"
              onClick={(e) => e.preventDefault()} // Prevent reload
            >
              <CartButton
                increment={increment}
                decrement={decrement}
                count={count}
              />
            </div>
          </>
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
