import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import {imageMap} from '../../utils/productImages';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch('/products.json');
                if (!response.ok) {
                    throw new Error('không thể tải dữ liệu sản phẩm');
                }

                const data = await response.json();
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
        return <div className="product-list-container">
            Đang tải sản phẩm...
            </div>;
    }

    if (error) {
        return <div className="product-list-container">
            Lỗi: {eror}
        </div>;
    }

    return (
        <div className="product-list-container">
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
