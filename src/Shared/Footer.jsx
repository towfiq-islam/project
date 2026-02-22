import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import kickImg from "@/Assets/kick_lg.png";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="container mx-auto px-4 md:px-7 lg:px-10 xl:px-16 2xl:px-16 mb-5">
      <div className="bg-secondary-black text-white rounded-3xl pt-5 lg:pt-16 px-5 sm:px-16 relative overflow-hidden -mt-10">
        {/* Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-10 relative z-10">
          {/* About */}
          <div>
            <h3 className="text-xl font-medium text-[#ffa52f] mb-1 lg:mb-5">
              About us
            </h3>
            <p className="text-[15px] text-gray-200 leading-relaxed">
              We are the biggest hyperstore in the universe. We got you all
              covered with our exclusive collections and latest drops.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-medium text-[#ffa52f] mb-1 lg:mb-5">
              Categories
            </h3>
            <ul className="space-y-2 text-[15px] text-gray-200">
              {[
                "Runners",
                "Sneakers",
                "Basketball",
                "Outdoor",
                "Golf",
                "Hiking",
              ].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-medium text-[#ffa52f] mb-1 lg:mb-5">
              Company
            </h3>
            <ul className="space-y-2 text-[15px] text-gray-200">
              {["About", "Contact", "Blogs"].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-medium text-[#ffa52f] mb-1 lg:mb-5">
              Follow us
            </h3>
            <div className="flex gap-3.5">
              <a className="text-gray-200 hover:text-white transition cursor-pointer">
                <Facebook size={18} />
              </a>
              <a className="text-gray-200 hover:text-white transition cursor-pointer">
                <Instagram size={18} />
              </a>
              <a className="text-gray-200 hover:text-white transition cursor-pointer">
                <Twitter size={18} />
              </a>
              <a className="text-gray-200 hover:text-white transition cursor-pointer">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Big Background */}
        <div className="pt-10 lg:pt-20">
          <Image
            src={kickImg}
            alt="kick_img"
            className="w-fit object-contain mx-auto"
          />
        </div>
      </div>

      <p className="text-center pt-5">© All rights reserved </p>
    </footer>
  );
}
