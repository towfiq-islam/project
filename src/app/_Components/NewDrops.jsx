import { ArrowRight } from "lucide-react";
import Image from "next/image";
const products = [
  {
    id: 1,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    image:
      "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    image:
      "https://images.pexels.com/photos/1599012/pexels-photo-1599012.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    image:
      "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export function NewDrops() {
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
        {products.map(product => (
          <div key={product.id} className="group">
            <div className="bg-gray-100 rounded-2xl overflow-hidden mb-3 aspect-square relative">
              <Image
                fill
                unoptimized
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium text-sm mb-2">{product.name}</h3>
            <button className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              View Product
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
