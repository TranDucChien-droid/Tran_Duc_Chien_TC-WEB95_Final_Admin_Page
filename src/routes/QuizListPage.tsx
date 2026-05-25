import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { useCreateQuiz } from "@/hooks/useCreateQuiz";
import { useQuizzes } from "@/hooks/useQuizzes";

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
      {isLoading && <p className="text-slate-600 dark:text-slate-400">…</p>}
      <ul className="space-y-3">
        {data?.map((q) => (
          <li key={q._id}>
            <Link
              to="/quizzes/$quizId"
              params={{ quizId: q._id }}
              className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
            >
              <div className="font-medium">{q.title}</div>
              {q.description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{q.description}</p>}
            </Link>
          </li>
        ))}
      </ul>

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
              <Button variant="ghost" onClick={() => setOpen(false)}>
                {t("cancel")}
              </Button>
              <Button
                disabled={!title.trim() || create.isPending}
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
                {t("save")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
