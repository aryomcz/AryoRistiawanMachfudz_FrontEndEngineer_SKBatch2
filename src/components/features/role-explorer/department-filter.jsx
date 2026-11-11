"use client";

import { cn } from "@/lib/utils";

export function DepartmentFilter({
  departments,
  activeDepartment,
  departmentCounts,
  onSelectDepartment,
  className,
}) {
  return (
    <nav
      aria-label="Filter berdasarkan departemen"
      className={cn("w-full", className)}
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
       <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:pb-0">
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
                "group inline-flex min-h-10 max-w-full cursor-pointer items-center gap-2 rounded-2xl border px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:min-h-11 sm:gap-2.5 sm:px-4 sm:py-2 sm:text-sm",
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-xs font-semibold"
                  : "border-slate-200 bg-white text-slate-700 shadow-2xs hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-600"
              )}
            >
              <span className="truncate whitespace-nowrap">{dept.label}</span>
              <span
                aria-label={`${count} posisi`}
                className={cn(
                  "inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md px-1.5 text-[11px] font-semibold tabular-nums transition-colors sm:text-xs",
                  isActive
                    ? "bg-white/20 text-white"
                    : isZero
                      ? "bg-slate-100 text-slate-400"
                      : "bg-[#EDF2F7] text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-600"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
