

import React from "react";
import { FaInstagram, FaFacebookF, FaPinterest, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-black/30 to-black border-t shadow mt-10">

         <div className="mt-7">
          <h1 className="text-6xl font-bold text-white tracking-wide text-center">
            Veloura <span className="italic text-white-500">Éternelle</span>
          </h1>
          <p className="mt-2 text-center text-white/70 italic md:hidden" >
            Where Radiance Meets Royalty 
          </p>
        </div>

      <div className=" md:mt-4 max-w-7xl mx-auto px-6 py-3 grid grid-cols-1 md:grid-cols-4 gap-8 rounded">
         <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2 text-white/70">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

      
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Customer Care</h2>
          <ul className="space-y-2 text-white/70">
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Join Our Royal Glow Club</h2>
          <p className="text-white/70 text-sm mb-3">
            Get exclusive offers & skincare secrets 
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-white/20  rounded focus:outline-none focus:ring-2 text-white/50"
            />
            <button className="bg-black text-white px-4 py-2 rounded-l hover:bg-white/20 m-2">
            Start
            </button>
          </div>
        </div>
       <div>
        <p className="text-4xl font-bold text-white/80 hidden md:block">Timeless Elegance, Unforgettable You And Us.</p>
       </div>
      </div>

     
      <div className="border-t border-white/20 shadow-2xl mt-6 py-4 px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-white/70 text-sm">
          © 2025 Veloura Éternelle. All Rights Reserved.
        </p>

        
        <div className="flex space-x-4 mt-3 md:mt-0">
          <FaInstagram className="text-white hover:text-pink-700 cursor-pointer" size={18} />
          <FaFacebookF className="text-white hover:text-blue-600 cursor-pointer" size={18} />
          <FaPinterest className="text-white hover:text-red-700 cursor-pointer" size={18} />
          <FaTiktok className="text-white hover:text-black cursor-pointer" size={18} />
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
