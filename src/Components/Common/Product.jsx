import Link from "next/link";
import React from "react";

const Product = ({ product }) => {
  return (
    <div key={product?.id} className="group">
      <div className="rounded-2xl shadow-sm hover:shadow-md transition bg-white p-3 aspect-square mb-4 overflow-hidden">
        <figure className="relative w-full h-full">
          <img
            src={product?.images?.[0]}
            alt={product?.title}
            className="w-full h-full object-cover rounded-2xl"
          />
          <span className="absolute top-0 left-0 rounded-tl-2xl rounded-br-2xl bg-blue-600 text-white text-sm px-3 py-1">
            New
          </span>
        </figure>
      </div>

      <h3 className="text-lg leading-[145%] font-semibold mb-2 line-clamp-2 min-h-14">
        {product?.title}
      </h3>

      <Link
        href={`/product-details/${product?.id}`}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition text-center flex gap-3 justify-center items-center"
      >
        <span>VIEW PRODUCT</span>
        <span className="text-yellow-500">${product?.price}</span>
      </Link>
    </div>
  );
};

export default Product;
