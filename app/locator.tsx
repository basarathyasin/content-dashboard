// app/Locator.tsx
"use client";

import { useEffect } from "react";
import setupLocatorUI from "@locator/runtime";

export default function LocatorJs() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setupLocatorUI();
    }
  }, []);

  return null;
}