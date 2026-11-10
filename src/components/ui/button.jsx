import { cn } from "@/lib/utils";

const BUTTON_VARIANTS = {
  primary:
    "bg-[#0057FF] text-white hover:bg-[#0046CC] active:bg-blue-800 shadow-xs border border-transparent",
  secondary:
    "bg-[#DCE3EC] text-slate-900 hover:bg-[#CED7E4] active:bg-slate-300 border border-transparent",
  outline:
    "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent",
};

const BUTTON_SIZES = {
  sm: "min-h-9 px-3.5 py-1.5 text-xs",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

export function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary,
        BUTTON_SIZES[size] || BUTTON_SIZES.md,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
