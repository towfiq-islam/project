import Link from "next/link";
import React from "react";

const Product = ({ product }) => {
  return (
    <div key={product?.id} className="group">
      <div className="rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-md transition bg-white p-2 lg:p-2.5 h-[190px] lg:h-[350px] w-full overflow-hidden mb-3">
        <figure className="relative w-full h-full bg-[#eceef0] rounded-3xl">
          <img
            src={product?.images?.[0]}
            alt={product?.title}
            className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
          />
          <span className="absolute top-0 left-0 rounded-tl-3xl z-30 rounded-br-3xl bg-primary-blue text-gray-200 text-sm px-3 lg:px-4 py-1.5 lg:py-2">
            New
          </span>
        </figure>
      </div>

      <h3 className="lg:text-xl leading-[145%] font-semibold mb-2 uppercase truncate pb-1 lg:pb-2">
        {product?.title}
      </h3>

      <Link
        href={`/product-details/${product?.id}`}
        className="w-full bg-secondary-black text-white py-2 lg:py-3.5 rounded-lg text-[13px] lg:text-sm transition-transform hover:scale-[1.03] duration-300 text-center flex gap-1.5 justify-center items-center "
      >
        <span>VIEW PRODUCT -</span>
        <span className="text-yellow-500">${product?.price}</span>
      </Link>
    </div>
  );
};

export default Product;
