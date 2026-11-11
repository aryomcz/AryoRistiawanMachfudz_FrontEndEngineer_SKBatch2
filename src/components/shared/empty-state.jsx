import { SearchX, RotateCcw } from "lucide-react";
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
        <SearchX size={28} />
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
          <RotateCcw size={16} />
          {hasSearch ? "Reset Pencarian & Filter" : "Tampilkan Semua Departemen"}
        </Button>
      </div>
    </div>
  );
}
