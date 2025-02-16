"use client";

import React, { FC, useCallback, useState } from "react";
import { Tooltip } from "@heroui/react";
import { EditIcon } from "@heroui/shared-icons";
import { AiOutlineUnlock } from "react-icons/ai";
import { Chip } from "@heroui/chip";
import toast from "react-hot-toast";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { userColumns } from "@/app/admin/usuarios/components/user-datagrid/columns/userColumns";
import { mappingRole } from "@/config/mapping_role";
import UserModal from "@/app/admin/usuarios/components/UserModal";
import { UpsertUserDto } from "@/app/dto/user/user-register.dto";
import { togglerUser, upsertUser } from "@/app/api/user/user";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";

interface UserDataGridProps {}

const UserDataGrid: FC<UserDataGridProps> = () => {
  const [user, setUser] = useState<GetUserDto>(null);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const selectUser = (user: GetUserDto) => {
    const roleId = user?.UserRole[0]?.roleId;

    setUser({ ...user, roleId: roleId ?? null });
    setOpen(true);
  };

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

  const toggleSelectedItem = (user: GetUserDto) => {
    setUser(user);
    setConfirm(true);
  };

  const toggleUserHelper = async () => {
    const { data } = await togglerUser({
      id: user.id,
    });

    if (data) {
      toast.success("La sesión del usuario fue desbloqueado.");
      setConfirm(false);
    }
  };

  const handleConfirmModalClose = () => {
    setUser(null);
    setConfirm(false);
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

        case "studio":
          return item.studio ? (
            <Chip className="text-xs" variant="faded">
              {item.studio.name}
            </Chip>
          ) : (
            "-"
          );

        case "isLocked":
          return (
            <Chip
              className={`${cellValue ? "bg-danger" : "bg-primary"} text-white text-xs`}
            >
              {cellValue ? "Bloqueado" : "No bloqueado"}
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

              {item?.isLocked && (
                <Tooltip content="Desbloquear sesión">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    role="presentation"
                    onClick={() => toggleSelectedItem(item)}
                  >
                    <AiOutlineUnlock />
                  </span>
                </Tooltip>
              )}
            </div>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <>
      <UserModal
        handleSubmit={onSubmit}
        isOpen={open}
        title={user ? "Editar usuario" : "Nuevo usuario"}
        user={user}
        onCloseChange={handleClose}
      />

      <ConfirmModal
        description={{
          __html: `Por razones de seguridad, hemos bloqueado la sesión de este usuario debido a múltiples intentos fallidos de inicio de sesión.`,
        }}
        isOpen={confirm}
        title={`¿Deseas desbloquear el inicio de sesión de este usuario?`}
        onClose={handleConfirmModalClose}
        onConfirm={toggleUserHelper}
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
