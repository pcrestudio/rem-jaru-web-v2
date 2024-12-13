import { FC, useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";
import { Chip } from "@nextui-org/chip";
import { useRouter } from "next/navigation";

export interface JudicialProcessDataGridProps {
  judicialProcesses: GetJudicialProcessDto[];
  toggleSelectedItem: (judicialProcess: GetJudicialProcessDto) => void;
}

const JudicialProcessDataGrid: FC<JudicialProcessDataGridProps> = ({
  judicialProcesses,
  toggleSelectedItem,
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  const filteredItems = useMemo(() => {
    let filteredJudicialProcess = [...judicialProcesses];

    if (hasSearchFilter) {
      filteredJudicialProcess = filteredJudicialProcess.filter((user) =>
        user.demanded.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredJudicialProcess;
  }, [judicialProcesses, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const columns = [
    {
      key: "fileCode",
      label: "Código de Expediente",
    },
    {
      key: "demanded",
      label: "Demandante",
    },
    {
      key: "plaintiff",
      label: "Demandado",
    },
    {
      key: "coDefendant",
      label: "Co-Demandado",
    },
    {
      key: "isActive",
      label: "Activo",
    },
    { key: "actions", label: "Opciones" },
  ];

  const renderCell = useCallback(
    (judicialProcess: GetJudicialProcessDto, columnKey: string | number) => {
      const cellValue = judicialProcess[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar expediente">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => {
                    const currentPath = window.location.pathname;
                    router.push(`${currentPath}/edit/${judicialProcess?.id}`);
                  }}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Desactivar expediente">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => toggleSelectedItem(judicialProcess)}
                >
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
    <Table
      aria-label="Example table with client side pagination"
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
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent={"Sin expedientes."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default JudicialProcessDataGrid;
