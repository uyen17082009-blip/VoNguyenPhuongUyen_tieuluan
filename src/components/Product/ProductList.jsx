import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';
import { imageMap } from '../../utils/productImages';

const ProdutList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch('/products.json');
                if (!response.ok) throw new Error('không thể tải dữ liệu sản phẩm');
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

    if (isLoading) return <div className="product-list-container">Đang tải...</div>;
    if (error) return <div className="product-list-container">Lỗi: {error}</div>;

    return (
        <div className="product-list-container">
            <div className="product-list-inner">
                <h2 className="section-title">SẢN PHẨM BÁN CHẠY</h2>
                <div className="category-menu-container">
                    <div className="category-menu">
                        <div className="category-item active">
                            <strong>Tất cả</strong>
                        </div>
                        <div className="category-item">
                            Thực phẩm tươi sống
                        </div>
                        <div className="category-item">
                            Thực phẩm đông lạnh
                        </div>
                        <div className="category-item">
                            Thực phẩm khô
                        </div>
                        <div className="category-item">
                            Đồ uống
                        </div>
                        <div className="category-item">
                            Đồ dùng gia đình
                        </div>
                        <div className="category-item">
                            Mỹ phẩm & Chăm sóc cá nhân
                        </div>
                        <div className="category-item">
                            Chất tẩy rửa & Vệ sinh nhà cửa
                        </div>
                        <div className="category-item">
                            Đồ ăn vặt & Ăn nhẹ
                        </div>
                        <div className="category-item">
                            Đồ dùng cho Mẹ & Bé
                        </div>
                        <div className="category-item">
                            Văn phòng phẩm & Tiện ích
                        </div>
                    </div>
                </div>

                <div className="product-list-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <button className="view-more-btn">Xem thêm sản phẩm</button>
            </div>
        </div>
    );
};

export default ProdutList;
