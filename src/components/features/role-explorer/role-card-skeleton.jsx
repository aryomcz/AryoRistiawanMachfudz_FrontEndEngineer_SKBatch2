import { Skeleton } from "@/components/ui/skeleton";

export function RoleCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full min-h-[240px] flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6"
    >
      <div>
        {/* Chunk 1: Top row + Title */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <Skeleton className="mt-2.5 h-6 w-3/4 rounded-md" />

        {/* Chunk 2: Inline metadata bar + 2 summary lines */}
        <Skeleton className="mt-2.5 h-4 w-3/5 rounded" />
        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>
      </div>

      {/* Chunk 3: Footer with 2 skill chip skeletons + 1 action link skeleton */}
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-5 w-14 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
        </div>
        <Skeleton className="h-7 w-28 rounded-full" />
      </div>
    </div>
  );
}