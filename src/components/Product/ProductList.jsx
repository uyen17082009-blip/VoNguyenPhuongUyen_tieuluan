import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { imageMap } from '../../utils/productImage'; 
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {

                const response = await fetch('/product.json'); 
                
                if (!response.ok) {
                    throw new Error('Không thể tải dữ liệu sản phẩm');
                }

                const data = await response.json();
                
                // Map dữ liệu để gắn ảnh từ imageMap
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

        loadProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="product-list-container">
                Đang tải sản phẩm...
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-container">
                Lỗi: {error}
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>Không có sản phẩm nào để hiển thị.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
