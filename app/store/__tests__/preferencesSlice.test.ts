import reducer, {
  toggleNews,
  toggleMovies,
  toggleSocial,
} from "@/app/slices/preferencesSlice";

describe("preferencesSlice", () => {
  it("should toggle news", () => {
    const state = reducer(undefined, toggleNews());
    expect(state.showNews).toBe(false);
  });

  it("should toggle movies", () => {
    const state = reducer(undefined, toggleMovies());
    expect(state.showMovies).toBe(false);
  });

  it("should toggle social", () => {
    const state = reducer(undefined, toggleSocial());
    expect(state.showSocial).toBe(false);
  });
});