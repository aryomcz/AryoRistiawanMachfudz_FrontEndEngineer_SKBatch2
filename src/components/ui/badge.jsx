import { cn } from "@/lib/utils";

const BADGE_VARIANTS = {
  default: "bg-slate-100 text-slate-700 border-slate-200/80",
  primary: "bg-blue-50 text-blue-700 border-blue-200/80",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
  warning: "bg-amber-50 text-amber-800 border-amber-200/80",
  outline: "bg-white text-slate-700 border-slate-200",
  glass:
    "border-white/25 bg-white/15 text-white shadow-2xs backdrop-blur-md",
  "glass-primary":
    "border-sky-300/35 bg-sky-500/25 text-white shadow-2xs backdrop-blur-md",
  "glass-success":
    "border-emerald-300/35 bg-emerald-500/20 text-emerald-50 shadow-2xs backdrop-blur-md",
  "glass-warning":
    "border-amber-300/35 bg-amber-500/20 text-amber-50 shadow-2xs backdrop-blur-md",
};

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors",
        BADGE_VARIANTS[variant] || BADGE_VARIANTS.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
