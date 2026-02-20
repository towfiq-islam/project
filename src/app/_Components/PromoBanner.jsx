export function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative bg-blue-600 rounded-3xl overflow-hidden py-12 sm:py-16 px-6 sm:px-12">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-white text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              JOIN OUR KICKSPLUS
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              CLUB & GET 15% OFF
            </h3>
            <p className="text-sm sm:text-base mb-6 max-w-md">
              Sign up for free! Join the community in less than a minute
            </p>
            <button className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Join now
            </button>
          </div>

          <div className="text-white">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter">
              KICKS
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}
