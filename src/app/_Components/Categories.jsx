"use client";
import { ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

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
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">CATEGORIES</h2>

        <div className="flex gap-2">
          {/* Prev */}
          <button
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className={`size-8 cursor-pointer rounded-lg flex items-center justify-center transition-colors ${
              isPrevDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
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
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading
          ? "Loading..."
          : visibleCategories.map(category => (
              <div
                key={category.id}
                className="relative bg-gray-100 rounded-3xl overflow-hidden h-64 sm:h-80 group cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {category.name}
                  </h3>

                  <button className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
