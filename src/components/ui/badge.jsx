import { cn } from "@/lib/utils";

const BADGE_VARIANTS = {
  default: "bg-slate-100 text-slate-700 border-slate-200/80",
  primary: "bg-blue-50 text-blue-700 border-blue-200/80",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
  warning: "bg-amber-50 text-amber-800 border-amber-200/80",
  outline: "bg-white text-slate-700 border-slate-200",
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
