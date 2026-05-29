import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuizDetail } from "@/hooks/useQuizDetail";
import { useRemoveQuestion } from "@/hooks/useRemoveQuestion";
import { useRemoveQuestions } from "@/hooks/useRemoveQuestions";
import { useToggleQuizDisabled } from "@/hooks/useToggleQuizDisabled";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { QuizEditModal } from "@/components/QuizEditModal";
import { QuizDetailSkeleton } from "@/components/skeletons/QuizDetailSkeleton";
import type { Question } from "@/types/quiz.types";

export function QuizEditPage() {
  const router = useRouter();
  const match = router.state.matches[router.state.matches.length - 1];
  const params = match?.params as { quizId?: string } | undefined;
  const quizId = params?.quizId;
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data, isLoading, error } = useQuizDetail(quizId);
  const removeQuestion = useRemoveQuestion(quizId);
  const removeQuestions = useRemoveQuestions(quizId);
  const toggleDisabled = useToggleQuizDisabled();
  const disabled = Boolean(data?.disabled);

  const questions = data?.questions ?? [];
  const questionIds = useMemo(() => questions.map((q) => q._id), [questions]);
  const allSelected = questions.length > 0 && selectedIds.size === questions.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  useEffect(() => {
    setSelectedIds((prev) => {
      const next = new Set([...prev].filter((id) => questionIds.includes(id)));
      return next.size === prev.size && [...next].every((id) => prev.has(id)) ? prev : next;
    });
  }, [questionIds]);

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(questionIds));
    }
  }

  function confirmBulkDelete() {
    const ids = [...selectedIds];
    removeQuestions.mutate(ids, {
      onSuccess: () => {
        setSelectedIds(new Set());
        setDeleteModalOpen(false);
      },
    });
  }

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

      <Modal
        open={deleteModalOpen}
        onClose={() => !removeQuestions.isPending && setDeleteModalOpen(false)}
        title={t("deleteQuestionsTitle")}
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">{t("deleteQuestionsWarning", { count: selectedIds.size })}</p>
        <p className="mt-2 text-sm font-medium text-red-700 dark:text-red-400">{t("deleteQuestionsIrreversible")}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" disabled={removeQuestions.isPending} onClick={() => setDeleteModalOpen(false)}>
            {t("cancel")}
          </Button>
          <Button variant="danger" loading={removeQuestions.isPending} onClick={confirmBulkDelete}>
            {removeQuestions.isPending ? t("deleting") : t("deleteSelected")}
          </Button>
        </div>
      </Modal>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">{t("questions")}</h2>
          {questions.length > 0 && (
            <Button
              variant="danger"
              disabled={selectedIds.size === 0 || removeQuestions.isPending || removeQuestion.isPending}
              onClick={() => setDeleteModalOpen(true)}
            >
              {t("deleteSelectedCount", { count: selectedIds.size })}
            </Button>
          )}
        </div>

        {questions.length > 0 && (
          <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              onChange={toggleAll}
            />
            {t("selectAllQuestions")}
          </label>
        )}

        <ul className="space-y-3">
          {questions.map((q) => (
            <QuestionRow
              key={q._id}
              question={q}
              selected={selectedIds.has(q._id)}
              onToggleSelect={() => toggleOne(q._id)}
              isDeleting={removeQuestion.isPending && removeQuestion.variables === q._id}
              deleteDisabled={removeQuestion.isPending || removeQuestions.isPending}
              onDelete={() => removeQuestion.mutate(q._id)}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

type QuestionRowProps = {
  question: Question;
  selected: boolean;
  onToggleSelect: () => void;
  isDeleting: boolean;
  deleteDisabled: boolean;
  onDelete: () => void;
};

function QuestionRow({ question: q, selected, onToggleSelect, isDeleting, deleteDisabled, onDelete }: QuestionRowProps) {
  const { t } = useTranslation();

  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex gap-3">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          checked={selected}
          onChange={onToggleSelect}
          aria-label={t("selectQuestion")}
        />
        <div className="flex min-w-0 flex-1 justify-between gap-4">
          <div className="min-w-0">
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
          <Button variant="danger" loading={isDeleting} disabled={deleteDisabled} onClick={onDelete}>
            {isDeleting ? t("deleting") : t("delete")}
          </Button>
        </div>
      </div>
    </li>
  );
}
