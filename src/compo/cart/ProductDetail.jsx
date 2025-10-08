import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebasedata.js";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      <div className="w-2/5 md:w-[300px] h-[300px] md:h-[400px] ">
        <img
          src={product.src}
          alt={product.description}
          className="w-full h-full object-cover rounded-lg shadow"
        />
        <Link to={"/allproduct"}>
        <button className="bg-violet-500 absolute top-0 right-0 text-white px-6 py-1 rounded m-6 hover:bg-violet-400">Back</button></Link>
      </div>

      <h1 className="mt-6 text-2xl font-bold">{product.description}</h1>
      <p className="mt-4 text-gray-600">
        {product.bigDescription ||
          "This product is carefully crafted to rejuvenate, protect, and nourish your skin with every use. Designed for all skin types, it delivers a gentle yet effective formula that restores natural balance, enhances hydration, and promotes a visibly radiant complexion. Enriched with a blend of botanical extracts, vitamins, and essential nutrients, it works deep within the skin’s layers to combat dullness, dryness, and uneven texture."}
      </p>
       
      
       <p className="font-semibold text-lg my-4"> This product Recommended for {product.skin} skin </p>
      <p className="mt-4 text-xl font-semibold">${product.rate}</p>
     
     <div className="flex gap-2">
     <button className="bg-violet-500 text-white px-6 py-1 rounded my-2 hover:bg-violet-400">Buy</button>

       <Link to={"/carts"}  state={{product}}><button onClick={()=>addToCart(product)} className="bg-violet-500 text-white px-6 py-1 rounded my-2 hover:bg-violet-400">Add to Whislist</button></Link>

 

      </div>
    </div>
  );
};

export default ProductDetail;



