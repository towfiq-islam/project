"use client";
import { useRouter } from "next/navigation";

export function Hero() {
  const navigate = useRouter();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
        DO IT <span className="text-blue-600">RIGHT</span>
      </h1>

      <div
        className="relative bg-gradient-to-br from-orange-400 to-amber-600 rounded-3xl overflow-hidden h-[400px] sm:h-[500px] cursor-pointer"
        onClick={() => navigate.push("/product/0")}
      >
        <img
          src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Nike Air Max"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">NIKE AIR MAX</h2>
          <p className="text-sm sm:text-base mb-4 max-w-md">
            Nike introducing the new air max for everyone comfort
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
            Shop now
          </button>
        </div>

        <div className="absolute bottom-8 right-8 flex gap-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="View 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="View 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
