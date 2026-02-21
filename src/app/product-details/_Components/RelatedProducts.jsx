import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ArrowRight } from "lucide-react";
import Product from "@/Components/Common/Product";

const RelatedProducts = ({ relatedProducts }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update disabled state when slide changes
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = swiperInstance
    ? currentIndex >=
      swiperInstance.slides.length - swiperInstance.params.slidesPerView
    : true;

  // Swiper navigation initialization after refs are set
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="container relative">
      {/* Navigation buttons */}
      <div className="absolute -top-10 sm:-top-12 right-5 flex gap-3 z-10">
        <button
          ref={prevRef}
          disabled={isPrevDisabled}
          className={`our-listings-prev size-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            isPrevDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>

        <button
          ref={nextRef}
          disabled={isNextDisabled}
          className={`size-8 our-listings-next rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            isNextDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="pt-5 md:px-7 lg:px-10 xl:px-16 2xl:px-0">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          onSwiper={swiper => setSwiperInstance(swiper)}
          onSlideChange={swiper => setCurrentIndex(swiper.activeIndex)}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1536: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {relatedProducts?.map(relProduct => (
            <SwiperSlide key={relProduct?.id}>
              <Product product={relProduct} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
