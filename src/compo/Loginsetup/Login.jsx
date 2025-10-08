import React, { useEffect, useState } from 'react'
import {auth,googleProvider} from "../../firebase"
import { Link, useNavigate } from 'react-router-dom'
import bg from "../../assets/bgimg/login.jpeg";



const Login = () => {
    const[Uemail,setUemail]=useState("")
    const[pass,setpass]=useState("")
    const navi=useNavigate()

    // useEffect(()=>{
    //     auth.onAuthStateChanged(function(Uemail){
    //         if(Uemail){
        
    //             navi("/home")
    //         }
    //         else{
    //             console.log("logged out")
    //         }
    //     })
    // })

    const handlelogin=async(e)=>{
        e.preventDefault();
      try{
       await auth.signInWithEmailAndPassword(Uemail,pass)
       alert("Login sucessfull")
       navi("/home")
      }
      catch(error){
        console.log(error)
        alert("Don't Have an Account? SIgnup.")
      }
    }
   

      // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      console.log("User Info:", result.user);
      alert(`Welcome ${result.user.displayName}`);
      navi("/home");
    } catch (error) {
      console.error(error);
      alert("Google login failed. Try again!");
    }
  };

  return (
   <>
    
   <div className='h-screen flex flex-col justify-center items-center text-center gap-6 '
   style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
    <p className='font-bold text-3xl text-black/80'>Welcome back, we’ve missed your glow!</p>
   <div
    className="flex flex-col gap-5">
    <input
    className='border border-black/20 rounded px-4 py-2 w-[300px]'
    type="email"
    placeholder='Email'
    value={Uemail}
    onChange={(e)=>setUemail(e.target.value)} />

    <input
    className='border border-black/20 rounded px-4 py-2 w-[300px] hover:shadow-lg'
    type="password"
    placeholder='Password'
    value={pass}
    onChange={(e)=>setpass(e.target.value)} />
    <button 
    className='bg-black text-white px-4 py-2 rounded'
     onClick={handlelogin}>Login</button>
    <p>New to Auroria? <Link to={"/Register"}><span className='font-semibold text-l text-indigo-600 hover:underline'> Sign up for free.</span></Link></p>
    
</div>
   </div>
   </>
  )
}

export default Login