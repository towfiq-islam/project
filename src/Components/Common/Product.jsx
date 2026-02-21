import Image from "next/image";
import Link from "next/link";
import React from "react";

const Product = ({ product }) => {
  return (
    <div key={product?.id} className="group">
      <div className="bg-gray-100 rounded-2xl overflow-hidden mb-3 aspect-square relative">
        <Image
          fill
          unoptimized
          src={product?.images[0]}
          alt={product?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h3 className="font-medium text-sm mb-2 truncate">{product?.title}</h3>

      <p className="text-blue-600 font-bold text-sm mb-2">
        ${product?.price?.toFixed(2)}
      </p>

      <Link
        href={`/product-details/${product?.id}`}
        className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors block text-center"
      >
        View Product
      </Link>
    </div>
  );
};

export default Product;
