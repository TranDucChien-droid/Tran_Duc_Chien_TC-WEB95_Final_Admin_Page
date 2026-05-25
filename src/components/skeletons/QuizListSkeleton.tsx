import { Skeleton } from "./Skeleton";

type QuizListSkeletonProps = {
  count?: number;
  withTrailing?: boolean;
};

export function QuizListSkeleton({ count = 4, withTrailing = false }: QuizListSkeletonProps) {
  return (
    <ul className="space-y-3" aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <li
          key={i}
          className={
            withTrailing
              ? "flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              : "rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          }
        >
          <div className={withTrailing ? "min-w-0 flex-1 space-y-2" : "space-y-2"}>
            <Skeleton className="h-5 w-2/3 max-w-xs" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
          {withTrailing && <Skeleton className="ml-4 h-4 w-16 shrink-0" />}
        </li>
      ))}
    </ul>
  );
}
