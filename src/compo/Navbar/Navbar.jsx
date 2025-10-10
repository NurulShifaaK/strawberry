import React, { useState } from "react";
import { Link } from "react-router-dom";
import menu from "../../assets/menu.png";
import search from "../../assets/cart.png";
import serum from "../../assets/slide/ser.jpeg";
import sun from "../../assets/slide/sun.jpeg";
import mois from "../../assets/slide/mois.jpeg";
import oil from "../../assets/slide/oil.jpeg";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(true);
  };

  const handleclose=()=>{
    setOpen(false)
  }
  const items = [
    { name: "Home", path: "/home" },
    { name: "Products", path: "/allproduct" },
    { name: "Dermo", path: "/dermo" },
    { name: "Order", path: "/order" },
  ];

  return (
    <>
     
      <div className="flex justify-between items-center px-4 py-2 shadow-md">
     
        <p className="text-2xl font-semibold cursor-pointer">
          Aurora
        </p>

      
        <div className="hidden md:flex gap-8">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:underline"
            >
              {item.name}
            </Link>
          ))}
        </div>

       
        <div className="hidden md:flex gap-2">
          <Link
            to="/login"
            className="hover:bg-black/20 px-3 py-1 rounded font-semibold"
          >
            Login
          </Link>
         
         <Link to={"/carts"}>
          <button className="hover:bg-black/20 px-3 py-1 rounded font-semibold">
            Cart
          </button>
          </Link>
        </div>

       
        <div className="flex md:hidden gap-2">
          <div className="relative">
            <Link to={"/carts"}>
          <img src={search} alt="Search" className="h-6 w-6 cursor-pointer" /></Link>
          <p 
          className="text-[9px] bg-violet-400 rounded-3xl text-center w-full bottom-5 text-white absolute left-2">
            1</p>
        </div>
          <img
            onClick={handleMenu}
            src={menu}
            alt="Menu"
            className="h-6 w-6 cursor-pointer"
          />
        </div>
      </div>

    
      <div
        className={`absolute top-12 left-0 h-screen bg-white shadow-xl flex transition-transform duration-2000 ease-in-out z-80 
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <p className=" cursor-pointer p-2 "
        onClick={handleclose}
        >X</p>
        {/* Menu Links */}
        <div className="space-y-4 px-6 py-6 w-48 mt-6">
          <Link to={"/home"}><p className="hover:underline p-2">Home</p></Link>
         <Link to={"/allproduct"}><p className="hover:underline p-2">Products</p></Link> 
         <Link to={"/order"}><p className="hover:underline p-2">Orders</p></Link> 
          <Link to={"/carts"}><p className="hover:underline p-2">Cart</p></Link> 
          <Link to={"/allproduct"}><p className="hover:underline p-2">Chat With Us</p></Link> 
          <p className="hover:underline bg-violet-400 px-2 py-1 rounded mt-4 text-white font-semibold">Login</p>
        </div>

       
         <div className="sm:flex gap-2 p-2 hidden ">
          <div>
            <img
              className="rounded h-[260px] w-[200px] object-cover shadow p-1"
              src={serum}
              alt="serum"
            />
            <img
              className="rounded h-[260px] w-[200px] object-cover shadow p-1"
              src={sun}
              alt="sun"
            />
          </div>
          <div>
            <img
              className="rounded h-[260px] w-[200px] object-cover shadow p-1"
              src={mois}
              alt="moisturizer"
            />
            <img
              className="rounded h-[260px] w-[200px] object-cover shadow p-1"
              src={oil}
              alt="oil"
            />
          </div>
        </div> 
      </div>
    </>
  );
};

export default Navbar;


