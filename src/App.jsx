import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DetailProduct from './components/Products/DetailProduct';
import ProductList from "./components/Products/ProductList";

function App() {
  const location = useLocation();
  const hideChrome =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/admin';
    
  return (
    <>
      {!hideChrome && <Header />}
      <Routes>
        <Route path="/product" element={<ProductList />} />
        <Route path="/product/:id" element={<DetailProduct />} />
      </Routes>
      {!hideChrome && <Footer />}
    </>
  );
}

export default App;
