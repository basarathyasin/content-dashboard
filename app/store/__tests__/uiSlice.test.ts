import reducer, {
  toggleDarkMode,
  setSearchQuery,
} from "@/app/slices/uiSlice";

describe("uiSlice", () => {
  it("should toggle dark mode", () => {
    const state = reducer(undefined, toggleDarkMode());
    expect(state.darkMode).toBe(true);
  });

  it("should set search query", () => {
    const state = reducer(undefined, setSearchQuery("AI"));
    expect(state.searchQuery).toBe("AI");
  });
});