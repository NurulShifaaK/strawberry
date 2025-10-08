import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import './index.css'
import { CartProvider } from "./context/CartContext";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   <CartProvider>
    <App />
  </CartProvider>
)
