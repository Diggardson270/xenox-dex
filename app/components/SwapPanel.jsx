"use client";

import React, { useState } from "react";
import { Wallet, ArrowUpDown, ChevronDown } from "lucide-react";

import Image from "next/image";
import sol from "../../public/solana-sol-logo.svg";
import btc from "../../public/bitcoin-btc-logo.svg";
import eth from "../../public/ethereum-eth-logo.svg";

function SwapPanel() {
  // Define token objects (adjust logo paths as needed)
  const tokens = [
    { name: "XENOX", logo: sol },
    { name: "SOL", logo: sol },
    { name: "BTC", logo: btc },
    { name: "ETH", logo: eth },
  ];

  // Initialize state with token objects
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  // Modal state and which token field is active ('from' or 'to')
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTokenField, setActiveTokenField] = useState(null);

  // This function is triggered when the arrow icon is clicked
  const handleSwap = () => {
    alert(
      `Swapping ${fromAmount} ${fromToken.name} to ${toAmount} ${toToken.name}`
    );
  };

  return (
    <div className="container px-2 mx-auto mt-24 lg:px-14">
      <div className="flex flex-col md:flex-col lg:flex-row gap-6">
        {/* LEFT: Swap Panel */}
        <div className="bg-gray-900 rounded-lg p-6 lg:w-1/2 max-w-xl mx-auto relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSwap();
            }}
          >
            {/* From Section */}
            <div className="mt-5">
              <div className="font-semibold mb-2 text-gray-300">
                <div className="flex text-sm items-center justify-between">
                  <p>From</p>
                  <p>
                    Balance:{" "}
                    <span className="text-gray-600">0.0 {fromToken.name}</span>
                  </p>
                </div>
              </div>
              <div className="border-gray-800 border-[1px] mb-10 py-8 px-2 lg:px-5 rounded-3xl">
                <div className="flex items-center justify-between">
                  {/* Token button for "from" selection */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTokenField("from");
                      setModalOpen(true);
                    }}
                    className="text-xs w-32 px-3 py-3 bg-gray-800 text-white font-bold rounded-lg focus:outline-none flex items-center justify-center"
                  >
                    <div className="flex items-center mr-2">
                      <Image
                        src={fromToken.logo}
                        alt={fromToken.name}
                        width={15} // Adjust width and height as needed
                        height={15}
                        className="mr-2"
                      />
                      {fromToken.name}
                    </div>
                    <ChevronDown size={16} className="text-white" />
                  </button>
                  <div className="w-1/2">
                    <input
                      id="fromAmount"
                      type="number"
                      placeholder="0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="w-full text-3xl text-right p-2 rounded bg-gray-800 text-white focus:outline-none"
                    />
                  </div>
                </div>
                <p className="float-end text-slate-500 font-bold">~$0</p>
              </div>
            </div>

            {/* Center Arrow Icon for Swap (clickable) */}
            <div className="relative flex justify-center my-6">
              {/* Horizontal Line */}
              <hr className="absolute top-1/2 left-0 w-full border-t-[px] border-slate-900" />

              {/* Swap Icon */}
              <div
                onClick={handleSwap}
                className="cursor-pointer bg-black rounded-lg py-2 px-3 absolute top-1/2 transform -translate-y-1/2 z-10"
              >
                <ArrowUpDown size={14} className="text-white" />
              </div>
            </div>

            {/* to section */}
            <div className="mt-2 ">
              <div className="font-semibold mb-2 text-gray-300">
                <div className="flex text-sm items-center justify-between">
                  <p>To</p>
                  <p>
                    Balance:{" "}
                    <span className="text-gray-600">0.0 {toToken.name}</span>
                  </p>
                </div>
              </div>
              <div className="border-gray-800 border-[1px] py-8 px-5 rounded-3xl">
                <div className="flex items-center justify-between">
                  {/* Token button for "to" selection */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTokenField("to");
                      setModalOpen(true);
                    }}
                    className="text-xs w-32 px-3 py-3 bg-gray-800 text-white font-bold rounded-lg focus:outline-none flex items-center justify-center"
                  >
                    <div className="flex items-center mr-2">
                      <Image
                        src={toToken.logo}
                        alt={toToken.name}
                        width={15} // Adjust width and height as needed
                        height={15}
                        className="mr-2"
                      />
                      {toToken.name}
                    </div>
                    <ChevronDown size={16} className="text-white" />
                  </button>
                  <div className="w-1/2">
                    <input
                      id="toAmount"
                      type="number"
                      placeholder="0"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="w-full text-3xl text-right p-2 rounded bg-transparent text-white focus:outline-none"
                    />
                  </div>
                </div>
                <p className="float-end text-slate-500 font-bold">~$0</p>
              </div>
            </div>
          </form>

          {/* Modal for Token Selection */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={() => setModalOpen(false)}
              ></div>
              {/* Modal Content */}
              <div className="bg-gray-800 p-4 rounded-lg z-10 max-w-sm w-full">
                <h2 className="text-xl text-white mb-4">Select a token</h2>
                <ul>
                  {tokens.map((token) => (
                    <li key={token.name} className="mb-2 flex items-center">
                      <Image
                        src={token.logo}
                        alt={token.name}
                        width={24}
                        height={24}
                        className="mr-2"
                      />
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
                        {token.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Instruction Card */}
        <div className="bg-gray-900 rounded-lg p-6 lg:w-1/2 max-w-xl mx-auto ">
          <h2 className="text-2xl text-red-600 mb-4">Swap</h2>
          <ol className="list-decimal list-inside text-white space-y-10">
            <li className="mb-2">
              Select the currency you want to swap from and enter the amount.
            </li>
            <li className="mb-2">Select the currency you want to swap to.</li>
            <li className="mb-2">
              Click the swap arrow icon to execute the swap.
            </li>
            <li className="mb-2">
              Review the transaction details and confirm.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default SwapPanel;
