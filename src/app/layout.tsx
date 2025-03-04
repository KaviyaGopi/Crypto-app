import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Tracker",
  description: "Track and analyze cryptocurrency prices in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100 min-h-screen`}
      >
        <header className="border-b border-gray-800 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <h1 className="text-xl font-bold text-white">CryptoTracker</h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    News
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-800 bg-gray-900 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} CryptoTracker. All prices from
              CoinGecko API.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
