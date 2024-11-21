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
import { EditIcon } from "@nextui-org/shared-icons";
import { Button } from "@mui/material";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { GetAttributeRulesDto } from "@/app/dto/attribute-values/get-attribute-rules.dto";
import { attributeRulesColumns } from "@/components/admin/ajustes/attribute-rules-datagrid/columns/attribute-rules.columns";
import { Input } from "@nextui-org/input";

export interface AttributeRulesDataGridProps {
  rules: GetAttributeRulesDto[];
  onOpenChange?: () => void;
  onSelectionChange?: (keys: string) => void;
  loading?: boolean;
}

const AttributeRulesDataGrid: FC<AttributeRulesDataGridProps> = ({
  rules,
  onOpenChange,
  onSelectionChange,
  loading,
}) => {
  const renderCell = useCallback(
    (item: GetAttributeRulesDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar atributo">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
            </div>
          );

        case "triggerAttributeId":
          return item.triggerAttribute.label;

        case "targetAttributeId":
          return item.targetAttribute.label;

        default:
          return cellValue;
      }
    },
    [],
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[46%]"
            placeholder="Buscar reglas"
            startContent={<AiOutlineSearch />}
          />
          <Button
            className="text-cerulean-500 text-sm flex flex-row items-center !normal-case"
            onClick={onOpenChange}
            endIcon={<AiOutlinePlus size={16} />}
          >
            Agregar regla
          </Button>
        </div>
      </div>
    );
  }, [rules.length]);

  return (
    <>
      <Table
        topContent={topContent}
        selectionMode="single"
        onSelectionChange={(key) => {
          const isPopoverButtonClick = (event: any) => {
            return event.target.closest("[data-popover-button]");
          };

          if (!isPopoverButtonClick(event)) {
            onSelectionChange(JSON.stringify(key["anchorKey"]));
          }
        }}
        classNames={{
          wrapper: "shadow-none border border-gray-200 gap-1",
          table: "mt-5",
          th: "bg-[#919EAB14]/5 text-cerulean-950 font-bold",
          thead: "[&>tr]:first:rounded-none rounded-lg",
        }}
      >
        <TableHeader columns={attributeRulesColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={rules ?? []}
          emptyContent={"Sin reglas para este atributo."}
          isLoading={loading}
        >
          {(item) => (
            <TableRow key={JSON.stringify(item)}>
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

export default AttributeRulesDataGrid;
