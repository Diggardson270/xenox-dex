"use client";

import heroimg from "../../public/heroimg.png";
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-gradient-to-bl from-black to-teal-800 relative bg-cover bg-center flex items-center py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Text Content */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-left font-bold bg-gradient-to-br from-gray-100 to-blue-800 bg-clip-text text-transparent">
            Trade, Earn, Discover with <br /> Xenox
          </h1>
        </div>

        {/* Right Image Content */}
        <div className="mt-6 md:mt-0 w-full md:w-1/2 flex justify-center">
          <Image
            src={heroimg}
            alt="Hero Image"
            width={400} // Intrinsic width (used for optimization)
            height={200} // Intrinsic height (used for optimization)
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
