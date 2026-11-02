import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPageSkeleton() {
  return (
    <section
      aria-label="Loading dashboard"
      aria-busy="true"
      className="mx-auto w-full max-w-7xl space-y-8"
    >
      <div className="space-y-3">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="space-y-4 rounded-2xl border bg-card p-5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-36" />
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-2xl border bg-card p-5">
        <Skeleton className="h-6 w-48" />
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
      <span className="sr-only">Loading dashboard…</span>
    </section>
  );
}
