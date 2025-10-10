// Order.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Order = () => {
  const { orders,removeOrder } = useContext(CartContext);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/allproduct">
        <button className="mb-4 bg-violet-500 text-white/80 font-semibold px-4 py-1 rounded hover:bg-violet-400">
          Back
        </button>
      </Link>

      <h1 className="text-2xl font-bold text-black/50 text-center mb-4">Your Orders</h1>

      {orders.length > 0 ? (
        <div className= " mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 w-[460px] md:w-[700px]">
          {orders.map((item, i) => (
            <div
              key={i}
              className="border border-black/10 shadow-xl p-4 rounded-lg "
            >
              <img
                src={item.src}
                alt={item.description}
                className=" w-[180px] h-[200px] object-cover rounded"
              />
             
              <h2 className="mt-2 font-semibold text-lg">{item.description}</h2>
              <p className="text-gray-700 mt-1 ">${item.rate}</p>
              <p className="text-violet-500 font-bold mt-1 ">{item.status}</p>
             
               <button
                onClick={() => removeOrder(item.description)}
                className="  right-2  text-red-400  py-1 text-sm "
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default Order;


