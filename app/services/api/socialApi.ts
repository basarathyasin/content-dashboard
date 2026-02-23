import { baseApi } from "./baseApi";
import type { SocialResponse } from "@/app/types/social";

export const socialApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSocialPosts: builder.query<SocialResponse, void>({
      async queryFn() {
        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        );

        return {
          data: {
            posts: [
              {
                id: "social-1",
                image:"https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg",
                username: "john_doe",
                content:
                  "Hey There, Let have Some Fun 🔥",
              },
              {
                id: "social-2",
                image:"https://images.pexels.com/photos/576922/pexels-photo-576922.jpeg",
                username: "tech_girl",
                content:
                  "Did you about latest Flagship phones 2026 ?",
              },
            ],
          },
        };
      },
    }),
  }),
});

export const { useGetSocialPostsQuery } = socialApi;