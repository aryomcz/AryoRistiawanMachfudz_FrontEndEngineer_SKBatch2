"use client";

import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function DepartmentFilter({
  departments,
  activeDepartment,
  departmentCounts,
  onSelectDepartment,
  searchQuery = "",
  onSearchChange,
  onClearSearch,
}) {
  const searchInputRef = useRef(null);
  const hasSearchQuery = searchQuery.trim().length > 0;

  // Global "/" shortcut to focus search bar quickly on desktop
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = () => {
    onClearSearch?.();
    searchInputRef.current?.focus();
  };

  return (
    <div
      role="search"
      aria-label="Pencarian dan filter posisi karir"
      className="w-full max-w-full overflow-hidden rounded-2xl border border-white/90 bg-[#EDF2F7]/85 p-3 shadow-2xs backdrop-blur-xs sm:rounded-3xl sm:p-4"
    >
      {/* Search Bar Section */}
      <div className="mb-3.5">
        <div className="mb-2 flex items-center justify-between gap-2 px-1 sm:px-2">
          <label
            htmlFor="role-search-input"
            className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs"
          >
            Cari Posisi &amp; Keahlian
          </label>
          <span className="hidden text-[11px] font-medium text-slate-400 sm:inline">
            Tekan{" "}
            <kbd className="rounded border border-slate-300/80 bg-white px-1.5 py-0.5 font-sans text-[10px] font-semibold text-slate-600 shadow-2xs">
              /
            </kbd>{" "}
            untuk mencari
          </span>
        </div>

        <div className="group/search relative flex items-center">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 h-4 w-4 shrink-0 text-slate-400 transition-colors duration-150 group-focus-within/search:text-[#0057FF] sm:left-4 sm:h-4.5 sm:w-4.5"
          />

          <input
            ref={searchInputRef}
            id="role-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                if (hasSearchQuery) {
                  e.preventDefault();
                  handleClear();
                } else {
                  searchInputRef.current?.blur();
                }
              }
            }}
            placeholder="Cari posisi, skill (React, Figma, SQL), atau tipe kerja (Remote, Intern)..."
            autoComplete="off"
            spellCheck="false"
            className="min-h-11 w-full rounded-full border border-slate-200/80 bg-white py-2.5 pr-20 pl-10 text-xs font-medium text-slate-900 shadow-2xs transition-all duration-150 placeholder:text-slate-400 hover:border-blue-200 focus:border-[#0057FF] focus:outline-none focus:ring-2 focus:ring-[#0057FF]/20 sm:min-h-12 sm:pr-24 sm:pl-11 sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />

          {hasSearchQuery && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Hapus kata kunci pencarian"
              className="absolute right-2 inline-flex min-h-8 cursor-pointer items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-[#0057FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] sm:right-2.5 sm:text-xs"
            >
              <X aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Hapus</span>
            </button>
          )}
        </div>
      </div>

      {/* Department Pills Navigation */}
      <nav
        aria-label="Filter berdasarkan departemen"
        className="border-t border-slate-200/80 pt-3"
      >
        <div className="mb-2.5 flex items-center justify-between gap-2 px-1 sm:px-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
            Filter Departemen
          </span>
          <span className="text-[11px] font-medium text-slate-500 sm:text-xs">
            {departments.length - 1} Departemen
          </span>
        </div>

        {/* Wrapped Pills on Mobile & Desktop to prevent horizontal overflow and clipped labels */}
        <div className="flex flex-wrap items-center gap-2">
          {departments.map((dept) => {
            const isActive = activeDepartment === dept.id;
            const count = departmentCounts[dept.id] ?? 0;
            const isZero = count === 0;

            return (
              <button
                key={dept.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelectDepartment(dept.id)}
                className={cn(
                  "group inline-flex min-h-10 max-w-full cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 sm:min-h-11 sm:gap-2.5 sm:px-4 sm:py-2 sm:text-sm",
                  isActive
                    ? "border-[#0057FF] bg-[#0057FF] text-white shadow-xs font-semibold"
                    : "border-transparent bg-white text-slate-700 shadow-2xs hover:border-blue-200 hover:bg-blue-50/60 hover:text-[#0057FF]"
                )}
              >
                <span className="truncate whitespace-nowrap">{dept.label}</span>
                <span
                  aria-label={`${count} posisi`}
                  className={cn(
                    "inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums transition-colors sm:text-xs",
                    isActive
                      ? "bg-white/20 text-white"
                      : isZero
                        ? "bg-slate-100 text-slate-400"
                        : "bg-[#EDF2F7] text-slate-700 group-hover:bg-blue-100 group-hover:text-[#0057FF]"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
