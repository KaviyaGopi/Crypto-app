"use client";

import { useState, useEffect } from "react";
import { RotateCw } from "lucide-react"; // Importing an icon for the refresh button
import SearchBar from "./SearchBar";

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
  const [filteredData, setFilteredData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
      );
      const data = await response.json();
      setCryptoData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = cryptoData.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, cryptoData]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold dark:text-white text-gray-800">
          Crypto Tracker
        </h1>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          <RotateCw size={20} /> Refresh
        </button>
      </div>

      <SearchBar onSearch={setSearchTerm} />

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 dark:border-white border-gray-800"></div>
        </div>
      ) : (
        <div className="overflow-x-auto mt-4">
          {/* Increased max height to show one more row */}
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="dark:bg-gray-800 bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left dark:text-gray-300 text-gray-700">#</th>
                  <th className="px-4 py-2 text-left dark:text-gray-300 text-gray-700">Coin</th>
                  <th className="px-4 py-2 text-right dark:text-gray-300 text-gray-700">Price</th>
                  <th className="px-4 py-2 text-right dark:text-gray-300 text-gray-700">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((crypto, index) => (
                  <tr
                    key={crypto.id}
                    className={`border-b dark:border-gray-700 border-gray-200 ${
                      index % 2 === 0 ? "dark:bg-gray-800/50 bg-gray-100/50" : ""
                    } hover:dark:bg-gray-700 hover:bg-gray-200 transition-colors duration-150`}
                  >
                    <td className="px-4 py-3 dark:text-gray-300 text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                        <div>
                          <div className="font-medium dark:text-white text-gray-800">{crypto.name}</div>
                          <div className="text-sm dark:text-gray-400 text-gray-500">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right dark:text-white text-gray-800">
                      ${crypto.current_price.toLocaleString()}
                    </td>
                    <td className={`px-4 py-3 text-right ${
                        crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoTracker;
