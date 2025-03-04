// src/components/CryptoTracker.tsx
"use client";

import { useState, useEffect } from "react";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const CryptoTracker = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 dark:text-white text-gray-800">
        Crypto Tracker
      </h1>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 dark:border-white border-gray-800"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="dark:bg-gray-800 bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left dark:text-gray-300 text-gray-700">
                  #
                </th>
                <th className="px-4 py-2 text-left dark:text-gray-300 text-gray-700">
                  Coin
                </th>
                <th className="px-4 py-2 text-right dark:text-gray-300 text-gray-700">
                  Price
                </th>
                <th className="px-4 py-2 text-right dark:text-gray-300 text-gray-700">
                  24h Change
                </th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto, index) => (
                <tr
                  key={crypto.id}
                  className={`
                    border-b dark:border-gray-700 border-gray-200 
                    ${
                      index % 2 === 0
                        ? "dark:bg-gray-800/50 bg-gray-100/50"
                        : ""
                    }
                    hover:dark:bg-gray-700 hover:bg-gray-200 transition-colors duration-150
                  `}
                >
                  <td className="px-4 py-3 dark:text-gray-300 text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-6 h-6 mr-2"
                      />
                      <div>
                        <div className="font-medium dark:text-white text-gray-800">
                          {crypto.name}
                        </div>
                        <div className="text-sm dark:text-gray-400 text-gray-500">
                          {crypto.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right dark:text-white text-gray-800">
                    ${crypto.current_price.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-3 text-right ${
                      crypto.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CryptoTracker;
