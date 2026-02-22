"use client";
import { ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Heading from "@/Components/Common/Heading";

export function Categories() {
  const limit = 2;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + limit,
  );

  const handleNext = () => {
    if (currentIndex + limit < categories.length) {
      setCurrentIndex(prev => prev + limit);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - limit);
    }
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + limit >= categories.length;

  return (
    <section className="bg-secondary-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16">
        <div className="flex items-end justify-between mb-7 lg:mb-10">
          <Heading text="Categories" Variant="h2" className="text-white" />

          <div className="flex gap-2">
            {/* Prev */}
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`size-8 cursor-pointer rounded-lg flex items-center justify-center transition-colors ${
                isPrevDisabled
                  ? "bg-[#858582] text-gray-700 cursor-not-allowed"
                  : "bg-gray-300 text-secondary-black hover:bg-gray-200"
              }`}
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`size-8 cursor-pointer rounded-lg flex items-center justify-center transition-colors ${
                isNextDisabled
                  ? "bg-[#858582] text-gray-700 cursor-not-allowed"
                  : "bg-gray-300 text-secondary-black hover:bg-gray-200"
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {loading
            ? "Loading..."
            : visibleCategories.map(category => (
                <div
                  key={category.id}
                  className="relative bg-gray-100 rounded-t-lg first:rounded-tl-4xl w-full overflow-hidden h-64 sm:h-80 group cursor-pointer"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    unoptimized
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                    <h3 className="text-xl sm:text-2xl font-bold max-w-[200px]">
                      {category.name}
                    </h3>

                    <button className="size-10 bg-secondary-black text-gray-200 rounded-lg flex items-center justify-center hover:bg-black transition-colors cursor-pointer">
                      <ArrowRight className="w-5 h-5 -rotate-50" />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
