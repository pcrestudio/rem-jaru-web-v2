"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

import {
  GetGroupedMastersDto,
  GetMastersDto,
} from "@/app/dto/masters/get-masters.dto";
import { UpsertMasterDto } from "@/app/dto/masters/upsert-master.dto";
import { upsertMaster } from "@/app/api/master-option/master-option";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";

interface UseMasterSettingHookProps {
  openMaster: boolean;
  isSettingSection: boolean;
  handleMasterModalChange: (
    masters?: GetMastersDto[],
    moduleName?: string,
  ) => void;
  handleMasterSubmit: (payload: UpsertMasterDto) => void;
  handleCloseMasterModal: () => void;
  handleOpenSettingSectionModal: () => void;
  groupedData?: any;
  pathname?: string;
}

const useMasterSettingHook = (): UseMasterSettingHookProps => {
  const { data } = useSWR<GetGroupedMastersDto>(
    `${environment.baseUrl}/masters`,
    fetcher,
  );

  const pathname = usePathname();
  const groupedData = data ? Object.entries(data) : [];
  const [open, setOpen] = useState<boolean>(false);
  const [isSettingSection, setSettingSection] = useState<boolean>(false);
  const [moduleId, setModuleId] = useState<number>(0);
  const handleModalChange = (masters: GetMastersDto[], moduleName: string) => {
    const module = masters.find(
      (m: GetMastersDto) => m.module?.name === moduleName,
    );

    if (module) setModuleId(module.id);

    setOpen(true);
  };

  const handleMasterSubmit = async (payload: UpsertMasterDto) => {
    const { data } = await upsertMaster({
      ...payload,
      moduleId: moduleId !== 0 ? moduleId : null,
    });

    if (data) {
      toast.success("Maestro agregado con éxito.");
      setModuleId(0);
      setSettingSection(false);

      return setOpen(false);
    }
  };

  const handleCloseMasterModal = () => {
    setOpen(false);
    setSettingSection(false);
  };

  const handleOpenSettingSectionModal = () => {
    setOpen(true);
    setSettingSection(true);
  };

  return {
    groupedData,
    pathname,
    openMaster: open,
    isSettingSection,
    handleMasterModalChange: handleModalChange,
    handleMasterSubmit,
    handleCloseMasterModal,
    handleOpenSettingSectionModal,
  };
};

export default useMasterSettingHook;
