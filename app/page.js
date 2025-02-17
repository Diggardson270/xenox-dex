"use client";
// Because we'll have some stateful logic (e.g. in SwapPanel).

import React from "react";
import Header from "./components/Header";
import SwapPanel from "./components/SwapPanel";
import Footer from "./components/Footer";
import Image from "next/image";
import curve from "../public/arrowcurves.png";
import lines from "../public/lines.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Swap Panel */}
      <div className="relative py-24">
        <Image
          width={900}
          height={900}
          className="opacity-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-clip -z-50"
          src={lines}
          alt="na design"
        />
        <SwapPanel />
      </div>
    </div>
  );
}
