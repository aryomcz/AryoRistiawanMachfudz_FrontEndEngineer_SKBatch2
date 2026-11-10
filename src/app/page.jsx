import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { RoleExplorer } from "@/components/features/role-explorer/role-explorer";
import { RoleExplorerFallback } from "./loading";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
      <Header />

      <main className="mx-auto w-full max-w-6xl min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Hero Header Section */}
        <section className="mb-6 max-w-3xl sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#0057FF]">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-[#0057FF] animate-pulse motion-reduce:animate-none"
            />
            <span>Eksplorasi Karir &amp; Peran — Batch 2</span>
          </div>
          <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Temukan Peranmu di{" "}
            <span className="text-slate-900">Sekolah</span>
            <span className="text-[#0066FF]">Karir</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Bergabunglah bersama tim lintas disiplin dalam membangun produk
            edukasi dan akselerasi karir. Pilih departemen di bawah ini untuk
            menyaring posisi yang sesuai dengan keahlianmu.
          </p>
        </section>

        {/* Role Explorer Feature wrapped in Suspense for useSearchParams */}
        <div id="role-explorer" className="min-w-0 scroll-mt-24">
          <Suspense fallback={<RoleExplorerFallback />}>
            <RoleExplorer />
          </Suspense>
        </div>
      </main>

      <footer className="mt-16 border-t border-slate-200/80 bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 SekolahKarir. Seluruh hak cipta dilindungi.</p>
          <p>Frontend Engineer Mini Assignment — Batch 2</p>
        </div>
      </footer>
    </div>
  );
}
