"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
	toggleNews,
	toggleMovies,
	toggleSocial,
} from "@/app/slices/preferencesSlice";
import { useEffect } from "react";

const navItems = [
	{ name: "Feed", path: "/feed", icon: "▦" },
	{ name: "Trending", path: "/trending", icon: "↑" },
	{ name: "Favorites", path: "/favorites", icon: "♡" },
];

const preferenceItems = [
	{ label: "News", key: "showNews", toggle: toggleNews },
	{ label: "Movies", key: "showMovies", toggle: toggleMovies },
	{ label: "Social", key: "showSocial", toggle: toggleSocial },
] as const;

export default function Sidebar() {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const preferences = useAppSelector((state) => state.preferences);
	const isFeed = pathname === "/feed";

	useEffect(() => {
		localStorage.setItem("preferences", JSON.stringify(preferences));
	}, [preferences]);

	return (
		<aside className="w-64 min-h-screen p-5 flex flex-col gap-8 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
			{/* Brand */}
			<div className="pt-2 px-1">
				<span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
					my<span className="text-blue-500">feed</span>
				</span>
			</div>

			{/* Navigation */}
			<nav className="flex flex-col gap-1">
				<p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-3 mb-1">
					Menu
				</p>
				{navItems.map((item) => {
					const isActive = pathname === item.path;
					return (
						<Link
							key={item.path}
							href={item.path}
							className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
								${
									isActive
										? "bg-blue-500 text-white shadow-sm shadow-blue-200 dark:shadow-none"
										: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
								}`}
						>
							<span className="text-base leading-none">{item.icon}</span>
							{item.name}
							{isActive && (
								<span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />
							)}
						</Link>
					);
				})}
			</nav>

			{/* Preferences — only on /feed */}
			{isFeed && (
				<>
					<div className="h-px bg-gray-100 dark:bg-gray-800" />

					<div className="flex flex-col gap-3">
						<p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-3">
							Preferences
						</p>
						{preferenceItems.map(({ label, key, toggle }) => (
							<label
								key={key}
								className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
							>
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
									{label}
								</span>
								<div className="relative">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={preferences[key]}
										onChange={() => dispatch(toggle())}
									/>
									<div className="w-9 h-5 rounded-full bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-500 transition-colors duration-200" />
									<div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-4" />
								</div>
							</label>
						))}
					</div>
				</>
			)}
		</aside>
	);
}