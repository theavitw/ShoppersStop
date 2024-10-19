import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define types for Product and CartItem
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the context value
interface ProductContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
}

// Create the context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Custom hook to use the ProductContext
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

// ProductProvider component
interface ProductProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(
      `${window.sessionStorage.getItem("email")}`
    );
    if (data) {
      const parsedData = JSON.parse(data);
      setCart(parsedData.cart);
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

  const addToCart = (product: CartItem) => {
    if (product.quantity > 0) {
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    const data = localStorage.getItem(`${localStorage.getItem("email")}`);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.cart = parsedData.cart.filter(
        (item: CartItem) => item.id !== productId
      );
      localStorage.setItem(
        `${localStorage.getItem("email")}`,
        JSON.stringify(parsedData)
      );
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, cart, addToCart, removeFromCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};
