"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mb-20 lg:mb-40 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        {/* 404 Big Number */}
        <h1 className="text-[120px] sm:text-[160px] mb-10 font-bold text-gray-200 leading-none">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 -mt-6">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-4 text-sm sm:text-base">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-secondary-black text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
