import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "ghost" | "outline" | "danger" | "dark";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const base = "rounded-md font-medium transition disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 disabled:opacity-50",
  ghost: "px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800",
  outline:
    "border border-slate-300 px-3 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800",
  danger:
    "h-fit border border-red-200 px-2 py-1 text-sm text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950",
  dark:
    "bg-slate-900 px-3 py-1 text-sm text-white hover:bg-slate-800 dark:bg-indigo-500 dark:hover:bg-indigo-400",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={clsx(base, variants[variant], fullWidth && "w-full", className)} {...props}>
      {children}
    </button>
  );
}
