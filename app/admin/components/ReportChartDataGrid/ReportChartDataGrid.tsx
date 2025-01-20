import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ReactNode } from "react";

interface ReportChartDataGridProps<T extends object> {
  items: T[];
  cells: (item: T, columnKey: string | number) => ReactNode;
  columns: any;
  emptyContent?: string;
  dataGridKey?: string;
}

const ReportChartDataGrid = <T extends object>({
  items,
  emptyContent,
  dataGridKey,
  cells,
  columns,
}: ReportChartDataGridProps<T>) => {
  return (
    <Table
      className="col-span-12"
      classNames={{
        wrapper: "bg-white shadow-none border border-gray-200 gap-4",
      }}
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
      <TableBody emptyContent={emptyContent} items={items}>
        {(item) => (
          <TableRow key={item[dataGridKey]}>
            {(columnKey) => <TableCell>{cells(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ReportChartDataGrid;
