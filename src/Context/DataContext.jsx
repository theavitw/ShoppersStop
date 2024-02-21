import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  const addToCart = (product) => {
    if (product["quantity"] > 0) {
      setCart([...cart, product]);
    }
    
  };
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <ProductContext.Provider
      value={{ products, cart, addToCart, removeFromCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};
