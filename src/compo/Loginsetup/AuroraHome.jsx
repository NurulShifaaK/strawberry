// AuroraHome.jsx
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Bot, User, Package, ClipboardCheck, BarChart3, CalendarDays } from "lucide-react";

const AuroraHome = () => {
  return (
    <div className="mt-6 h-[500px] bg-gradient-to-b from-pink-50 to-purple-100 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-5">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-pink-700 mb-4"
        >
          Aurora🌸
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Smart Beauty, Personalized for You  discover, shop, and experience glowing skincare with AI-powered assistance and expert guidance.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className=" md:px-16 pb-10 ">
        

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* User Features */}
          {[
            {
              icon: <ShoppingBag className="w-6 h-6 text-pink-600" />,
              title: "Personalized Shopping",
              desc: "Explore a curated range of skincare products tailored to your skin type.",
            },
            {
              icon: <Package className="w-6 h-6 text-purple-600" />,
              title: "Smart Product Ordering",
              desc: "Order and track your skincare essentials with real-time delivery updates.",
            },
            {
              icon: <Bot className="w-6 h-6 text-fuchsia-600" />,
              title: "AI Skincare Assistant",
              desc: "Get instant skincare advice, product tips, and 24/7 support.",
            },
            {
              icon: <User className="w-6 h-6 text-pink-500" />,
              title: "Book Dermatologist Session",
              desc: "Consult certified dermatologists directly through Aurora.",
            },
            {
              icon: <ClipboardCheck className="w-6 h-6 text-purple-500" />,
              title: "Profile & Order History",
              desc: "Easily manage your profile, previous orders, and favorite products.",
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-pink-600" />,
              title: "Admin Dashboard",
              desc: "Admins can manage users, products, and dermatologist appointments efficiently.",
            },
          
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="font-semibold  text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

   

    

 
    </div>
  );
};

export default AuroraHome;
