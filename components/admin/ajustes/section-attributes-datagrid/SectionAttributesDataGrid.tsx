import React, { FC, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@heroui/react";
import { EditIcon } from "@heroui/shared-icons";
import { Chip } from "@heroui/chip";
import { Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { SettingsIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  DataType,
  GetSectionAttributesDto,
  RowLayout,
} from "@/app/dto/attribute-values/get-section-attributes.dto";
import { sectionAttributesOptionColumns } from "@/components/admin/ajustes/section-attributes-datagrid/columns/section-attribute.columns";
import useStore from "@/lib/store";
import { canUse, CanUsePermission } from "@/utils/can_use_permission";

export interface SectionAttributesDataGridProps {
  attributes: GetSectionAttributesDto[];
  selectedAttribute: (sectionAttribute: GetSectionAttributesDto) => void;
  selectedConfigureOption: (sectionAttribute: GetSectionAttributesDto) => void;
  onOpenChange?: () => void;
  onSectionAttributeModalOpenChange?: () => void;
  sectionId?: number;
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

    case DataType.TEXTAREA:
      return {
        background: "bg-blue-100",
        label: "Texto en área",
      };

    case DataType.DATE:
      return {
        background: "bg-sky-100",
        label: "Fecha",
      };

    case DataType.INTEGER:
      return {
        background: "bg-purple-100",
        label: "Númerico",
      };

    case DataType.FLOAT:
      return {
        background: "bg-purple-100",
        label: "Númerico en decimales",
      };

    case DataType.FILE:
      return {
        background: "bg-indigo-100",
        label: "Archivo",
      };

    default:
      return {
        background: "bg-green-100",
        label: "Texto",
      };
  }
};

const rowLayoutBG = (
  rowLayout: RowLayout,
): {
  background: string;
  label: string;
} => {
  switch (rowLayout) {
    case RowLayout.single:
      return {
        background: "bg-cerulean-100",
        label: "Único",
      };

    case RowLayout.twoColumns:
      return {
        background: "bg-blue-100",
        label: "Dos columnas",
      };

    default:
      return {
        background: "bg-green-100",
        label: "Tres columnas",
      };
  }
};

const SectionAttributesDataGrid: FC<SectionAttributesDataGridProps> = ({
  attributes,
  selectedAttribute,
  onSectionAttributeModalOpenChange,
  selectedConfigureOption,
  sectionId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useStore();
  const canAdd = !canUse(user.role, CanUsePermission.addExtendedAttributes);

  const renderCell = useCallback(
    (item: GetSectionAttributesDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {item.dataType === DataType.LIST &&
                canUse(
                  user.role,
                  CanUsePermission.editExtendedAttributesOptions,
                ) && (
                  <Tooltip content={"Configurar opciones"}>
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <SettingsIcon
                        size={18}
                        onClick={() => selectedConfigureOption(item)}
                      />
                    </span>
                  </Tooltip>
                )}
              {canUse(user.role, CanUsePermission.editExtendedAttributes) && (
                <Tooltip content="Editar atributo">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon onClick={() => selectedAttribute(item)} />
                  </span>
                </Tooltip>
              )}
            </div>
          );

        case "rowLayout":
          return (
            <Chip
              className={`${rowLayoutBG(cellValue as RowLayout).background}`}
            >
              {rowLayoutBG(cellValue as RowLayout).label}
            </Chip>
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
        bottomContent={
          <>
            {sectionId !== 1000 && (
              <div className="flex flex-row justify-end border border-b-0 border-l-0 border-r-0 border-t-gray-200 p-3">
                <Button
                  className="text-cerulean-500 text-sm flex flex-row items-center !normal-case"
                  disabled={canAdd}
                  endIcon={<AiOutlinePlus size={16} />}
                  onClick={onSectionAttributeModalOpenChange}
                >
                  Agregar otro atributo
                </Button>
              </div>
            )}
          </>
        }
        classNames={{
          wrapper: "bg-transparent border-none p-0 gap-1 mb-2",
          table: "",
          th: "bg-[#919EAB14]/5 text-cerulean-950 font-bold",
          thead: "[&>tr]:first:rounded-none rounded-lg",
        }}
      >
        <TableHeader columns={sectionAttributesOptionColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Sin atributos."} items={attributes ?? []}>
          {(item) => (
            <TableRow key={item.sectionAttributeId ?? item.globalAttributeId}>
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

/*
* {(item.dataType === DataType.INTEGER ||
                item.dataType === DataType.TEXT ||
                item.dataType === DataType.FLOAT) && (
                <Tooltip content={"Configurar reglas y condiciones"}>
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    role="presentation"
                    onClick={() =>
                      router.push(
                        `${pathname}/reglas/${item.sectionAttributeId}?name=${item.label}&moduleId=${item.moduleId}`,
                        {},
                      )
                    }
                  >
                    <AiOutlineSisternode size={18} />
                  </span>
                </Tooltip>
              )}
* */
