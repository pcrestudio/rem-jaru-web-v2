"use client";

import React, { FC, useCallback, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "@nextui-org/shared-icons";
import { Chip } from "@nextui-org/chip";
import toast from "react-hot-toast";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { userColumns } from "@/app/admin/usuarios/components/user-datagrid/columns/userColumns";
import { mappingRole } from "@/config/mapping_role";
import UserModal from "@/app/admin/usuarios/components/UserModal";
import { UpsertUserDto } from "@/app/dto/user/user-register.dto";
import { upsertUser } from "@/app/api/user/user";

interface UserDataGridProps {}

const UserDataGrid: FC<UserDataGridProps> = () => {
  const [user, setUser] = useState<GetUserDto>(null);
  const [open, setOpen] = useState<boolean>(false);

  const selectUser = (user: GetUserDto) => {
    const roleId = user?.UserRole[0]?.roleId;

    setUser({ ...user, roleId: roleId ?? null });
    setOpen(true);
  };

  const renderCell = useCallback(
    (item: GetUserDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "fullName":
          return `${item.firstName} ${item.lastName}`;

        case "role":
          return item.UserRole.length > 0
            ? mappingRole[item.UserRole[0]?.role.name]
            : "Sin rol";

        case "isActive":
          return (
            <Chip className={cellValue ? "bg-green-100 text-green-900" : ""}>
              {cellValue ? "Activo" : "Inactivo"}
            </Chip>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar usuario">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => selectUser(item)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  const handleClose = () => {
    setOpen(false);
    setUser(null);
  };

  const onSubmit = async (payload: UpsertUserDto) => {
    const { data } = await upsertUser(payload);

    if (data) {
      handleClose();

      toast.success("Usuario registrado con éxito.");
    }
  };

  return (
    <>
      <UserModal
        handleSubmit={onSubmit}
        isOpen={open}
        title={user ? "Editar usuario" : "Nuevo usuario"}
        user={user}
        onCloseChange={handleClose}
      />

      <CustomDataGrid<GetUserDto>
        hasAddButton
        addButtonText="Nuevo usuario"
        cells={renderCell}
        columns={userColumns}
        dataGridKey="id"
        emptyContent="Sin usuarios."
        endpointUrl={`users?`}
        totalItemsText="Usuarios totales:"
        onAddChange={() => setOpen(true)}
      />
    </>
  );
};

export default UserDataGrid;
