import { Link, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AppHeader } from "@/components/AppHeader";

export function PublicLayout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <Link to="/login" className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          {t("appTitle")}
        </Link>
      </div>
      <AppHeader authenticated={false} />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
