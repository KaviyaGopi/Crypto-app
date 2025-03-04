// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import CryptoTracker from "@/components/CryptoTracker";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [theme, setTheme] = useState("dark");

  // Initialize theme from localStorage or system preference on component mount
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (systemPrefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <main
      className={`min-h-screen p-4 transition-colors duration-200 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <CryptoTracker theme={theme} />
      </div>
    </main>
  );
}
