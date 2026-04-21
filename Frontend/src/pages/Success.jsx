import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Success = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="glass-card p-12 animate-in fade-in zoom-in duration-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
        
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-black text-white mb-4 tracking-tight">ORDER PLACED!</h1>
        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Your transaction was completed successfully. We've sent a confirmation email with your order details.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="primary-btn px-10 w-full sm:w-auto">
            Back to Home
          </Link>
          <button className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-xl transition-all border border-white/10 w-full sm:w-auto">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
