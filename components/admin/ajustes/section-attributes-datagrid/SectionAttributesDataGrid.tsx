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
import { Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import {
  DataType,
  GetSectionAttributesDto,
} from "@/app/dto/attribute-values/get-section-attributes.dto";
import { sectionAttributesOptionColumns } from "@/components/admin/ajustes/section-attributes-datagrid/columns/section-attribute.columns";
import { SettingsIcon } from "lucide-react";

export interface SectionAttributesDataGridProps {
  attributes: GetSectionAttributesDto[];
  selectedAttribute: (sectionAttribute: GetSectionAttributesDto) => void;
  selectedConfigureOption: (sectionAttribute: GetSectionAttributesDto) => void;
  onOpenChange?: () => void;
  onSectionAttributeModalOpenChange?: () => void;
}

const dataTypeChigBG = (
  dataType: DataType,
): {
  background: string;
  label: string;
} => {
  switch (dataType) {
    case DataType.LIST:
      return {
        background: "bg-cerulean-100",
        label: "Listado",
      };

    default:
      return {
        background: "bg-green-100",
        label: "Texto",
      };
  }
};

const SectionAttributesDataGrid: FC<SectionAttributesDataGridProps> = ({
  attributes,
  selectedAttribute,
  onSectionAttributeModalOpenChange,
  selectedConfigureOption,
}) => {
  const renderCell = useCallback(
    (item: GetSectionAttributesDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {item.dataType === DataType.LIST && (
                <Tooltip content={"Configurar opciones"}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <SettingsIcon
                      size={18}
                      onClick={() => selectedConfigureOption(item)}
                    />
                  </span>
                </Tooltip>
              )}
              <Tooltip content="Editar atributo">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon onClick={() => selectedAttribute(item)} />
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

        case "dataType":
          return (
            <Chip
              className={`${dataTypeChigBG(cellValue as DataType).background}`}
            >
              {dataTypeChigBG(cellValue as DataType).label}
            </Chip>
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
            "bg-transparent shadow-none p-0 border border-gray-200 gap-1 mb-2",
          table: "",
          th: "bg-[#919EAB14]/5 text-cerulean-950 font-bold",
          thead: "[&>tr]:first:rounded-none rounded-lg",
        }}
        bottomContent={
          <div className="flex flex-row justify-end border border-b-0 border-l-0 border-r-0 border-t-gray-200 p-3">
            <Button
              className="text-cerulean-500 text-sm flex flex-row items-center !normal-case"
              onClick={onSectionAttributeModalOpenChange}
              endIcon={<AiOutlinePlus size={16} />}
            >
              Agregar otro atributo
            </Button>
          </div>
        }
      >
        <TableHeader columns={sectionAttributesOptionColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={attributes ?? []} emptyContent={"Sin opciones."}>
          {(item) => (
            <TableRow key={item.sectionAttributeId}>
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

export default SectionAttributesDataGrid;
