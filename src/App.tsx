import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";

import Register from "./Pages/Auth/Register";
import Routess from "./Pages/Route/Route";
import { ProductProvider } from "./Context/DataContext";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App(): JSX.Element {
  return (
    <>
      <GoogleOAuthProvider clientId="4414389883-2a55r4n0telsadbbp9tsu6nv3uiipn6d.apps.googleusercontent.com">
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Routess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Routess />} />
          </Routes>
        </ProductProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
