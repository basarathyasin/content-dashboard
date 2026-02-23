"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { toggleFavorite } from "@/app/slices/favoritesSlice";
import type { ContentItem } from "@/app/types/content";
import Image from "next/image";

interface Props {
	item: ContentItem;
}

export default function ContentCard({ item }: Props) {
	const dispatch = useAppDispatch();
	const favorites = useAppSelector((state) => state.favorites.items);
	const isFavorite = favorites.some((fav) => fav.id === item.id);

	return (
		<>
			<article className="content-card">
				{/* Image */}
				{item.image ? (
					<div className="card-image">
						<Image
							src={item.image}
							alt={item.title}
							fill
							sizes="(max-width: 768px) 100vw, 400px"
							className="object-cover"
						/>
						<div className="card-image-overlay" />
					</div>
				) : (

          <div className="no-image-placeholder">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
						>
							<rect x="3" y="3" width="18" height="18" rx="2" />
							<circle cx="8.5" cy="8.5" r="1.5" />
							<path d="M21 15l-5-5L5 21" />
						</svg>
					</div>
					
				)}

				{/* Favorite Button */}
				<button
					onClick={() => dispatch(toggleFavorite(item))}
					className={`fav-btn ${isFavorite ? "active" : ""}`}
					aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
					title={isFavorite ? "Remove from favorites" : "Save to favorites"}
				>
					<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
					</svg>
				</button>

				{/* Body */}
				<div className="card-body">
					<h2 className="card-title">{item.title}</h2>
					<p className="card-desc">{item.description}</p>

					<div className="card-footer">
						<a
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							className="read-more-link"
						>
							Read more
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			</article>
		</>
	);
}
