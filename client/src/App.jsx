import React from "react";
import LoginPage from "./screens/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import ProductDetailsPage from "./screens/ProductDetailsPage";
import ListingsPage from "./screens/ListingsPage";
import AddProduct from "./screens/AddProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/listing" element={<ListingsPage/>}/>
      <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
