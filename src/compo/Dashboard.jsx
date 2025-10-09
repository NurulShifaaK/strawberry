import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Intro from "./Loginsetup/Intro";
import Login from "./Loginsetup/Login";
import Signup from "./Loginsetup/Signup";
import Home from "./Loginsetup/Home";
import Cart from "./cart/Cart";
import AllProducts from "./cart/AllProducts";
import Weather from "./Loginsetup/Weather";
import ProductDetail from "./cart/ProductDetail";
import Order from "./cart/Order";




const Dashboard = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        <Route path="/carts" element={<Cart/>}/>
        <Route path="/allproduct" element={<AllProducts/>}/>
        <Route path="/weather" element={<Weather/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        <Route path="/order" element={<Order/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Dashboard;
