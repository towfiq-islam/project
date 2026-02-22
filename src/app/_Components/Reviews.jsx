import Image from "next/image";
import avatar1 from "@/Assets/avatar-1.jpg";
import avatar2 from "@/Assets/avatar-2.jpg";
import reviewOne from "@/Assets/reviewThree.png";
import reviewTwo from "@/Assets/reviewTwo.png";
import reviewThree from "@/Assets/reviewOne.png";
import Heading from "@/Components/Common/Heading";
import Button from "@/Components/Common/Button";
const reviews = [
  {
    id: 1,
    title: "Good Quality",
    description: "I highly recommend shopping from kicks",
    rating: 5.0,
    image: reviewOne,
    avatar: avatar1,
  },
  {
    id: 2,
    title: "Good Quality",
    description: "I highly recommend shopping from kicks",
    rating: 5.0,
    image: reviewTwo,
    avatar: avatar2,
  },
  {
    id: 3,
    title: "Good Quality",
    description: "I highly recommend shopping from kicks",
    rating: 5.0,
    image: reviewThree,
    avatar: avatar1,
  },
];

export function Reviews() {
  return (
    <section className="container mx-auto px-4 md:px-7 lg:px-10 xl:px-16 2xl:px-16 py-10 lg:py-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-7 lg:mb-10">
        <Heading text="Reviews" Variant="h3" />
        <Button text="See all" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {reviews?.map(review => (
          <div
            key={review?.id}
            className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* Top Content */}
            <div className="p-5 lg:p-6 bg-[#f5f5f5]">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold text-secondary-black text-xl">
                    {review?.title}
                  </h3>

                  <p className="text-gray-600 mt-1">{review?.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 lg:mt-3">
                    <div className="flex text-yellow-400">{"★★★★★"}</div>
                    <span className="text-sm font-medium text-gray-700">
                      {review?.rating}
                    </span>
                  </div>
                </div>

                <Image
                  src={review.avatar}
                  alt="avatar"
                  width={48}
                  height={48}
                  unoptimized
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            {/* Image */}
            <div className="h-[280px] lg:h-[350px] w-full relative overflow-hidden">
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
    </section>
  );
}
