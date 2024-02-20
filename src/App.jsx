import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Routess from "./Pages/Route/Route";
import { ProductProvider } from "./Context/DataContext";

function App() {
  return (
    <>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Routess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Routess />} />
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
