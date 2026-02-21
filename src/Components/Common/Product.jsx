import Image from "next/image";
import Link from "next/link";
import React from "react";

const Product = ({ product }) => {
  return (
    <div key={product?.id} className="group">
      <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
        <div className="bg-gray-100 rounded-xl aspect-square mb-4 overflow-hidden relative">
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
            New
          </span>

          <img
            src={product?.images?.[0]}
            alt={product?.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-sm font-semibold mb-2 truncate">
          {product?.title}
        </h3>

        <Link
          href={`/product-details/${product?.id}`}
          className="w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition block text-center"
        >
          VIEW PRODUCT
        </Link>
      </div>
    </div>
  );
};

export default Product;
