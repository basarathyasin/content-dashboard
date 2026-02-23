import type { SocialPost } from "@/app/types/social";
import type { ContentItem } from "@/app/types/content";

export function normalizeSocial(
  posts: SocialPost[]
): ContentItem[] {
  return posts.map((post) => ({
    id: post.id,
    type: "social",
    title: `@${post.username}`,
    description: post.content,
    image: post.image,
    link: "#",
  }));
}