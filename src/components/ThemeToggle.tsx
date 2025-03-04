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

  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-colors duration-200 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Crypto Price Tracker</h2>
      <ul>
        {cryptoData.length > 0 ? (
          cryptoData.map((crypto) => (
            <li
              key={crypto.id}
              className="flex justify-between py-2 border-b border-gray-300 dark:border-gray-600"
            >
              <span>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </span>
              <span>${crypto.current_price.toLocaleString()}</span>
            </li>
          ))
        ) : (
          <p>Loading prices...</p>
        )}
      </ul>
    </div>
  );
};

export default CryptoTracker;
