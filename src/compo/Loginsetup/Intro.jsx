import React from 'react'
import {auth,googleProvider,appleProvider} from "../../firebase"
import Google from "../../assets/google.png"
import Apple from "../../assets/apple.png"
import Gmail from "../../assets/gmail.png"
import { Link, useNavigate } from 'react-router-dom'
import bg from "../../assets/bgimg/google.jpeg";

const Intro = () => {

  const navi=useNavigate()

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


  //maillogin
  const handlemail=()=>{
  navi("/login")
  }


  //apple
  const handleAppleLogin = async () => {
  try {
    const result = await auth.signInWithPopup(appleProvider);
    console.log("Apple User Info:", result.user);
    alert(`Welcome ${result.user.displayName || result.user.email}`);
    navi("/home");
  } catch (error) {
    console.error(error);
    alert("Apple login failed. Try again!");
  }
};
  return (
    <>
      
   <div
  className="flex flex-col justify-center items-center text-center w-full h-screen gap-12"
  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
   <div>
    <p className='text-2xl font-semibold'>Welcome back, we’ve missed your glow!</p>
</div>
<div className='space-y-5'>
    <div>
        <button
        onClick={handleGoogleLogin}
          className="rounded px-4 py-2 border border-black/10 text-black hover:shadow-lg flex gap-3 w-[220px]">
        <img className='h-6' 
        src={Google}/> 
        <span className='font-semibold'>
        Sign in with Google</span>
        </button>
    </div>
     <div >
        <button
        onClick={handleAppleLogin}
          className="rounded px-4 py-2 border border-black/10 text-black hover:shadow-lg flex gap-3 w-[220px]">
        <img className='h-6' 
        src={Apple}/> 
        <span className='font-semibold'>
        Sign in with Apple</span>
        </button>
    </div>
      <div>
        <button
        onClick={handlemail}
          className="rounded px-4 py-2 border border-black/10 text-black hover:shadow-lg flex gap-3 w-[220px]">
        <img className='h-6' 
        src={Gmail}/> 
        <span className='font-semibold'>
        Sign in with email</span>
        </button>
    </div>
    </div>
    </div>
    </>
  )
}

export default Intro