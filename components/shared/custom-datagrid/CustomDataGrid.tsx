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
  emptyContent?: string;
  hasAddButton?: boolean;
  hasExcelButton?: boolean;
  addButtonText?: string;
  totalItemsText?: string;
  items?: T[];
}

const CustomDataGrid = <T extends object>({
  columns,
  onAddChange,
  dataGridKey,
  cells,
  emptyContent,
  hasAddButton,
  hasExcelButton,
  addButtonText,
  endpointUrl,
  totalItemsText,
}: CustomDataGridProps<T>) => {
  const {
    items,
    topContent,
    page,
    onChangePage,
    totalPages,
    onRowsPerPageChange,
  } = useCustomDataGrid<T>({
    endpointUrl,
    hasAddButton,
    hasExcelButton,
    addButtonText,
    onAddChange,
  });

  return (
    <Table
      className="col-span-12"
      topContent={topContent}
      bottomContent={
        <div className="flex w-full justify-between">
          <div className="flex flex-row gap-4 items-center">
            <p className="text-foreground text-small">
              {totalItemsText ?? "Fichas totales:"} <b>{items?.length}</b>
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
          <label className="flex items-center text-foreground text-small">
            Datos entre:
            <select
              className="bg-transparent outline-none text-foreground text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      }
      classNames={{
        wrapper: "bg-white",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column["key"]}
            width={column["width"] ? column["width"] : null}
            allowsSorting={column["sortable"] ?? null}
          >
            {column["label"]}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} emptyContent={emptyContent}>
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
