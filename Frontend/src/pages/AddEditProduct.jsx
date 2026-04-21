import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from "../apiConfig";

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    description: '',
    stock: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(API_BASE_URL + `/products/${id}`);
          setFormData({
            ...data,
            image: data.image || data.thumbnail || ''
          });
        } catch (err) {
          setError('Failed to fetch product details');
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (isEditMode) {
        await axios.put(API_BASE_URL + `/products/${id}`, formData, config);
      } else {
        await axios.post(API_BASE_URL + '/products', formData, config);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="glass-card p-8 md:p-12">
        <h1 className="text-3xl font-bold text-white mb-8">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-slate-400 text-sm">Product Title</label>
            <input
              type="text"
              name="title"
              className="glass-input w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-slate-400 text-sm">Price (Rs)</label>
            <input
              type="number"
              name="price"
              className="glass-input w-full"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 text-sm">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              className="glass-input w-full"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-slate-400 text-sm">Image URL</label>
            <input
              type="text"
              name="image"
              className="glass-input w-full"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 text-sm">Brand</label>
            <input
              type="text"
              name="brand"
              className="glass-input w-full"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 text-sm">Category</label>
            <input
              type="text"
              name="category"
              className="glass-input w-full"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-slate-400 text-sm">Description</label>
            <textarea
              name="description"
              className="glass-input w-full h-32 resize-none"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="md:col-span-2 pt-4 flex gap-4">
            <button type="submit" className="primary-btn flex-1" disabled={loading}>
              {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/admin')}
              className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;