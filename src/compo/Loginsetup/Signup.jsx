import React, { useState } from 'react'
import {auth} from "../../firebase"
import { Link, useNavigate } from 'react-router-dom'
import bg from "../../assets/bgimg/sign.jpeg";


const Signup = () => {
       const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const navi=useNavigate()

    const handlesignup = async()=>{
        try{
          await auth.createUserWithEmailAndPassword(email, password)
          alert("Email Registered Sucessfully Login!") 
          navi("/login")
        }
        catch(error){
            console.log(error);
            alert("The Account already registered do login")
        }

        setemail("")
        setpassword("")
    }
  return (
    <>
          
    <div className='flex flex-col justify-center h-screen items-center gap-5'
    style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
    <p className='font-semibold text-3xl'>
        Craft your glow</p>

    <div className='flex flex-col gap-5' >
    <input 
    className='border border-black/20 rounded px-4 py-2 w-[300px] hover:shadow-lg'
    placeholder='Name' />
    <input
    className='border border-black/20 rounded px-4 py-2 w-[300px] hover:shadow-lg'
    type="email"
    value={email}
    placeholder='Email'
    onChange={(e)=>setemail(e.target.value)} />

    <input 
    className='border border-black/20 rounded px-4 py-2 w-[300px] hover:shadow-lg'
    type="password"
    value={password}
    placeholder='Password'
    onChange={(e)=>setpassword(e.target.value)} />
    <button 
   className='bg-black text-white px-4 py-2 rounded'
     onClick={handlesignup}>Signup</button>

     <p 
     className='text-center text-black/60 font-semibold text-lg'>
        Already member?<Link to={"/login"}><span className='font-bold hover:underline hover:cursor-default'>
            Login</span></Link></p>
   </div>
   </div>
   </>
  )
}

export default Signup