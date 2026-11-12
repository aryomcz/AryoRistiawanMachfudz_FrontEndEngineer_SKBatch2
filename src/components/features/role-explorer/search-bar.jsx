"use client";

import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBar({
  searchQuery,
  value,
  onSearchChange,
  onChange,
  onClearSearch,
  onClear,
  placeholder = "Cari posisi, skill (React, Figma, SQL), atau tipe kerja (Remote, Intern)...",
  className,
}) {
  const inputRef = useRef(null);

  // Support both searchQuery/value and onSearchChange/onChange props
  const query = value !== undefined ? value : searchQuery || "";
  const handleChange = onChange || onSearchChange;
  const handleClearCallback = onClear || onClearSearch;
  const hasQuery = query.trim().length > 0;

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
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = () => {
    handleClearCallback?.();
    inputRef.current?.focus();
  };

  return (
    <div className={cn("w-full", className)}>
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
          ref={inputRef}
          id="role-search-input"
          type="search"
          role="searchbox"
          aria-label="Cari posisi atau skill"
          value={query}
          onChange={(e) => handleChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              if (hasQuery) {
                e.preventDefault();
                handleClear();
              } else {
                inputRef.current?.blur();
              }
            }
          }}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
          className="min-h-11 w-full rounded-2xl border border-slate-200/80 bg-white py-2.5 pr-20 pl-10 text-xs font-medium text-slate-900 shadow-2xs transition-all duration-150 placeholder:text-slate-400 hover:border-blue-200 focus:border-[#0057FF] focus:outline-none focus:ring-2 focus:ring-[#0057FF]/20 sm:min-h-12 sm:pr-24 sm:pl-11 sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        />

        {hasQuery && (
          <Button
            type="button"
            onClick={handleClear}
            aria-label="Hapus kata kunci pencarian"
            variant="ghost"
            size="xs"
            rounded="xl"
            className="absolute right-2 min-h-8 bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500 focus-visible:ring-red-500 sm:right-2.5 sm:text-xs"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Hapus</span>
          </Button>
        )}
      </div>
    </div>
  );
}
