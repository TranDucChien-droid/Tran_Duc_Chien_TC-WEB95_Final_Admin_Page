import clsx from "clsx";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";

export type ButtonImportFileProps = {
  onFileSelect: (file: File) => void;
  accept?: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
  className?: string;
};

export function ButtonImportFile({
  onFileSelect,
  accept = ".xlsx,.xls",
  disabled = false,
  label,
  hint,
  className,
}: ButtonImportFileProps) {
  const { t } = useTranslation();
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setFileName(file.name);
    onFileSelect(file);
  }

  return (
    <div className={clsx("inline-flex flex-row items-end justify-end align-middle gap-2", className)}>
      <label
        htmlFor={inputId}
        className={clsx(
          "inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-100 hover:text-indigo-800 focus-within:outline focus-within:outline-2 focus-within:outline-indigo-500 focus-within:outline-offset-2 dark:border-indigo-600 dark:bg-indigo-950/35 dark:text-indigo-200 dark:hover:border-indigo-400 dark:hover:bg-indigo-900/45 dark:hover:text-indigo-100",
          disabled && "pointer-events-none cursor-not-allowed opacity-55"
        )}
      >
        <input
          id={inputId}
          type="file"
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={handleChange}
        />
        <span className="inline-flex text-lg leading-none" aria-hidden>
          ↑
        </span>
        <span>{label ?? t("upload")}</span>
      </label>
      <span className="text-xs text-slate-500 dark:text-slate-400">{hint ?? accept}</span>
      {fileName && (
        <span className="break-all text-sm font-medium text-slate-700 dark:text-slate-300" title={fileName}>
          {fileName}
        </span>
      )}
    </div>
  );
}
