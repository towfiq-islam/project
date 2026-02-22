import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4">About us</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We are the biggest hyperstore in the universe. We got you all
              covered with our exclusive collections and latest drops.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Runners
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sneakers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Basketball
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Outdoor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Golf
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hiking
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Follow us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-800">
          <div className="text-6xl sm:text-7xl md:text-8xl font-black mb-4 tracking-tighter">
            KICKS
          </div>
        </div>
      </div>
    </footer>
  );
}
