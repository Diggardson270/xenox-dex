"use client";

import React, { useState } from "react";
import { Wallet, ArrowUpDown, ArrowDownUp, ChevronDown } from "lucide-react";

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

  const instructions = [
    "Select the currency you want to swap from and enter the amount.",
    "Select the currency you want to swap to.",
    "Click the swap arrow icon to execute the swap.",
    "Review the transaction details and confirm.",
  ];

  // Initialize state with token objects
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  // State to manage the toggle between icons
  const [isSwapped, setIsSwapped] = useState(false);

  // Modal state and which token field is active ('from' or 'to')
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTokenField, setActiveTokenField] = useState(null);

  // This function is triggered when the arrow icon is clicked
  const handleSwap = () => {
    alert(
      `Swapping ${fromAmount} ${fromToken.name} to ${toAmount} ${toToken.name}`
    );

    setIsSwapped((prev) => !prev);
  };

  return (
    <div className="w-[90%] lg:w-2/3 px-4 mx-auto mt-24 lg:px-14">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* LEFT: Swap Panel */}
        <div className="bg-gray-900 rounded-3xl px-4 py-10 lg:px-6 lg:w-3/4 mx-auto">
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
              <div className="border-gray-800 border-[1px] py-2 px-3 rounded-lg mb-16">
                <div className="flex items-center justify-between">
                  <div>
                    {/* Token button for "to" selection */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTokenField("from");
                        setModalOpen(true);
                      }}
                      className="text-xs lg:text-sm w-40 px-3 py-7 bg-gray-800 bg-opacity-45 text-gray-200 font-bold rounded-lg focus:outline-none flex items-center justify-center"
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
                      <ChevronDown size={16} className="text-gray-200" />
                    </button>
                  </div>
                  <div className="w-1/2">
                    <input
                      id="toAmount"
                      type="number"
                      placeholder="0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="w-full text-3xl text-right p-2 rounded bg-transparent text-gray-200 focus:outline-none"
                    />
                    <div className="flex flex-col items-end pr-6">
                      <p className="text-slate-500 font-bold">~$0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Arrow Icon for Swap (clickable) */}
            <div className="relative flex justify-center my-6">
              {/* Horizontal Line */}
              <hr className="opacity-45 absolute top-1/2 left-0 w-full border-t border-slate-800" />

              {/* Swap Icon */}
              <div
                onClick={handleSwap}
                className="cursor-pointer bg-black rounded-lg py-2 px-3 absolute top-1/2 transform -translate-y-1/2 z-10 transition-opacity duration-500"
              >
                {/* Conditionally render the icon based on isSwapped state */}
                {isSwapped ? (
                  <ArrowDownUp size={14} className="text-gray-200" />
                ) : (
                  <ArrowUpDown size={14} className="text-gray-200" />
                )}
              </div>
            </div>

            {/* to section */}
            <div className="mt-10 ">
              <div className="font-semibold mb-2 text-gray-300">
                <div className="flex text-sm items-center justify-between">
                  <p>To</p>
                  <p>
                    Balance:{" "}
                    <span className="text-gray-600">0.0 {toToken.name}</span>
                  </p>
                </div>
              </div>
              <div className="border-gray-800 border-[1px] py-2 px-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    {/* Token button for "to" selection */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTokenField("to");
                        setModalOpen(true);
                      }}
                      className="text-xs lg:text-sm w-40 px-3 py-7 bg-gray-800 bg-opacity-45 text-gray-200 font-bold rounded-lg focus:outline-none flex items-center justify-center"
                    >
                      <div className="flex items-center mr-2 text-gray-200">
                        <Image
                          src={toToken.logo}
                          alt={toToken.name}
                          width={15} // Adjust width and height as needed
                          height={15}
                          className="mr-2"
                        />
                        {toToken.name}
                      </div>
                      <ChevronDown size={16} className="text-gray-200" />
                    </button>
                  </div>
                  <div className="w-1/2">
                    <input
                      id="toAmount"
                      type="number"
                      placeholder="0"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="w-full text-3xl text-right p-2 rounded bg-transparent text-gray-200 focus:outline-none"
                    />
                    <div className="flex flex-col items-end pr-6">
                      <p className="text-slate-500 font-bold">~$0</p>
                    </div>
                  </div>
                </div>
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
              <div className="w-[90%] bg-gray-950 p-4 rounded-lg z-10 max-w-sm">
                <h2 className="text-xl text-gray-200 mb-4">Select a token</h2>
                <ul>
                  {tokens.map((token) => (
                    <li key={token.name} className="mb-2  flex items-center">
                      <button
                        type="button"
                        className="w-full h-20 flex items-center justify-center text-left px-4 py-2 bg-gray-900 text-gray-200 hover:bg-gray-600 rounded"
                        onClick={() => {
                          if (activeTokenField === "from") {
                            setFromToken(token);
                          } else if (activeTokenField === "to") {
                            setToToken(token);
                          }
                          setModalOpen(false);
                        }}
                      >
                        <Image
                          src={token.logo}
                          alt={token.name}
                          width={24}
                          height={24}
                          className="mr-2"
                        />
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
        <div className="bg-gray-900 rounded-3xl p-6 lg:w-2/4 mx-auto">
          <h2 className="text-2xl text-gray-200 mb-6 text-left">Swap</h2>
          <div className="relative">
            {/* Vertical line behind the numbered circles */}
            <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-950"></div>
            <ol className="space-y-12">
              {instructions.map((text, index) => (
                <li key={index} className="flex items-start">
                  <div className="relative flex-shrink-0">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm text-gray-200 font-bold bg-gray-950">
                      {index + 1}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-200">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapPanel;
