import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { imageMap } from '../../utils/productImages';
import './ProductList.css';

const PRODUCTS_PER_PAGE = 8; // Hiển thị 8 sản phẩm (2 hàng x 4 cột)
const jsonBase = import.meta.env.BASE_URL || '/';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsRes = await fetch(`${jsonBase}products.json`);
        if (!productsRes.ok) throw new Error('Không thể tải dữ liệu');
        
        const data = await productsRes.json();
        const mappedProducts = data.map((item) => ({
          ...item,
          image: imageMap[item.imageKey] || item.image
        }));
        setProducts(mappedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Lấy ra đúng 8 sản phẩm đầu tiên hoặc theo logic của bạn
  const visibleProducts = products.slice(0, PRODUCTS_PER_PAGE);

  if (isLoading) return <div className="loading">Đang tải sản phẩm...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;

  return (
    <div className="container">
      {/* Phần Bộ sưu tập */}
      <section className="product-section">
        <h2 className="section-title">BO SUU TAP NAM 2026</h2>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-card-custom">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info-custom">
                  <h3 className="product-name">San pham</h3>
                  <p className="product-price">Gia: {product.price || '50.000d'}</p>
                  <button className="add-to-cart-btn">
                    <i className="fa-solid fa-cart-plus"></i> {/* Dùng FontAwesome hoặc icon tương đương */}
                    <span>🛒</span> 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-more-wrapper">
          <button className="btn-view-more">Xem thêm</button>
        </div>
      </section>

      {/* Phần Sản phẩm nổi bật */}
      <section className="product-section">
        <h2 className="section-title">SAN PHAM NOI BAT</h2>
        {/* Bạn có thể tái sử dụng grid ở đây */}
      </section>
    </div>
  );
};

export default ProductList;
