import { useEffect } from "react";
import { Button } from "@mui/material";
import "./Navbar.css";
import Cookies from "js-cookie";
import Search from "./Search";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import React from "react";
import { googleLogout } from "@react-oauth/google";

const Navbar = () => {
  // Using useEffect to handle the DOMContentLoaded logic
  useEffect(() => {
    const searchIcon = document.querySelector(".search-icon");
    const searchInput = document.querySelector(".search-input");

    const handleSearchIconClick = () => {
      searchInput?.classList.toggle("active");
      if (searchInput?.classList.contains("active")) {
        searchInput.focus();
      }
    };

    searchIcon?.addEventListener("click", handleSearchIconClick);

    // Cleanup event listener on component unmount
    return () => {
      searchIcon?.removeEventListener("click", handleSearchIconClick);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const email = localStorage.getItem("email");
      if (email) {
        let data = localStorage.getItem(email);
        data = JSON.parse(data);

        // Sending the data to the backend
        await axios.post("https://shoptank-backend.onrender.com/logout", {
          email: data?.email,
          cart: data?.cart,
        });

        localStorage.clear()
        googleLogout();
        Cookies.remove("check");

        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isLogin = Boolean(
    localStorage.getItem(localStorage.getItem("email"))
  );

  return (
    <div className="header-container">
      <div className="header-content">
        <Search />
        <div className="navigation-menu">
          <Link to="/" className="logo">
            <svg
              width="31"
              height="15"
              style={{ marginRight: "5px" }}
              viewBox="0 0 31 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.353554 7.5L7.5 0.353554L14.6464 7.5L7.5 14.6464L0.353554 7.5Z"
                stroke="black"
                strokeWidth="0.5"
              />
              <path
                d="M8.35355 7.5L15.5 0.353554L22.6464 7.5L15.5 14.6464L8.35355 7.5Z"
                stroke="black"
                strokeWidth="0.5"
              />
              <path
                d="M16.3536 7.5L23.5 0.353554L30.6464 7.5L23.5 14.6464L16.3536 7.5Z"
                stroke="black"
                strokeWidth="0.5"
              />
            </svg>
            <div className="menu-text">ShoppersStop</div>
            <svg
              width="31"
              height="15"
              style={{ marginLeft: "3px" }}
              viewBox="0 0 31 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.353554 7.5L7.5 0.353554L14.6464 7.5L7.5 14.6464L0.353554 7.5Z"
                stroke="black"
                strokeWidth="0.5"
              />
              <path
                d="M8.35355 7.5L15.5 0.353554L22.6464 7.5L15.5 14.6464L8.35355 7.5Z"
                stroke="black"
                strokeWidth="0.5"
              />
              <path
                d="M16.3536 7.5L23.5 0.353554L30.6464 7.5L23.5 14.6464L16.3536 7.5Z"
                stroke="black"
                strokeWidth="0.5"
              />
            </svg>
          </Link>

          {!isLogin ? (
            <div className="user-actions">
              <NavLink to="/login" className="d-flex text-decoration-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
                    stroke="#0B0B0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="#0B0B0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <Button className="text-black">Login</Button>
              </NavLink>

              <NavLink to="/register">
                <Button className="text-black">Register</Button>
              </NavLink>
            </div>
          ) : (
            <div className="user-actions">
              <NavLink to="/cart" className="d-flex text-decoration-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 12L8 8C8 5.79086 9.79086 4 12 4V4C14.2091 4 16 5.79086 16 8L16 12"
                    stroke="#0B0B0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3.69435 12.6678C3.83942 10.9269 3.91196 10.0565 4.48605 9.52824C5.06013 9 5.9336 9 7.68053 9H16.3195C18.0664 9 18.9399 9 19.514 9.52824C20.088 10.0565 20.1606 10.9269 20.3057 12.6678L20.8195 18.8339C20.904 19.8474 20.9462 20.3542 20.6491 20.6771C20.352 21 19.8435 21 18.8264 21H5.1736C4.15655 21 3.64802 21 3.35092 20.6771C3.05382 20.3542 3.09605 19.8474 3.18051 18.8339L3.69435 12.6678Z"
                    stroke="#0B0B0B"
                    strokeWidth="2"
                  />
                </svg>
                <Button className="text-black">Cart</Button>
              </NavLink>
              <Button onClick={handleLogout} className="text-black">
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="categories">
        <Link className="category" to={"/"}>
          Jewelry & Accessories
        </Link>
        <Link className="category" to={"/"}>
          Clothing & Shoes
        </Link>
        <Link className="category" to={"/"}>
          Home & Living
        </Link>
        <Link className="category" to={"/"}>
          Wedding & Party
        </Link>
        <Link className="category" to={"/"}>
          Toys & Entertainment
        </Link>
        <Link className="category" to={"/"}>
          Art & Collectibles
        </Link>
        <Link className="category" to={"/"}>
          Craft Supplies & Tools
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
