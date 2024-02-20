import { useState, useEffect, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useParams } from "react-router-dom";
import { useProductContext } from "../Context/DataContext";
import "./ProductDetails.css";
import ReactImageMagnify from "react-image-magnify";

function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart } = useProductContext();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (product) {
      setOpen(true);
      addToCart({ ...product, quantity });
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
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
          />
        </label>
        {
          localStorage.getItem("token") ? <button onClick={handleAddToCart}>Add to Cart</button> : <button onClick={() => window.location = "/Login"}>Login to Buy this Product</button>
        }
        {open && (
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="Added To Cart"
            
          />
        )}
      </div>
      <div className="product-image">
        <ReactImageMagnify
          smallImage={{
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: product.image,
          }}
          largeImage={{
            src: product.image,
            width: 1200,
            height: 1800,
          }}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
