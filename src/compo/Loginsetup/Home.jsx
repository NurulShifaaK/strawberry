import React, { useEffect, useState } from "react";

import Footer from "../Foot and brands/Footer";
import Brands from "./Brands";

import Delivery from "../Navbar/Delivery";
import Weather from "./Weather";
import {auth} from "../../firebase"



// import Splineserum from "../spline/Splineserum";



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

      
    

       {/* <Splineserum/> */}

     <Delivery/>
      


      <Footer />



    </>
  );
};

export default Home;
