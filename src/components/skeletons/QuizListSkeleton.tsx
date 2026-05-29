import { Skeleton } from "./Skeleton";

const CARD_GRID = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3";

type QuizListSkeletonProps = {
  count?: number;
  withTrailing?: boolean;
};

export function QuizListSkeleton({ count = 6, withTrailing = false }: QuizListSkeletonProps) {
  return (
    <ul className={CARD_GRID} aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <li
          key={i}
          className="flex h-full min-h-[7rem] flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-1 flex-col space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            {withTrailing && <Skeleton className="h-4 w-1/2" />}
          </div>
          {withTrailing && <Skeleton className="mt-4 h-8 w-20 shrink-0" />}
        </li>
      ))}
    </ul>
  );
}
