import clsx from "clsx";

type SpinnerProps = {
  className?: string;
  size?: "sm" | "md";
};

const sizes = {
  sm: "h-3.5 w-3.5 border-2",
  md: "h-4 w-4 border-2",
};

export function Spinner({ className, size = "md" }: SpinnerProps) {
  return (
    <span
      className={clsx(
        "inline-block shrink-0 animate-spin rounded-full border-current border-t-transparent",
        sizes[size],
        className
      )}
      aria-hidden
    />
  );
}
