"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { RoleCard } from "@/components/features/role-explorer/role-card";
import { SIMULATED_LOADING_DELAY_MS } from "@/lib/constants";
import { RoleDetailSkeleton } from "@/app/roles/[id]/loading";
import { ArrowLeft, ArrowRight, Check, MapPin, MoveRight } from "lucide-react";

const WORK_TYPE_GLASS_VARIANT = {
  Remote: "glass-success",
  Hybrid: "glass-warning",
  "On-site": "glass",
};

const WORK_TYPE_DOT = {
  Remote: "bg-emerald-400",
  Hybrid: "bg-amber-400",
  "On-site": "bg-slate-300",
};

export function RoleDetailView({ role, relatedRoles }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, SIMULATED_LOADING_DELAY_MS);

    return () => clearTimeout(timer);
  }, [role.id]);

  if (isLoading) {
    return <RoleDetailSkeleton />;
  }

  const workTypeGlassVariant =
    WORK_TYPE_GLASS_VARIANT[role.workType] || "glass";
  const workTypeDotColor = WORK_TYPE_DOT[role.workType] || "bg-slate-300";

  return (
    <div className="mx-auto w-full max-w-6xl min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/80 px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs backdrop-blur-md transition-colors hover:border-[#0057FF]/40 hover:bg-white hover:text-[#0057FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] sm:text-sm"
        >
          <ArrowLeft size={16} />
          Kembali ke Eksplorasi Peran
        </Link>

        <Link
          href={`/?dept=${role.department}`}
          className="rounded-xl inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 text-xs font-bold text-[#0057FF] backdrop-blur-md transition-colors hover:bg-blue-500/15 sm:text-sm"
        >
          Lihat semua di {role.departmentLabel} <ArrowRight size={16}/>
        </Link>
      </div>

      {/* Hero Banner Card with Cover Photo & All Glassmorphism Badges */}
      <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xs">
        <div className="relative h-56 w-full bg-slate-900 sm:h-72 lg:h-80">
          <Image
            src={role.coverImage}
            alt={`Suasana kerja tim ${role.departmentLabel} di SekolahKarir`}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="object-cover opacity-80"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/10"
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            {/* Single Eyebrow Badge + Posted At */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-lg bg-blue-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                {role.departmentLabel}
              </span>
              <span className="text-xs font-medium text-slate-300">
                Dipublikasikan {role.postedAt}
              </span>
            </div>

            <h1 className="mt-2.5 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {role.title}
            </h1>

            {/* Calm Inline Metadata Row */}
            <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-medium text-slate-200 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="text-blue-400" size={15} />
                {role.location}
              </span>
              <span aria-hidden="true" className="text-slate-500">
                •
              </span>
              <span>{role.workType}</span>
              <span aria-hidden="true" className="text-slate-500">
                •
              </span>
              <span>{role.employmentType}</span>
              <span aria-hidden="true" className="text-slate-500">
                •
              </span>
              <span>{role.level}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Layout */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Detailed Role Information & Photo Gallery */}
        <div className="space-y-6 lg:col-span-2">
          {/* About the Role */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs sm:p-8">
            <h2 className="font-heading text-xl font-bold text-slate-900">
              Tentang Peran Ini
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {role.summary} Sebagai{" "}
              <strong className="font-semibold text-slate-900">
                {role.title}
              </strong>{" "}
              di departemen{" "}
              <strong className="font-semibold text-[#0057FF]">
                {role.departmentLabel}
              </strong>
              , kamu akan terlibat langsung dalam siklus pengembangan produk
              SekolahKarir yang digunakan oleh ribuan talenta muda di seluruh
              Indonesia.
            </p>

            {/* Glassmorphism Skills Tags */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Keahlian &amp; Teknologi Utama
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-blue-200/60 bg-blue-500/10 px-3.5 py-1.5 text-xs font-bold text-[#0057FF] shadow-2xs backdrop-blur-md sm:text-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Dummy Photo Gallery: Suasana Kerja & Kolaborasi Tim */}
          {role.galleryImages && role.galleryImages.length > 0 && (
            <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs sm:p-8">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Suasana Kerja &amp; Kolaborasi Tim
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Potret keseharian dan budaya kolaboratif di tim{" "}
                    {role.departmentLabel} SekolahKarir.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {role.galleryImages.map((img, index) => (
                  <figure
                    key={img.url}
                    className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50"
                  >
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-200">
                      <Image
                        src={img.url}
                        alt={img.caption || `Aktivitas tim ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 260px"
                        className="object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="p-3 text-xs font-medium leading-snug text-slate-600">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Key Responsibilities */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs sm:p-8">
            <h2 className="font-heading text-xl font-bold text-slate-900">
              Tanggung Jawab Utama
            </h2>
            <ul className="mt-4 space-y-3">
              {role.responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-200/60 bg-blue-500/10 text-[#0057FF] backdrop-blur-xs"
                  >
                    <Check size={14} className="font-bold" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs sm:p-8">
            <h2 className="font-heading text-xl font-bold text-slate-900">
              Kualifikasi &amp; Persyaratan
            </h2>
            <ul className="mt-4 space-y-3">
              {role.requirements.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0057FF]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Benefits & Perks */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs sm:p-8">
            <h2 className="font-heading text-xl font-bold text-slate-900">
              Benefit &amp; Fasilitas di SekolahKarir
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {role.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-200/60 bg-emerald-500/15 text-emerald-700 backdrop-blur-xs"
                  >
                    <Check size={14} className="font-bold" />
                  </span>
                  <span className="text-xs font-semibold leading-relaxed text-slate-700 sm:text-sm">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar: Sticky Summary Card & Hiring Manager Profile */}
       <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
          {/* Role Summary & Apply Box */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs">
            <h2 className="font-heading text-base font-semibold text-slate-900 sm:text-lg">
              Ringkasan Posisi
            </h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Departemen</dt>
                <dd className="font-semibold text-slate-900">
                  {role.departmentLabel}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Sistem Kerja</dt>
                <dd className="font-semibold text-slate-900">
                  {role.workType}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Status</dt>
                <dd className="font-semibold text-slate-900">
                  {role.employmentType}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Level</dt>
                <dd className="font-semibold text-slate-900">{role.level}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Lokasi</dt>
                <dd className="font-semibold text-slate-900">
                  {role.location}
                </dd>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <dt className="text-xs text-slate-500">
                  Estimasi Kompensasi Bulanan
                </dt>
                <dd className="font-heading text-base font-bold text-blue-600">
                  {role.salaryRange}
                </dd>
              </div>
            </dl>

            <div className="mt-6 space-y-2.5">
              <Link
                href="/masuk"
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-950 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span>Lamar Posisi Ini</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/"
                className="flex min-h-[42px] w-full cursor-pointer items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none sm:text-sm"
              >
                Jelajahi Posisi Lainnya
              </Link>
            </div>
          </div>

          {/* Team Lead / Hiring Manager Dummy Profile Card */}
          {role.teamLead && (
            <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Hiring Lead &amp; Mentor
              </p>
              <div className="mt-3.5 flex items-center gap-3.5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-blue-100 bg-slate-100">
                  <Image
                    src={role.teamLead.avatar}
                    alt={role.teamLead.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-heading text-base font-bold text-slate-900">
                    {role.teamLead.name}
                  </p>
                  <p className="truncate text-xs font-medium text-[#0057FF]">
                    {role.teamLead.role}
                  </p>
                </div>
              </div>
              <p className="mt-3.5 rounded-2xl bg-[#F8FAFC] p-3.5 text-xs italic leading-relaxed text-slate-600">
                &ldquo;Kami mencari rekan tim yang tidak hanya andal secara
                teknis, tetapi juga peduli pada dampak nyata bagi kemajuan
                karir talenta muda Indonesia.&rdquo;
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Related Roles Section */}
      {relatedRoles.length > 0 && (
        <section className="mt-14 border-t border-slate-200/80 pt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-heading text-xl font-bold text-slate-900">
                Posisi Terbuka Lainnya
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Peluang karir lain di SekolahKarir yang mungkin cocok untukmu.
              </p>
            </div>
             <Link
              href="/"
              className="inline-flex gap-2 min-h-[38px] items-center rounded-xl border border-slate-200/90 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:text-sm"
            >
              Lihat Semua Posisi <ArrowRight size={14}/>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {relatedRoles.map((related) => (
              <RoleCard key={related.id} role={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
