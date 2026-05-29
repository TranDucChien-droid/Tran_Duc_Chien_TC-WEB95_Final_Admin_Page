import clsx from "clsx";
import { useTranslation } from "react-i18next";

type LanguageSwitchProps = {
  accent?: "teal" | "indigo";
};

export function LanguageSwitch({ accent = "indigo" }: LanguageSwitchProps) {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language.startsWith("vi");
  const activeClass =
    accent === "teal" ? "bg-teal-600 text-white" : "bg-indigo-600 text-white";

  return (
    <div
      className="inline-flex h-9 items-center rounded-md border border-slate-300 p-0.5 dark:border-slate-600"
      role="group"
      aria-label={t("language")}
    >
      {(["en", "vi"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => void i18n.changeLanguage(lang)}
          className={clsx(
            "inline-flex h-full min-w-[2.75rem] items-center justify-center rounded px-3 text-sm font-medium transition",
            (lang === "vi") === isVi
              ? activeClass
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          )}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
