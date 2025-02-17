"use client"; // We use client-side interactions (e.g. button onClick)

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Wallet, Menu, X } from "lucide-react";

function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleConnect = () => {
    alert("Connect Wallet Clicked!");
  };

  return (
    <header className="bg-gray-900 px-4 py-4 border-b border-gray-700">
      <nav className="container mx-auto font-bold flex items-center justify-between text-white p-4 shadow-md">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold uppercase">
          Xenox
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-16">
          <li>
            <Link
              href="#swap-panel"
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
                pathname === "/about" ? "text-blue-400" : "hover:text-gray-400"
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
            className="hidden lg:flex gap-3 bg-teal-600 hover:bg-teal-400 text-gray-800 font-extrabold py-2 px-4 rounded"
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

      {/* Mobile Menu (slides in from the right) */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
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
    </header>
  );
}

export default Header;
