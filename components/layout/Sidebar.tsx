"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Feed", path: "/feed" },
  { name: "Trending", path: "/trending" },
  { name: "Favorites", path: "/favorites" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6" >
      <h2 className="text-xl font-bold mb-8 text-gray-800 dark:text-white">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}