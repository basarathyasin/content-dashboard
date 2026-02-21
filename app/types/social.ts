export interface SocialPost {
  id: string;
  username: string;
  content: string;
  image?: string;
}

export interface SocialResponse {
  posts: SocialPost[];
}