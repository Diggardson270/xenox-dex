// components/TokenSelector.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTokens } from "../context/TokenContext";

export default function TokenSelector({
  modalOpen,
  setModalOpen,
  activeTokenField,
  setFromToken,
  setToToken,
}) {
  const { tokens, loading } = useTokens();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tokens based on search query
  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setModalOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="w-[90%] bg-gray-950 p-4 rounded-lg z-10 max-w-sm">
        <h2 className="text-xl text-gray-200 mb-4">Select a token</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search token..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-2 border rounded bg-gray-800 text-gray-200 focus:outline-none"
        />

        {loading ? (
          <p className="text-gray-400 text-center">Loading tokens...</p>
        ) : (
          <ul className="overflow-auto max-h-[400px]">
            {filteredTokens.map((token) => (
              <li key={token.address} className="mb-2 flex items-center">
                <button
                  type="button"
                  className="w-full h-20 flex items-center justify-start px-4 py-2 bg-gray-900 text-gray-200 hover:bg-gray-600 rounded"
                  onClick={() => {
                    if (activeTokenField === "from") {
                      setFromToken(token);
                    } else if (activeTokenField === "to") {
                      setToToken(token);
                    }
                    setModalOpen(false);
                  }}
                >
                  {token.localImagePath && (
                    <Image
                      src={token.localImagePath}
                      alt={token.symbol}
                      width={32}
                      height={32}
                      className="mr-2 rounded-full"
                    />
                  )}
                  {token.symbol} ({token.name})
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
