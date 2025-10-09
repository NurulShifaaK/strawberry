

import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);




    const totalPrice = cartItems.reduce(
    (acc, item) => acc + (Number(item.rate) || 0),
    0
  );


    const localbackendurl = 'https://strawberry-backend.onrender.com/api/payment'


const handlebuynow = async () => {
  try {
    const totalAmount = cartItems.reduce((acc, item) => acc + Number(item.rate || 0), 0);
    const { data } = await axios.post(`${localbackendurl}`, { amount: totalAmount });
    initPayment(data.data);
  } catch (err) {
    console.error("Payment order creation failed:", err);
  }
};




  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const initPayment = async (orderData) => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load. Check your internet connection.");
    return;
  }

  const options = {
    key: "rzp_test_RQx3HfvLghKrHW",
    amount: orderData.amount,
    currency: orderData.currency,
    description: "Test Payment method",
    order_id: orderData.id,
  
    handler:async(res)=>{
    await axios.post(`${localbackendurl}/verify`,res).then((res)=>{
      if(res.status === 200){
        alert("Payment sucess");

      }else{
        alert("Payment Failed")
      }
    })
    },
    theme: { color: "#d0c1f0" },
  };

  const razorpay_popup = new window.Razorpay(options);
  razorpay_popup.open();
};

  return (

    <div className="p-6 relative">
    <Link to={"/allproduct"}> <button className=" mb-4 bg-violet-500 text-white px-4 py-1 rounded hover:bg-violet-400">Back</button></Link>
      {cartItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 gap-4 p-4">
            {cartItems.map((product, index) => (
              <div
                key={index}
                className=" border border-black/10 shadow-xl p-6 rounded-lg w-fit"
              >
                <img
                  src={product.src}
                  alt={product.description}
                  className="w-[100px] h-[100px] object-cover rounded"
                />
                <h2 className="mt-4 text-lg font-semibold">{product.description}</h2>
                <p className="mt-2 font-semibold text-gray-700">${product.rate}</p>
                <button
                  onClick={() => removeFromCart(product.description)}
                  className="text-red-500 mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        
     <div className="shadow p-4 rounded-lg mt-6 bg-violet-300/50 text-black/50">
            <p className="text-xl font-semibold mb-2">Product Details</p>

            {cartItems.map((item, i) => (
              <p key={i} className="text-black/40 font-bold">
                • {item.description} — ${item.rate}
              </p>
            ))}

            <p className="mt-4 font-bold text-lg">Total: ${totalPrice}</p>

            <button
               onClick={handlebuynow}
              className=" bg-violet-500 text-white/50 font-semibold px-6 py-2 rounded my-4 hover:bg-violet-400 hover:text-white"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p>No product found in cart.</p>
      )}
    </div>
  );
};

export default Cart;

