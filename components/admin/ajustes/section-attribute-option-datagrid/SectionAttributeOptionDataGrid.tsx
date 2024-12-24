import React, { FC, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";
import { Chip } from "@nextui-org/chip";

import { sectionAttributeOptionColumns } from "@/components/admin/ajustes/section-attribute-option-datagrid/columns/section-attribute-option.columns";
import { GetSectionAttributeOptionDto } from "@/app/dto/attribute-values/get-section-attribute-option.dto";

export interface AttributeSectionAttributesDataGridProps {
  attributeOptions: GetSectionAttributeOptionDto[];
  selectedItem: (sectionAttributeOption: GetSectionAttributeOptionDto) => void;
  onOpenChange?: () => void;
}

const SectionAttributeOptionDataGrid: FC<
  AttributeSectionAttributesDataGridProps
> = ({ attributeOptions, selectedItem }) => {
  const renderCell = useCallback(
    (item: GetSectionAttributeOptionDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar opción">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon onClick={() => selectedItem(item)} />
                </span>
              </Tooltip>
              <Tooltip
                color="danger"
                content={item.isActive ? "Desactivar opción" : "Activar opción"}
              >
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );

        case "isActive":
          return (
            <Chip className={cellValue ? "bg-green-100 text-green-900" : ""}>
              {cellValue ? "Activo" : "Inactivo"}
            </Chip>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <>
      <Table
        classNames={{
          wrapper:
            "bg-transparent shadow-none p-0 border border-gray-200 gap-1",
          table: "",
          th: "bg-[#919EAB14]/5 text-cerulean-950 font-bold",
          thead: "[&>tr]:first:rounded-none rounded-lg",
        }}
      >
        <TableHeader columns={sectionAttributeOptionColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Sin opciones."}
          items={attributeOptions ?? []}
        >
          {(item) => (
            <TableRow
              key={
                item.sectionAttributeOptionId ?? item.globalAttributeOptionId
              }
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default SectionAttributeOptionDataGrid;
