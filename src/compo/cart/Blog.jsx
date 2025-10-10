import React, { useEffect, useState } from 'react';

import { db } from "../../firebasedata";
import { collection, addDoc, serverTimestamp,onSnapshot,deleteDoc,doc } from 'firebase/firestore';
import {auth} from "../../firebase"


const Blog = () => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [upload,setupload] =useState([])
  const [admin,setadmin]=useState(false)

 useEffect(() => {
    
       auth.onAuthStateChanged(function(user){
              if(user){
                if(user.uid === "W6Nsnxh8QJgOaYHCsAGaiNVlt8V2")
                {
                  setadmin(true)
                }
                else{
                    setadmin(false)
                }
              }
              else{
               
                console.log("logout")
              }
          })

    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,        
        ...doc.data(),       
      }));
      setupload(notesData);
    });
      return () => unsubscribe();
  }, []);

//  if (upload.length === 0) {
//   return <p>No blog yet. Start typing.</p>;
// }
  console.log(upload)

  const handlePost = async () => {
    if (!post.trim()) {
      alert("please fill the blog");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "posts"), {
        content: post,
        createdAt: serverTimestamp()
      });

      setPost("");
      console.log(post);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setLoading(false);
  };

  const deleteblog = async(id)=>{
    await deleteDoc(doc(db, "posts" , id))
  }

  return (
    <>
    
      <div className='flex items-baseline justify-center bg-white max-w-screen-sm mx-auto w-full'>
        <div className='w-full'>

          <div className='flex gap-3 text-center mt-2 items-center'>
            <input
              className='border border-black/10 shadow w-full rounded-xl px-4 py-2 h-8'
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder='Your Review..'
              maxLength={100}
            />
          
            <button
              onClick={handlePost}
              disabled={loading}
              className='m-4 bg-violet-500 text-white px-8 rounded py-1 shadow'
            >
                {
             loading ? "Posting..." : "Post"
                }
            </button>
            
            
          </div>
        </div>
      </div>
      
      <p className='text-violet-400 text font-bold w-full mt-2'>Users Review:</p>
    <div className='grid mt-2 gap-6 grid-cols-2'>

        
  {upload.map((note) => (
    <div  key={note.id}  className='  flex items-baseline-last justify-between px-4 py-2 border border-gray-200 rounded-xl shadow-md
     bg-white hover:shadow-lg transition-all duration-200'>
      
    <p className='text-base font-semibold text-gray-800' key={note.id}>{note.content}</p>
    
    {
     admin?  ( <button
        onClick={()=>deleteblog(note.id)}
         className='text-red-500' >
            Delete</button>): ""
}
   
    </div>
  ))}
</div>
    </>
  );
}

export default Blog;
