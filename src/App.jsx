import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DetailProduct from './components/Products/DetailProduct';
import ProductList from "./components/Products/ProductList";
import Cart from "./components/Pages/Cart";

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
        <Route
          path="/"
          element={
            <>
              <ProductList />
            </>
          }
        />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {!hideChrome && <Footer />}
    </>
  );
}

export default App;
