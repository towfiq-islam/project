import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/Shared/Navbar";
import { Footer } from "@/Shared/Footer";
import Provider from "@/Provider/Provider";

// Fonts
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
      <body className={`${poppins.variable} antialiased`}>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
