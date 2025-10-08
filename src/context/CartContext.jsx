import React, { createContext, useState, useEffect } from "react";
 
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cartItems"));
    if (saved) setCartItems(saved);
  }, []);

    useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

    const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.description === product.description);
      if (exists) return prev; // avoid duplicates
      return [...prev, product];
    });
  };

    const removeFromCart = (description) => {
    setCartItems((prev) => prev.filter((item) => item.description !== description));
  };

    const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};