import kickImg from "@/Assets/kick.png";
import Image from "next/image";

export function PromoBanner() {
  return (
    <section className="container mx-auto px-4 md:px-7 lg:px-10 xl:px-16 2xl:px-16 mt-5 lg:mt-8">
      <div className="bg-primary-blue rounded-3xl px-10 sm:px-16 pt-5 lg:pt-14 pb-20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Left Content */}
          <div className="text-gray-50 max-w-xl">
            <h2 className="text-[28px] sm:text-5xl font-semibold leading-tight">
              JOIN OUR KICKSPLUS
            </h2>

            <h3 className="text-[28px] sm:text-5xl font-bold mb-2 lg:mb-4">
              CLUB & GET 15% OFF
            </h3>

            <p className="text-[17px] mb-6 text-blue-100">
              Sign up for free! Join the community.
            </p>

            {/* Email Input */}
            <div className="flex items-center gap-2 bg-transparent rounded-lg overflow-hidden max-w-md">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-3 lg:px-4 py-2.5 lg:py-3 bg-transparent rounded-lg border border-gray-300 text-gray-50 outline-none"
              />

              <button className="bg-secondary-black px-4 lg:px-6 py-3 lg:py-3.5 text-sm font-semibold hover:bg-black border border-secondary-black cursor-pointer transition rounded-lg">
                SUBMIT
              </button>
            </div>
          </div>

          {/* Right Big Logo */}
          <div>
            <Image
              src={kickImg}
              alt="kick_img"
              className="object-contain -mt-7"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
