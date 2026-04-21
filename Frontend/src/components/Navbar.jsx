import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav-blur flex justify-between items-center px-6 md:px-10 py-4">
      <Link to="/" className="text-2xl font-black bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform flex items-center gap-2">
        <span className="text-3xl"></span> Lumino
      </Link>
      <div className="flex items-center gap-2 md:gap-4">
        {(!userInfo || !userInfo.isAdmin) && (
          <Link 
            to="/" 
            className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all ${location.pathname === '/' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
           Home
          </Link>
        )}
        {(!userInfo || !userInfo.isAdmin) && (
          <Link 
            to="/cart" 
            className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${location.pathname === '/cart' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            🛒
            {cartItems.length > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>
        )}
        
        {userInfo && userInfo.isAdmin && (
           <Link 
            to="/admin" 
            className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all ${location.pathname.startsWith('/admin') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-indigo-400'}`}
          >
            Admin
          </Link>
        )}

        <div className="h-6 w-px bg-white/10 mx-1 md:mx-2"></div>
        
        {userInfo ? (
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-slate-200 text-sm font-medium hidden lg:block">{userInfo.name}</span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 md:px-4 py-2 rounded-lg font-bold text-sm transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="primary-btn !py-2 !px-4 !text-sm whitespace-nowrap"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};


export default Navbar;