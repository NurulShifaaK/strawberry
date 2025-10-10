import React, { useEffect, useState } from "react";
import axios from "axios";



// Firestore imports
import { db } from "../../firebasedata.js"; 
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import Cloud from "../../Cloud.jsx";
import ficon from "../../assets/product/filter.png"
import upload from "../../assets/admin/upload.png"
import ProductDetail from "./ProductDetail.jsx";
import { Link } from "react-router-dom";
import {auth} from "../../firebase"
import heart from "../../assets/heart.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';



const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [skin, setSkin] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filterclick,setfilterclick]=useState(false)
  const [uploadclick,setuploadclick]=useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [admin,setadmin]=useState(false)
  const [liked, setLiked] = useState(false);

  //firebase auth
  
useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === "W6Nsnxh8QJgOaYHCsAGaiNVlt8V2") {
          setadmin(true);
          console.log("Admin logged in");
        } else {
          setadmin(false);
          console.log("User logged in");
        }
      } else {
        console.log("User logged out");
      }
    });
    return () => unsubscribe();
  }, []);



  const handlefilter=()=>{
     setfilterclick((prev) => !prev);
  }

    const handleupload=()=>{
     setuploadclick((prev) => !prev);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const prods = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(prods);
    };
    fetchProducts();
  }, []);


  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };


const handleSelect = (product) => {
  setSelectedProduct(product);
};

console.log("Products:", products);

  const filtered = products.filter((item) => {
    const matchesSearch = item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "ALL" || item.category === category;
    const matchesSkin = !skin || item.skin === skin;
    const matchesPrice = item.rate >= priceRange[0] && item.rate <= priceRange[1];
    return matchesSearch && matchesCategory && matchesSkin && matchesPrice;
  });

  const categories = ["ALL", "Cleanser", "Serum", "Moisturizer", "Sunscreen"];

  return (
    <>
   
   { uploadclick?(
   <div>
    <Cloud/>
    </div>):null}
      {/* search */}

<div className="mt-5 text-center relative">
  <input
    className="px-4 py-1 border w-4/5 rounded-xl border-black/20 focus:outline-none"
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search your product..."
  />

  <img
    className="h-[25px]  absolute bottom-1 left-2 sm:left-[40px] md:left-[55px] cursor-pointer"
    src={ficon}
    onClick={handlefilter}
  />
</div>

    

      {/* filter */}
       
      <div className="mt-4 flex justify-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded font-semibold text-black/70 ${
              category === cat ? "bg-violet-400 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Price & Skin filter */}

      { filterclick?(
      <div className="flex justify-around shadow 
      p-6 m-10 rounded-lg gap-10 
      transition duration-2000 linear
      opacity-100">
        <div className="flex flex-col items-start">
          <p className="font-semibold mb-2 ">Price</p>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-40 accent-violet-500"
          />
          <span className="font-medium text-black/70">Up to ${priceRange[1]}</span>
        </div>


        <div className="flex flex-col items-start">
          <p className="font-semibold mb-2">Skin</p>
          {["Normal", "Oily", "Dry"].map((s) => (
            <label key={s} className="flex items-center space-x-2 font-medium text-black/70">
              <input
                className="accent-violet-500"
                type="radio"
                name="skin"
                checked={skin === s}
                onChange={() => setSkin(s)}
              />
              <span>{s} Skin</span>
            </label>
          ))}
          <button
            onClick={() => setSkin("")}
            className="mt-2 text-sm text-white/80 bg-violet-500 px-2 py-1 rounded hover:bg-violet-400"
          >
            Clear Skin Filter
          </button>
        </div>
      </div>):(  <div
    className="opacity-0 -translate-x-5 transition-all duration-500 ease-in-out"
  ></div>)} 


      {/* product grid */}


      <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 place-items-center">
        {filtered.length > 0 ? (
          filtered.map((img) => (
            <div key={img.id} className="relative w-48 md:w-70 md:h-[350px] group bg-white rounded-xl shadow p-3 ">
              <div className="relative w-full h-60">
                <img
                  src={img.src}
                  alt={img.description}
                  className="absolute inset-0 w-full h-full rounded object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={img.hover}
                  alt={img.description}
                  className="absolute inset-0 w-full h-full rounded object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-700">{img.description}</p>
              <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                <p className="font-semibold text-xl">${img.rate}</p>
               { admin?(
                <button onClick={() => handleDelete(img.id)} className="text-red-500 hover:underline">Delete</button>):null}
               <Link to={`/product/${img.id}`}> <button onClick={() => handleSelect(img)}>View</button> </Link> 
               {/* <button><img
                src={heart}
                className="h-[5px]"/></button> */}
                 <button
      onClick={() => setLiked(!liked)}
      className="transition-transform duration-200"
    >
      <FontAwesomeIcon
        icon={faHeart}
        className={`text-xl transform transition-all duration-300 ${
          liked
            ? "text-violet-500 scale-110" 
            : "text-black/20 hover:text-violet-400 hover:scale-110" 
        }`}
      />
    </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found</p>
        )}
   
        </div>

      {  admin?(
<div className="bg-white/80 w-full h-[50px] z-50 fixed bottom-0 left-0 shadow  flex justify-center items-center">
        <img 
        className="h-[40px] hover:shadow-2xl"
        onClick={handleupload}
        src={upload}  />
      </div>):null}


   


    </>
  );
};

export default AllProducts;
