import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import sol from "../../public/solana-sol-logo.svg";
import orca from "../../public/orca-logo.svg";

export default function CryptoReading() {
  const [prices, setPrices] = useState({ solana: 0, orca: 0 });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana,orca&vs_currencies=usd"
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
    <div className="mt-10 bg-gray-900 text-white p-6 rounded-xl">
      <div className="space-y-4">
        {/* Solana */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src={sol} alt="Solana" width={30} height={30} />
            <div>
              <p className="font-bold">
                SOL <span className="text-gray-400">Solana</span>
              </p>
              <p className="text-gray-500 text-sm">$so1...1112</p>
            </div>
          </div>
          <p className="text-lg font-semibold">
            ${prices.solana?.usd?.toFixed(2)}
          </p>
        </div>

        {/* Orca */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src={orca} alt="Orca" width={30} height={30} />
            <div>
              <p className="font-bold">
                ORCA <span className="text-gray-400">Orca</span>
              </p>
              <p className="text-gray-500 text-sm">orca...ktZE</p>
            </div>
          </div>
          <p className="text-lg font-semibold">
            ${prices.orca?.usd?.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
}
