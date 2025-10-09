// UploadProduct.jsx
import React, { useState } from "react";
import axios from "axios";

const UploadProduct = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");

  const handleUpload = async () => {
    if (!file || !description || !rate) return alert("All fields required");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://strawberry-backend.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpload({
        imageUrl: res.data.imageUrl,
        public_id: res.data.public_id,
        description,
        rate,
      });

      setFile(null);
      setDescription("");
      setRate("");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-2 py-1 mb-2"
      />
      <input
        type="number"
        placeholder="Rate"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className="border px-2 py-1 mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-violet-500 text-white px-4 py-1 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadProduct;



