import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { ReactNode } from "react";
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
  const topContent = React.useMemo(() => {
    return (
      hasAddButton && (
        <div className="flex flex-col gap-4">
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
      classNames={{
        wrapper:
          "min-h-[222px] bg-transparent shadow-none border border-slate-200",
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
