import { cn } from "@/lib/utils";

const BUTTON_VARIANTS = {
  primary:
    "bg-[#0057FF] text-white hover:bg-[#0046CC] active:bg-blue-800 shadow-xs border border-transparent",
  secondary:
    "bg-[#DCE3EC] text-slate-900 hover:bg-[#CED7E4] active:bg-slate-300 border border-transparent",
  outline:
    "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-2xs",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent",
  danger:
    "bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200 border border-red-200/60",
  dark:
    "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 border border-transparent shadow-xs",
  link:
    "bg-transparent text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline p-0 border-transparent shadow-none font-semibold",
  pill:
    "border-slate-200 bg-white text-slate-700 shadow-2xs hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-600 border",
  pillActive:
    "border-blue-600 bg-blue-600 text-white shadow-xs font-semibold border",
  cardCta:
    "bg-[#EDF2F7] text-slate-800 group-hover:bg-[#0057FF] group-hover:text-white border border-transparent font-bold",
  clear:
    "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500 border border-transparent font-semibold",
  none: "",
};

const BUTTON_SIZES = {
  xs: "min-h-7 px-2.5 py-1 text-[11px]",
  sm: "min-h-9 px-3.5 py-1.5 text-xs",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
  "icon-xs": "h-7 w-7 p-0 shrink-0",
  "icon-sm": "h-9 w-9 p-0 shrink-0",
  "icon-md": "h-10 w-10 sm:h-11 sm:w-11 p-0 shrink-0",
  "icon-lg": "h-12 w-12 p-0 shrink-0",
};

const BUTTON_ROUNDED = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

/**
 * Reusable and dynamic Button component.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as="button"] - Render as custom element (e.g. "span", Link) for polymorphic use.
 * @param {"primary" | "secondary" | "outline" | "ghost" | "danger" | "dark" | "link" | "pill" | "pillActive" | "cardCta" | "clear" | "none"} [props.variant="primary"]
 * @param {"xs" | "sm" | "md" | "lg" | "icon-xs" | "icon-sm" | "icon-md" | "icon-lg"} [props.size="md"]
 * @param {"none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"} [props.rounded="xl"]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Button({
  as: Component = "button",
  children,
  type = Component === "button" ? "button" : undefined,
  variant = "primary",
  size = "md",
  rounded = "xl",
  className,
  ...props
}) {
  const variantClass =
    variant in BUTTON_VARIANTS
      ? BUTTON_VARIANTS[variant]
      : BUTTON_VARIANTS.primary;

  const sizeClass =
    size in BUTTON_SIZES ? BUTTON_SIZES[size] : BUTTON_SIZES.md;

  const roundedClass =
    rounded in BUTTON_ROUNDED
      ? BUTTON_ROUNDED[rounded]
      : BUTTON_ROUNDED.xl;

  return (
    <Component
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantClass,
        sizeClass,
        roundedClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
