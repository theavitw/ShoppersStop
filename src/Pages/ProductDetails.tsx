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
  const { products, addToCart } = useProductContext();
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
  }, [id, addToCart]);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (product && count > 0) {
        setOpen(true);

        let data: any = localStorage.getItem(
          `${window.sessionStorage.getItem("email")}`
        );
        if (data) {
          data = JSON.parse(data);
          data?.cart?.push({ ...product, quantity: count });
          localStorage.setItem(
            `${window.sessionStorage.getItem("email")}`,
            JSON.stringify(data)
          );
        }
        addToCart({
          ...product,
          quantity: count,
          category: "",
        });
      }
    },
    [product, count, addToCart]
  );

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
        {!isAddedToCart && (
          <label>
            <CartButton count={count} setCount={setCount} />
          </label>
        )}
        {localStorage.getItem("token") ? (
          isAddedToCart ? (
            <>
              <CartButton count={count} setCount={setCount} />
              <Link
                onClick={(e) => handleAddToCart(e)}
                className="Login_Button"
                to={""}
              >
                Add to Cart
              </Link>
            </>
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
