import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "@/app/slices/favoritesSlice";
import uiReducer from "@/app/slices/uiSlice";
import preferencesReducer from "@/app/slices/preferencesSlice";

import ContentCard from "../content/ContentCard";
import type { ContentItem } from "@/app/types/content";

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      ui: uiReducer,
      preferences: preferencesReducer,
    },
  });

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

describe("ContentCard", () => {
  const mockItem: ContentItem = {
    id: "1",
    title: "AI News",
    description: "AI is changing the world",
    image: "",
    link: "https://example.com",
    type: "news",
  };

  it("renders title and description", () => {
    renderWithStore(<ContentCard item={mockItem} />);

    expect(screen.getByText("AI News")).toBeInTheDocument();
    expect(
      screen.getByText("AI is changing the world")
    ).toBeInTheDocument();
  });

  it("adds item to favorites when clicked", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(
      <ContentCard item={mockItem} />
    );

    const button = screen.getByRole("button");

    await user.click(button);

    const state = store.getState();
    expect(state.favorites.items.length).toBe(1);
  });

  it("toggles aria-label based on favorite state", async () => {
    const user = userEvent.setup();
    renderWithStore(<ContentCard item={mockItem} />);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute(
      "aria-label",
      "Add to favorites"
    );

    await user.click(button);

    expect(button).toHaveAttribute(
      "aria-label",
      "Remove from favorites"
    );
  });
});