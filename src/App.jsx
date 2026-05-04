import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DetailProduct from './components/Product/DetailProduct';
import ProductList from "./components/Product/ProductList";


function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <br />

      <DetailProduct />
      <ProductList />

      <br/>
      <Footer />
    </>
  );
}

export default App;
