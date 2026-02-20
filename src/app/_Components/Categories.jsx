import { ArrowRight } from "lucide-react";

export function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">CATEGORIES</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <button className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative bg-gray-100 rounded-3xl overflow-hidden h-64 sm:h-80 group cursor-pointer">
          <img
            src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Lifestyle Shoes"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">LIFESTYLE</h3>
              <p className="text-xl sm:text-2xl font-bold">SHOES</p>
            </div>
            <button className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative bg-gray-100 rounded-3xl overflow-hidden h-64 sm:h-80 group cursor-pointer">
          <img
            src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Basketball Shoes"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">BASKETBALL</h3>
              <p className="text-xl sm:text-2xl font-bold">SHOES</p>
            </div>
            <button className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
