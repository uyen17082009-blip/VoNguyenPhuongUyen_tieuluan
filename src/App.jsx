import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DetailProduct from './components/Product/DetailProduct';
import ProductList from "./components/Product/ProductList";
import ProductCard from "./components/Product/ProductCard";


function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<DetailProduct />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
