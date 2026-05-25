import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

export const selectClassName =
  "rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={clsx(selectClassName, className)} {...props} />;
}
