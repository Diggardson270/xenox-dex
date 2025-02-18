"use client";

import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-900 border border-gray-700 rounded-3xl w-[90%] z-50 max-w-7xl mx-auto px-6 md:px-8 py-6 text-center text-gray-300 relative bottom-6 shadow-lg">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        <p className="max-w-2xl text-lg font-medium leading-relaxed">
          XENOX DEX is the fastest DEX on SOL with built-in sniper protection.
          Experience super-fast token swaps and secure transactions. To
          celebrate our launch, the first 50 users to connect will receive 9000
          XENOX, valued at 1000 USDT, thanks to our generous grant!
        </p>

        <div className="flex space-x-6 text-sm font-medium">
          <Link href="/privacy" className="hover:text-gray-400 transition-all">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-400 transition-all">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-gray-400 transition-all">
            Contact
          </Link>
        </div>

        <p className="text-sm font-light">
          &copy; {new Date().getFullYear()} XENOX DEX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
