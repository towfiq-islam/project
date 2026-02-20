import { ArrowRight } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Good Quality",
    rating: 5.0,
    image:
      "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=400",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  },
  {
    id: 2,
    name: "Good Quality",
    rating: 5.0,
    image:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
  },
  {
    id: 3,
    name: "Good Quality",
    rating: 5.0,
    image:
      "https://images.pexels.com/photos/1599012/pexels-photo-1599012.jpeg?auto=compress&cs=tinysrgb&w=400",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
  },
];

export function Reviews() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">REVIEWS</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
          See all <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map(review => (
          <div key={review.id} className="group">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div>
                <h3 className="font-medium text-sm">{review.name}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">{review.rating}</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative">
              <Image
                unoptimized
                fill
                src={review.image}
                alt={review.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
