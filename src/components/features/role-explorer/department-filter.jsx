import { cn } from "@/lib/utils";

export function DepartmentFilter({
  departments,
  activeDepartment,
  departmentCounts,
  onSelectDepartment,
}) {
  return (
    <nav
      aria-label="Filter berdasarkan departemen"
      className="w-full max-w-full overflow-hidden rounded-2xl border border-white/90 bg-[#EDF2F7]/85 p-3 shadow-2xs backdrop-blur-xs sm:rounded-3xl sm:p-4"
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
  );
}
