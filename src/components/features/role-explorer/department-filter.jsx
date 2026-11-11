"use client";

import { cn } from "@/lib/utils";

export function DepartmentFilter({
  departments,
  activeDepartment,
  departmentCounts,
  onSelectDepartment,
}) {
  return (
    <nav aria-label="Filter berdasarkan departemen" className="w-full">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Filter Departemen
        </span>
        <span className="text-xs font-medium text-slate-400">
          {departments.length - 1} Departemen
        </span>
      </div>

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
                "inline-flex min-h-[40px] shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                  : isZero
                    ? "border-slate-200/60 bg-slate-50/70 text-slate-400 hover:border-slate-300 hover:bg-slate-100/70 hover:text-slate-600"
                    : "border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100/70 hover:text-slate-900"
              )}
            >
              <span className="whitespace-nowrap">{dept.label}</span>
              <span
                aria-label={`${count} posisi`}
                className={cn(
                  "inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md px-1.5 text-xs font-semibold tabular-nums transition-colors",
                  isActive
                    ? "bg-white/20 text-white"
                    : isZero
                      ? "bg-slate-100 text-slate-400"
                      : "bg-slate-100 text-slate-600"
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
