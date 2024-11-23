import Navbar from "../Navbar";
import HomePage from "../HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "../Cart";
import ProductDetails from "../ProductDetails";
import OtpForm from "../Auth/OtpForm";
import React from "react";

function Routess() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/Homepage" />} />
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path={`/product/:id`} element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default Routess;
