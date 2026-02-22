import { ArrowRight } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    title: "Good Quality",
    description: "I highly recommend shopping from kicks",
    rating: 5.0,
    image:
      "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  },
  {
    id: 2,
    title: "Good Quality",
    description: "I highly recommend shopping from kicks",
    rating: 5.0,
    image:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
  },
  {
    id: 3,
    title: "Good Quality",
    description: "I highly recommend shopping from kicks",
    rating: 5.0,
    image:
      "https://images.pexels.com/photos/1599012/pexels-photo-1599012.jpeg?auto=compress&cs=tinysrgb&w=800",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
  },
];

export function Reviews() {
  return (
    <section className="bg-[#f3f3f3] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-extrabold tracking-wide">REVIEWS</h2>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
            SEE ALL <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Top Content */}
              <div className="p-6 bg-[#f5f5f5]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{review.title}</h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {review.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex text-yellow-400">{"★★★★★"}</div>
                      <span className="text-sm font-medium text-gray-700">
                        {review.rating}
                      </span>
                    </div>
                  </div>

                  <img
                    src={review.avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="h-72 w-full relative overflow-hidden">
                <Image
                  unoptimized
                  fill
                  src={review.image}
                  alt="review"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
