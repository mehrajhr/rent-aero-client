import { Skeleton } from "@/components/ui/skeleton";

export default function PublicLoading() {
  return (
    <section
      aria-label="Loading page content"
      aria-busy="true"
      className="mx-auto min-h-[60vh] w-full max-w-7xl space-y-8 px-4 py-10 md:px-8"
    >
      <div className="space-y-3 text-center">
        <Skeleton className="mx-auto h-9 w-2/3 max-w-md" />
        <Skeleton className="mx-auto h-4 w-5/6 max-w-2xl" />
        <Skeleton className="mx-auto h-4 w-2/3 max-w-xl" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="space-y-3 rounded-2xl border bg-card p-4">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading RentAero page…</span>
    </section>
  );
}
