import { Skeleton } from "@/components/ui/skeleton";
import { RoleCardSkeleton } from "@/components/features/role-explorer/role-card-skeleton";

export function RoleExplorerFallback() {
  return (
    <div aria-busy="true" aria-label="Memuat penjelajah posisi karir">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-3 sm:rounded-3xl sm:p-4">
        <Skeleton className="mb-2.5 h-4 w-32" />
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: 7 }).map((_, idx) => (
            <Skeleton
              key={`filter-skeleton-${idx}`}
              className="h-10 w-28 rounded-full sm:h-11 sm:w-32"
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4 px-1">
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <RoleCardSkeleton key={`page-skeleton-${idx}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <RoleExplorerFallback />
    </div>
  );
}
