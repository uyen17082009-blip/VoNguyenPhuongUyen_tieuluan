import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../../img/logo.png';

const Header = () => {
  const [currentLang, setCurrentLang] = useState('VN');
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const trans = {
    VN: {
      freeShip: "Miễn phí giao hàng đơn từ 500k",
      search: "Tìm kiếm mỹ phẩm...",
      login: "Đăng nhập",
      hello: "Chào",
      cart: "Giỏ hàng",
      menu: ["TRANG CHỦ", "CHĂM SÓC DA", "CHĂM SÓC TÓC", "TRANG ĐIỂM", "SẢN PHẨM MỚI", "KHUYẾN MÃI"],
      skincareSub: ["Sữa Rửa Mặt", "Serum & Đặc Trị", "Kem Dưỡng Ẩm", "Mặt Nạ"]
    },
    EN: {
      freeShip: "Free shipping on orders over 500k",
      search: "Search products...",
      login: "Login",
      hello: "Hi",
      cart: "Cart",
      menu: ["HOME", "SKINCARE", "HAIRCARE", "MAKEUP", "NEW ARRIVALS", "PROMOTIONS"],
      skincareSub: ["Cleanser", "Serum & Treatment", "Moisturizer", "Mask"]
    }
  };

  const syncStore = useCallback(() => {
    const savedCart = localStorage.getItem('cart');
    setCartCount(savedCart ? JSON.parse(savedCart).reduce((sum, item) => sum + (item.quantity || 0), 0) : 0);
    const savedUser = localStorage.getItem('currentUser');
    setCurrentUser(savedUser ? JSON.parse(savedUser) : null);
  }, []);

  const handleLangChange = (lang) => {
    setCurrentLang(lang);
    const event = new CustomEvent('languageChange', { detail: lang });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    syncStore();
    window.addEventListener('storage', syncStore);
    return () => window.removeEventListener('storage', syncStore);
  }, [syncStore]);

  const currentData = trans[currentLang];

  return (
    <header className="aline-header">
      <div className="header-top-bar">
        <div className="header-container">
          <div className="top-bar-left">
            <span>{currentData.freeShip}</span>
            <span className="divider">|</span>
            <i className="fa-solid fa-phone"></i> 1800 1708
          </div>
          <div className="top-bar-right">
            <div className="language-picker">
              <span className={`lang-btn ${currentLang === 'VN' ? 'active' : ''}`} onClick={() => handleLangChange('VN')}>VN</span>
              <span className="divider">|</span>
              <span className={`lang-btn ${currentLang === 'EN' ? 'active' : ''}`} onClick={() => handleLangChange('EN')}>EN</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="header-container">
          <div className="header-logo" onClick={() => navigate('/')}>
            <img src={logoImage} alt="Aline Beauty" />
          </div>
          <div className="header-search">
            <input type="text" placeholder={currentData.search} />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
          <div className="header-actions">
            <div className="action-item">
              <i className="fa-regular fa-circle-user purple-icon"></i>
              {currentUser ? (
                <span className="action-label">{currentData.hello}, {currentUser.name || 'User'}</span>
              ) : (
                <Link to="/login" className="action-label">{currentData.login}</Link>
              )}
            </div>
            <Link to="/cart" className="action-item header-cart">
              <div className="cart-icon-wrapper">
                <i className="fa-solid fa-basket-shopping purple-icon"></i>
                <span className="cart-badge">{cartCount}</span>
              </div>
              <span className="action-label">{currentData.cart}</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="header-container">
          <ul className="nav-list">
            {currentData.menu.map((text, index) => (
              <li key={index} className="nav-item">
                <Link to="/" className="nav-link">
                  {text} {index === 1 && <i className="fa-solid fa-chevron-down arrow-icon"></i>}
                </Link>
                {index === 1 && (
                  <ul className="submenu">
                    {currentData.skincareSub.map((sub, i) => (
                      <li key={i}><Link to="/">{sub}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
