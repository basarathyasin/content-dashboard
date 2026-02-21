"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { PreferencesState } from "@/app/slices/preferencesSlice";
import {
  toggleNews,
  toggleMovies,
  toggleSocial,
} from "@/app/slices/preferencesSlice";

export default function PreferencesHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("preferences");

    if (stored) {
      const parsed: PreferencesState = JSON.parse(stored);

      // Sync state manually
      if (!parsed.showNews) dispatch(toggleNews());
      if (!parsed.showMovies) dispatch(toggleMovies());
      if (!parsed.showSocial) dispatch(toggleSocial());
    }
  }, [dispatch]);

  return null;
}