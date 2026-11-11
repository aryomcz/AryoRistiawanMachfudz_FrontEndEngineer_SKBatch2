import { Skeleton } from "@/components/ui/skeleton";
import { RoleCardSkeleton } from "@/components/features/role-explorer/role-card-skeleton";

export function RoleExplorerFallback() {
  return (
    <div
      aria-busy="true"
      aria-label="Memuat penjelajah posisi karir"
      className="space-y-6"
    >
      <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs sm:p-5">
        <div>
          <Skeleton className="mb-2 h-4 w-40 rounded" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <div className="border-t border-slate-100 pt-3.5">
          <Skeleton className="mb-2.5 h-4 w-32 rounded" />
          <div className="flex flex-wrap items-center gap-2">
            {Array.from({ length: 7 }).map((_, idx) => (
              <Skeleton
                key={`filter-skeleton-${idx}`}
                className="h-10 w-28 rounded-xl sm:w-32"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-1 pt-1">
        <Skeleton className="h-5 w-64 rounded" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <RoleCardSkeleton key={`page-skeleton-${idx}`} />
        ))}
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
