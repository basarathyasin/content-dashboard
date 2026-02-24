import reducer, { toggleFavorite} from "@/app/slices/favoritesSlice"
import { ContentItem } from "@/app/types/content";

describe("favoritesSlice", () => {
  const mockItem: ContentItem = {
    id: "1",
    title: "Test Item",
    description: "Test description",
    image: "image.jpg",
    type: "news",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      items: [],
    });
  });

  it("should add item when not already in favorites", () => {
    const state = reducer(undefined, toggleFavorite(mockItem));

    expect(state.items.length).toBe(1);
    expect(state.items[0]).toEqual(mockItem);
  });

  it("should remove item if already exists", () => {
    const stateWithItem = {
      items: [mockItem],
    };

    const newState = reducer(
      stateWithItem,
      toggleFavorite(mockItem)
    );

    expect(newState.items.length).toBe(0);
  });

  it("should save favorites to localStorage", () => {
    reducer(undefined, toggleFavorite(mockItem));

    const stored = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    expect(stored.length).toBe(1);
  });
});