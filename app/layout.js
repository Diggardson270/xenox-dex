import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "XENOX DEX",
  description: "A super fast DEX built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-blue-700 via-purple-600 to-gray-800 bg-clip-border bg-opacity-100`}
      >
        <div className="relative overflow-hidden min-h-screen">
          {/* Background Container */}
          <div className="absolute inset-0 z-0">
            {/* Gradient Background */}
            <div className="w-full h-full bg-gradient-to-r from-blue-900 via-gray-900 to-purple-950 opacity-70" />

            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 backdrop-blur-3xl bg-black/80" />
          </div>

          {/* Content Layer */}
          <div className="relative z-20">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
