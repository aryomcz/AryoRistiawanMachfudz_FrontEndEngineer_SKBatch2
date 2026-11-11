import { Suspense } from "react";
import { Search } from "lucide-react";
import { RoleExplorer } from "@/components/features/role-explorer/role-explorer";
import { RoleExplorerFallback } from "./loading";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-clip">
      <main className="mx-auto w-full max-w-6xl min-w-0 flex-1 px-4 py-6 pb-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Hero Header Section */}
        <section className="mb-6 max-w-3xl sm:mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#0057FF]">
            <Search
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-[#0057FF]"
            />
            <span>Eksplorasi Karir &amp; Peran</span>
          </div>
          <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Temukan Peranmu di{" "}
            <span className="text-slate-900">Sekolah</span>
            <span className="text-[#0066FF]">Karir</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Pilih departemen atau cari berdasarkan keahlian untuk melihat posisi yang sedang dibuka.
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
