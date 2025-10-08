

import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);


    const totalPrice = cartItems.reduce(
    (acc, item) => acc + (Number(item.rate) || 0),
    0
  );

  return (

    <div className="p-6 relative">
    <Link to={"/allproduct"}> <button className=" mb-4 bg-violet-500 text-white px-4 py-1 rounded hover:bg-violet-400">Back</button></Link>
      {cartItems.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4 p-4">
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
        
     <div className="shadow p-4 rounded-lg mt-6">
            <p className="text-xl font-semibold mb-2">Product Details</p>

            {cartItems.map((item, i) => (
              <p key={i} className="text-gray-700">
                • {item.description} — ${item.rate}
              </p>
            ))}

            <p className="mt-4 font-bold text-lg">Total: ${totalPrice}</p>

            <button
             
              className="bg-violet-500 text-white px-6 py-2 rounded my-4 hover:bg-violet-400"
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

