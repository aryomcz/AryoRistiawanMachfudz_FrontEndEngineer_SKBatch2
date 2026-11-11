"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RoleCard } from "@/components/features/role-explorer/role-card";
import { SIMULATED_LOADING_DELAY_MS } from "@/lib/constants";
import { RoleDetailSkeleton } from "@/app/roles/[id]/loading";
import { ArrowLeft, ArrowRight, Check, MapPin, MoveRight } from "lucide-react";

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

  return (
    <div className="mx-auto w-full max-w-6xl min-w-0 flex-1 space-y-8 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none sm:text-sm"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Eksplorasi Peran</span>
        </Link>

        <Link
          href={`/?dept=${role.department}`}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none sm:text-sm"
        >
          <span>Lihat semua di {role.departmentLabel}</span>
          <MoveRight size={16} />
        </Link>
      </div>

      {/* Hero Banner Card with Clean Hierarchy */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
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
              <span className="inline-flex items-center rounded-md bg-indigo-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
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
                <MapPin className="text-indigo-400" size={15} />
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
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Detailed Role Information & Photo Gallery */}
        <div className="space-y-6 lg:col-span-2">
          {/* About the Role & Complete Skill List (Progressive Disclosure) */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs sm:p-8">
            <h2 className="font-heading text-lg font-semibold text-slate-900 sm:text-xl">
              Tentang Peran Ini
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {role.summary} Sebagai{" "}
              <strong className="font-semibold text-slate-900">
                {role.title}
              </strong>{" "}
              di departemen{" "}
              <strong className="font-semibold text-indigo-600">
                {role.departmentLabel}
              </strong>
              , kamu akan terlibat langsung dalam siklus pengembangan produk
              SekolahKarir yang digunakan oleh ribuan talenta muda di seluruh
              Indonesia.
            </p>

            {/* Full Skills List */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Keahlian &amp; Teknologi Utama
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-indigo-100 bg-indigo-50/70 px-3 py-1.5 text-xs font-semibold text-indigo-700 sm:text-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Photo Gallery: Suasana Kerja & Kolaborasi Tim */}
          {role.galleryImages && role.galleryImages.length > 0 && (
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs sm:p-8">
              <div>
                <h2 className="font-heading text-lg font-semibold text-slate-900 sm:text-xl">
                  Suasana Kerja &amp; Kolaborasi Tim
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Potret keseharian dan budaya kolaboratif di tim{" "}
                  {role.departmentLabel} SekolahKarir.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {role.galleryImages.map((img, index) => (
                  <figure
                    key={img.url}
                    className="group overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50"
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
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs sm:p-8">
            <h2 className="font-heading text-lg font-semibold text-slate-900 sm:text-xl">
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
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600"
                  >
                    <Check size={13} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs sm:p-8">
            <h2 className="font-heading text-lg font-semibold text-slate-900 sm:text-xl">
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
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Benefits & Perks */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs sm:p-8">
            <h2 className="font-heading text-lg font-semibold text-slate-900 sm:text-xl">
              Benefit &amp; Fasilitas di SekolahKarir
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {role.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                  >
                    <Check size={13} />
                  </span>
                  <span className="text-xs font-medium leading-relaxed text-slate-700 sm:text-sm">
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
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
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
                <dd className="font-heading text-base font-bold text-indigo-600">
                  {role.salaryRange}
                </dd>
              </div>
            </dl>

            <div className="mt-6 space-y-2.5">
              <Link
                href="/masuk"
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span>Lamar Posisi Ini</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/"
                className="flex min-h-[42px] w-full cursor-pointer items-center justify-center rounded-xl border border-slate-200/90 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none sm:text-sm"
              >
                Jelajahi Posisi Lainnya
              </Link>
            </div>
          </div>

          {/* Team Lead / Hiring Manager Profile Card */}
          {role.teamLead && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
              <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Hiring Lead &amp; Mentor
              </p>
              <div className="mt-3.5 flex items-center gap-3.5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                  <Image
                    src={role.teamLead.avatar}
                    alt={role.teamLead.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-heading text-sm font-semibold text-slate-900 sm:text-base">
                    {role.teamLead.name}
                  </p>
                  <p className="truncate text-xs font-medium text-indigo-600">
                    {role.teamLead.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 rounded-xl bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-600 italic">
                &ldquo;Kami mencari rekan tim yang tidak hanya andal secara
                teknis, tetapi juga peduli pada dampak nyata bagi kemajuan karir
                talenta muda Indonesia.&rdquo;
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Related Roles Section */}
      {relatedRoles.length > 0 && (
        <section className="border-t border-slate-200/80 pt-10">
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
              className="inline-flex min-h-[38px] items-center rounded-xl border border-slate-200/90 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:text-sm"
            >
              Lihat Semua Posisi →
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
