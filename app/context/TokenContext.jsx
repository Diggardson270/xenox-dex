// TokenContext.jsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import xenox from "../../public/xenoxlogo.svg";

const xenox_token =     {
  "address": "Xen-frfrfrfrfrfrfrfrfrfrfr",
  "created_at": 1714129018893,
  "daily_volume": 2544417402.3655943871,
  "decimals": 9,
  // "extensions": {
  //     "coingeckoId": "wrapped-solana"
  // },
  "freeze_authority": null,
  "logoURI": xenox,
  "mint_authority": null,
  "minted_at": null,
  "name": "Xenox",
  "permanent_delegate": null,
  "symbol": "XEN",
  "tags": [
    "coming soon"
  ]
};

const TokenContext = createContext({
  tokens: [],
  loading: true,
});

export function TokenProvider({ children }) {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTokens() {
      try {
        setLoading(true);
        const data = require("../../solana_data_sorted.json");
        data.unshift(xenox_token);
        setTokens(data);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTokens();
  }, []);

  return (
    <TokenContext.Provider value={{ tokens, loading }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  return useContext(TokenContext);
}
