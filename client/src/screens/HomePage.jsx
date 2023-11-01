import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState(null);
  const fetchProducts = () => {
    axios
      .get(`${BASE_URL}/getAllProducts`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => console.log(error.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="relative">
      <div onClick={()=>navigate('/addProduct')} className="fixed bottom-2 border mb-3 cursor-pointer hover:scale-105 mr-4 bg-blue-400 border-blue-500 rounded-full right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <Navbar />
      <div className="mx-2 grid grid-cols-1 mini:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products &&
          products.map((item, key) => (
            <ProductCard
              key={key}
              id={item._id}
              owner={item.listedBy}
              price={item.price}
              title={item.name}
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
