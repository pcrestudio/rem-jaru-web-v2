import { FC, useCallback } from "react";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";

import rolesColumns from "@/app/admin/ajustes/roles/components/RolesDataGrid/columns/rolesColumns";
import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetRoleDto } from "@/app/dto/role/get-role.dto";

interface RolesDataGridProps {
  toggleSelectedItem: (todo: GetRoleDto) => void;
  onAddChange: () => void;
}

const RolesDataGrid: FC<RolesDataGridProps> = ({
  toggleSelectedItem,
  onAddChange,
}) => {
  const renderCell = useCallback(
    (role: GetRoleDto, columnKey: string | number) => {
      const cellValue = role[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar rol">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => toggleSelectedItem(role)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Desactivar rol">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  role="presentation"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );

        case "id":
          return <p>{role.id}</p>;

        case "title":
          return <p>{role.title}</p>;

        case "description":
          return <p>{role.description}</p>;

        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <CustomDataGrid<GetRoleDto>
      hasAddButton
      addButtonText="Nuevo rol"
      cells={renderCell}
      columns={rolesColumns}
      dataGridKey="userId"
      emptyContent="Sin roles configurados."
      endpointUrl="roles/filter?"
      totalItemsText="Roles totales:"
      onAddChange={onAddChange}
    />
  );
};

export default RolesDataGrid;
