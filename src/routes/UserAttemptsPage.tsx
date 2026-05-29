import { Link, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { QuizListSkeleton } from "@/components/skeletons/QuizListSkeleton";
import { useUserAttempts } from "@/hooks/useUserAttempts";
import { CARD_GRID_CLASS } from "@/constants/grid";
import type { AttemptAnswerDetail, AttemptSummary } from "@/types/user.types";
import { isAttemptReviewable } from "@/utils/isAttemptReviewable";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function quizTitle(quizId: AttemptSummary["quizId"]) {
  return typeof quizId === "object" && quizId?.title ? quizId.title : "—";
}

function formatLabels(labels: string[] | undefined, fallback: string) {
  if (labels?.length) return labels.join(", ");
  return fallback;
}

function AttemptAnswers({ answers }: { answers: AttemptAnswerDetail[] }) {
  const { t } = useTranslation();

  if (!answers.length) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">{t("noAnswerDetails")}</p>;
  }

  return (
    <ol className="space-y-3">
      {answers.map((answer, index) => (
        <li
          key={String(answer.questionId)}
          className={`rounded-lg border p-3 text-sm ${
            answer.isCorrect
              ? "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/40"
              : "border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/40"
          }`}
        >
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <span className="font-medium text-slate-800 dark:text-slate-100">
              {index + 1}. {answer.question ?? t("unknownQuestion")}
            </span>
            <span
              className={`shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${
                answer.isCorrect
                  ? "bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100"
                  : "bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-100"
              }`}
            >
              {answer.isCorrect ? t("correct") : t("incorrect")}
            </span>
          </div>
          <p className="text-slate-700 dark:text-slate-300">
            <span className="font-medium">{t("userAnswer")}: </span>
            {formatLabels(answer.selectedLabels, t("noAnswer"))}
          </p>
          {!answer.isCorrect && (
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              <span className="font-medium">{t("correctAnswer")}: </span>
              {formatLabels(answer.correctLabels, "—")}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

type AttemptCardProps = {
  attempt: AttemptSummary;
  onView: () => void;
};

function AttemptCard({ attempt, onView }: AttemptCardProps) {
  const { t } = useTranslation();
  const answers = attempt.answers ?? [];

  return (
    <li className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium">{quizTitle(attempt.quizId)}</span>
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {t("score")}: {attempt.score}%
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{formatDate(attempt.createdAt)}</p>
      <Button className="mt-4 w-full" variant="outline" onClick={onView}>
        {t("viewAttemptDetails")} ({answers.length})
      </Button>
    </li>
  );
}

export function UserAttemptsPage() {
  const router = useRouter();
  const match = router.state.matches[router.state.matches.length - 1];
  const params = match?.params as { userId?: string } | undefined;
  const userId = params?.userId;

  const { t } = useTranslation();
  const { data, isLoading } = useUserAttempts(userId);
  const [selectedAttempt, setSelectedAttempt] = useState<AttemptSummary | null>(null);

  const reviewableAttempts = useMemo(
    () => (data?.attempts ?? []).filter(isAttemptReviewable),
    [data?.attempts]
  );

  return (
    <div className="w-full">
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

          <h2 className="mb-4 text-lg font-semibold">
            {t("attemptHistory")} ({reviewableAttempts.length})
          </h2>
          {!reviewableAttempts.length ? (
            <p className="text-slate-600 dark:text-slate-400">
              {data.attempts.length ? t("noReviewableAttempts") : t("noAttempts")}
            </p>
          ) : (
            <ul className={CARD_GRID_CLASS}>
              {reviewableAttempts.map((attempt) => (
                <AttemptCard key={attempt._id} attempt={attempt} onView={() => setSelectedAttempt(attempt)} />
              ))}
            </ul>
          )}

          <Drawer
            open={selectedAttempt != null}
            onClose={() => setSelectedAttempt(null)}
            title={selectedAttempt ? quizTitle(selectedAttempt.quizId) : ""}
          >
            {selectedAttempt && (
              <div className="space-y-4">
                <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
                  <p className="text-lg font-semibold">
                    {t("score")}: {selectedAttempt.score}%
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {formatDate(selectedAttempt.createdAt)}
                  </p>
                </div>
                <section>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {t("answerReview")}
                  </h3>
                  <AttemptAnswers answers={selectedAttempt.answers ?? []} />
                </section>
              </div>
            )}
          </Drawer>
        </>
      )}
    </div>
  );
}
