import { Skeleton } from "./Skeleton";

type QuizDetailSkeletonProps = {
  questionCount?: number;
  variant?: "admin" | "play";
};

export function QuizDetailSkeleton({ questionCount = 3, variant = "admin" }: QuizDetailSkeletonProps) {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Skeleton className="h-4 w-20" />
        {variant === "admin" && <Skeleton className="h-9 w-28 rounded-md" />}
      </div>

      {variant === "play" && (
        <div className="space-y-2">
          <Skeleton className="h-8 w-2/3 max-w-lg" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>
      )}

      <section className="space-y-3">
        {variant === "admin" && <Skeleton className="h-6 w-32" />}
        <ul className="space-y-3">
          {Array.from({ length: questionCount }, (_, i) => (
            <li
              key={i}
              className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              {variant === "admin" ? (
                <div className="flex justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-3 w-16" />
                    <div className="space-y-1.5 pl-5">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-16 shrink-0 rounded-md" />
                </div>
              ) : (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="h-3 w-16" />
                  <div className="space-y-2">
                    {Array.from({ length: 4 }, (_, j) => (
                      <div key={j} className="flex items-center gap-2 px-2 py-1">
                        <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                        <Skeleton className="h-4 flex-1 max-w-md" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {variant === "play" && <Skeleton className="h-12 w-full rounded-md" />}
    </div>
  );
}
