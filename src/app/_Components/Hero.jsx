"use client";
import Image from "next/image";
import { useState } from "react";
import heroImg from "@/Assets/hero.png";
import thumb1 from "@/Assets/thumbnail.png";
import thumb2 from "@/Assets/thumb2.jpg";
import Button from "@/Components/Common/Button";

export function Hero() {
  const [activeImage, setActiveImage] = useState(thumb1);
  const thumbnails = [thumb1, thumb2];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-14 lg:pt-22 pb-16 lg:pb-26">
      <figure className="relative lg:mb-6 w-full mx-auto pb-10">
        <Image src={heroImg} alt="hero_img" unoptimized className="w-full" />
      </figure>

      <div className="relative rounded-3xl overflow-hidden h-[450px] lg:h-[750px]">
        {/* Main Image */}
        <Image
          src={activeImage}
          alt="Nike Air Max"
          fill
          unoptimized
          className="object-cover"
        />

        {/* Vertical Badge */}
        <div className="absolute left-0 top-32 lg:top-48 -translate-y-1/2">
          <p className="bg-secondary-black text-gray-200 px-3 py-2 lg:py-3.5 rounded-l-lg text-sm writing-mode-vertical rotate-180">
            Nike product of the year
          </p>
        </div>

        {/* Text Content */}
        <div className="absolute bottom-5 lg:bottom-8 left-5 lg:left-8 text-white">
          <h2 className="text-2xl lg:text-3xl sm:text-5xl font-semibold lg:font-bold mb-1 lg:mb-2">
            NIKE AIR MAX
          </h2>

          <p className="text-base mb-3 lg:mb-4 max-w-[230px] lg:max-w-xs text-gray-200">
            Nike introducing the new air max for everyone&apos;s comfort
          </p>

          <Button text="Shop now" />
        </div>

        {/* Clickable Thumbnails */}
        <div className="absolute bottom-5 lg:bottom-8 right-5 lg:right-8 flex flex-col lg:flex-row gap-3">
          {thumbnails?.map((thumb, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(thumb)}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition 
                ${activeImage === thumb ? "border-primary-blue scale-105" : "border-transparent"}
              `}
            >
              <Image
                src={thumb}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
