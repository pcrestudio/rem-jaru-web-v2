import React, { FC, useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";
import { Chip } from "@nextui-org/chip";
import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";
import { masterOptionColumns } from "@/components/admin/ajustes/master-option-datagrid/columns/master-option.columns";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import MasterOptionModal from "@/components/admin/ajustes/master-dialog/MasterOptionModal";
import { CreateMasterOptionDto } from "@/app/dto/masters/create-master-option.dto";
import {
  createMasterOption,
  editMasterOption,
} from "@/app/api/master-option/master-option";
import { EditMasterOptionDto } from "@/app/dto/masters/edit-master-option.dto";

export interface MasterOptionDataGridProps {
  masterId?: number;
}

const MasterOptionDataGrid: FC<MasterOptionDataGridProps> = ({ masterId }) => {
  const { data, error, isLoading } = useSWR<GetMasterOptionsDto[]>(
    `${environment.baseUrl}/masters/options?id=${masterId}`,
    fetcher,
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [masterOption, setMasterOption] = useState<GetMasterOptionsDto | null>(
    null,
  );

  const selectedItem = (option: GetMasterOptionsDto) => {
    setMasterOption(option);
    onOpenChange();
  };

  const renderCell = useCallback(
    (item: GetMasterOptionsDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar expediente">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => selectedItem(item)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Desactivar expediente">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
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

  const onSubmit = async (payload: CreateMasterOptionDto) => {
    if (masterOption) {
      const { data } = await editMasterOption({
        ...(payload as EditMasterOptionDto),
        masterId: Number(masterId),
      });

      onOpenChange();
      setMasterOption(null);

      return data;
    }

    const { data } = await createMasterOption({
      ...payload,
      masterId: Number(masterId),
    });

    return data;
  };

  return (
    <>
      <MasterOptionModal
        isOpen={isOpen}
        onClose={onOpenChange}
        masterId={masterId}
        title={masterOption ? "Editar opción" : "Nueva opción"}
        handleSubmit={onSubmit}
        masterOption={masterOption}
      />
      <Table
        aria-label="Example table with client side pagination"
        classNames={{
          wrapper: "min-h-[222px] mb-2",
        }}
      >
        <TableHeader columns={masterOptionColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data ?? []} emptyContent={"Sin opciones."}>
          {(item) => (
            <TableRow key={item.id}>
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

export default MasterOptionDataGrid;
