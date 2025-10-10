
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebasedata.js";
import { doc, getDoc } from "firebase/firestore";
import { CartContext } from "../../context/CartContext";
import Blog from "./Blog.jsx";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, addOrder } = useContext(CartContext);

  // Fetch product from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProduct({ id: docSnap.id, ...docSnap.data() });
        else setProduct(null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuyNow = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert("Razorpay SDK failed to load");

    const options = {
      key: "rzp_test_RQx3HfvLghKrHW",
      amount: product.rate * 100, // paisa
      currency: "INR",
      name: "Aurora Skincare",
      description: product.description,
    //   handler: function (response) {
       
    //     addOrder(product); 
      

    // navi("/order");
         
    //   },


    handler: async function (response) {
  try {
    // 1️⃣ Add order to frontend context
    addOrder(product);

    // 2️⃣ Send email via backend API
    const res = await axios.get("https://strawberry-backend.onrender.com/sendemail",);

    // 3️⃣ Check response from backend
    if (res.status === 200) {
      alert("Payment Successful! Email sent.");
    } else {
      alert("Payment Successful! But email not sent.");
    }

    // 4️⃣ Navigate to order page
    navi("/order");  
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Payment Successful! But email failed to send.");
    navi("/order"); 
  }
},

      theme: { color: "#d0c1f0" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      <div className="w-2/5 md:w-[300px] h-[300px] md:h-[400px]">
        <img
          src={product.src}
          alt={product.description}
          className="w-full h-full object-cover rounded-lg shadow"
        />
        <Link to="/allproduct">
          <button className="bg-violet-500 absolute top-0 right-0 text-white px-6 py-1 rounded m-6 hover:bg-violet-400">
            Back
          </button>
        </Link>
      </div>

      <h1 className="mt-6 text-2xl font-bold">{product.description}</h1>
      <p className="mt-4 text-gray-600">{product.bigDescription || "This product is carefully crafted..."}</p>
      <p className="font-semibold text-lg my-4">Recommended for {product.skin} skin</p>
      <p className="mt-4 text-xl font-semibold">${product.rate}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleBuyNow}
          className="bg-violet-500 text-white px-6 py-1 rounded hover:bg-violet-400"
        >
          Buy Now
        </button>

        <button
          onClick={() => addToCart(product)}
          className="bg-violet-500 text-white px-6 py-1 rounded hover:bg-violet-400"
        >
          Add to Wishlist
        </button>
      </div>

      <div className="mt-6">
        <p className="font-semibold text-lg text-black/80">Review</p>
        <Blog />
      </div>
    </div>
  );
};

export default ProductDetail;
