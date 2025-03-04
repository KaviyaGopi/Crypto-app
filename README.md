# 🚀 Next.js Crypto App

This project is built with [Next.js](https://nextjs.org), using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It fetches and displays cryptocurrency data from the CoinGecko API.

## 📂 Setup

1. **Clone the repository:**
git clone https://github.com/KaviyaGopi/Crypto-app.git
cd Crypto-app

2. **Install dependencies:**
npm install


3. **Run the development server:**
npm run dev


## ⚙️ API Integration

* **CoinGecko API:** The app fetches cryptocurrency data from the CoinGecko API, providing real-time market information (price, market cap, volume) for the top 50 cryptocurrencies.
* **Endpoint:**
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&x_cg_api_key=CG-Ujvs4SjR7J2FAHQu6b7LAPdf



## ⚛️ State Management

* **React Query:** Used for data fetching, caching, and background refetching.
* Simplifies server-side data management.
* Provides automatic caching, error handling, and background refetching.
* **React Con API:** Used for global state management (e.g., selected cryptocurrency, theme preferences).
* Avoids prop drilling.

## ⚠️ Challenges & Solutions

1. **Handling Large Amounts of Data:**
* **Challenge:** The API provides a lot of data, which could slow down the app.
* **Solution:** React Query caching and pagination (50 items per page).
2. **Managing State Across Components:**
* **Challenge:** Sharing the state between different components.
* **Solution:** React Query for server-side data, React Con API for global state.
3. **API Rate Limiting:**
* **Challenge:** CoinGecko API has rate limits.
* **Solution:** React Query caching reduces unnecessary requests; graceful error handling.
4. **Pagination:**
* **Challenge:** Handling pagination efficiently.
* **Solution:** Implemented pagination controls to fetch and display data in chunks (50 items per page) to improve performance.

## 📜 License

MIT License &copy; KaviyaGopi