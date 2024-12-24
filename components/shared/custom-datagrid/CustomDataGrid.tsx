import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

import useCustomDataGrid from "@/components/states/useCustomDataGrid";

interface CustomDataGridProps<T extends object> {
  endpointUrl: string;
  columns: any;
  dataGridKey?: string;
  cells?: (item: any, columnKey: string | number) => ReactNode;
  onAddChange?: () => void;
  onExportableExcel?: () => void;
  emptyContent?: string;
  hasAddButton?: boolean;
  hasExcelButton?: boolean;
  addButtonText?: string;
  totalItemsText?: string;
  items?: T[];
  storeItems?: T[];
}

const CustomDataGrid = <T extends object>({
  columns,
  onAddChange,
  onExportableExcel,
  dataGridKey,
  cells,
  emptyContent,
  hasAddButton,
  hasExcelButton,
  addButtonText,
  endpointUrl,
  totalItemsText,
  storeItems = [],
}: CustomDataGridProps<T>) => {
  const {
    items,
    topContent,
    page,
    onChangePage,
    pageSize,
    totalPages,
    total,
    onRowsPerPageChange,
  } = useCustomDataGrid<T>({
    endpointUrl,
    hasAddButton,
    hasExcelButton,
    addButtonText,
    onAddChange,
    onExportableExcel,
  });

  return (
    <Table
      bottomContent={
        <div className="flex w-full justify-between">
          <div className="flex flex-row gap-4 items-center">
            <p className="text-foreground text-small">
              {totalItemsText ?? "Fichas totales:"} <b>{total}</b>
            </p>
          </div>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={onChangePage}
          />
          <label className="flex items-center gap-1 text-foreground text-small">
            Filas de:
            <select
              className="bg-transparent outline-none text-foreground text-xs"
              defaultValue={pageSize}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      }
      className="col-span-12"
      classNames={{
        wrapper: "bg-white",
      }}
      topContent={topContent}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column["key"]}
            allowsSorting={column["sortable"] ?? null}
            width={column["width"] ? column["width"] : null}
          >
            {column["label"]}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        items={items && items.length === 0 ? storeItems : items}
      >
        {(item) => (
          <TableRow key={item[dataGridKey]}>
            {(columnKey) => <TableCell>{cells(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomDataGrid;
