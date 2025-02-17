"use client";

import { Wallet } from "lucide-react";
import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";

function SwapPanel() {
  const [fromToken, setFromToken] = useState("XENOX");
  const [toToken, setToToken] = useState("SOL");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  // New state for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTokenField, setActiveTokenField] = useState(null); // 'from' or 'to'

  // List of tokens to display in the modal
  const tokens = ["XENOX", "SOL", "BTC", "ETH"];

  const handleSwap = (e) => {
    e.preventDefault();
    // Implement your swap logic here
    alert(`Swapping ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`);
  };

  return (
    <div
      id="swap-panel"
      className="bg-gray-800 rounded-lg p-6 w-full max-w-lg border border-gray-700 mx-auto"
    >
      <div className="text-center text-xl font-semibold mb-4 text-teal-600">
        <div className="flex gap-1 items-center">
          <Wallet />
          <p>Buy</p>
        </div>
      </div>
      <form onSubmit={handleSwap} className="">
        <div className="border border-gray-100 mb-2 py-10 px-10 rounded-full">
          <div className="flex items-center justify-between">
            {/* Replacing the select input with a button for the fromToken */}
            <button
              type="button"
              onClick={() => {
                setActiveTokenField("from");
                setModalOpen(true);
              }}
              className="w-32 px-6 py-3 bg-gray-700 text-white font-bold rounded-full focus:outline-none"
            >
              {fromToken}
            </button>

            <div className="w-1/2">
              <input
                id="fromAmount"
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="w-full p-2 rounded bg-gray-600 text-white focus:outline-none"
              />
            </div>
          </div>
          <p className="float-end text-slate-500 font-bold">~$0</p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-bl from-black to-teal-500 rounded-full p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ArrowUpDown size={24} className="text-white" />
          </div>
        </div>

        <div className="border border-gray-100 mb-16 mt-5 py-10 px-10 rounded-full">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center justify-between">
              {/* Replacing the second select input with a button for the toToken */}
              <button
                type="button"
                onClick={() => {
                  setActiveTokenField("to");
                  setModalOpen(true);
                }}
                className="w-32 px-6 py-3 bg-gray-700 text-white font-bold rounded-full focus:outline-none"
              >
                {toToken}
              </button>

              <input
                id="toAmount"
                type="number"
                placeholder="0.0"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                className="w-1/2 p-2 rounded bg-gray-600 text-white focus:outline-none"
              />
            </div>
          </div>
          <p className="float-end text-slate-500 font-bold">~$0</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded"
        >
          Swap
        </button>
      </form>

      {/* Modal for token selection */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setModalOpen(false)}
          ></div>
          {/* Modal content */}
          <div className="bg-gray-800 p-4 rounded-lg z-10 max-w-sm w-full">
            <h2 className="text-xl text-white mb-4">Select a token</h2>
            <ul>
              {tokens.map((token) => (
                <li key={token} className="mb-2">
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded"
                    onClick={() => {
                      if (activeTokenField === "from") {
                        setFromToken(token);
                      } else if (activeTokenField === "to") {
                        setToToken(token);
                      }
                      setModalOpen(false);
                    }}
                  >
                    {token}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwapPanel;
