import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty) => {
    if (!userInfo) return; // Protected action

    const item = {
      product: product._id,
      name: product.title || product.name,
      image: product.image || product.thumbnail,
      price: product.price,
      countInStock: product.countInStock || product.stock || 10,
      qty,
    };

    const existItem = cartItems.find((x) => x.product === item.product);

    if (existItem) {
      setCartItems(
        cartItems.map((x) => (x.product === existItem.product ? item : x))
      );
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id) => {
    if (!userInfo) return; // Protected action
    setCartItems(cartItems.filter((x) => x.product !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

