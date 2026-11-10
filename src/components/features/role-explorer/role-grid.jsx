import { DEFAULT_DEPARTMENT } from "@/lib/constants";
import { EmptyState } from "@/components/shared/empty-state";
import { RoleCard } from "./role-card";
import { RoleCardSkeleton } from "./role-card-skeleton";

const SKELETON_COUNT = 6;

export function RoleGrid({
  roles,
  isLoading,
  activeDepartment,
  activeDepartmentLabel,
  onResetFilter,
}) {
  const isFiltered = activeDepartment !== DEFAULT_DEPARTMENT;

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
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[#0057FF] animate-ping motion-reduce:animate-none"
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
            </span>
          )}
        </div>

        {isFiltered && !isLoading && (
          <button
            type="button"
            onClick={onResetFilter}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-[#0057FF] transition-colors hover:bg-blue-50 hover:text-[#0046CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
          >
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            Reset filter
          </button>
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
          onReset={onResetFilter}
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
