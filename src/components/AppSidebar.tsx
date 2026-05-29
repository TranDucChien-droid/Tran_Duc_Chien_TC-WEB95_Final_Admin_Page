import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const navLinkClass =
  "block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800";
const navLinkActiveClass =
  "block w-full rounded-lg px-3 py-2 text-left text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200";

export function AppSidebar() {
  const { t } = useTranslation();
  const { data: user, isLoading } = useCurrentUser();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="border-slate-200 px-4 py-4 dark:border-slate-800">
        <Link to="/" className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          {t("appTitle")}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        <Link to="/" activeOptions={{ exact: true }} className={navLinkClass} activeProps={{ className: navLinkActiveClass }}>
          {t("quizzes")}
        </Link>
        <Link to="/users" className={navLinkClass} activeProps={{ className: navLinkActiveClass }}>
          {t("users")}
        </Link>
      </nav>

      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{t("signedInAs")}</p>
        <p className="mt-1 break-all text-sm font-medium text-slate-800 dark:text-slate-100">
          {isLoading ? "…" : user?.email ?? "—"}
        </p>
      </div>
    </aside>
  );
}
