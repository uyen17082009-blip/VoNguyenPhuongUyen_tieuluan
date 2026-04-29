import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleGoToDetail = () => {
        navigate(`/product/${product.id}`, {
            state: { product } 
        });
    };

    return (
        <div className="product-card" onClick={handleGoToDetail} style={{ cursor: 'pointer' }}>
            <div className="product-image-container">
                <img 
                    src={product.image || 'https://via.placeholder.com/300x200'}
                    alt={product.name}
                    className="product-image"
                />
            </div>

            <h3 className="product-name">{product.name}</h3>

            <div className="product-ram-ssd">
                {/* Cách viết này an toàn hơn nếu product.size bị thiếu */}
                {product.sizeS && <button className='ram-ssd-tag'>{product.sizeS}</button>}
                {product.sizeM && <button className='ram-ssd-tag'>{product.sizeM}</button>}
                {product.sizeL && <button className='ram-ssd-tag'>{product.sizeL}</button>}
            </div>

            <div className="product-pricing">
                <div className="current-price">{product.currentPrice}</div>
                <div className="original-price-section">
                    {product.originalPrice && (
                        <span className="original-price">{product.originalPrice}</span>
                    )}
                    {product.discount && (
                        <span className="discount">{product.discount}</span>
                    )}
                </div>
            </div>

            <div className="product-rating-sales">
                <span className="rating">⭐ {product.rating}</span>
                <span className="sales">Đã bán {product.sold}</span>
            </div>

            <button className="compare-button" onClick={(e) => {
                e.stopPropagation(); 
                handleGoToDetail();
            }}>
                Mua
            </button>
        </div>
    );
};

export default ProductCard;
