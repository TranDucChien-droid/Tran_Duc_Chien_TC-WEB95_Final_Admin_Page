import { Link, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { QuizListSkeleton } from "@/components/skeletons/QuizListSkeleton";
import { useUserAttempts } from "@/hooks/useUserAttempts";
import type { AttemptSummary } from "@/types/user.types";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function quizTitle(quizId: AttemptSummary["quizId"]) {
  return typeof quizId === "object" && quizId?.title ? quizId.title : "—";
}

export function UserAttemptsPage() {
  const router = useRouter();
  const match = router.state.matches[router.state.matches.length - 1];
  const params = match?.params as { userId?: string } | undefined;
  const userId = params?.userId;

  const { t } = useTranslation();
  const { data, isLoading } = useUserAttempts(userId);

  return (
    <div>
      <Link to="/users" className="mb-4 inline-block text-sm text-indigo-600 hover:underline dark:text-indigo-400">
        ← {t("backToUsers")}
      </Link>

      {isLoading ? (
        <QuizListSkeleton count={3} />
      ) : !data ? (
        <p className="text-slate-600 dark:text-slate-400">{t("userNotFound")}</p>
      ) : (
        <>
          <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-xl font-semibold">{data.user.email}</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t("role")}: {data.user.role === "admin" ? t("roleAdmin") : t("roleUser")} · {t("joined")}{" "}
              {formatDate(data.user.createdAt)}
            </p>
          </div>

          <h2 className="mb-4 text-lg font-semibold">{t("attemptHistory")}</h2>
          {!data.attempts.length ? (
            <p className="text-slate-600 dark:text-slate-400">{t("noAttempts")}</p>
          ) : (
            <ul className="space-y-3">
              {data.attempts.map((attempt) => (
                <li
                  key={attempt._id}
                  className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium">{quizTitle(attempt.quizId)}</span>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {t("score")}: {attempt.score}%
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {formatDate(attempt.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
