import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg rounded-3xl border border-white/90 bg-[#EDF2F7]/85 p-4 shadow-2xs sm:p-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-12 text-center sm:px-10 sm:py-14">
            {/* 404 Badge & Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#0057FF]">
              <svg
                aria-hidden="true"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>

            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0057FF]">
              <span>Error 404 -Halaman Tidak Ditemukan</span>
            </div>

            <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Halaman yang Kamu Cari Belum Tersedia
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Maaf, tautan yang kamu tuju tidak ditemukan atau sedang dalam
              tahap pengembangan. Yuk, kembali ke halaman eksplorasi peran untuk
              melihat posisi yang sedang dibuka di{" "}
              <span className="font-semibold text-slate-900">Sekolah</span>
              <span className="font-semibold text-[#0066FF]">Karir</span>.
            </p>

            {/* Primary CTA: Kembali ke Karir */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0057FF] px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-[#0046CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 sm:w-auto"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Kembali ke Karir
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
