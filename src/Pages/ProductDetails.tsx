import { useState, useEffect, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Link, useParams } from "react-router-dom";

import { useProductContext } from "../Context/DataContext";
import "./ProductDetails.css";
import Cookies from "js-cookie";
import React from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useProductContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  let data: any = localStorage.getItem(
    `${window.sessionStorage.getItem("email")}`
  );

  useEffect(() => {
    if (data) {
      data = JSON.parse(data);
      const foundProduct = data?.cart?.find(
        (product: any) => product.id === parseInt(id || "")
      );
      console.log(foundProduct)
      if (foundProduct) {
        setQuantity(foundProduct.quantity);
        setIsAddedToCart(true);
      } else {
        setIsAddedToCart(false);
      }
    }
  }, [id, addToCart]);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (product && quantity > 0) {
        setOpen(true);

        let data: any = localStorage.getItem(
          `${window.sessionStorage.getItem("email")}`
        );
        if (data) {
          data = JSON.parse(data);
          data?.cart?.push({ ...product, quantity });
          localStorage.setItem(
            `${window.sessionStorage.getItem("email")}`,
            JSON.stringify(data)
          );
        }
        addToCart({
          ...product,
          quantity,
          category: "",
        });
      }
    },
    [product, quantity, addToCart]
  );

  useEffect(() => {
    const foundProduct = products.find(
      (product: any) => product.id === parseInt(id || "")
    );
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (value <= 0) {
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
        {!isAddedToCart && (
          <label>
            Quantity:
            <input type="text" onBlur={handleQuantityChange} />
          </label>
        )}
        {localStorage.getItem("token") ? (
          isAddedToCart ? (
            <Link className="Login_Button" to="/cart">
              Item Added To Cart
            </Link>
          ) : (
            <Link
              onClick={(e) => handleAddToCart(e)}
              className="Login_Button"
              to={""}
            >
              Add to Cart
            </Link>
          )
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
