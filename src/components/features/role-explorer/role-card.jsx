import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin } from "lucide-react";

const WORK_TYPE_VARIANT = {
  Remote: "success",
  Hybrid: "warning",
  "On-site": "default",
};

const WORK_TYPE_DOT = {
  Remote: "bg-emerald-500",
  Hybrid: "bg-amber-500",
  "On-site": "bg-slate-400",
};

const MAX_VISIBLE_SKILLS = 3;

export function RoleCard({ role }) {
  const workTypeBadgeVariant = WORK_TYPE_VARIANT[role.workType] || "default";
  const workTypeDotColor = WORK_TYPE_DOT[role.workType] || "bg-slate-400";
  const visibleSkills = role.skills.slice(0, MAX_VISIBLE_SKILLS);
  const remainingSkillsCount = Math.max(
    0,
    role.skills.length - MAX_VISIBLE_SKILLS
  );

  return (
    <article className="group relative flex h-full min-h-[296px] flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-all duration-200 motion-reduce:transition-none hover:-translate-y-0.5 hover:border-[#0057FF]/40 hover:shadow-md focus-within:border-[#0057FF] focus-within:ring-2 focus-within:ring-[#0057FF]/20">
      <div>
        {/* Top Row: Department Pill + WorkType Pill */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="primary" className="px-3 py-1 font-semibold">
            {role.departmentLabel}
          </Badge>
          <Badge variant={workTypeBadgeVariant} className="px-3 py-1 font-semibold">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${workTypeDotColor}`}
            />
            {role.workType}
          </Badge>
        </div>

        {/* Role Title & Structured Subtitle */}
        <div className="mt-4">
          <h3
            title={role.title}
            className="line-clamp-1 font-heading text-[19px] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#0057FF]"
          >
            {role.title}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-500">
            <span className="text-slate-700">{role.level}</span>
            <span aria-hidden="true" className="text-slate-300">
              •
            </span>
            <span>{role.employmentType}</span>
            <span aria-hidden="true" className="text-slate-300">
              •
            </span>
            <span className="font-medium text-slate-400">{role.postedAt}</span>
          </div>
        </div>

        {/* Role Summary (Fixed 2-line height for grid alignment) */}
        <p className="mt-3.5 min-h-[2.75rem] line-clamp-2 text-sm leading-relaxed text-slate-600">
          {role.summary}
        </p>
      </div>

      <div className="mt-5">
        {/* Compact Single-Row Skills with +N overflow badge */}
        <ul
          aria-label="Keahlian utama"
          className="flex flex-wrap items-center gap-1.5"
        >
          {visibleSkills.map((skill) => (
            <li
              key={skill}
              className="whitespace-nowrap rounded-full border border-slate-200/80 bg-[#F8FAFC] px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {skill}
            </li>
          ))}
          {remainingSkillsCount > 0 && (
            <li
              title={role.skills.slice(MAX_VISIBLE_SKILLS).join(", ")}
              className="whitespace-nowrap rounded-full bg-[#EDF2F7] px-2.5 py-1 text-xs font-bold text-slate-600"
            >
              +{remainingSkillsCount}
            </li>
          )}
        </ul>

        {/* Clean 2-Column Footer: Location (Left) + Pill CTA (Right) */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-slate-500">
           <MapPin size={16} className="text-slate-400"/>
            <span className="truncate">{role.location}</span>
          </div>

          <Link
            href={`/roles/${role.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#EDF2F7] px-3.5 py-1.5 text-xs font-bold text-slate-800 transition-colors duration-150 group-hover:bg-[#0057FF] group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2"
          >
            <span>Lihat Detail</span>
           <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
