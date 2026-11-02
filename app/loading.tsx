import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main
      aria-label="Loading page"
      aria-busy="true"
      className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col gap-6 px-4 py-12"
    >
      <Skeleton className="h-9 w-64 max-w-full" />
      <Skeleton className="h-5 w-full max-w-2xl" />
      <Skeleton className="h-64 w-full rounded-2xl" />
      <span className="sr-only">Loading RentAero page…</span>
    </main>
  );
}
