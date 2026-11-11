import { Suspense } from "react";
import { RoleExplorer } from "@/components/features/role-explorer/role-explorer";
import { RoleExplorerFallback } from "./loading";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col bg-slate-50 overflow-x-clip">
      <main className="mx-auto w-full max-w-6xl min-w-0 flex-1 space-y-8 px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        {/* Hero Header Section */}
        <section className="max-w-2xl py-2 sm:py-4">
          <p className="mb-2 text-xs font-semibold tracking-wider text-indigo-600 uppercase">
            Eksplorasi Karir &amp; Magang
          </p>
          <h1 className="font-heading text-2xl font-bold tracking-tight leading-tight text-slate-900 sm:text-3xl md:text-4xl">
            Temukan Peran yang Tepat di Sekolah Karir
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Pilih departemen atau cari berdasarkan keahlian untuk melihat posisi
            yang sedang dibuka.
          </p>
        </section>

        {/* Role Explorer Feature wrapped in Suspense for useSearchParams */}
        <div id="role-explorer" className="min-w-0 scroll-mt-24">
          <Suspense fallback={<RoleExplorerFallback />}>
            <RoleExplorer />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
