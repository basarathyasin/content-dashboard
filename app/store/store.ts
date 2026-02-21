import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "@/app/slices/preferencesSlice"
import contentReducer from "@/app/slices/contentSlice";
import favoritesReducer from "@/app/slices/favoritesSlice";
import uiReducer from "@/app/slices/uiSlice";



export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    content: contentReducer,
    favorites: favoritesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;