import { createSlice,} from "@reduxjs/toolkit";

export interface PreferencesState {
  showNews: boolean;
  showMovies: boolean;
  showSocial: boolean;
}

const initialState: PreferencesState = {
  showNews: true,
  showMovies: true,
  showSocial: true,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleNews(state) {
      state.showNews = !state.showNews;
    },
    toggleMovies(state) {
      state.showMovies = !state.showMovies;
    },
    toggleSocial(state) {
      state.showSocial = !state.showSocial;
    },
  },
});

export const {
  toggleNews,
  toggleMovies,
  toggleSocial,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;