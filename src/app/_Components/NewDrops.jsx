"use client";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import ProductSkeleton from "@/Components/Loader/Loader";
import axiosInstance from "@/lib/axios";
import Product from "@/Components/Common/Product";

export function NewDrops() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const limit = 4;

  const totalVisible = 5; // max visible page numbers

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const offset = (page - 1) * limit;
        const { data } = await axiosInstance.get(
          `/products?offset=${offset}&limit=${limit}`,
        );

        setProducts(data || []);

        // Fix: mark last page if fewer products returned than limit
        setIsLastPage(!data || data.length < limit);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
        setIsLastPage(true); // treat as last page if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const startPage = Math.max(1, page - Math.floor(totalVisible / 2));
  const visiblePages = isLastPage ? page : startPage + totalVisible - 1;
  const pages = Array.from(
    { length: Math.min(totalVisible, visiblePages - startPage + 1) },
    (_, i) => startPage + i,
  );

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl sm:text-5xl capitalize font-semibold tracking-[0.6px]">
          DON&apos;T MISS OUT
          <br />
          NEW DROPS
        </h2>

        <button className="bg-primary-blue transition-transform hover:scale-105 duration-300 cursor-pointer text-white px-7 py-3 rounded-lg uppercase">
          Shop New Drops
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: limit }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))
          : products.map(product => (
              <Product key={product?.id} product={product} />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
        {/* Prev Button */}
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pages?.map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-2 rounded cursor-pointer ${
              page === p
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={isLastPage} // disables if last page
          onClick={() => setPage(prev => prev + 1)}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </section>
  );
}
