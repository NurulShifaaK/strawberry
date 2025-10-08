import React, { useState } from "react";
import axios from "axios";
import { db } from "./firebasedata"; // only db
import { collection, addDoc } from "firebase/firestore"; 

const Cloud = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [hoverFile, setHoverFile] = useState(null);
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [skin, setSkin] = useState("Normal");
  const [category, setCategory] = useState("Cleanser");

  const handleUpload = async () => {
    if (!file || !hoverFile || !description || !rate) return alert("All fields required");

    const uploadToCloudinary = async (f) => {
      const formData = new FormData();
      formData.append("file", f);
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.imageUrl;
    };

    try {
      const srcUrl = await uploadToCloudinary(file);
      const hoverUrl = await uploadToCloudinary(hoverFile);

      // Add to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        src: srcUrl,
        hover: hoverUrl,
        description,
        rate: Number(rate),
        skin,
        category,
      });

      onUpload({
        id: docRef.id,
        src: srcUrl,
        hover: hoverUrl,
        description,
        rate: Number(rate),
        skin,
        category,
      });

      setFile(null);
      setHoverFile(null);
      setDescription("");
      setRate("");
      setSkin("Normal");
      setCategory("Cleanser");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
    <div className="p-4 border border-black/20 rounded mb-4 shadow w-4/5 text-center">
        <div className="flex justify-center flex-col items-center">
            <div>
      <p className="font-semibold py-2">Choose your main Img:</p>
      <input
      className="border rounded border-black/20 px-2 py-1"
      type="file" 
      onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <div>
         <p className="font-semibold py-2">Choose your main Img:</p>
      <input
      className="border rounded border-black/20 px-2 py-1" 
      type="file" 
      onChange={(e) => setHoverFile(e.target.files[0])} />
      </div>
   </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 justify-around mt-6 gap-3">
      <input 
      className="border rounded border-black/20 px-2 py-1" 
      type="text" 
      placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      
      <input 
      className="border rounded border-black/20 px-2 py-1" 
      type="number" 
      placeholder="Rate" value={rate} onChange={(e) => setRate(e.target.value)} />
      
      <select
     className="border border-black/20 rounded px-2 py-1  bg-white"
      value={skin} 
      onChange={(e) => setSkin(e.target.value)}>
        <option>Normal</option>
        <option>Oily</option>
        <option>Dry</option>
      </select>

      <select 
      className="border rounded border-black/20 px-2 py-1 accent-violet-500" 
      value={category} 
      onChange={(e) => setCategory(e.target.value)}>
        <option>Cleanser</option>
        <option>Serum</option>
        <option>Moisturizer</option>
        <option>Sunscreen</option>
      </select>
</div>
      <button 
      onClick={handleUpload} 
      className="bg-violet-500 text-white px-4 py-1 rounded mt-6">
      Upload</button>
    </div>
    </div>
  );
};

export default Cloud;






