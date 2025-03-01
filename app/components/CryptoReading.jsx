import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import sol from "../../public/solana-sol-logo.svg";
import xenox from "../../public/xenoxlogo.svg";

export default function CryptoReading() {
  const [prices, setPrices] = useState({ solana: 0, xen: 0 });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
          {headers: {
            'Access-Control-Allow-Origin':'*',
            'accept': 'application/json',
            'api-key': 'CG-EVsSJ6iN2t87GpXKbC8L2X3q'
            
          }}
        );
        setPrices(res.data);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 bg-gray-900 text-white p-6 rounded-xl">
      <div className="space-y-4">
        {/* Solana */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={sol}
              alt="Solana"
              width={30}
              height={30}
              className="w-5 lg:w-8"
            />
            <div>
              <p className="font-bold text-sm">
                SOL <span className="text-gray-400 text-xs">Solana</span>
              </p>
              <p className="text-gray-500 text-sm">$so1...1112</p>
            </div>
          </div>
          <p className="font-semibold text-xs lg:text-base">
            ${prices.solana?.usd?.toFixed(2)}
          </p>
        </div>

        {/* Xenox */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <Image
              className="w-5 lg:w-8"
              src={xenox}
              alt="Xenox"
              width={30}
              height={30}
            />
            <div>
              <p className="font-bold text-sm">
                XENOX <span className="text-gray-400 text-xs">Xenox</span>
              </p>
              <p className="text-gray-500 text-sm">Xenox...csmf</p>
            </div>
          </div>
          <p className="font-semibold text-xs lg:text-base">$0.99</p>
        </div>
      </div>
    </div>
  );
}
