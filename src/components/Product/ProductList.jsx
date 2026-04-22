import React ,{useEffect, useState } from 'react';
import './ProductList.css'
import ProductCard from './ProductCard';
import { imageMap } from '../../utils/productImages';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const reponse = await fetch('../product.json');
                if (!reponse.ok) {
                    throw new Error('Không thể tải dữ liệu sản phẩm');
                }
                const data = await reponse.json();
                const mappedProducts = data.map((item) =>
                ({
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
        return <div className="products-list-container">Đang tải dữ liệu....</div>;
    }
    if (error) {
    return <div className="product-list-container" style={{color: 'red'}}>Lỗi: {error}</div>;
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
