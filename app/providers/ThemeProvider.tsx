"use client";

import { useAppSelector } from "../store/hooks";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkMode = useAppSelector((state) => state.ui.darkMode);

  return (
    <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
      {children}
    </div>
  );
}