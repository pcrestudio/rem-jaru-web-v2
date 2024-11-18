import React, { FC, useCallback, useState } from "react";
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
import { Button, Popover } from "@mui/material";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { GetAttributeRulesDto } from "@/app/dto/attribute-values/get-attribute-rules.dto";
import { attributeRulesColumns } from "@/components/admin/ajustes/attribute-rules-datagrid/columns/attribute-rules.columns";
import { Input } from "@nextui-org/input";
import AttributeRulesConditionForm from "@/components/admin/ajustes/attribute-rules-condition-form/AttributeRulesConditionForm";
import attributeRuleConditionSchema from "@/app/validations/create-attribute-rule-condition.validation";
import attributeRuleSchema from "@/app/validations/create-attribute-rule.validation";

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [attributeRule, setAttributeRule] =
    useState<GetAttributeRulesDto | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: GetAttributeRulesDto,
  ) => {
    setAnchorEl(event.currentTarget);
    setAttributeRule(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
              <Button
                data-popover-button
                aria-describedby={id}
                onClick={(event) => handleClick(event, item)}
              >
                Presiona
              </Button>
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-root": {
            zIndex: 1500,
          },
        }}
        disablePortal={false}
      >
        <AttributeRulesConditionForm
          onSubmit={(data) => console.log(data)}
          validationSchema={attributeRuleSchema}
        />
      </Popover>
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
