import { useState, useEffect, useRef } from "react";
import "./Search.css";
import { useProductContext } from "../Context/DataContext";
import { Link } from "react-router-dom";
import React from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const SearchBar: React.FC = () => {
  const { products } = useProductContext();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [ToogleItems, setToogleItems] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const filtered = products.filter((product: Product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  useEffect(() => {
    const handleResize = () => {
      setIsActive(window.innerWidth <= 920);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToogle = () => {
    setToogleItems(!ToogleItems);
  };

  const toggleSearch = () => {
    setIsActive(!isActive);
    setToogleItems(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-container">
      {!isActive && (
        <span className="search-icon" onClick={toggleSearch}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="7" r="6" stroke="#0B0B0B" strokeWidth="2" />
            <path
              d="M16 16L13 13"
              stroke="#0B0B0B"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
      <input
        type="text"
        className={`search-input ${isActive ? "active" : ""}`}
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        onClick={handleToogle}
        ref={searchContainerRef}
      />
      {isActive && filteredProducts.length > 0 && (
        <div className="search-results">
          {ToogleItems &&
            filteredProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                onClick={() => setToogleItems(false)}
                className="search-result-link"
              >
                <div className="search-result-item">
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
      {isActive && (
        <span className="cross" onClick={toggleSearch}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1L1 13"
              stroke="#0B0B0B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M1 1L13 13"
              stroke="#0B0B0B"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default SearchBar;
