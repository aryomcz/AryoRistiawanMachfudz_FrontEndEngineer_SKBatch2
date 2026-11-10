import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { RoleDetailView } from "@/components/features/role-explorer/role-detail-view";
import {
  getAllRoles,
  getRoleById,
  getRelatedRoles,
} from "@/services/role.service";

export function generateStaticParams() {
  const roles = getAllRoles();
  return roles.map((role) => ({
    id: role.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const role = getRoleById(id);

  if (!role) {
    return {
      title: "Posisi Tidak Ditemukan -SekolahKarir",
    };
  }

  return {
    title: `${role.title} (${role.departmentLabel}) -SekolahKarir`,
    description: role.summary,
  };
}

export default async function RoleDetailPage({ params }) {
  const { id } = await params;
  const role = getRoleById(id);

  if (!role) {
    notFound();
  }

  const relatedRoles = getRelatedRoles(role.id, role.department, 2);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
      <Header />

      <RoleDetailView role={role} relatedRoles={relatedRoles} />

      <footer className="mt-16 border-t border-slate-200/80 bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 SekolahKarir. Seluruh hak cipta dilindungi.</p>
          <p>Frontend Engineer Mini Assignment -Batch 2</p>
        </div>
      </footer>
    </div>
  );
}
