import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/Shared/Navbar";
import { Footer } from "@/Shared/Footer";
import Provider from "@/Provider/Provider";

// Fonts
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "KICKS | E-commerce site",
  description: "Clothing site",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} antialiased`}>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
