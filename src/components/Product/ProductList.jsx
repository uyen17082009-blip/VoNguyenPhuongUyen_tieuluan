import React ,{useEffect, useState } from 'react';
import './ProductList.css'
import ProductCard from './ProductCard';

import sp1Image from '../../img/sp1.png';
import sp2Image from '../../img/sp2.jpg';
import sp3Image from '../../img/sp3.jpg';

const imageMap = {
    sp1: sp1Image,
    sp2: sp2Image,
    sp3: sp3Image
};

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
