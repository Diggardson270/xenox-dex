"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpDown, ArrowDownUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import sol from "../../public/solana-sol-logo.svg";
import xenox_logo from "../../public/xenoxlogo.svg";
import CryptoReading from "./CryptoReading";
import TokenSelector from "./TokenSelector";
import { useTokens } from "../context/TokenContext";
import axios from "axios"; // Using import instead of require

function SwapPanel() {
  const { tokens, loading } = useTokens();
  const instructions = [
    "Select the currency you want to swap from and enter the amount.",
    "Select the currency you want to swap to.",
    "Click the swap arrow icon to execute the swap.",
    "Review the transaction details and confirm.",
  ];

  // Store selected tokens (start with empty objects or fallback data)
  const [fromToken, setFromToken] = useState({});
  const [toToken, setToToken] = useState({});
  const [fromAddress, setFromAddress] = useState(
    "So11111111111111111111111111111111111111112"
  );
  const [fromUSD, setFromUSD] = useState("0");

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [toAddress, setToAddress] = useState("Xen-frfrfrfrfrfrfrfrfrfrfr");
  const [toUSD, setToUSD] = useState("0");

  const [timeoutId, setTimeoutId] = useState(null);

  // Toggle icon state for swap arrow
  const [isSwapped, setIsSwapped] = useState(false);

  // Manage modal open/close and active field
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTokenField, setActiveTokenField] = useState(null);

  const [quoteLoading, setQuoteLoading] = useState(false);

  // State for error popup
  const [errorPopup, setErrorPopup] = useState({ show: false, message: "" });

  const handleSwap = () => {
    setIsSwapped((prev) => !prev);
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setFromAddress(toAddress);
    setToAddress(fromAddress);
  };

  const getSwapValue = () => {
    if (
      fromAddress == "Xen-frfrfrfrfrfrfrfrfrfrfr" ||
      toAddress == "Xen-frfrfrfrfrfrfrfrfrfrfr"
    ) {
      setQuoteLoading(true);
      let fromPrice = 1,
        toPrice = 1; // default values

      if (fromAddress == "Xen-frfrfrfrfrfrfrfrfrfrfr") {
        fromPrice = 0.99; // hardcoded since it's not listed
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "https://api.jup.ag/price/v2",
          headers: {},
          params: { ids: toAddress },
        };

        axios
          .request(config)
          .then((response) => {
            toPrice = JSON.stringify(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        toPrice = 0.99; // hardcoded since it's not listed
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "https://api.jup.ag/price/v2",
          headers: {},
          params: { ids: fromAddress },
        };

        axios
          .request(config)
          .then((response) => {
            fromPrice = JSON.stringify(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      const convertedAmount = (fromAmount * fromPrice) / toPrice;
      setToAmount(convertedAmount.toFixed(2));
      setQuoteLoading(false);
    } else {
      setQuoteLoading(true);
      let fromValue  = fromAmount * (10**fromToken['decimals']);
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.jup.ag/swap/v1/quote",
        headers: {
          Accept: "application/json",
        },
        params: {
          inputMint: fromAddress,
          outputMint: toAddress,
          amount: fromValue,
        },
      };

      axios
        .request(config)
        .then((response) => {
          let value = response.data;
          let toValue = (value.otherAmountThreshold/(10**toToken['decimals']));
          setToAmount(toValue);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setErrorPopup({
              show: true,
              message:
                "Swap cannot be executed for these tokens or amount, please enter a valid amount",
            });
          } else {
            console.error(error);
          }
        })
        .finally(() => {
          setQuoteLoading(false);
        });
    }
  };

  // Debounce API calls when fromAmount changes
  useEffect(() => {
    if (!fromAmount) return; // prevent unnecessary API calls

    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      getSwapValue();
    }, 1000);

    setTimeoutId(newTimeoutId);

    return () => clearTimeout(newTimeoutId);
  }, [fromAmount]);

  // Update USD conversion for the "from" token
  useEffect(() => {
    if (!fromToken || !fromToken.name || !fromAmount) {
      setFromUSD("0");
      return;
    }

    const fetchFromPrice = async () => {
      try {
        if (fromToken.extensions.coingeckoId) {
          const res = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${fromToken.extensions.coingeckoId}&vs_currencies=usd`
          );
          const price = res.data[fromToken.coingeckoId]?.usd || 0;
          setFromUSD((parseFloat(fromAmount) * price).toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching USD price for from token:", error);
      }
    };

    fetchFromPrice();
    const interval = setInterval(fetchFromPrice, 60000); // refresh every 60 seconds
    return () => clearInterval(interval);
  }, [fromAmount, fromToken]);

  // Update USD conversion for the "to" token
  useEffect(() => {
    if (!toToken || !toToken.name || !toAmount) {
      setToUSD("0");
      return;
    }

    const fetchToPrice = async () => {
      try {
        if (toToken.extensions.coingeckoId) {
          const res = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${toToken.name}&vs_currencies=usd`
          );
          const price = res.data[toToken.coingeckoId]?.usd || 0;
          setToUSD((parseFloat(toAmount) * price).toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching USD price for to token:", error);
      }
    };

    fetchToPrice();
    const interval = setInterval(fetchToPrice, 60000); // refresh every 60 seconds
    return () => clearInterval(interval);
  }, [toAmount, toToken]);

  return (
    <div className="w-[90%] lg:w-2/3 px-4 mx-auto mt-24 lg:px-14">
      <div className="flex flex-col md:flex-col lg:flex-row gap-4 lg:gap-0">
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
                  <div className="flex text-xs lg:text-sm items-center justify-between">
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
                        className="text-xs lg:text-sm w-28 lg:w-40 px-3 py-3 lg:py-7 bg-gray-800 bg-opacity-45 text-gray-200 font-bold rounded-lg focus:outline-none flex items-center justify-center"
                      >
                        <div className="flex items-center mr-2">
                          {fromToken.logoURI ? (
                            <Image
                              src={fromToken.logoURI}
                              alt={fromToken.symbol || "Solana"}
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
                          {fromToken.symbol || fromToken.name || "Solana"}
                        </div>
                        <ChevronDown size={16} className="text-gray-200" />
                      </button>
                    </div>
                    <div className="w-1/2">
                      <input
                        id="fromAmount"
                        type="number"
                        inputMode="numeric"
                        placeholder="0"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        className="w-full text-2xl lg:text-3xl text-right p-2 rounded bg-transparent text-gray-200 focus:outline-none"
                      />
                      <div className="text-right pr-[0.6rem]">
                        <p className="text-slate-500 font-bold">~${fromUSD}</p>
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
                  className="cursor-pointer bg-gray-950 rounded-lg py-2 px-3 absolute top-1/2 transform -translate-y-1/2 z-10 transition-opacity duration-500"
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
                  <div className="flex text-xs lg:text-sm items-center justify-between">
                    <p>To</p>
                    <p>
                      Balance:{" "}
                      <span className="text-gray-600">
                        0.0 {toToken.symbol || toToken.name || "Token"}
                      </span>
                    </p>
                  </div>
                </div>
                {/* <div className="border-gray-800 border-[1px] py-2 px-3 rounded-lg"> */}
                <div
                  className={`border-gray-800 border-[1px] py-2 px-3 rounded-lg ${
                    quoteLoading ? "animate-pulse" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTokenField("to");
                          setModalOpen(true);
                        }}
                        className="text-xs lg:text-sm w-28 lg:w-40 px-3 py-3 lg:py-7 bg-gray-800 bg-opacity-45 text-gray-200 font-bold rounded-lg focus:outline-none flex items-center justify-center"
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
                              src={xenox_logo}
                              alt="Fallback"
                              width={15}
                              height={15}
                              className="mr-2"
                            />
                          )}
                          {toToken.symbol || toToken.name || "Xenox"}
                        </div>
                        <ChevronDown size={16} className="text-gray-200" />
                      </button>
                    </div>
                    <div className="w-1/2">
                      <input
                        id="toAmount"
                        type="number"
                        inputMode="numeric"
                        placeholder="0"
                        value={toAmount}
                        onChange={(e) => setToAmount(e.target.value)}
                        className="w-full text-2xl lg:text-3xl text-right p-2 rounded bg-transparent text-gray-200 focus:outline-none"
                      />
                      <div className="text-right pr-[0.6rem]">
                        <p className="text-slate-500 font-bold">~${toUSD}</p>
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
        <div className="bg-gray-900 rounded-3xl p-5 lg:p-10 lg:w-2/4 mx-auto">
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
                    <p className="text-gray-200 text-sm lg:text-base">{text}</p>
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
        setFromAddress={setFromAddress}
        setToAddress={setToAddress}
      />

      {/* Error Popup */}
      {errorPopup.show && (
        <div className="fixed bg-gray-950 bg-opacity-70 inset-0 flex items-center justify-center z-50 ">
          <div className="bg-gray-950 p-6 rounded-lg shadow-lg max-w-lg">
            <p className="text-red-700 bg-red-900 p-6 bg-opacity-15 text-sm">
              {errorPopup.message}
            </p>
            <button
              onClick={() => setErrorPopup({ show: false, message: "" })}
              className="mt-4 text-sm bg-gray-900 px-4 py-2 rounded text-gray-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwapPanel;
