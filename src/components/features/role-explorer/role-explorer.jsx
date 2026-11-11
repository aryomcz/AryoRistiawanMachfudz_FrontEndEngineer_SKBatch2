"use client";

import { Loader2, RotateCcw } from "lucide-react";
import { DEPARTMENTS, DEFAULT_DEPARTMENT } from "@/lib/constants";
import { useRoleFilter } from "@/hooks/use-role-filter";
import { SearchBar } from "./search-bar";
import { DepartmentFilter } from "./department-filter";
import { RoleGrid } from "./role-grid";

export function RoleExplorer() {
  const {
    activeDepartment,
    activeDepartmentLabel,
    setDepartment,
    searchQuery,
    setSearchQuery,
    clearSearch,
    resetFilter,
    hasActiveFilters,
    filteredRoles,
    departmentCounts,
    isLoading,
  } = useRoleFilter();

  const trimmedSearch = searchQuery.trim();
  const isSpecificDept = activeDepartment !== DEFAULT_DEPARTMENT;

  return (
    <div className="space-y-6">
      {/* Unified Control Region (Law of Common Region) */}
      <div
        role="search"
        aria-label="Pencarian dan filter posisi karir"
        className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs sm:p-5"
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={clearSearch}
          totalResults={filteredRoles.length}
        />

        <div className="border-t border-slate-100 pt-3.5">
          <DepartmentFilter
            departments={DEPARTMENTS}
            activeDepartment={activeDepartment}
            departmentCounts={departmentCounts}
            onSelectDepartment={setDepartment}
          />
        </div>
      </div>

      {/* Contextual Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1">
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
                className="h-4 w-4 animate-spin text-indigo-600"
              />
              Memuat posisi untuk{" "}
              <strong className="font-semibold text-slate-800">
                {activeDepartmentLabel}
              </strong>
              ...
            </span>
          ) : (
            <span>
              Menampilkan{" "}
              <strong className="font-semibold text-slate-900">
                {filteredRoles.length} posisi terbuka
              </strong>{" "}
              {isSpecificDept ? "untuk " : "di "}
              <strong className="font-semibold text-slate-900">
                {activeDepartmentLabel}
              </strong>
              {trimmedSearch && (
                <>
                  {" "}
                  dengan kata kunci{" "}
                  <strong className="font-semibold text-indigo-600">
                    &ldquo;{trimmedSearch}&rdquo;
                  </strong>
                </>
              )}
            </span>
          )}
        </div>

        {hasActiveFilters && !isLoading && (
          <button
            type="button"
            onClick={resetFilter}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-indigo-600 underline-offset-4 transition-colors hover:text-indigo-700 hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Reset semua filter</span>
          </button>
        )}
      </div>

      {/* Role Cards Grid / Skeleton / Empty State */}
      <RoleGrid
        roles={filteredRoles}
        isLoading={isLoading}
        activeDepartment={activeDepartment}
        activeDepartmentLabel={activeDepartmentLabel}
        searchQuery={trimmedSearch}
        onResetFilter={resetFilter}
        onClearSearch={clearSearch}
      />
    </div>
  );
}
