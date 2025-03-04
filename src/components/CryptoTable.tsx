import React, { useState, useEffect } from "react";

export default function CryptoTable({ cryptocurrencies, theme = "dark" }) {
  const [sortConfig, setSortConfig] = useState({
    key: "market_cap_rank",
    direction: "asc",
  });
  const [expandedRow, setExpandedRow] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [visibleCryptos, setVisibleCryptos] = useState([]);

  // Maximum total rows to display (including expanded details)
  const MAX_ROWS = 5;

  useEffect(() => {
    // Sort cryptocurrencies
    const sortedCryptos = [...cryptocurrencies].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    // If we have an expanded row, we need to account for the extra row it takes
    if (expandedRow) {
      // Find if the expanded row is part of our sorted data
      const expandedIndex = sortedCryptos.findIndex(
        (c) => c.id === expandedRow
      );
      if (expandedIndex !== -1) {
        // If expanded row is within our visible range, adjust the crypto list
        // We need MAX_ROWS - 1 to account for the expanded detail row
        setVisibleCryptos(sortedCryptos.slice(0, MAX_ROWS - 1));
      } else {
        // If expanded row isn't in our data, just show MAX_ROWS
        setVisibleCryptos(sortedCryptos.slice(0, MAX_ROWS));
      }
    } else {
      // No expanded row, so we can show MAX_ROWS
      setVisibleCryptos(sortedCryptos.slice(0, MAX_ROWS));
    }
  }, [cryptocurrencies, sortConfig, expandedRow]);

  if (cryptocurrencies.length === 0) {
    return (
      <div
        className={`text-center p-8 ${
          theme === "dark"
            ? "bg-gray-800 text-gray-300"
            : "bg-gray-100 text-gray-700"
        } rounded-lg`}
      >
        <p>No cryptocurrencies found. Try a different search term.</p>
      </div>
    );
  }

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sorting indicator
  const getSortDirection = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Theme based classes
  const tableBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const headerBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const rowBg = theme === "dark" ? "bg-gray-800" : "bg-gray-50";
  const rowHoverBg =
    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const expandedRowBg = theme === "dark" ? "bg-gray-700" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const detailsBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const divideColor = theme === "dark" ? "divide-gray-700" : "divide-gray-200";

  return (
    <div className={`${tableBg} rounded-lg shadow overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y ${divideColor}`}>
          <thead className={headerBg}>
            <tr>
              <th className="px-4 py-3 w-12"></th>
              <th
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium ${textColor} uppercase tracking-wider cursor-pointer`}
                onClick={() => requestSort("market_cap_rank")}
              >
                <div className="flex items-center">
                  <span>Rank</span>
                  <span className="ml-1">
                    {getSortDirection("market_cap_rank")}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium ${textColor} uppercase tracking-wider cursor-pointer`}
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  <span>Coin</span>
                  <span className="ml-1">{getSortDirection("name")}</span>
                </div>
              </th>
              <th
                scope="col"
                className={`px-4 py-3 text-right text-xs font-medium ${textColor} uppercase tracking-wider cursor-pointer`}
                onClick={() => requestSort("current_price")}
              >
                <div className="flex items-center justify-end">
                  <span>Price</span>
                  <span className="ml-1">
                    {getSortDirection("current_price")}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className={`px-4 py-3 text-right text-xs font-medium ${textColor} uppercase tracking-wider cursor-pointer`}
                onClick={() => requestSort("price_change_percentage_24h")}
              >
                <div className="flex items-center justify-end">
                  <span>24h Change</span>
                  <span className="ml-1">
                    {getSortDirection("price_change_percentage_24h")}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className={`px-4 py-3 text-right text-xs font-medium ${textColor} uppercase tracking-wider cursor-pointer`}
                onClick={() => requestSort("market_cap")}
              >
                <div className="flex items-center justify-end">
                  <span>Market Cap</span>
                  <span className="ml-1">{getSortDirection("market_cap")}</span>
                </div>
              </th>
              <th
                scope="col"
                className={`px-4 py-3 text-right text-xs font-medium ${textColor} uppercase tracking-wider`}
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${divideColor} ${rowBg}`}>
            {visibleCryptos.map((crypto) => (
              <React.Fragment key={crypto.id}>
                <tr
                  className={`${rowHoverBg} ${
                    favorites.includes(crypto.id)
                      ? theme === "dark"
                        ? "bg-blue-900"
                        : "bg-blue-100"
                      : ""
                  }`}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFavorite(crypto.id)}
                      className={`p-1 rounded-full transition-colors ${
                        favorites.includes(crypto.id)
                          ? "text-yellow-400 hover:text-yellow-300"
                          : `${textSecondary} hover:${textColor}`
                      }`}
                    >
                      {favorites.includes(crypto.id) ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      #{crypto.market_cap_rank}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 relative flex-shrink-0">
                        <img
                          src={crypto.image}
                          alt={crypto.name}
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${textPrimary}`}>
                          {crypto.name}
                        </div>
                        <div className={`text-sm ${textSecondary}`}>
                          {crypto.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end">
                      <span className={textSecondary + " mr-1"}>$</span>
                      <span className={textPrimary}>
                        {crypto.current_price.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap text-right text-sm font-medium ${
                      crypto.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    <div className="flex items-center justify-end">
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1v-5a1 1 0 112 0v3.586l4.293-4.293a1 1 0 011.414 0L16 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0L13 10.414 9.414 14H12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span>
                        {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap text-right text-sm ${textPrimary}`}
                  >
                    <div className="flex items-center justify-end">
                      <span className={textSecondary + " mr-1"}>$</span>
                      <span>{crypto.market_cap.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleRowExpansion(crypto.id)}
                      className="text-indigo-400 hover:text-indigo-300 p-1 rounded-full hover:bg-indigo-900 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
                {expandedRow === crypto.id && (
                  <tr className={expandedRowBg}>
                    <td colSpan={7} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div
                          className={`${detailsBg} p-4 rounded-lg shadow-sm`}
                        >
                          <h3
                            className={`text-sm font-medium ${textColor} mb-2`}
                          >
                            Price Statistics
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                24h High:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                ${crypto.high_24h?.toLocaleString() || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                24h Low:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                ${crypto.low_24h?.toLocaleString() || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                Price Change (24h):
                              </span>
                              <span
                                className={`text-xs font-medium ${
                                  (crypto.price_change_24h || 0) >= 0
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                              >
                                $
                                {Math.abs(
                                  crypto.price_change_24h || 0
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                ATH:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                ${crypto.ath?.toLocaleString() || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${detailsBg} p-4 rounded-lg shadow-sm`}
                        >
                          <h3
                            className={`text-sm font-medium ${textColor} mb-2`}
                          >
                            Market Data
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                Market Cap Rank:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                #{crypto.market_cap_rank || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                Market Cap:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                ${crypto.market_cap?.toLocaleString() || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                Total Volume:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                $
                                {crypto.total_volume?.toLocaleString() || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                Circulating Supply:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                {crypto.circulating_supply?.toLocaleString() ||
                                  "N/A"}{" "}
                                {crypto.symbol?.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${detailsBg} p-4 rounded-lg shadow-sm md:col-span-2 lg:col-span-1`}
                        >
                          <h3
                            className={`text-sm font-medium ${textColor} mb-2`}
                          >
                            Additional Info
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                Total Supply:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                {crypto.total_supply
                                  ? crypto.total_supply.toLocaleString()
                                  : "Unlimited"}{" "}
                                {crypto.symbol?.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                Max Supply:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                {crypto.max_supply
                                  ? crypto.max_supply.toLocaleString()
                                  : "Unlimited"}{" "}
                                {crypto.symbol?.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={`text-xs ${textSecondary}`}>
                                Fully Diluted Valuation:
                              </span>
                              <span
                                className={`text-xs font-medium ${textPrimary}`}
                              >
                                $
                                {crypto.fully_diluted_valuation?.toLocaleString() ||
                                  "N/A"}
                              </span>
                            </div>
                            <button
                              className={`mt-2 w-full text-xs ${
                                theme === "dark"
                                  ? "bg-indigo-900 hover:bg-indigo-800 text-indigo-200"
                                  : "bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                              } font-medium py-1 px-2 rounded transition-colors`}
                              onClick={() =>
                                window.open(
                                  `https://www.coingecko.com/en/coins/${crypto.id}`,
                                  "_blank"
                                )
                              }
                            >
                              View on CoinGecko
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
