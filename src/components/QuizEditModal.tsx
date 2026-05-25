import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAddQuestion } from "@/hooks/useAddQuestion";
import { useImportQuestions } from "@/hooks/useImportQuestions";
import { useQuizDetail } from "@/hooks/useQuizDetail";
import { useUpdateQuiz } from "@/hooks/useUpdateQuiz";
import { Button } from "@/components/Button";
import { ButtonImportFile } from "@/components/ButtonImportFile";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";
import { downloadQuestionImportTemplate } from "@/utils/downloadQuestionTemplate";

type QuizEditModalProps = {
  quizId: string;
  open: boolean;
  onClose: () => void;
};

export function QuizEditModal({ quizId, open, onClose }: QuizEditModalProps) {
  const { t } = useTranslation();
  const { data } = useQuizDetail(quizId);

  const [qTitle, setQTitle] = useState("");
  const [qDesc, setQDesc] = useState("");
  const [question, setQuestion] = useState("");
  const [type, setType] = useState<"single" | "multiple">("single");
  const [optionsText, setOptionsText] = useState("");
  const [correctText, setCorrectText] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const updateQuiz = useUpdateQuiz(quizId);
  const addQuestion = useAddQuestion(quizId);
  const importExcel = useImportQuestions(quizId);

  const isSaving = updateQuiz.isPending || addQuestion.isPending || importExcel.isPending;

  function resetForm() {
    if (!data) return;
    setQTitle(data.title);
    setQDesc(data.description || "");
    setQuestion("");
    setType("single");
    setOptionsText("");
    setCorrectText("");
    setPendingFile(null);
  }

  useEffect(() => {
    if (!open) return;
    resetForm();
  }, [open, data]);

  const hasQuizChanges =
    !!data && (qTitle !== data.title || qDesc !== (data.description || ""));
  const hasNewQuestion = question.trim().length > 0;
  const hasPendingFile = pendingFile !== null;
  const canSave = hasQuizChanges || hasNewQuestion || hasPendingFile;

  function handleCancel() {
    resetForm();
    onClose();
  }

  async function handleSave() {
    if (!canSave) return;

    if (hasQuizChanges) {
      await updateQuiz.mutateAsync({ title: qTitle, description: qDesc });
    }

    if (pendingFile) {
      await importExcel.mutateAsync(pendingFile);
      setPendingFile(null);
    }

    if (hasNewQuestion) {
      const options = optionsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const correctAnswers = correctText
        .split(/[,;]/)
        .map((s) => Number.parseInt(s.trim(), 10))
        .filter((n) => !Number.isNaN(n));
      await addQuestion.mutateAsync({ question, type, options, correctAnswers });
      setQuestion("");
      setOptionsText("");
      setCorrectText("");
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title={
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t("manageQuiz")}</h2>
          <div className="flex justify-end gap-2 dark:border-slate-800">
            <Button variant="ghost" type="button" onClick={handleCancel} disabled={isSaving}>
              {t("cancel")}
            </Button>
            <Button type="button" disabled={!canSave || isSaving} onClick={() => void handleSave()}>
              {t("save")}
            </Button>
          </div>
        </div>
      }
    >
      <section className="space-y-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <h3 className="text-base font-semibold">{t("edit")}</h3>
        <div className="grid gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("title")}</label>
            <Input value={qTitle} onChange={(e) => setQTitle(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("description")}</label>
            <Textarea rows={3} value={qDesc} onChange={(e) => setQDesc(e.target.value)} />
          </div>
        </div>
      </section>

      <section className="space-y-4 border-b border-slate-200 py-6 dark:border-slate-800">
        <h3 className="text-base font-semibold">{t("importExcel")}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Columns: Question | Type | Option1 | Option2 | Option3 | Option4 | CorrectAnswers (1-based, comma-separated)
        </p>
        <div className="flex flex-wrap items-start gap-3">
          <Button className="h-fit" variant="primary" type="button" onClick={() => downloadQuestionImportTemplate()}>
            {t("downloadTemplate")}
          </Button>
          <ButtonImportFile
            key={pendingFile?.name ?? "no-file"}
            disabled={isSaving}
            onFileSelect={setPendingFile}
          />
        </div>
      </section>

      <section className="space-y-4 pt-6">
        <h3 className="text-base font-semibold">{t("addQuestion")}</h3>
        <div className="grid gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("question")}</label>
            <Textarea rows={2} value={question} onChange={(e) => setQuestion(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("type")}</label>
            <Select value={type} onChange={(e) => setType(e.target.value as "single" | "multiple")}>
              <option value="single">{t("single")}</option>
              <option value="multiple">{t("multiple")}</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("options")}</label>
            <Textarea rows={4} value={optionsText} onChange={(e) => setOptionsText(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("correctIndexes")}</label>
            <Input value={correctText} onChange={(e) => setCorrectText(e.target.value)} placeholder="0,2" />
          </div>
        </div>
      </section>
    </Modal>
  );
}
