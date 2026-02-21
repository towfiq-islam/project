"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function ImagePreviewModal({ isOpen, image, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <div className="relative max-w-4xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition cursor-pointer"
        >
          <X className="w-7 h-7" />
        </button>

        <img
          src={image}
          alt="Preview"
          className="w-full max-h-[85vh] object-contain rounded-2xl"
        />
      </div>
    </div>
  );
}
