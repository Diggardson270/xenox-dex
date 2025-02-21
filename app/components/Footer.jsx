"use client";

import React from "react";
import Link from "next/link";
import { Lock, FileText, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="footerbg bg-gray-950 border border-gray-800 rounded-t-3xl w-[90%] z-50 max-w-7xl mx-auto px-6 md:px-8 py-6 text-center text-gray-300 relative shadow-lg">
      <div className="absolute inset-0 bg-gray-950 bg-opacity-75 rounded-t-3xl -z-10"></div>
      <div className="mx-auto text-gray-400 flex flex-col items-center space-y-6">
        <p className="max-w-2xl text-xs md:text-sm lg:text-lg font-light leading-relaxed tracking-widest">
          XENOX DEX is the fastest DEX on SOL with built-in sniper protection.
          Experience super-fast token swaps and secure transactions. To
          celebrate our launch, the first 50 users to connect will receive 9000
          XENOX, valued at 1000 USDT, thanks to our generous grant!
        </p>

        <div className="flex space-x-6 text-xs md:text-sm lg:text-base font-medium">
          <Link
            href="/privacy"
            className="flex items-center space-x-1 hover:text-gray-400 transition-all"
          >
            <Lock className="w-3 h-3 md:w-5 md:h-5" />
            <span>Privacy Policy</span>
          </Link>
          <Link
            href="/terms"
            className="flex items-center space-x-1 hover:text-gray-400 transition-all"
          >
            <FileText className="w-3 h-3 md:w-5 md:h-5" />
            <span>Terms of Service</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center space-x-1 hover:text-gray-400 transition-all"
          >
            <Mail className="w-3 h-3 md:w-5 md:h-5" />
            <span>Contact</span>
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
