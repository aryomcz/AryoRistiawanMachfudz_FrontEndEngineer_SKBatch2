"use client";

import { DEPARTMENTS } from "@/lib/constants";
import { useRoleFilter } from "@/hooks/use-role-filter";
import { DepartmentFilter } from "./department-filter";
import { RoleGrid } from "./role-grid";

export function RoleExplorer() {
  const {
    activeDepartment,
    activeDepartmentLabel,
    setDepartment,
    resetFilter,
    filteredRoles,
    departmentCounts,
    isLoading,
  } = useRoleFilter();

  return (
    <div>
      <DepartmentFilter
        departments={DEPARTMENTS}
        activeDepartment={activeDepartment}
        departmentCounts={departmentCounts}
        onSelectDepartment={setDepartment}
      />

      <RoleGrid
        roles={filteredRoles}
        isLoading={isLoading}
        activeDepartment={activeDepartment}
        activeDepartmentLabel={activeDepartmentLabel}
        onResetFilter={resetFilter}
      />
    </div>
  );
}
