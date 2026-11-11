import { SearchX, RotateCcw } from "lucide-react";

export function EmptyState({
  departmentLabel,
  searchQuery = "",
  onReset,
}) {
  const trimmedSearch = searchQuery.trim();
  const hasSearch = trimmedSearch.length > 0;

  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center sm:px-10 sm:py-16">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <SearchX size={24} />
      </div>

      <h3 className="mt-4 font-heading text-lg font-semibold text-slate-900 sm:text-xl">
        {hasSearch
          ? `Tidak ditemukan posisi untuk kata kunci "${trimmedSearch}"`
          : `Belum ada posisi terbuka di departemen ${departmentLabel}`}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        {hasSearch
          ? "Coba gunakan kata kunci keahlian lain atau tampilkan kembali seluruh departemen."
          : `Saat ini seluruh kebutuhan talenta untuk departemen ${departmentLabel} telah terpenuhi. Silakan jelajahi peluang karir lain yang masih tersedia di departemen lainnya.`}
      </p>

      <div className="mt-6 flex items-center justify-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <RotateCcw size={16} />
          <span>Reset Semua Filter</span>
        </button>
      </div>
    </div>
  );
}
