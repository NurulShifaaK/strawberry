import React, { useEffect, useState } from "react";

import Footer from "../Foot and brands/Footer";
import Brands from "./Brands";

import Delivery from "../Navbar/Delivery";
import Weather from "./Weather";
import {auth} from "../../firebase"

import Spline from '@splinetool/react-spline';
import AuroraHome from "./AuroraHome";


import { motion } from "framer-motion";





const Home = () => {
   const [admin,setadmin]=useState(false)
  
 
   
 useEffect(() => {
    
       auth.onAuthStateChanged(function(user){
              if(user){
                if(user.uid === "W6Nsnxh8QJgOaYHCsAGaiNVlt8V2")
                {
                  setadmin(true)
                  console.log("admin")
                }
                else{
                    setadmin(false)
                     console.log("user")
                }
              }
              else{
               
                console.log("logout")
              }
          });
              return () => unsubscribe();
  }, []);


  return (
    <>
   <div className="relative w-full h-[400px]">
  
    
 <Weather/>
 
</div>


        <Brands />
    
     <p className="text-center text-black/50 font-semibold text-2xl md:hidden">Features of Aurora</p>
    <div className="relative w-full h-[300px] sm:h-[400px]  bg-white md:hidden">

   <Spline scene="https://prod.spline.design/IiBz4kW2RN1Ee1xm/scene.splinecode" />


   <div className="absolute bottom-0 right-0 w-[170px] h-[90px] bg-white"></div>

    </div>

   
   <div className="hidden md:block">
<AuroraHome/>
</div>

<div className="md:mt-4">
     <Delivery/>
      </div>


      <Footer />



    </>
  );
};

export default Home;
