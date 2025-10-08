
import React, { useState } from 'react';
import {imageDb} from './firebasedata';

const Upload = () => {
    const[img,setimg]=useState('')

    const handleclick=()=>{
        ref(imageDb,)
    }
  return (
   <div className='App'>
          <input type="file" onChange={(e)=>setimg(e.target.value)}/>
          <button onClick={handleclick}>Upload</button>
        </div>
  )
}

export default Upload