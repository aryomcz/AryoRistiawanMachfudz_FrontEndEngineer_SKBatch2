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
    </div>
  );
}
