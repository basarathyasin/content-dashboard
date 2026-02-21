import { createSlice } from "@reduxjs/toolkit";
import { ContentItem } from "../types/content";

interface ContentState {
  items: ContentItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ContentState = {
  items: [],
  status: "idle",
  error: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
});

export default contentSlice.reducer;