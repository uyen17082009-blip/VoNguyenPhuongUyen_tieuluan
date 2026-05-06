import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageMap } from '../../utils/productImages';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Khởi tạo giỏ hàng từ LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Lỗi parse giỏ hàng:", error);
        setCartItems([]);
      }
    }
  }, []);

  // Hàm cập nhật giỏ hàng dùng chung
  const updateCart = useCallback((newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  }, []);

  // Các handlers xử lý hành động
  const handleQuantityChange = (productId, delta) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter(Boolean);
    updateCart(updatedCart);
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      updateCart(cartItems.filter((item) => item.id !== productId));
    }
  };

  // Helper: Chuyển đổi chuỗi tiền tệ thành số
  const parsePrice = (priceStr) => {
    return parseFloat(priceStr?.replace(/[^\d]/g, '')) || 0;
  };

  // Tính tổng tiền (Tối ưu với useMemo)
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + parsePrice(item.currentPrice) * item.quantity;
    }, 0);
  }, [cartItems]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  // View khi giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Giỏ hàng của bạn đang trống</h2>
          <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1 className="cart-title">Giỏ hàng của bạn</h1>
        <span className="cart-count">({cartItems.length} sản phẩm)</span>
      </header>

      <div className="cart-content">
        {/* Danh sách sản phẩm */}
        <div className="cart-items-list">
          {cartItems.map((item) => {
            const unitPrice = parsePrice(item.currentPrice);
            const itemTotal = unitPrice * item.quantity;

            return (
              <div key={item.id} className="cart-item-card">
                <div className="item-image">
                  <img
                    src={item.image || imageMap[item.imageKey] || 'https://via.placeholder.com/150'}
                    alt={item.name}
                  />
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-unit-price text-muted">{item.currentPrice}</p>
                  
                  <div className="item-controls">
                    <div className="quantity-selector">
                      <button 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                <div className="item-total-section">
                  <p className="label">Thành tiền</p>
                  <p className="price-highlight">{formatPrice(itemTotal)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tổng kết đơn hàng */}
        <aside className="cart-summary-card">
          <h2 className="summary-title">Tóm tắt đơn hàng</h2>
          <div className="summary-details">
            <div className="summary-line">
              <span>Tạm tính:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="summary-line">
              <span>Phí vận chuyển:</span>
              <span className="text-free">Miễn phí</span>
            </div>
            <hr />
            <div className="summary-line total">
              <span>Tổng cộng:</span>
              <span className="grand-total">{formatPrice(totalPrice)}</span>
            </div>
          </div>
          
          <div className="summary-actions">
            <button className="btn-checkout">Tiến hành thanh toán</button>
            <button className="btn-secondary" onClick={() => navigate('/')}>
              Tiếp tục mua sắm
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
