import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logoImage from '../../img/logo.png';

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) {
        setCartCount(0);
      } else {
        try {
          const cart = JSON.parse(savedCart);
          const totalItems = cart.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0
          );
          setCartCount(totalItems);
        } catch (error) {
          console.error('Lỗi đọc giỏ hàng:', error);
          setCartCount(0);
        }
      }
    };

    const updateCurrentUser = () => {
      const savedUser = localStorage.getItem('currentUser');
      if (!savedUser) {
        setCurrentUser(null);
        return;
      }
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Lỗi đọc thông tin người dùng:', error);
        setCurrentUser(null);
      }
    };

    updateCartCount();
    updateCurrentUser();

    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('userUpdated', updateCurrentUser);
    window.addEventListener('storage', () => {
      updateCartCount();
      updateCurrentUser();
    });

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('userUpdated', updateCurrentUser);
    };
  }, []);

  // Danh mục sản phẩm mỹ phẩm
  const skincareMenuItems = [
    { text: "Sữa Rửa Mặt", href: "/cham-soc-da/sua-rua-mat" },
    { text: "Serum & Đặc Trị", href: "/cham-soc-da/serum" },
    { text: "Kem Dưỡng Ẩm", href: "/cham-soc-da/kem-duong" },
    { text: "Chống Nắng", href: "/cham-soc-da/chong-nang" },
    { text: "Mặt Nạ", href: "/cham-soc-da/mat-na" },
  ];

  return (
    <header className="aline-header">
      {/* Top Bar */}
      <div className="header-top-bar">
        <div className="header-top-content">
          <div className="header-delivery-info">
            <span className="delivery-text">Giao hàng miễn phí</span>
            <i className="fas fa-phone-alt delivery-icon"></i>
            <span className="delivery-phone">1800 6779</span>
          </div>

          <div className="header-logo-container">
            <div className="aline-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <img src={logoImage} alt="Aline Beauty Logo" className="header-logo-image" />
            </div>
          </div>

          <div className="header-user-actions">
            <button
              className="login-link"
              onClick={() => navigate('/login')}
            >
              <i className="fas fa-user"></i> {currentUser ? (currentUser.name || currentUser.user) : 'Đăng nhập'}
            </button>
            <span className="action-separator">|</span>
            <div className="language-selector">
              <span className="lang-active">VN</span>
              <span className="lang-separator">|</span>
              <span className="lang-option">EN</span>
            </div>
            <button
              className="cart-button"
              onClick={() => navigate('/cart')}
            >
              <i className="fas fa-shopping-bag"></i>
              <span>Giỏ hàng</span>
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="header-navigation">
        <div className="nav-content">
          <a href="/" className="nav-link">TRANG CHỦ</a>

          {/* Chăm sóc da với Dropdown */}
          <div
            className="nav-item-with-dropdown"
            onMouseEnter={() => setHoveredMenu('skincare')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <a href="/cham-soc-da" className={`nav-link ${hoveredMenu === 'skincare' ? 'active' : ''}`}>
              CHĂM SÓC DA
            </a>

            {hoveredMenu === 'skincare' && (
              <div className="dropdown-menu">
                {skincareMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.text}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="/cham-soc-toc" className="nav-link">CHĂM SÓC TÓC</a>
          <a href="/trang-diem" className="nav-link">TRANG ĐIỂM</a>
          <a href="/san-pham-moi" className="nav-link">SẢN PHẨM MỚI</a>
          <a href="/khuyen-mai" className="nav-link">KHUYẾN MÃI</a>
          <a href="/ve-chung-toi" className="nav-link">VỀ CHÚNG TÔI</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;