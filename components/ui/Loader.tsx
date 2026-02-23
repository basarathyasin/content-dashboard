"use client";

import React from "react";

interface LoaderProps {
  variant?: "spinner" | "skeleton";
  count?: number; // used for skeleton
  message?: string;
}

export default function Loader({
  variant = "spinner",
  count = 6,
  message = "Loading...",
}: LoaderProps) {
  if (variant === "skeleton") {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[250px] space-y-4">
      <div className="relative w-12 h-12">
        <svg
          className="animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="text-gray-300 dark:text-gray-700"
          />
          <path
            d="M22 12a10 10 0 0 1-10 10"
            stroke="currentColor"
            strokeWidth="4"
            className="text-blue-500"
          />
        </svg>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {message}
      </p>
    </div>
  );
}