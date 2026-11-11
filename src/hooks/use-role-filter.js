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
  filterRoles,
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

  const initialQueryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQueryState] = useState(initialQueryParam);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, SIMULATED_LOADING_DELAY_MS);

    return () => clearTimeout(timer);
  }, [activeDepartment]);

  // Debounce URL synchronization for search query so typing stays instant
  useEffect(() => {
    const currentUrlQuery = searchParams.get("q") || "";
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === currentUrlQuery) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (trimmedQuery) {
        params.set("q", trimmedQuery);
      } else {
        params.delete("q");
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, pathname, router, searchParams]);

  const filteredRoles = useMemo(
    () => filterRoles({ departmentId: activeDepartment, searchQuery }),
    [activeDepartment, searchQuery]
  );

  const departmentCounts = useMemo(
    () => getDepartmentCounts(searchQuery),
    [searchQuery]
  );

  const hasActiveFilters =
    activeDepartment !== DEFAULT_DEPARTMENT || searchQuery.trim().length > 0;

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

      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery) {
        params.set("q", trimmedQuery);
      } else {
        params.delete("q");
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(newUrl, { scroll: false });
    },
    [activeDepartment, pathname, router, searchParams, searchQuery]
  );

  const setSearchQuery = useCallback((value) => {
    setSearchQueryState(value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQueryState("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  const resetFilter = useCallback(() => {
    if (activeDepartment !== DEFAULT_DEPARTMENT) {
      setIsLoading(true);
    }
    setSearchQueryState("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("dept");
    params.delete("q");

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [activeDepartment, pathname, router, searchParams]);

  return {
    activeDepartment,
    activeDepartmentLabel: activeDepartmentObj.label,
    setDepartment,
    searchQuery,
    setSearchQuery,
    clearSearch,
    resetFilter,
    hasActiveFilters,
    filteredRoles,
    departmentCounts,
    isLoading,
    totalRoles: departmentCounts[DEFAULT_DEPARTMENT] || 0,
  };
}
