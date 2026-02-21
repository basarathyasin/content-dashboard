import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  categories: string[];
}

const initialState: PreferencesState = {
  categories: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = preferencesSlice.actions;
export default preferencesSlice.reducer;