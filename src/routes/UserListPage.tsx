import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { QuizListSkeleton } from "@/components/skeletons/QuizListSkeleton";
import { useUsers } from "@/hooks/useUsers";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function UserListPage() {
  const { t } = useTranslation();
  const { data, isLoading } = useUsers();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">{t("users")}</h1>
      {isLoading ? (
        <QuizListSkeleton withTrailing />
      ) : !data?.length ? (
        <p className="text-slate-600 dark:text-slate-400">{t("noUsers")}</p>
      ) : (
        <ul className="space-y-3">
          {data.map((user) => (
            <li key={user._id}>
              <Link
                to="/users/$userId"
                params={{ userId: user._id }}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
              >
                <div className="min-w-0">
                  <div className="font-medium">{user.email}</div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {t("role")}: {user.role === "admin" ? t("roleAdmin") : t("roleUser")} · {t("joined")}{" "}
                    {formatDate(user.createdAt)}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {t("attemptCount", { count: user.attemptCount })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
