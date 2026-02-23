"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function SizeChartModal({ isOpen, onClose }) {
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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-xl p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold uppercase">Size Chart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-2 text-left">EU</th>
                <th className="py-3 px-2 text-left">US</th>
                <th className="py-3 px-2 text-left">UK</th>
                <th className="py-3 px-2 text-left">CM</th>
              </tr>
            </thead>
            <tbody>
              {[
                { eu: 38, us: 6, uk: 5.5, cm: 24 },
                { eu: 39, us: 7, uk: 6, cm: 24.5 },
                { eu: 40, us: 8, uk: 7, cm: 25 },
                { eu: 41, us: 8.5, uk: 7.5, cm: 26 },
                { eu: 42, us: 9, uk: 8, cm: 26.5 },
                { eu: 43, us: 10, uk: 9, cm: 27 },
                { eu: 44, us: 11, uk: 10, cm: 27.5 },
                { eu: 45, us: 12, uk: 11, cm: 28 },
              ].map((size, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="py-3 px-2">{size.eu}</td>
                  <td className="py-3 px-2">{size.us}</td>
                  <td className="py-3 px-2">{size.uk}</td>
                  <td className="py-3 px-2">{size.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
