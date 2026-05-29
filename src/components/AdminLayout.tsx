import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { useTheme } from "@/store/hooks";
import { setToken } from "@/services/api";

export function AdminLayout() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const router = useRouter();

  function logout() {
    setToken(null);
    void router.navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              {t("appTitle")}
            </Link>
            <nav className="flex gap-4 text-sm font-medium">
              <Link
                to="/"
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 [&.active]:text-indigo-600 dark:[&.active]:text-indigo-400"
                activeOptions={{ exact: true }}
              >
                {t("quizzes")}
              </Link>
              <Link
                to="/users"
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 [&.active]:text-indigo-600 dark:[&.active]:text-indigo-400"
              >
                {t("users")}
              </Link>
            </nav>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
              <Select
                className="px-2"
                value={i18n.language.startsWith("vi") ? "vi" : "en"}
                onChange={(e) => void i18n.changeLanguage(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="vi">VI</option>
              </Select>
            </label>
            <Button variant="outline" onClick={toggle}>
              {theme === "dark" ? t("lightMode") : t("darkMode")}
            </Button>
            <Button variant="dark" onClick={logout}>
              {t("logout")}
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
