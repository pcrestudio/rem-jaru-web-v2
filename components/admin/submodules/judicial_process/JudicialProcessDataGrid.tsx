import React, { FC } from "react";
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
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";
import { Chip } from "@nextui-org/chip";

export interface JudicialProcessDataGridProps {
  judicialProcesses: GetJudicialProcessDto[];
  onOpenChange: () => void;
  setSelectedItem: (judicialProcess: GetJudicialProcessDto) => void;
  toggleSelectedItem: (judicialProcess: GetJudicialProcessDto) => void;
}

const JudicialProcessDataGrid: FC<JudicialProcessDataGridProps> = ({
  judicialProcesses,
  onOpenChange,
  setSelectedItem,
  toggleSelectedItem,
}) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [statusFilter, setStatusFilter] = React.useState("all");

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredJudicialProcess = [...judicialProcesses];

    if (hasSearchFilter) {
      filteredJudicialProcess = filteredJudicialProcess.filter((user) =>
        user.demanded.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredJudicialProcess;
  }, [judicialProcesses, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
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

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[46%]"
            placeholder="Buscar por código de expediente, demandado, demandante, etc ..."
            startContent={<AiOutlineSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Button
            className="standard-btn w-auto text-white"
            endContent={<AiOutlinePlus />}
            onClick={onOpenChange}
          >
            Nuevo Expediente
          </Button>
        </div>
      </div>
    );
  }, [filterValue, judicialProcesses.length]);

  const renderCell = React.useCallback(
    (judicialProcess: GetJudicialProcessDto, columnKey: string | number) => {
      const cellValue = judicialProcess[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar expediente">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => setSelectedItem(judicialProcess)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Desactivar expediente">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
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
