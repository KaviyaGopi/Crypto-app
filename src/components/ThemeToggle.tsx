import { useState, useEffect } from "react";

interface CryptoTrackerProps {
  theme: string;
}

const CryptoTracker = ({ theme }: CryptoTrackerProps) => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoPrices();
  }, []);
};

export default CryptoTracker;
