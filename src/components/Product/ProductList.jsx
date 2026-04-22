import React ,{useEffect, useState } from 'react';
import './ProductList.css'
import ProductCard from './ProductCard';
import { imageMap } from '../../utils/productImages';

const PRODUCTS_PER_PAGE =6;
const jsonBase = import.meta.env.BASE_URL || '/';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch(`${jsonBase}products.json`),
                    fetch(`${jsonBase}category.json`)
                    ]);
                if(!productsRes.ok) {
                    throw new Error('Không thể tải dữ liệu sản phẩm');
                }
                const data = await productsRes.json();
                const mappedProducts = data.map((item) => ({
                    ...item,
                    image: imageMap[item.imageKey] || item.image
                }));
                setProducts(mappedProducts);
                if(categoriesRes.ok){
                    const catData = await categoriesRes.json();
                    setCategoris(Array.isArray(catData) ? catData : []);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);
    const filteredProducts = 
        selectCategoryId == null
            ? products
            : products.filter((p) => p.categoryid === selectedCategoryId);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
    useEffect(() => {
        setCurrentPage((p) => Math.min(p, totalPages));
    }, [totalPages]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategoryId]);

    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    const vidibleProducts = filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
    const goPrev = () => setCurrentPage((p) => Math.max(1, p-1));
    const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

    if(isLoading) {
        return <div className="product-list-container">Dang tai san phamr...</div>;
    }
     if(isLoading) {
        return <div className="product-list-container">Loi: {error}</div>;
    }
    return (
        <div className=
        
