import Navbar from "../Navbar";
import HomePage from "../HomePage";
import { Routes, Route } from "react-router-dom";
import Cart from "../Cart";
import ProductDetails from "../ProductDetails";

function Routess() {
  return (
    <>
      <Navbar />
     
      <Routes>
        <Route path="/" from="/Homepage" element={<HomePage />} />
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path={`/product/:id`} element={<ProductDetails />} />
        
      </Routes>
    </>
  );
}

export default Routess;
