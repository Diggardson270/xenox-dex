"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTokens } from "../context/TokenContext";
import sol from "../../public/solana-sol-logo.svg";
import { Search, X } from "lucide-react";

export default function TokenSelector({
  modalOpen,
  setModalOpen,
  activeTokenField,
  setFromToken,
  setToToken,
  setFromAddress,
  setToAddress,
}) {
  const { tokens, loading } = useTokens();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(10);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Filter tokens based on search query
  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get a paginated slice of tokens
  const displayedTokens = filteredTokens.slice(0, displayCount);

  function pasrseLogoURI(logo) {
    if (!logo) {
      return sol;
    }
    if (!logo.startsWith("https://")) {
      return `https://${logo}`;
    }
    return logo;
  }

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // Load 10 more tokens when the user scrolls to the bottom
      setDisplayCount((prev) => Math.min(prev + 10, filteredTokens.length));
    }
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setModalOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className=" relative w-[90%] bg-gray-900 px-4 py-10 lg:px-10 rounded-lg z-10 max-w-xl">
        {/* Close Icon */}
        <div
          className="absolute top-11 right-11 cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <X size={24} className="text-gray-200" />
        </div>

        <h2 className="text-xl text-gray-200 mb-14">Select a token</h2>

        {/* Search Bar */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="SOL, USDC, JLP...."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value); 
              setDisplayCount(10)
            }}
            className="w-full pl-10 pr-4 py-4 mb-2 rounded-lg border border-gray-700 bg-transparent text-gray-500 placeholder:text-gray-700 outline-none focus:border-gray-500"
          />
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Loading tokens...</p>
        ) : (
          <ul className="modal overflow-auto max-h-[400px] mt-10 py-5" onScroll={handleScroll}>
            {displayedTokens.map((token) => (
              <li
                key={token.address}
                className="mb-2 flex items-center justify-center"
              >
                <button
                  type="button"
                  className="w-[90%] h-20 flex items-center justify-between px-4 lg:py-8 py-2 bg-gray-700 bg-opacity-15 text-gray-200 hover:bg-gray-800 rounded"
                  onClick={() => {
                    if (activeTokenField === "from") {
                      setFromToken(token);
                      setFromAddress(token.address);
                    } else if (activeTokenField === "to") {
                      setToToken(token);
                      setToAddress(token.address);
                    }
                    setModalOpen(false);
                  }}
                >
                  {token.symbol} ({token.name})
                  <Image
                    src={pasrseLogoURI(token.logoURI)}
                    alt={token.symbol}
                    width={32}
                    height={32}
                    className="mr-2 rounded-full"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
