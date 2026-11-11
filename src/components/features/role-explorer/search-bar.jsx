"use client";

import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

export function SearchBar({ value = "", onChange, onClear, totalResults }) {
  const inputRef = useRef(null);
  const hasValue = value.length > 0;

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
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-2">
        <label
          htmlFor="role-search-input"
          className="text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Cari Posisi &amp; Keahlian
        </label>
        <span className="hidden text-xs font-medium text-slate-400 sm:inline">
          Tekan{" "}
          <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans text-[11px] font-semibold text-slate-600">
            /
          </kbd>{" "}
          untuk mencari
        </span>
      </div>

      <div className="group/search relative w-full">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/search:text-indigo-600"
        />

        <input
          ref={inputRef}
          id="role-search-input"
          type="text"
          role="searchbox"
          aria-label="Cari posisi atau skill"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              if (hasValue) {
                e.preventDefault();
                handleClear();
              } else {
                inputRef.current?.blur();
              }
            }
          }}
          placeholder="Cari posisi, skill (mis. React, Figma, SQL), atau lokasi..."
          autoComplete="off"
          spellCheck="false"
          className="min-h-[44px] w-full rounded-xl border border-slate-200/90 bg-white py-2.5 pr-20 pl-10 text-sm text-slate-900 shadow-2xs transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
        />

        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Hapus pencarian"
            title={
              typeof totalResults === "number"
                ? `Hapus pencarian (${totalResults} hasil)`
                : "Hapus pencarian"
            }
            className="absolute top-1/2 right-2.5 inline-flex min-h-[30px] -translate-y-1/2 cursor-pointer items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Hapus</span>
          </button>
        )}
      </div>
    </div>
  );
}
