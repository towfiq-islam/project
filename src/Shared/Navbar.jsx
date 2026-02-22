"use client";
import { useCart } from "@/Context/CartContext";
import { Search, ShoppingCart, User, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import logo from "@/Assets/logo.png";
import Image from "next/image";

const Navbar = () => {
  const { items } = useCart();

  return (
    <nav className="container mx-auto sticky top-5 z-50 px-4 sm:px-6 lg:px-8">
      <div className=" rounded-2xl py-3 bg-[#FAFAFA]">
        <div className="px-6 py-4 flex items-center justify-between relative">
          {/* ========== MOBILE LEFT (Hamburger) ========== */}
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* ========== DESKTOP LEFT (Men / Women) ========== */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button className="flex items-center gap-1 hover:text-black transition cursor-pointer font-bold">
              Men <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 hover:text-black transition cursor-pointer font-bold">
              Women <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* ========== CENTER LOGO ========== */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-extrabold tracking-wide"
          >
            <Image src={logo} alt="logo" unoptimized />
          </Link>

          {/* ========== RIGHT SIDE ========== */}
          <div className="flex items-center gap-7 text-gray-700">
            {/* Desktop Search */}
            <Search className="hidden md:block w-5 h-5 cursor-pointer hover:text-black transition" />

            {/* User */}
            <User className="w-5 h-5 cursor-pointer hover:text-black transition" />

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-black transition" />
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                {items.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
