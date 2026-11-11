import { EmptyState } from "@/components/shared/empty-state";
import { RoleCard } from "./role-card";
import { RoleCardSkeleton } from "./role-card-skeleton";

const SKELETON_COUNT = 6;

export function RoleGrid({
  roles,
  isLoading,
  activeDepartment,
  activeDepartmentLabel,
  searchQuery = "",
  onResetFilter,
  onClearSearch,
}) {
  return (
    <section aria-labelledby="role-grid-heading">
      <h2 id="role-grid-heading" className="sr-only">
        Daftar Posisi Karir
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <RoleCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : roles.length === 0 ? (
        <EmptyState
          departmentLabel={activeDepartmentLabel}
          activeDepartment={activeDepartment}
          searchQuery={searchQuery}
          onReset={onResetFilter}
          onClearSearch={onClearSearch}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      )}
    </section>
  );
}
