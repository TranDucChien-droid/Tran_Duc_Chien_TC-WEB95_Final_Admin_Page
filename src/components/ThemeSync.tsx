import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

const STORAGE_KEY = "quiz_admin_theme";

export function ThemeSync() {
  const theme = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return null;
}
