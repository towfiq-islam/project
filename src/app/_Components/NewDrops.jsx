"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import ProductSkeleton from "@/Components/Loader/Loader";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export function NewDrops() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Data fetching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          DONT MISS OUT
          <br />
          NEW DROPS
        </h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
          Shop <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 })?.map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))
          : products?.map(product => (
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

                <h3 className="font-medium text-sm mb-2 truncate">
                  {product.title}
                </h3>

                <p className="text-blue-600 font-bold text-sm mb-2">
                  ${product?.price.toFixed(2)}
                </p>

                <Link
                  href={`/product/${product?.id}`}
                  className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors block text-center"
                >
                  View Product
                </Link>
              </div>
            ))}
      </div>
    </section>
  );
}
