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
} from "@heroui/react";
import { DeleteIcon, EditIcon } from "@heroui/shared-icons";
import { Chip } from "@heroui/chip";
import useSWR from "swr";
import { Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import toast from "react-hot-toast";

import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";
import { masterOptionColumns } from "@/components/admin/ajustes/master-option-datagrid/columns/master-option.columns";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import MasterOptionModal from "@/components/admin/ajustes/master-dialog/MasterOptionModal";
import { CreateMasterOptionDto } from "@/app/dto/masters/create-master-option.dto";
import {
  createMasterOption,
  editMasterOption,
  toggleMasterOption,
} from "@/app/api/master-option/master-option";
import { EditMasterOptionDto } from "@/app/dto/masters/edit-master-option.dto";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";

export interface MasterOptionDataGridProps {
  masterId?: number;
}

const MasterOptionDataGrid: FC<MasterOptionDataGridProps> = ({ masterId }) => {
  const { data } = useSWR<GetMasterOptionsDto[]>(
    `${environment.baseUrl}/masters/options?id=${masterId}`,
    fetcher,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [masterOption, setMasterOption] = useState<GetMasterOptionsDto | null>(
    null,
  );

  const selectedItem = (option: GetMasterOptionsDto) => {
    setMasterOption(option);
    setIsOpen(true);
  };

  const handleCloseMasterOptionModal = () => {
    setMasterOption(null);
    setIsOpen(false);
  };

  const toggleSelectedItem = (masterOption: GetMasterOptionsDto) => {
    setMasterOption(masterOption);
    setConfirm(true);
  };

  const toggleMasterOptionHelper = async () => {
    const { data } = await toggleMasterOption({
      id: masterOption.id,
      isActive: Boolean(masterOption.isActive),
    });

    if (data) {
      setConfirm(false);
      toast.success("El maestro se actualizó correctamente.");
    }
  };

  const renderCell = useCallback(
    (item: GetMasterOptionsDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar opción">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => selectedItem(item)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip
                color="danger"
                content={item.isActive ? "Desactivar opción" : "Activar opción"}
              >
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => toggleSelectedItem(item)}
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

  const onSubmit = async (payload: CreateMasterOptionDto) => {
    if (masterOption) {
      const { data } = await editMasterOption({
        ...(payload as EditMasterOptionDto),
        masterId: Number(masterId),
      });

      if (data) {
        toast.success("El maestro se editó correctamente.");

        setMasterOption(null);
      }

      return data;
    }

    const { data } = await createMasterOption({
      ...payload,
      masterId: Number(masterId),
    });

    if (data) {
      toast.success("El maestro se creó correctamente.");
      handleCloseMasterOptionModal();
    }

    return data;
  };

  const handleConfirmModalClose = () => {
    setMasterOption(null);
    setConfirm(false);
  };

  return (
    <>
      <ConfirmModal
        description={{
          __html: `Estás seguro de realizar esta acción, esta opción no será eliminada y tampoco podrá utilizarse en ningún módulo.`,
        }}
        isOpen={confirm}
        title={`${masterOption ? `¿Deseas ${masterOption.isActive ? "desactivar" : "activar"} esta opción?` : ""}`}
        onClose={handleConfirmModalClose}
        onConfirm={toggleMasterOptionHelper}
      />
      <MasterOptionModal
        handleSubmit={onSubmit}
        isOpen={isOpen}
        masterId={masterId}
        masterOption={masterOption}
        title={masterOption ? "Editar opción" : "Nueva opción"}
        onClose={handleCloseMasterOptionModal}
      />
      <Table
        bottomContent={
          <div className="flex flex-row justify-end border border-b-0 border-l-0 border-r-0 border-t-gray-200 p-3">
            <Button
              className="text-cerulean-500 text-sm flex flex-row gap-1"
              endIcon={<AiOutlinePlus />}
              onClick={() => setIsOpen(true)}
            >
              Agregar opción
            </Button>
          </div>
        }
        classNames={{
          wrapper:
            "bg-transparent shadow-none p-0 border border-gray-200 gap-1",
          table: "",
          th: "bg-[#919EAB14]/5 text-cerulean-950 font-bold",
          thead: "[&>tr]:first:rounded-none rounded-lg",
        }}
      >
        <TableHeader columns={masterOptionColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Sin opciones."} items={data ?? []}>
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
