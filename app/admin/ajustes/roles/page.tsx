"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import RolesDataGrid from "@/app/admin/ajustes/roles/components/RolesDataGrid/RolesDataGrid";
import RoleModal from "@/app/admin/ajustes/roles/components/RoleModal/RoleModal";
import { GetRoleDto } from "@/app/dto/role/get-role.dto";
import { UpsertRoleDto } from "@/app/dto/role/upsert-role.dto";
import { upsertRole } from "@/app/api/role/role";

export default function Roles() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [role, setRole] = useState<GetRoleDto | null>(null);

  const handleClose = () => {
    setOpen(false);
    setRole(null);
  };

  const toggleSelectedItem = (item: GetRoleDto) => {
    setRole(item);
    setOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (payload: UpsertRoleDto) => {
    const { data } = await upsertRole({
      ...payload,
      id: role?.id ?? 0,
    });

    if (data && role) {
      toast.success("Rol modificado con éxito.");
      handleClose();
    } else {
      toast.success("Rol creado con éxito.");
      setOpen(false);
    }
  };

  return (
    <div className="page-settings !px-6">
      <BreadcrumbsPath pathname={pathname} />

      <RoleModal
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        role={role}
        title={role ? "Editar rol" : "Nuevo rol"}
        onCloseChange={handleClose}
      />

      <RolesDataGrid
        toggleSelectedItem={toggleSelectedItem}
        onAddChange={handleOpen}
      />
    </div>
  );
}
