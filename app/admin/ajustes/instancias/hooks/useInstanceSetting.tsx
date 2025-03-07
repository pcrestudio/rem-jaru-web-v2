"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "@heroui/react";
import { DeleteIcon, EditIcon } from "@heroui/shared-icons";

import { GetStepDto } from "@/app/dto/instance/get-instance.dto";
import { UpsertInstanceStepDto } from "@/app/dto/instance/upsert-instance-step.dto";
import {
  deleteInstanceStep,
  upsertInstanceStep,
} from "@/app/api/instances/instances";

interface UseInstanceSettingHookProps {
  isOpen: boolean;
  confirm: boolean;
  instanceStep: GetStepDto;
  handleStepSettingForm: (instanceId: number) => void;
  handleStepSettingSubmit: (payload: UpsertInstanceStepDto) => void;
  handleCloseStepSettingForm: () => void;
  handleToggleConfirm: () => Promise<void>;
  handleToggleClose: () => void;
  pathname?: string;
  renderCell: (item: GetStepDto, columnKey: string | number) => ReactNode;
}

const useInstanceSetting = (): UseInstanceSettingHookProps => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [instanceId, setInstanceId] = useState<number>(0);
  const [instanceStep, setInstanceStep] = useState<GetStepDto | null>(null);

  const handleStepSettingForm = (
    instanceId: number,
    instanceStep?: GetStepDto,
  ) => {
    setInstanceId(instanceId);
    setInstanceStep(instanceStep);

    setIsOpen(true);
  };

  const handleStepSettingSubmit = async (payload: UpsertInstanceStepDto) => {
    const { data } = await upsertInstanceStep({
      ...payload,
      instanceId,
    });

    if (data) {
      toast.success("Paso agregado con éxito.");
      setInstanceId(0);

      return setIsOpen(false);
    }
  };

  const handleCloseStepSettingForm = () => {
    setIsOpen(false);
    setInstanceId(0);
    setInstanceStep(null);
  };

  const handleToggleConfirm = async () => {
    const { data } = await deleteInstanceStep(instanceStep);

    if (data) {
      toast.success("Paso eliminado.");
      setInstanceStep(null);

      return setConfirm(false);
    }
  };

  const handleToggleClose = () => {
    setConfirm(false);
    setInstanceStep(null);
  };

  const renderCell = useCallback(
    (item: GetStepDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar paso">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 action-button"
                  role="presentation"
                  onClick={() => handleStepSettingForm(item.instanceId, item)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar paso">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50 action-button"
                  role="presentation"
                  onClick={() => {
                    setConfirm(true);
                    setInstanceStep(item);
                  }}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  return {
    pathname,
    isOpen,
    confirm,
    instanceStep,
    handleStepSettingForm: handleStepSettingForm,
    handleStepSettingSubmit,
    handleCloseStepSettingForm,
    renderCell,
    handleToggleConfirm,
    handleToggleClose,
  };
};

export default useInstanceSetting;
