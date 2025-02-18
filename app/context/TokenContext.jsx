// TokenContext.jsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { downloadImage } from "../utils/downLoadImage";

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
        const response = await fetch("https://api.jup.ag/tokens/v1/new");
        const data = await response.json();
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
