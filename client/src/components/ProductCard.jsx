import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCard = ({title,price,owner,id}) => {
    const navigate = useNavigate()
    const goToSelectedProduct = ()=>{
        navigate(`/product/${id}`)
    }
  return (
    <div onClick={goToSelectedProduct} className="max-w-xs rounded 
    overflow-hidden shadow-lg my-2 hover:scale-105 cursor-pointer">
      {/* Product Image */}
      <img
        className="w-full"
        src="https://media.istockphoto.com/id/1350560575/photo/pair-of-blue-running-sneakers-on-white-background-isolated.webp?s=2048x2048&w=is&k=20&c=q5PbZIu__xKIpwD9RiwCSn4ptSniWsD0GElqkCdsevM="
        alt="Product"
      />

      <div className="px-6 py-4">
        {/* Product Title */}
        <div className="font-bold text-xl mb-2">{title}</div>

        {/* Product Price */}
        <p className="text-gray-700 text-base">Price: Rs.{price}</p>

        {/* Product Owner */}
        {/* <p className="text-gray-700 text-base">Owner: {owner}</p> */}
      </div>

      <div className="px-6 py-4">
        <div className="text-sm">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
