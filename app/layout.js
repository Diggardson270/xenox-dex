import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-blue-900 via-purple-950 to-gray-950 bg-clip-border bg-opacity-80`}
      >
        <div className="relative overflow-hidden min-h-screen">
          {/* Blob Glassmorphism Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900 via-gray-900 to-purple-950 opacity-70 z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-3xl bg-black/80 z-10"></div>

          <Header />
          <div className="relative z-20">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
