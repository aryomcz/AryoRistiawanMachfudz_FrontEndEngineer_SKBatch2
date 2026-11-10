import { cn } from "@/lib/utils";

/**
 * Global site footer component.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional custom class names (defaults to 'mt-16').
 */
export function Footer({ className = "mt-16" }) {
  return (
    <footer
      className={cn(
        "border-t border-slate-200/80 bg-white py-6",
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© 2026 SekolahKarir. Seluruh hak cipta dilindungi.</p>
        <p>Frontend Engineer Mini Assignment - Batch 2</p>
      </div>
    </footer>
  );
}

export default Footer;
