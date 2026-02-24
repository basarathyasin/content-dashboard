"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { toggleDarkMode, setSearchQuery } from "@/app/slices/uiSlice";
import { useState, useRef, useEffect } from "react";

const SunIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
	</svg>
);

const MoonIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>
);

const SearchIcon = () => (
	<svg
		width="15"
		height="15"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.35-4.35" />
	</svg>
);

const BellIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
		<path d="M13.73 21a2 2 0 0 1-3.46 0" />
	</svg>
);

const SettingsIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
);

const settingsOptions = [
	{ id: "notifications", label: "Notifications", defaultOn: true },
	{ id: "autoplay", label: "Autoplay videos", defaultOn: false },
	{ id: "compactView", label: "Compact view", defaultOn: false },
	{ id: "animations", label: "Animations", defaultOn: true },
];

export default function Header() {
	const dispatch = useAppDispatch();
	const { darkMode, searchQuery } = useAppSelector((state) => state.ui);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [localSettings, setLocalSettings] = useState<Record<string, boolean>>(
		() => Object.fromEntries(settingsOptions.map((o) => [o.id, o.defaultOn])),
	);
	const [notifOpen, setNotifOpen] = useState(false);
	const settingsRef = useRef<HTMLDivElement>(null);
	const notifRef = useRef<HTMLDivElement>(null);

	const handleToggleDarkMode = () => dispatch(toggleDarkMode());
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		dispatch(setSearchQuery(e.target.value));

	// Close dropdowns on outside click
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				settingsRef.current &&
				!settingsRef.current.contains(e.target as Node)
			)
				setSettingsOpen(false);
			if (notifRef.current && !notifRef.current.contains(e.target as Node))
				setNotifOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const notifications = [
		{ id: 1, text: "3 new trending articles", time: "2m ago", unread: true },
		{
			id: 2,
			text: "Your favorites list was updated",
			time: "1h ago",
			unread: true,
		},
		{ id: 3, text: "Weekly digest is ready", time: "Yesterday", unread: false },
	];

	const unreadCount = notifications.filter((n) => n.unread).length;

	return (
		<header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors">
			{/* Search */}
			<div className="relative w-80 group">
				<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors pointer-events-none">
					<SearchIcon />
				</span>
				<input
					data-testid="search-input"
					type="text"
					placeholder="Search content..."
					value={searchQuery}
					onChange={handleSearchChange}
					className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-500 transition-all"
				/>
				{searchQuery && (
					<button
						onClick={() => dispatch(setSearchQuery(""))}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-xs font-medium"
					>
						✕
					</button>
				)}
			</div>

			{/* Right controls */}
			<div className="flex items-center gap-2">
				{/* Dark mode toggle */}
				<button
					onClick={handleToggleDarkMode}
					title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
					className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all"
				>
					{darkMode ? <SunIcon /> : <MoonIcon />}
				</button>

				{/* Notifications */}
				<div className="relative" ref={notifRef}>
					<button
						onClick={() => {
							setNotifOpen((p) => !p);
							setSettingsOpen(false);
						}}
						className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all relative"
					>
						<BellIcon />
						{unreadCount > 0 && (
							<span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-gray-950" />
						)}
					</button>

					{notifOpen && (
						<div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 z-50 overflow-hidden">
							<div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
								<span className="text-sm font-semibold text-gray-900 dark:text-white">
									Notifications
								</span>
								<span className="text-xs text-blue-500 font-medium cursor-pointer hover:underline">
									Mark all read
								</span>
							</div>
							<div className="divide-y divide-gray-100 dark:divide-gray-800">
								{notifications.map((n) => (
									<div
										key={n.id}
										className={`px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${n.unread ? "" : "opacity-60"}`}
									>
										{n.unread && (
											<span className="mt-1.5 w-2 h-2 shrink-0 rounded-full bg-blue-500" />
										)}
										{!n.unread && <span className="mt-1.5 w-2 h-2 shrink-0" />}
										<div>
											<p className="text-sm text-gray-800 dark:text-gray-200">
												{n.text}
											</p>
											<p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Settings */}
				<div className="relative" ref={settingsRef}>
					<button
						onClick={() => {
							setSettingsOpen((p) => !p);
							setNotifOpen(false);
						}}
						className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${settingsOpen ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"}`}
					>
						<SettingsIcon />
					</button>

					{settingsOpen && (
						<div className="absolute right-0 top-full mt-2 w-60 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 z-50 overflow-hidden">
							<div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
								<span className="text-sm font-semibold text-gray-900 dark:text-white">
									Settings
								</span>
							</div>
							<div className="p-2">
								{settingsOptions.map((opt) => (
									<button
										key={opt.id}
										onClick={() =>
											setLocalSettings((prev) => ({
												...prev,
												[opt.id]: !prev[opt.id],
											}))
										}
										className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors group"
									>
										<span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
											{opt.label}
										</span>
										<div
											className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${localSettings[opt.id] ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
										>
											<div
												className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200 ${localSettings[opt.id] ? "translate-x-4" : "translate-x-0.5"}`}
											/>
										</div>
									</button>
								))}
							</div>

							<div className="px-2 pb-2">
								<div className="h-px bg-gray-100 dark:bg-gray-800 mb-2" />
								<button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
										<polyline points="16 17 21 12 16 7" />
										<line x1="21" y1="12" x2="9" y2="12" />
									</svg>
									<span className="text-sm">Sign out</span>
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Divider */}
				<div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1" />

				{/* Avatar */}
				<button className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
					<div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
						J
					</div>
					<div className="text-left">
						<p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
							John
						</p>
						<p className="text-[10px] text-gray-400 leading-tight">Pro</p>
					</div>
				</button>
			</div>
		</header>
	);
}
