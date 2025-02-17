"use client";

import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-7xl mx-auto px-6 md:px-8 py-6 text-center text-white mt-6 relative bottom-6 shadow-lg">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        <p className="text-gray-200 max-w-2xl text-lg font-semibold leading-relaxed">
          <span className="text-blue-400">XENOX DEX</span> is the fastest DEX
          available on SOL with built-in sniper protection. Experience
          super-fast token swaps and secure transactions. To celebrate our
          launch, the first <span className="text-yellow-400">50 users</span> to
          connect will receive{" "}
          <span className="text-green-400">9000 XENOX</span>, valued at{" "}
          <span className="text-red-400">1000 USDT</span>, thanks to our
          generous grant!
        </p>
        <div className="flex space-x-6 text-sm font-medium">
          <Link
            href="/privacy"
            className="text-blue-400 hover:text-blue-300 transition-all"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-blue-400 hover:text-blue-300 transition-all"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-blue-400 hover:text-blue-300 transition-all"
          >
            Contact
          </Link>
        </div>
        <p className="text-gray-500 text-xs font-light">
          &copy; {new Date().getFullYear()} XENOX DEX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
