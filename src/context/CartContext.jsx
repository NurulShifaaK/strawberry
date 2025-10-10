import React, { createContext, useState, useEffect } from "react";
 
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
   const [orders, setOrders] = useState([]);

    useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cartItems"));
    if (saved) setCartItems(saved);

     const savedOrders = JSON.parse(localStorage.getItem("orders"));
    if (savedOrders) setOrders(savedOrders);
  }, []);

    useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

    useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

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


   // remove order function
  const removeOrder = (description) => {
    setOrders((prev) => prev.filter((item) => item.description !== description));
  };

    const clearCart = () => setCartItems([]);

      const addOrder = (product) => {
    setOrders((prev) => [...prev, { ...product, status: "Order Confirmed" }]);
  };


  return (
    <CartContext.Provider value={{ cartItems, orders, addToCart, removeFromCart, clearCart, addOrder ,removeOrder}}>
      {children}
    </CartContext.Provider>
  );
};