"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  toggleNews,
  toggleMovies,
  toggleSocial,
} from "@/app/slices/preferencesSlice";

const navItems = [
  { name: "Feed", path: "/feed" },
  { name: "Trending", path: "/trending" },
  { name: "Favorites", path: "/favorites" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const preferences = useAppSelector(
    (state) => state.preferences
  );

  return (
    <aside className="h-full p-6 space-y-8 bg-gray-100 dark:bg-gray-900 transition-colors">
      
      {/* Navigation */}
      <nav className="space-y-2">
        <h2 className="font-bold text-lg">Navigation</h2>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-3 py-2 rounded transition-colors ${
              pathname === item.path
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Preferences */}
      <div className="space-y-3">
        <h2 className="font-bold text-lg">Preferences</h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preferences.showNews}
            onChange={() => dispatch(toggleNews())}
          />
          News
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preferences.showMovies}
            onChange={() => dispatch(toggleMovies())}
          />
          Movies
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preferences.showSocial}
            onChange={() => dispatch(toggleSocial())}
          />
          Social
        </label>
      </div>
    </aside>
  );
}