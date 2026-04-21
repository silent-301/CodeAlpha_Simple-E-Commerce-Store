import React, { createContext, useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = `${API_BASE_URL}/products`; 

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Server error");
      const result = await res.json();
      
      setProducts(result); 
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch products. Is the backend running?");
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token : null;
        const res = await fetch(`${API_URL}/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          setProducts(products.filter(p => p._id !== id));
        } else {
          alert("Failed to delete product. Are you logged in as admin?");
        }
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };


  return (
    <ProductContext.Provider value={{ 
      products,
      filteredProducts, 
      loading, 
      error, 
      searchTerm, 
      setSearchTerm, 
      deleteProduct,
      setProducts,
      fetchProducts 
    }}>
      {children}
    </ProductContext.Provider>
  );
};