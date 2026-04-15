import { useState, useEffect } from 'react';
import './ProductList.css'

import sp1Image from '../../img/lsp1/sp1.jpg';
import sp2Image from '../../img/lsp1/sp2.jpg';
import sp3Image from '../../img/lsp1/sp3.jpg';

const imageMap = {
  sp1: sp1Image,
  sp2: sp2Image,
  sp3: sp3Image
};

const ProductList = () => {
  const [products, setProducts] = useStage([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const reponse = await fetch('/products.json');
        if(!reponse.ok) {
          throw new Error('Không thể tải dữ liệu sản phẩm');
        }
        const data = await reponse.json();
        const mappedProducts = data.map((item) => 
    ({ ...item,
        image: imageMap[item.imageKey] || item.image
     }));        
  setProducts(mappedProducts);
      }catch (err) {
        setError(err.message);
      } finally{
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);
  if (isLoading) {
    return <div className = "products-list-container">Lỗi: {error}</div>;
  }
  return(
    <div className="product-list-container">
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
      ))}
        
      </div>
    </div>
    );
};
export defaul ProductList;
