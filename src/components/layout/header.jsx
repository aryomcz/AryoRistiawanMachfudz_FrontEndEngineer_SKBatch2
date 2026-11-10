"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "CV & Lamaran",
    href: "/cv-lamaran",
    matchPrefixes: ["/cv-lamaran"],
    hasDropdown: true,
    dropdownWidth: "w-72",
    dropdownItems: [
      {
        title: "Cek CV",
        description: "CV Scanner: skor dan temuannya",
        href: "/cv-lamaran",
      },
      {
        title: "Buat / perbaiki CV",
        description: "AI CV Builder",
        href: "/cv-lamaran",
      },
      {
        title: "Cari lowongan",
        description: "Job Portal",
        href: "/#role-explorer",
      },
      {
        title: "Panduan & template",
        description: "Interview, CV, dan lamaran",
        href: "/cv-lamaran",
      },
    ],
  },
  {
    label: "Portofolio",
    href: "/portofolio",
    matchPrefixes: ["/portofolio"],
    hasDropdown: true,
    dropdownWidth: "w-72",
    dropdownItems: [
      {
        title: "Proyek yang dibuka",
        description: "Brief, output, dan rubriknya",
        href: "/portofolio",
      },
      {
        title: "Cara kerja & contoh",
        description: "Simulasi dari ambil proyek sampai hasil",
        href: "/portofolio",
      },
      {
        title: "Side Hustle Arena",
        description: "Latihan proyek untuk portofolio",
        href: "/portofolio",
      },
    ],
  },
  {
    label: "Karir & Peran",
    href: "/",
    matchPrefixes: ["/", "/roles"],
    hasDropdown: true,
    dropdownWidth: "w-72",
    dropdownItems: [
      {
        title: "Eksplorasi Peran",
        description: "Daftar posisi terbuka Batch 2",
        href: "/#role-explorer",
      },
      {
        title: "Filter Departemen",
        description: "Saring posisi sesuai bidang keahlian",
        href: "/#role-explorer",
      },
      {
        title: "Detail & Kualifikasi",
        description: "Lihat tanggung jawab & skill tiap peran",
        href: "/#role-explorer",
      },
      {
        title: "Proses Seleksi",
        description: "Alur rekrutmen Sekolah Karir",
        href: "/#role-explorer",
      },
    ],
  },
  {
    label: "Program",
    href: "/program",
    matchPrefixes: ["/program"],
    hasDropdown: false,
  },
  {
    label: "Lainnya",
    href: "/lainnya",
    matchPrefixes: ["/lainnya"],
    hasDropdown: true,
    dropdownWidth: "w-52",
    dropdownItems: [
      {
        title: "Review Alumni",
        href: "/lainnya",
      },
      {
        title: "Tentang Kami",
        href: "/lainnya",
      },
      {
        title: "Kontak",
        href: "/lainnya",
      },
    ],
  },
];

const MOBILE_DRAWER_SECTIONS = [
  {
    category: "CV & LAMARAN",
    items: [
      {
        title: "Cek CV",
        description: "CV Scanner: skor dan temuannya",
        href: "/cv-lamaran",
      },
      {
        title: "Buat / perbaiki CV",
        description: "AI CV Builder",
        href: "/cv-lamaran",
      },
      {
        title: "Cari lowongan",
        description: "Job Portal",
        href: "/#role-explorer",
      },
      {
        title: "Panduan & template",
        description: "Interview, CV, dan lamaran",
        href: "/cv-lamaran",
      },
    ],
  },
  {
    category: "PORTOFOLIO",
    items: [
      {
        title: "Proyek yang dibuka",
        description: "Brief, output, dan rubriknya",
        href: "/portofolio",
      },
      {
        title: "Cara kerja & contoh",
        description: "Simulasi dari ambil proyek sampai hasil",
        href: "/portofolio",
      },
      {
        title: "Side Hustle Arena",
        description: "Latihan proyek untuk portofolio",
        href: "/portofolio",
      },
    ],
  },
  {
    category: "KARIR & PERAN",
    items: [
      {
        title: "Eksplorasi Peran",
        description: "Daftar posisi terbuka Batch 2",
        href: "/#role-explorer",
      },
      {
        title: "Filter Departemen",
        description: "Saring posisi sesuai bidang keahlian",
        href: "/#role-explorer",
      },
      {
        title: "Detail & Kualifikasi",
        description: "Lihat tanggung jawab & skill tiap peran",
        href: "/#role-explorer",
      },
      {
        title: "Proses Seleksi",
        description: "Alur rekrutmen Sekolah Karir",
        href: "/#role-explorer",
      },
    ],
  },
  {
    category: "LAINNYA",
    items: [
      {
        title: "Review Alumni",
        description: "Testimoni dan pencapaian alumni",
        href: "/lainnya",
      },
      {
        title: "Tentang Kami",
        description: "Visi dan misi Sekolah Karir",
        href: "/lainnya",
      },
      {
        title: "Kontak",
        description: "Hubungi tim kami",
        href: "/lainnya",
      },
    ],
  },
];

function isNavItemActive(item, pathname) {
  if (!pathname) return item.href === "/";

  return item.matchPrefixes.some((prefix) => {
    if (prefix === "/") {
      return pathname === "/";
    }
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

function ChevronDownIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function HeaderContent({ pathname }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  const isMasukActive = pathname === "/masuk" || pathname?.startsWith("/masuk/");

  // Auto-hide navbar when scrolling down, reveal when scrolling up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 24) {
        setIsNavbarHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 64) {
        setIsNavbarHidden(true);
      } else if (currentScrollY < lastScrollY - 4) {
        setIsNavbarHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll & handle Escape key when mobile drawer is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        onFocusCapture={() => setIsNavbarHidden(false)}
        className={cn(
          "fixed top-0 z-30 w-full px-3 pt-3 pb-2 transition-transform duration-300 ease-in-out motion-reduce:transition-none sm:px-6 sm:pt-4 lg:px-8",
          isNavbarHidden && !isMobileMenuOpen
            ? "-translate-y-full pointer-events-none"
            : "translate-y-0"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-white/90 bg-[#EDF2F7]/95 px-3.5 py-2 shadow-sm backdrop-blur-md sm:px-6 sm:py-2.5">
          {/* Left: SekolahKarir Logo + Brand Wordmark */}
          <Link
            href="/"
            className="inline-flex min-w-0 shrink-0 items-center gap-2 rounded-full py-1 pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2 sm:gap-2.5 sm:pr-2"
          >
            <Image
              src="/logo.png"
              alt="Logo SekolahKarir"
              width={32}
              height={32}
              priority
              className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8"
            />
            <span className="font-heading text-base font-semibold tracking-tight sm:text-xl">
              <span className="text-slate-900">Sekolah</span>
              <span className="text-[#0066FF]">Karir</span>
            </span>
          </Link>

          {/* Center: Dynamic Navigation Links (Desktop Only) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(item, pathname);

              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]",
                      isActive
                        ? "bg-white font-semibold text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:bg-white/60 hover:text-slate-900 group-hover:bg-white group-hover:text-slate-900 group-hover:shadow-2xs"
                    )}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDownIcon
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180",
                          isActive
                            ? "text-slate-900"
                            : "text-slate-500 group-hover:text-slate-900"
                        )}
                      />
                    )}
                  </Link>

                  {item.hasDropdown && item.dropdownItems && (
                    <div
                      className={cn(
                        "invisible opacity-0 pointer-events-none translate-y-1.5 group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 absolute top-full pt-3 transition-all duration-200 ease-out z-50",
                        item.dropdownAlign === "right" ? "right-0" : "left-0"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-xl shadow-slate-900/10 backdrop-blur-md",
                          item.dropdownWidth || "w-72"
                        )}
                      >
                        <div className="flex flex-col gap-0.5">
                          {item.dropdownItems.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="group/item flex flex-col rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:bg-slate-50"
                            >
                              <span className="text-[13px] font-semibold text-slate-800 transition-colors group-hover/item:text-[#0057FF]">
                                {subItem.title}
                              </span>
                              {subItem.description && (
                                <span className="mt-0.5 text-xs text-slate-500">
                                  {subItem.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Desktop & Mobile Action Pill Buttons */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Primary Blue Pill -Desktop Only */}
            <Link
              href="/#role-explorer"
              className="hidden min-h-11 cursor-pointer items-center justify-center rounded-full bg-[#0057FF] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-[#0046CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 lg:inline-flex"
            >
              Pilih kebutuhanmu
            </Link>

            {/* Masuk Pill Button -Visible on Both Mobile & Desktop */}
            <Link
              href="/masuk"
              aria-current={isMasukActive ? "page" : undefined}
              className={cn(
                "inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-sm",
                isMasukActive
                  ? "bg-white text-[#0057FF] shadow-2xs ring-1 ring-[#0057FF]/30"
                  : "bg-[#DCE3EC] text-slate-900 hover:bg-[#CED7E4]"
              )}
            >
              Masuk
            </Link>

            {/* Circular Hamburger Menu Button -Mobile & Tablet Only */}
            <button
              type="button"
              aria-label="Buka menu navigasi"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#DCE3EC] text-slate-900 transition-colors duration-150 hover:bg-[#CED7E4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 sm:h-11 sm:w-11 lg:hidden"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi SekolahKarir"
          id="mobile-navigation-drawer"
        >
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-over Panel */}
          <div className="fixed inset-y-0 right-0 z-10 flex w-[86%] max-w-[340px] flex-col bg-white shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]"
              >
                <Image
                  src="/logo.png"
                  alt="Logo SekolahKarir"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
                <span className="font-heading text-base font-semibold tracking-tight">
                  <span className="text-slate-900">Sekolah</span>
                  <span className="text-[#0066FF]">Karir</span>
                </span>
              </Link>

              <button
                type="button"
                aria-label="Tutup menu navigasi"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {/* Account Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="font-heading text-sm font-bold text-slate-900">
                  Punya akun Sekolah Karir?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Satu akun untuk Tools, Arena, dan tiket event.
                </p>
                <Link
                  href="/masuk"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-3.5 flex min-h-10 w-full items-center justify-center rounded-xl bg-[#0057FF] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#0046CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
                >
                  Masuk / Daftar
                </Link>
              </div>

              {/* Navigation Sections */}
              <div className="mt-6 space-y-6">
                {MOBILE_DRAWER_SECTIONS.map((section) => (
                  <div key={section.category}>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {section.category}
                    </p>
                    <ul className="mt-2.5 space-y-1">
                      {section.items.map((item) => {
                        const isItemActive =
                          item.href === "/"
                            ? pathname === "/"
                            : pathname === item.href ||
                              pathname?.startsWith(`${item.href}/`);

                        return (
                          <li key={item.title}>
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              aria-current={isItemActive ? "page" : undefined}
                              className={cn(
                                "group flex items-center justify-between gap-3 rounded-xl px-2.5 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]",
                                isItemActive
                                  ? "bg-blue-50/80"
                                  : "hover:bg-slate-50"
                              )}
                            >
                              <div className="min-w-0">
                                <p
                                  className={cn(
                                    "font-heading text-sm font-bold transition-colors",
                                    isItemActive
                                      ? "text-[#0057FF]"
                                      : "text-slate-900 group-hover:text-[#0057FF]"
                                  )}
                                >
                                  {item.title}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-slate-500">
                                  {item.description}
                                </p>
                              </div>
                              <ChevronRightIcon
                                className={cn(
                                  "h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5",
                                  isItemActive
                                    ? "text-[#0057FF]"
                                    : "text-slate-400 group-hover:text-[#0057FF]"
                                )}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DynamicHeaderWithPathname() {
  const pathname = usePathname();
  return <HeaderContent pathname={pathname} />;
}

export function Header() {
  return (
    <Suspense fallback={<HeaderContent pathname="/" />}>
      <DynamicHeaderWithPathname />
    </Suspense>
  );
}

export default Header;
