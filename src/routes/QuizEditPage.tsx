import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuizDetail } from "@/hooks/useQuizDetail";
import { useRemoveQuestion } from "@/hooks/useRemoveQuestion";
import { useToggleQuizDisabled } from "@/hooks/useToggleQuizDisabled";
import { Button } from "@/components/Button";
import { QuizEditModal } from "@/components/QuizEditModal";
import { QuizDetailSkeleton } from "@/components/skeletons/QuizDetailSkeleton";

export function QuizEditPage() {
  const router = useRouter();
  const match = router.state.matches[router.state.matches.length - 1];
  const params = match?.params as { quizId?: string } | undefined;
  const quizId = params?.quizId;
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, error } = useQuizDetail(quizId);
  const removeQuestion = useRemoveQuestion(quizId);
  const toggleDisabled = useToggleQuizDisabled();
  const disabled = Boolean(data?.disabled);

  if (!quizId) return <p className="text-red-600">Invalid quiz</p>;
  if (isLoading) return <QuizDetailSkeleton variant="admin" />;
  if (error || !data) return <p className="text-red-600">Failed to load quiz</p>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
          ← {t("back")}
        </Link>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={disabled ? "primary" : "outline"}
            loading={toggleDisabled.isPending}
            onClick={() => toggleDisabled.mutate({ quizId, disabled: !disabled })}
          >
            {disabled ? t("enableQuiz") : t("disableQuiz")}
          </Button>
          <Button variant="outline" onClick={() => setModalOpen(true)}>
            {t("manageQuiz")}
          </Button>
        </div>
      </div>

      {disabled && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
          {t("quizDisabledNotice")}
        </p>
      )}

      <QuizEditModal quizId={quizId} open={modalOpen} onClose={() => setModalOpen(false)} />

      <section>
        <h2 className="mb-3 text-lg font-semibold">{t("questions")}</h2>
        <ul className="space-y-3">
          {data.questions?.map((q) => {
            const isDeleting =
              removeQuestion.isPending && removeQuestion.variables === q._id;
            return (
              <li key={q._id} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium">{q.question}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{q.type}</p>
                    <ol className="mt-2 list-decimal pl-5 text-sm text-slate-700 dark:text-slate-300">
                      {q.options.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ol>
                    <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
                      Correct: {(q.correctAnswers ?? []).map((i) => i + 1).join(", ")}
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    loading={isDeleting}
                    disabled={removeQuestion.isPending}
                    onClick={() => removeQuestion.mutate(q._id)}
                  >
                    {isDeleting ? t("deleting") : t("delete")}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
