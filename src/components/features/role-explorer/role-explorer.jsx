"use client";

import { DEPARTMENTS } from "@/lib/constants";
import { useRoleFilter } from "@/hooks/use-role-filter";
import { SearchBar } from "./search-bar";
import { DepartmentFilter } from "./department-filter";
import { RoleGrid } from "./role-grid";

export function RoleExplorer() {
  const {
    activeDepartment,
    activeDepartmentLabel,
    searchQuery,
    setSearchQuery,
    clearSearch,
    setDepartment,
    resetFilter,
    filteredRoles,
    departmentCounts,
    isLoading,
  } = useRoleFilter();

  return (
    <div className="space-y-4">
      {/* Filter and Search Bar Section */}
      <div
        role="search"
        aria-label="Pencarian dan filter posisi karir"
        className="w-full max-w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs backdrop-blur-xs sm:p-5"
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={clearSearch}
        />

        <div className="mt-3.5 border-t border-slate-200/80 pt-3">
          <DepartmentFilter
            departments={DEPARTMENTS}
            activeDepartment={activeDepartment}
            departmentCounts={departmentCounts}
            onSelectDepartment={setDepartment}
          />
        </div>
      </div>

      <RoleGrid
        roles={filteredRoles}
        isLoading={isLoading}
        activeDepartment={activeDepartment}
        activeDepartmentLabel={activeDepartmentLabel}
        searchQuery={searchQuery}
        onResetFilter={resetFilter}
        onClearSearch={clearSearch}
      />
    </div>
  );
}
