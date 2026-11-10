import { Header } from "@/components/layout/header";
import { Skeleton } from "@/components/ui/skeleton";

export function RoleDetailSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Memuat detail posisi karir"
      className="mx-auto w-full max-w-6xl min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8"
    >
      {/* Top Breadcrumb Skeleton */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-9 w-52 rounded-full" />
        <Skeleton className="h-5 w-48 rounded-md" />
      </div>

      {/* Hero Banner Card Skeleton */}
      <div className="relative flex h-52 w-full flex-col justify-end overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-900/90 p-5 sm:h-72 sm:p-8 lg:h-80">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-7 w-28 rounded-full bg-white/20" />
          <Skeleton className="h-7 w-24 rounded-full bg-white/20" />
          <Skeleton className="h-7 w-24 rounded-full bg-white/20" />
        </div>
        <Skeleton className="mt-3 h-9 w-3/4 max-w-lg rounded-xl bg-white/20 sm:h-10" />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Skeleton className="h-4 w-36 rounded-md bg-white/20" />
          <Skeleton className="h-4 w-28 rounded-md bg-white/20" />
          <Skeleton className="h-4 w-32 rounded-md bg-white/20" />
        </div>
      </div>

      {/* Main 2-Column Content Skeleton */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* About & Skills Card Skeleton */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs sm:p-8">
            <Skeleton className="h-7 w-48 rounded-lg" />
            <div className="mt-4 space-y-2.5">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <Skeleton className="h-4 w-44 rounded-md" />
              <div className="mt-3 flex flex-wrap gap-2">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
          </div>

          {/* Photo Gallery Skeleton */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs sm:p-8">
            <Skeleton className="h-7 w-64 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-80 max-w-full rounded-md" />
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`gallery-skeleton-${idx}`}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50"
                >
                  <Skeleton className="aspect-4/3 w-full rounded-none" />
                  <div className="p-3 space-y-1.5">
                    <Skeleton className="h-3.5 w-full rounded-md" />
                    <Skeleton className="h-3.5 w-2/3 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Responsibilities Skeleton */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs sm:p-8">
            <Skeleton className="h-7 w-56 rounded-lg" />
            <div className="mt-4 space-y-3.5">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={`resp-skeleton-${idx}`} className="flex items-start gap-3">
                  <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <aside className="space-y-6 lg:col-span-1">
          <div className="rounded-3xl border border-white/90 bg-[#EDF2F7]/85 p-3 shadow-2xs sm:p-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6">
              <Skeleton className="h-6 w-40 rounded-lg" />
              <div className="mt-4 space-y-3.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={`summary-skeleton-${idx}`}
                    className="flex items-center justify-between border-b border-slate-100 pb-3"
                  >
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-4 w-28 rounded-md" />
                  </div>
                ))}
                <div className="pt-1 space-y-2">
                  <Skeleton className="h-3.5 w-40 rounded-md" />
                  <Skeleton className="h-6 w-48 rounded-md" />
                </div>
              </div>
              <div className="mt-6 space-y-2.5">
                <Skeleton className="h-11 w-full rounded-full" />
                <Skeleton className="h-11 w-full rounded-full" />
              </div>
            </div>
          </div>

          {/* Hiring Lead Skeleton */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
            <Skeleton className="h-3.5 w-32 rounded-md" />
            <div className="mt-3.5 flex items-center gap-3.5">
              <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-36 rounded-md" />
                <Skeleton className="h-3.5 w-28 rounded-md" />
              </div>
            </div>
            <Skeleton className="mt-3.5 h-20 w-full rounded-2xl" />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
      <Header />
      <RoleDetailSkeleton />
    </div>
  );
}
