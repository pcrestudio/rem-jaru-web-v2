import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { ReactNode, useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@nextui-org/button";

interface CustomDataGridProps<T extends object> {
  columns: any;
  items: T[];
  dataGridKey?: string;
  cells?: (item: any, columnKey: string | number) => ReactNode;
  onAddChange?: () => void;
  emptyContent?: string;
  hasAddButton?: boolean;
  addButtonText?: string;
}

const CustomDataGrid = <T extends object>({
  columns,
  items,
  onAddChange,
  dataGridKey,
  cells,
  emptyContent,
  hasAddButton,
  addButtonText,
}: CustomDataGridProps<T>) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(items.length / rowsPerPage);

  const topContent = React.useMemo(() => {
    return (
      hasAddButton && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-3 items-end">
            <p></p>
            <Button
              className="standard-btn w-auto text-white"
              endContent={<AiOutlinePlus />}
              onClick={onAddChange}
            >
              {addButtonText}
            </Button>
          </div>
        </div>
      )
    );
  }, [items.length]);

  return (
    <Table
      className="col-span-12"
      topContent={topContent}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "bg-white",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column["key"]}>{column["label"]}</TableColumn>
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
