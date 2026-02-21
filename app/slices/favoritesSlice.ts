import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentItem } from "@/app/types/content";

interface FavoritesState {
  items: ContentItem[];
}

//? Load From Local Storage

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<ContentItem>) {
      const exists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }

      //?? Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "favorites",
          JSON.stringify(state.items)
        );
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;