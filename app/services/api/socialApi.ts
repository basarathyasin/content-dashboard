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
                username: "john_doe",
                content:
                  "Loving the new AI-powered dashboards 🔥",
              },
              {
                id: "social-2",
                username: "tech_girl",
                content:
                  "Next.js + RTK Query is such a powerful combo!",
              },
            ],
          },
        };
      },
    }),
  }),
});

export const { useGetSocialPostsQuery } = socialApi;