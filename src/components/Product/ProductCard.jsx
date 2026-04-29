import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (e) => {
        e.stopPropagation();
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.BASE_URL}products.json`);
            const data = await response.json();
            const matched = data.find((item) => item.id === product.id);

            navigate(`/product/${product.id}`, {
                state: { product: { ...matched, image: product.image } }
            });
        } catch (err) {
            console.error("Lỗi điều hướng:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="product-card">
            <div className="heart-icon-wrapper">
                <Heart size={24} color="#333" strokeWidth={1.5} />
            </div>

            <div className="product-image-container" onClick={handleAction}>
                <img 
                    src={product.image || 'https://via.placeholder.com/300x200'}
                    
                    alt={product.name}
                    className="product-image"
                />
            </div>

            <div className="product-info-box">
                <div className="product-name-label">
                    {product.name}
                </div>
                <div className="product-sizes">
                    {product.sizeS && <span className="size-tag">{product.sizeS}</span>}
                    {product.sizeM && <span className="size-tag">{product.sizeM}</span>}
                    {product.sizeL && <span className="size-tag">{product.sizeL}</span>}
                </div>
            </div>

            <div className="product-price-box">
                <div className="price-stack">
                    <span className="current-price">{product.currentPrice}</span>
                    <span className="original-price">{product.originalPrice}</span>
                </div>
                <button className="cart-btn" onClick={handleAction} disabled={isLoading}>
                    {isLoading ? '...' : <ShoppingCart size={22} />}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
