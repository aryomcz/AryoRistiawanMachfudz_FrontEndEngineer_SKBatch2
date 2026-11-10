import { Skeleton } from "@/components/ui/skeleton";

export function RoleCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full min-h-[296px] flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs"
    >
      <div>
        {/* Top Row: Department + WorkType badges */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Title & Level Subtitle */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-3/5 rounded-md" />
        </div>

        {/* 2-line Summary */}
        <div className="mt-3.5 space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-11/12 rounded-md" />
        </div>
      </div>

      <div className="mt-5">
        {/* Skill Pills */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-9 rounded-full" />
        </div>

        {/* Footer Metadata */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}
