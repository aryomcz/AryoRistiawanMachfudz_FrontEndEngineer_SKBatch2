import { Loader2, RotateCcw, X } from "lucide-react";
import { DEFAULT_DEPARTMENT } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { RoleCard } from "./role-card";
import { RoleCardSkeleton } from "./role-card-skeleton";

const SKELETON_COUNT = 6;

export function RoleGrid({
  roles,
  isLoading,
  activeDepartment,
  activeDepartmentLabel,
  searchQuery = "",
  onResetFilter,
  onClearSearch,
}) {
  const trimmedSearch = searchQuery.trim();
  const isFiltered =
    activeDepartment !== DEFAULT_DEPARTMENT || trimmedSearch.length > 0;

  return (
    <section aria-labelledby="role-grid-heading" className="mt-6">
      <h2 id="role-grid-heading" className="sr-only">
        Daftar Posisi Karir
      </h2>
      {/* Contextual Atomic Live Status Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-slate-600"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2 text-slate-500">
              <Loader2
                aria-hidden="true"
                className="h-3.5 w-3.5 animate-spin text-[#0057FF]"
              />
              Memuat daftar posisi untuk{" "}
              <strong className="font-semibold text-slate-800">
                {activeDepartmentLabel}
              </strong>
              ...
            </span>
          ) : (
            <span>
              Menampilkan{" "}
              <strong className="font-semibold text-slate-900">
                {roles.length} posisi terbuka
              </strong>{" "}
              untuk{" "}
              <strong className="font-semibold text-[#0057FF]">
                {activeDepartmentLabel}
              </strong>
              {trimmedSearch && (
                <>
                  {" "}
                  dengan kata kunci{" "}
                  <strong className="font-semibold text-slate-900">
                    &ldquo;{trimmedSearch}&rdquo;
                  </strong>
                </>
              )}
            </span>
          )}
        </div>

        {isFiltered && !isLoading && (
          <Button
            type="button"
            onClick={onResetFilter}
            variant="link"
            size="sm"
            className="gap-1.5 text-blue-600 hover:text-blue-700"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Reset semua filter</span>
          </Button>
        )}
      </div>

      {/* Conditional States: Loading -> Empty -> Populated Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <RoleCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : roles.length === 0 ? (
        <EmptyState
          departmentLabel={activeDepartmentLabel}
          activeDepartment={activeDepartment}
          searchQuery={trimmedSearch}
          onReset={onResetFilter}
          onClearSearch={onClearSearch}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      )}
    </section>
  );
}
