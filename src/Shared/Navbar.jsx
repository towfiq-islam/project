"use client";
import { useCart } from "@/Context/CartContext";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { items } = useCart();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xl font-bold hover:text-gray-600 transition-colors"
            >
              KICKS
            </Link>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-sm font-medium hover:text-gray-600">
                New & Featured
              </a>
              <a href="#" className="text-sm font-medium hover:text-gray-600">
                Men
              </a>
              <a href="#" className="text-sm font-medium hover:text-gray-600">
                Women
              </a>
              <a href="#" className="text-sm font-medium hover:text-gray-600">
                Kids
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-sm w-32 lg:w-48"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5" />
            </button>
            <Link
              href="/cart"
              className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
