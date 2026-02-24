import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "@/app/slices/uiSlice";
import favoritesReducer from "@/app/slices/favoritesSlice";
import preferencesReducer from "@/app/slices/preferencesSlice";

import TrendingSection from "../content/TrendingSection";



type RootState = {
  ui: ReturnType<typeof uiReducer>;
  favorites: ReturnType<typeof favoritesReducer>;
  preferences: ReturnType<typeof preferencesReducer>;
};



let newsMock: any = { data: undefined, isLoading: false };
let movieMock: any = { data: undefined, isLoading: false };
let socialMock: any = { data: undefined, isLoading: false };

jest.mock("@/app/services/api/newsApi", () => ({
  useGetTopHeadlinesQuery: () => newsMock,
}));

jest.mock("@/app/services/api/movieApi", () => ({
  useGetTrendingMoviesQuery: () => movieMock,
}));

jest.mock("@/app/services/api/socialApi", () => ({
  useGetSocialPostsQuery: () => socialMock,
}));


//    Dynamic Normalization Mocks 


let normalizedNewsMock: any[] = [];
let normalizedMoviesMock: any[] = [];
let normalizedSocialMock: any[] = [];

jest.mock("@/app/utils/normalizeContent", () => ({
  normalizeNews: () => normalizedNewsMock,
}));

jest.mock("@/app/utils/normalizeMovies", () => ({
  normalizeMovies: () => normalizedMoviesMock,
}));

jest.mock("@/app/utils/normalizeSocial", () => ({
  normalizeSocial: () => normalizedSocialMock,
}));


//     Render Utility


function renderWithStore(
  ui: React.ReactElement,
  preloadedState?: Partial<RootState>
) {
  const store = configureStore({
    reducer: {
      ui: uiReducer,
      favorites: favoritesReducer,
      preferences: preferencesReducer,
    },
    preloadedState: preloadedState as RootState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
}


// ? Test Suite


describe("TrendingSection", () => {
  beforeEach(() => {
    // Reset API mocks
    newsMock = { data: undefined, isLoading: false };
    movieMock = { data: undefined, isLoading: false };
    socialMock = { data: undefined, isLoading: false };

    // Reset normalization mocks
    normalizedNewsMock = [];
    normalizedMoviesMock = [];
    normalizedSocialMock = [];
  });

  it("shows loader while data is loading", () => {
    newsMock = { data: undefined, isLoading: true };
    movieMock = { data: undefined, isLoading: true };
    socialMock = { data: undefined, isLoading: true };

    renderWithStore(<TrendingSection />);

    expect(screen.getAllByTestId("skeleton")).toHaveLength(9);
  });

  it("shows empty state when no results match search query", () => {
    newsMock = { data: { articles: [] }, isLoading: false };
    movieMock = { data: { results: [] }, isLoading: false };
    socialMock = { data: { posts: [] }, isLoading: false };

    // Keep normalization returning empty arrays
    normalizedNewsMock = [];
    normalizedMoviesMock = [];
    normalizedSocialMock = [];

    renderWithStore(<TrendingSection />, {
      ui: { darkMode: false, searchQuery: "AI" },
      favorites: { items: [] },
      preferences: {
        showNews: true,
        showMovies: true,
        showSocial: true,
      },
    });

    expect(
      screen.getByText(/No trending results found/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/AI/i)).toBeInTheDocument();
  });

  it("renders trending items when API returns data", () => {
    newsMock = {
      data: { articles: [{}] }, // structure irrelevant
      isLoading: false,
    };

    normalizedNewsMock = [
      {
        id: "1",
        title: "AI News",
        description: "AI description",
        image: "",
        link: "https://example.com",
        type: "news",
      },
    ];

    renderWithStore(<TrendingSection />);

    expect(screen.getByText("AI News")).toBeInTheDocument();
  });
});