import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const { filteredProducts, loading, error, searchTerm, setSearchTerm, deleteProduct } = useContext(ProductContext);

  const { addToCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();


  if (loading) return <div className="flex items-center justify-center min-h-screen text-white text-2xl font-bold">Loading products...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div>
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">ALPHA <span className="text-indigo-500">STORE</span></h1>
          <p className="text-slate-400">Discover our collection of premium products</p>
        </div>
        
        <div className="relative group min-w-[300px] w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full glass-card bg-white/5 border-white/10 px-6 py-4 rounded-full text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg pl-14"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product._id} className="glass-card flex flex-col group hover:-translate-y-2 transition-all hover:border-indigo-500/50 hover:shadow-indigo-500/10">
            <div className="h-64 relative overflow-hidden rounded-t-3xl">
              <Link to={`/product/${product._id}`}>
                <img 
                  src={product.image || product.thumbnail} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </Link>
              <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                {product.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-xl text-white mb-2 truncate" title={product.title}>{product.title}</h3>
              <p className="text-2xl font-black text-indigo-400 mb-6">Rs {product.price}</p>
              
              <div className="flex gap-3 mt-auto">
                {userInfo && userInfo.isAdmin ? (
                  <>
                    <Link to={`/admin/product/edit/${product._id}`} className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl text-center text-sm transition-colors shadow-lg shadow-indigo-500/20">
                      Edit
                    </Link>
                    <button 
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold py-3 rounded-xl text-center text-sm transition-all border border-red-500/20"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={`/product/${product._id}`} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl text-center text-sm transition-colors border border-white/5">
                      Details
                    </Link>
                    <button 
                      onClick={() => userInfo ? addToCart(product, 1) : navigate('/login')}
                      className="flex-1 primary-btn !py-3 !text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 mt-10">
          <p className="text-2xl font-bold text-slate-500">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;

