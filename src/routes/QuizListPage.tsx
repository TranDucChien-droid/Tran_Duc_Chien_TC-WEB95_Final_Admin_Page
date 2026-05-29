import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { QuizListSkeleton } from "@/components/skeletons/QuizListSkeleton";
import { useCreateQuiz } from "@/hooks/useCreateQuiz";
import { useQuizzes } from "@/hooks/useQuizzes";
import { useToggleQuizDisabled } from "@/hooks/useToggleQuizDisabled";
import type { Quiz } from "@/types/quiz.types";

function QuizListItem({ quiz }: { quiz: Quiz }) {
  const { t } = useTranslation();
  const toggleDisabled = useToggleQuizDisabled();
  const isToggling = toggleDisabled.isPending && toggleDisabled.variables?.quizId === quiz._id;
  const disabled = Boolean(quiz.disabled);

  return (
    <li
      className={clsx(
        "rounded-lg border bg-white p-4 shadow-sm transition dark:bg-slate-900",
        disabled
          ? "border-amber-200 opacity-80 dark:border-amber-900"
          : "border-slate-200 dark:border-slate-800"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <Link
          to="/quizzes/$quizId"
          params={{ quizId: quiz._id }}
          className="min-w-0 flex-1 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{quiz.title}</span>
            {disabled && (
              <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                {t("disabled")}
              </span>
            )}
          </div>
          {quiz.description && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{quiz.description}</p>
          )}
        </Link>
        <Button
          variant={disabled ? "primary" : "outline"}
          loading={isToggling}
          disabled={toggleDisabled.isPending}
          onClick={() => toggleDisabled.mutate({ quizId: quiz._id, disabled: !disabled })}
        >
          {disabled ? t("enableQuiz") : t("disableQuiz")}
        </Button>
      </div>
    </li>
  );
}

export function QuizListPage() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuizzes();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const create = useCreateQuiz();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{t("quizzes")}</h1>
        <Button onClick={() => setOpen(true)}>{t("newQuiz")}</Button>
      </div>
      {isLoading ? (
        <QuizListSkeleton />
      ) : (
        <ul className="space-y-3">
          {data?.map((q) => (
            <QuizListItem key={q._id} quiz={q} />
          ))}
        </ul>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold">{t("newQuiz")}</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("title")}</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("description")}</label>
                <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)} disabled={create.isPending}>
                {t("cancel")}
              </Button>
              <Button
                loading={create.isPending}
                disabled={!title.trim()}
                onClick={() => {
                  create.mutate(
                    { title, description },
                    {
                      onSuccess: () => {
                        setOpen(false);
                        setTitle("");
                        setDescription("");
                      },
                    }
                  );
                }}
              >
                {create.isPending ? t("saving") : t("save")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
