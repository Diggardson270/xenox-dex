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
        <nav className="font-bold flex items-center justify-between text-white p-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold uppercase">
            Xenox
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-16">
            <li>
              <Link
                href="/"
                className={`${
                  pathname === "/swap-panel"
                    ? "text-blue-400"
                    : "hover:text-gray-400"
                } transition`}
              >
                Swap Panel
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className={`${
                  pathname === "/news" ? "text-blue-400" : "hover:text-gray-400"
                } transition`}
              >
                News
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${
                  pathname === "/about"
                    ? "text-blue-400"
                    : "hover:text-gray-400"
                } transition`}
              >
                About
              </Link>
            </li>
          </ul>

          <div className="flex items-center">
            {/* Desktop Connect Button */}
            <button
              onClick={handleConnect}
              className="hidden lg:flex gap-3 bg-red-800 hover:bg-red-700 text-gray-800 font-extrabold py-2 px-4 rounded"
            >
              <Wallet />
              <p>Connect Wallet</p>
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
            <Link
              href="#swap-panel"
              onClick={() => setMobileMenuOpen(false)}
              className={`${
                pathname === "/swap-panel"
                  ? "text-blue-400"
                  : "hover:text-gray-400"
              } transition block`}
            >
              Swap Panel
            </Link>
          </li>
          <li>
            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className={`${
                pathname === "/news" ? "text-blue-400" : "hover:text-gray-400"
              } transition block`}
            >
              News
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`${
                pathname === "/about" ? "text-blue-400" : "hover:text-gray-400"
              } transition block`}
            >
              About
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleConnect();
              }}
              className="flex gap-3 bg-teal-600 hover:bg-teal-400 text-gray-800 font-extrabold py-2 px-4 rounded w-full"
            >
              <Wallet />
              <p>Connect Wallet</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
