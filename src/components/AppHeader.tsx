import { Link, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { setToken } from "@/services/api";

type AppHeaderProps = {
  authenticated?: boolean;
};

export function AppHeader({ authenticated = false }: AppHeaderProps) {
  const { t } = useTranslation();
  const router = useRouter();

  function logout() {
    setToken(null);
    void router.navigate({ to: "/login" });
  }

  return (
    <header className="shrink-0 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex h-14 items-center justify-end gap-2 px-4">
        <LanguageSwitch accent="indigo" />
        <ThemeToggleButton />

        {authenticated ? (
          <Button variant="dark" className="h-9" onClick={logout}>
            {t("logout")}
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="primary" className="h-9">
              {t("login")}
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
