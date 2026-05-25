import { Skeleton } from "./Skeleton";

export function FormFieldsSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading">
      <section className="space-y-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <Skeleton className="h-5 w-24" />
        <div className="grid gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </div>
      </section>
      <section className="space-y-4 border-b border-slate-200 py-6 dark:border-slate-800">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-full max-w-lg" />
        <div className="flex gap-3">
          <Skeleton className="h-9 w-36 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </section>
      <section className="space-y-4 pt-2">
        <Skeleton className="h-5 w-32" />
        <div className="grid gap-3">
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </section>
    </div>
  );
}
