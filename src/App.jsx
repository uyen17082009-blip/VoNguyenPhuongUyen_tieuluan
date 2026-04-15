import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/Pages/ProductList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
     
        <Header />
        <ProductList />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
