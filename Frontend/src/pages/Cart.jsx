import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';


const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const checkoutHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name || 'Product Item', 
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product,
        })),
        shippingAddress: { address: 'Lumino Hub', city: 'Neo Karachi', postalCode: '74200', country: 'Pakistan' },
        paymentMethod: 'Lumino Pay',
        totalPrice: cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
      };

      await axios.post(API_BASE_URL + '/orders', orderData, config);
      navigate('/success');
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing order');
    }
  };

  if (!userInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="glass-card p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Your Shopping Cart</h2>
          <p className="text-slate-400 mb-8 text-xl">Please login to view and manage your cart.</p>
          <Link to="/login" className="primary-btn inline-block px-10">Login Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-slate-400 text-xl mb-6">Your cart is empty</p>
          <Link to="/" className="primary-btn inline-block">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.product} className="glass-card p-4 flex flex-col md:flex-row items-center gap-6">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1 text-center md:text-left">
                  <Link to={`/product/${item.product}`} className="text-xl font-semibold text-white hover:text-indigo-400 transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-slate-400 font-bold mt-1">Rs {item.price}</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 rounded-xl border border-white/10 p-1">
                  <button 
                    onClick={() => addToCart({ _id: item.product, ...item }, Math.max(1, item.qty - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors disabled:opacity-30"
                    disabled={item.qty <= 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg>
                  </button>
                  <span className="text-white font-bold w-6 text-center">{item.qty}</span>
                  <button 
                    onClick={() => addToCart({ _id: item.product, ...item }, Math.min(item.countInStock, item.qty + 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors disabled:opacity-30"
                    disabled={item.qty >= item.countInStock}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                  </button>
                  
                  <div className="w-px h-6 bg-white/10 mx-1"></div>

                  <button
                    onClick={() => removeFromCart(item.product)}
                    className="text-red-400 hover:text-red-300 p-2 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                  <span className="text-white">Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-indigo-400">Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
              </div>
              <button
                className="primary-btn w-full text-lg"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
