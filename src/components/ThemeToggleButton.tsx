import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { useTheme } from "@/store/hooks";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function ThemeToggleButton() {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      className="!p-2 h-9 w-9 shrink-0 p-0"
      onClick={toggle}
      aria-label={isDark ? t("lightMode") : t("darkMode")}
      title={isDark ? t("lightMode") : t("darkMode")}
    >
      {isDark ? <SunIcon className="h-10 w-10" /> : <MoonIcon className="h-10 w-10" />}
    </Button>
  );
}
