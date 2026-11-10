import { DEFAULT_DEPARTMENT } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function EmptyState({
  departmentLabel,
  activeDepartment = DEFAULT_DEPARTMENT,
  searchQuery = "",
  onReset,
  onClearSearch,
}) {
  const hasSearch = searchQuery.trim().length > 0;
  const isSpecificDept = activeDepartment !== DEFAULT_DEPARTMENT;

  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-12 text-center sm:px-10 sm:py-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#0057FF]">
        <svg
          aria-hidden="true"
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M8 11h6" />
        </svg>
      </div>

      <h3 className="mt-5 font-heading text-lg font-semibold text-slate-900 sm:text-xl">
        {hasSearch
          ? isSpecificDept
            ? `Tidak ada hasil "${searchQuery}" di ${departmentLabel}`
            : `Tidak ditemukan posisi untuk "${searchQuery}"`
          : `Belum ada posisi terbuka di departemen ${departmentLabel}`}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
        {hasSearch ? (
          <>
            Kami tidak menemukan posisi, keahlian, atau tipe kerja yang cocok
            dengan kata kunci{" "}
            <span className="font-semibold text-slate-800">
              &ldquo;{searchQuery}&rdquo;
            </span>
            {isSpecificDept ? (
              <>
                {" "}
                pada departemen{" "}
                <span className="font-semibold text-slate-800">
                  {departmentLabel}
                </span>
              </>
            ) : null}
            . Coba gunakan kata kunci lain atau tampilkan seluruh departemen.
          </>
        ) : (
          <>
            Saat ini seluruh kebutuhan talenta untuk departemen{" "}
            <span className="font-medium text-slate-800">
              {departmentLabel}
            </span>{" "}
            telah terpenuhi. Silakan jelajahi peluang karir lain yang masih
            tersedia di departemen lainnya.
          </>
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {hasSearch && isSpecificDept && onClearSearch && (
          <Button variant="secondary" size="md" onClick={onClearSearch}>
            Hapus Kata Kunci
          </Button>
        )}

        <Button variant="primary" size="md" onClick={onReset}>
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          {hasSearch ? "Reset Pencarian & Filter" : "Tampilkan Semua Departemen"}
        </Button>
      </div>
    </div>
  );
}
