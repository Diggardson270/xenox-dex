"use client";

import React, { useState } from "react";
import { ArrowUpDown, ArrowDownUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import sol from "../../public/solana-sol-logo.svg";
import btc from "../../public/bitcoin-btc-logo.svg";
import eth from "../../public/ethereum-eth-logo.svg";
import CryptoReading from "./CryptoReading";
import TokenSelector from "./TokenSelector";

function SwapPanel() {
  const instructions = [
    "Select the currency you want to swap from and enter the amount.",
    "Select the currency you want to swap to.",
    "Click the swap arrow icon to execute the swap.",
    "Review the transaction details and confirm.",
  ];

  // Store selected tokens (start with empty objects or fallback data)
  const [fromToken, setFromToken] = useState({});
  const [toToken, setToToken] = useState({});

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  // Toggle icon state for swap arrow
  const [isSwapped, setIsSwapped] = useState(false);

  // Manage modal open/close and active field
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTokenField, setActiveTokenField] = useState(null);

  const handleSwap = () => {
    alert(
      `Swapping ${fromAmount} ${fromToken.symbol || "Token"} to ${toAmount} ${
        toToken.symbol || "Token"
      }`
    );
    setIsSwapped((prev) => !prev);
  };

  return (
    <div className="w-[90%] lg:w-2/3 px-4 mx-auto mt-24 lg:px-14">
      <div className="flex flex-col md:flex-col lg:flex-row gap-6">
        {/* LEFT: Swap Panel */}
        <div className="lg:px-6 lg:w-3/4 mx-auto">
          <div className="bg-gray-900 rounded-3xl py-12 px-4 ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSwap();
              }}
            >
              {/* From Section */}
              <div>
                <div className="font-semibold mb-2 text-gray-300">
                  <div className="flex text-sm items-center justify-between">
                    <p>From</p>
                    <p>
                      Balance:{" "}
                      <span className="text-gray-600">
                        0.0 {fromToken.symbol || fromToken.name || "Token"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="border-gray-800 border-[1px] py-2 px-3 rounded-lg mb-12">
                  <div className="flex items-center justify-between">
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTokenField("from");
                          setModalOpen(true);
                        }}
                        className="text-xs lg:text-sm w-40 px-3 py-3 lg:py-7 bg-gray-800 bg-opacity-45 text-gray-200 font-bold rounded-lg focus:outline-none flex items-center justify-center"
                      >
                        <div className="flex items-center mr-2">
                          {fromToken.logoURI ? (
                            <Image
                              src={fromToken.logoURI}
                              alt={fromToken.symbol || "From Token"}
                              width={15}
                              height={15}
                              className="mr-2"
                            />
                          ) : (
                            <Image
                              src={sol}
                              alt="Fallback"
                              width={15}
                              height={15}
                              className="mr-2"
                            />
                          )}
                          {fromToken.symbol || fromToken.name || "Select Token"}
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

              {/* Center Arrow Icon for Swap */}
              <div className="relative flex justify-center my-6">
                <hr className="opacity-45 absolute top-1/2 left-0 w-full border-t border-slate-800" />
                <div
                  onClick={handleSwap}
                  className="cursor-pointer bg-black rounded-lg py-2 px-3 absolute top-1/2 transform -translate-y-1/2 z-10 transition-opacity duration-500"
                >
                  {isSwapped ? (
                    <ArrowDownUp size={14} className="text-gray-200" />
                  ) : (
                    <ArrowUpDown size={14} className="text-gray-200" />
                  )}
                </div>
              </div>

              {/* To Section */}
              <div className="mt-4">
                <div className="font-semibold mb-2 text-gray-300">
                  <div className="flex text-sm items-center justify-between">
                    <p>To</p>
                    <p>
                      Balance:{" "}
                      <span className="text-gray-600">
                        0.0 {toToken.symbol || toToken.name || "Token"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="border-gray-800 border-[1px] py-2 px-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTokenField("to");
                          setModalOpen(true);
                        }}
                        className="text-xs lg:text-sm w-40 px-3 py-3 lg:py-7 bg-gray-800 bg-opacity-45 text-gray-200 font-bold rounded-lg focus:outline-none flex items-center justify-center"
                      >
                        <div className="flex items-center mr-2">
                          {toToken.logoURI ? (
                            <Image
                              src={toToken.logoURI}
                              alt={toToken.symbol || "To Token"}
                              width={15}
                              height={15}
                              className="mr-2"
                            />
                          ) : (
                            <Image
                              src={eth}
                              alt="Fallback"
                              width={15}
                              height={15}
                              className="mr-2"
                            />
                          )}
                          {toToken.symbol || toToken.name || "Select Token"}
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
          </div>

          <CryptoReading />
        </div>

        {/* RIGHT: Instruction Card */}
        <div className="bg-gray-900 rounded-3xl p-10 lg:w-2/4 mx-auto">
          <h2 className="text-xl text-gray-200 mb-6 text-left">Swap</h2>
          <div className="relative">
            <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-950"></div>
            <ol className="space-y-8">
              {instructions.map((text, index) => (
                <li key={index} className="flex items-start text-base">
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

      {/* Token Selector Modal */}
      <TokenSelector
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        activeTokenField={activeTokenField}
        setFromToken={setFromToken}
        setToToken={setToToken}
      />
    </div>
  );
}

export default SwapPanel;
