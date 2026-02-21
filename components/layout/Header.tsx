"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { toggleDarkMode, setSearchQuery } from "@/app/slices/uiSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const { darkMode, searchQuery } = useAppSelector((state) => state.ui);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search content..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
      />

      {/* Dark Mode Toggle */}
      <button
        onClick={handleToggleDarkMode}
        className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black transition"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}