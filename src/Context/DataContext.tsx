import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

const ProductContext = createContext({});

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]) as any;
  useEffect(() => {
    let data = localStorage.getItem(
      `${window.sessionStorage.getItem("email")}`
    ) as any;
    if (data) {
      data = JSON.parse(data);
      setCart(data?.cart);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  const addToCart = (product: any) => {
    if (product["quantity"] > 0) {
      setCart([...cart, product]);
    }
  };
  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item: any) => item.id !== productId));
    let data = localStorage.getItem(
      `${window.sessionStorage.getItem("email")}`
    ) as any;
    data = JSON.parse(data || "{}");
    data.cart = data.cart.filter((item: any) => item.id !== productId);
    localStorage.setItem(
      `${window.sessionStorage.getItem("email")}`,
      JSON.stringify(data)
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, cart, addToCart, removeFromCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};
