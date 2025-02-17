"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Wallet, Menu, X } from "lucide-react";

function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleConnect = () => {
    alert("Connect Wallet Clicked!");
  };

  return (
    <>
      {/* Header Container */}
      <header
        className={`transition-all duration-300 px-4 py-4 border border-gray-700 rounded-3xl w-full max-w-7xl z-50 left-1/2 transform -translate-x-1/2 ${
          isFixed
            ? "fixed top-0 bg-gray-900 shadow-lg"
            : "absolute top-8 bg-gray-900"
        }`}
      >
        <nav className="font-bold flex items-center justify-between text-white px-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold uppercase">
            Xenox
          </Link>

          {/* Desktop Navigation */}

          <div className="flex items-center">
            {/* Desktop Connect Button */}
            <button
              onClick={handleConnect}
              className="hidden lg:flex gap-3 bg-opacity-90 bg-red-500 hover:bg-red-400 text-gray-800 font-extrabold py-2 px-4 rounded"
            >
              <Wallet />
              <p>Swap Wallet</p>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden ml-4"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu (slides in from the right) */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} className="text-white" />
          </button>
        </div>
        <ul className="flex flex-col space-y-10 p-5">
          <li>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleConnect();
              }}
              className="flex gap-3 bg-red-500 hover:bg-red-400 text-gray-800 font-extrabold py-2 px-4 rounded w-full"
            >
              <Wallet />
              <p>Swap Wallet</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
