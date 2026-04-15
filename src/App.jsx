import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi file JSON từ thư mục public
    fetch('/product.json') 
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Lưu dữ liệu vào state
      })
      .catch((error) => console.error("Lỗi tải dữ liệu:", error));
  }, []);

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
