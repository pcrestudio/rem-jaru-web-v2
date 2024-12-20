"use client";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import React, { FC, useCallback, useState } from "react";
import { UpsertTodoDto } from "@/app/dto/todos/upsert-todo-instance.dto";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "@nextui-org/shared-icons";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { userColumns } from "@/app/admin/usuarios/components/user-datagrid/columns/userColumns";
import { Chip } from "@nextui-org/chip";
import { mappingRole } from "@/config/mapping_role";

interface UserDataGridProps {}

const UserDataGrid: FC<UserDataGridProps> = () => {
  const [user, setUser] = useState<GetUserDto>(null);
  const [open, setOpen] = useState<boolean>(false);

  const selectUser = (user: GetUserDto) => {
    setUser(user);
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

  const onSubmit = async (payload: UpsertTodoDto) => {};

  return (
    <>
      <CustomDataGrid<GetUserDto>
        endpointUrl={`auth/users?`}
        columns={userColumns}
        dataGridKey="id"
        cells={renderCell}
        emptyContent="Sin usuarios."
        totalItemsText="Usuarios totales:"
        onAddChange={() => setOpen(true)}
      />
    </>
  );
};

export default UserDataGrid;
