"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  DEPARTMENTS,
  DEFAULT_DEPARTMENT,
  VALID_DEPARTMENT_IDS,
  SIMULATED_LOADING_DELAY_MS,
} from "@/lib/constants";
import {
  getRolesByDepartment,
  getDepartmentCounts,
} from "@/services/role.service";

export function useRoleFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawDeptParam = searchParams.get("dept")?.toLowerCase() || "";
  const activeDepartment = VALID_DEPARTMENT_IDS.includes(rawDeptParam)
    ? rawDeptParam
    : DEFAULT_DEPARTMENT;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, SIMULATED_LOADING_DELAY_MS);

    return () => clearTimeout(timer);
  }, [activeDepartment]);

  const filteredRoles = useMemo(
    () => getRolesByDepartment(activeDepartment),
    [activeDepartment]
  );

  const departmentCounts = useMemo(() => getDepartmentCounts(), []);

  const activeDepartmentObj = useMemo(
    () =>
      DEPARTMENTS.find((dept) => dept.id === activeDepartment) || DEPARTMENTS[0],
    [activeDepartment]
  );

  const setDepartment = useCallback(
    (newDeptId) => {
      if (newDeptId === activeDepartment) return;

      setIsLoading(true);

      const params = new URLSearchParams(searchParams.toString());
      if (!newDeptId || newDeptId === DEFAULT_DEPARTMENT) {
        params.delete("dept");
      } else {
        params.set("dept", newDeptId);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(newUrl, { scroll: false });
    },
    [activeDepartment, pathname, router, searchParams]
  );

  const resetFilter = useCallback(() => {
    setDepartment(DEFAULT_DEPARTMENT);
  }, [setDepartment]);

  return {
    activeDepartment,
    activeDepartmentLabel: activeDepartmentObj.label,
    setDepartment,
    resetFilter,
    filteredRoles,
    departmentCounts,
    isLoading,
    totalRoles: departmentCounts[DEFAULT_DEPARTMENT] || 0,
  };
}
