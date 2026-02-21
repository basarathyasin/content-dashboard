import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  darkMode: boolean;
  searchQuery: string;
}

const initialState: UIState = {
  darkMode: false,
  searchQuery: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleDarkMode, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;