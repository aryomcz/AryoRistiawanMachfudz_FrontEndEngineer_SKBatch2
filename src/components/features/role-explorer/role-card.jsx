import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MAX_VISIBLE_SKILLS = 2;

export function RoleCard({ role }) {
  const visibleSkills = role.skills.slice(0, MAX_VISIBLE_SKILLS);
  const remainingSkillsCount = Math.max(
    0,
    role.skills.length - MAX_VISIBLE_SKILLS
  );

  return (
    <Link
      href={`/roles/${role.id}`}
      className="group block h-full rounded-3xl focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
    >
      <article className="flex h-full min-h-60 flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 transition-all duration-200 motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:border-blue-300 group-hover:shadow-md">
        <div>
          {/* Chunk 1 — Header (Micro-group) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                {role.departmentLabel}
              </span>
              <span className="text-xs font-normal text-slate-400">
                {role.postedAt}
              </span>
            </div>

            <h3
              title={role.title}
              className="line-clamp-1 font-heading text-lg font-semibold tracking-tight leading-snug text-slate-900 transition-colors group-hover:text-blue-600"
            >
              {role.title}
            </h3>
          </div>

          {/* Chunk 2 — Core Metadata & Summary */}
          <div className="mt-2 mb-5 space-y-3">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-medium text-slate-600">
              <span>{role.location}</span>
              <span aria-hidden="true" className="text-slate-300">
                •
              </span>
              <span>{role.workType}</span>
              <span aria-hidden="true" className="text-slate-300">
                •
              </span>
              <span>{role.employmentType}</span>
            </div>

            <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
              {role.summary}
            </p>
          </div>
        </div>

        {/* Chunk 3 — Footer */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
              >
                {skill}
              </span>
            ))}
            {remainingSkillsCount > 0 && (
              <span
                title={role.skills.slice(MAX_VISIBLE_SKILLS).join(", ")}
                className="rounded bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-400"
              >
                +{remainingSkillsCount}
              </span>
            )}
          </div>

          <Button
            as="span"
            variant="cardCta"
            size="sm"
            rounded="xl"
            className="shrink-0 gap-1.5 whitespace-nowrap"
          >
            <span>Lihat Detail</span>
            <ArrowUpRight size={14} />
          </Button>
        </div>
      </article>
    </Link>
  );
}