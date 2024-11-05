"use client";

import JudicialProcessDataGrid from "@/components/admin/submodules/judicial_process/JudicialProcessDataGrid";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import { usePathname } from "next/navigation";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import { useDisclosure } from "@nextui-org/react";
import JudicialProcessModal from "@/components/admin/submodules/judicial_process/JudicialProcessModal";
import { useState } from "react";
import { CreateJudicialProcessDto } from "@/app/dto/submodule/judicial_process/create-judicial-process.dto";
import {
  createJudicialProcess,
  editJudicialProcess,
  toggleJudicialProcess,
} from "@/app/api/judicial-process/judicial-process";
import { EditJudicialProcessDto } from "@/app/dto/submodule/judicial_process/edit-judicial-process.dto";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";

export default function ProcesoJudicialSlug() {
  const pathname: string = usePathname();
  const slug: string = pathname.split("/")[3];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [judicialProcess, setJudicialProcess] =
    useState<GetJudicialProcessDto | null>(null);

  const setSelectedItem = (judicialProcess: GetJudicialProcessDto) => {
    setJudicialProcess(judicialProcess);
    setTimeout(() => onOpenChange(), 100);
  };

  const toggleSelectedItem = (judicialProcess: GetJudicialProcessDto) => {
    setJudicialProcess(judicialProcess);
    setConfirm(true);
  };

  const toggleJudicialProcessHelper = async () => {
    const { data } = await toggleJudicialProcess({
      id: judicialProcess.id,
      isActive: Boolean(judicialProcess.isActive),
    });

    if (data) {
      setConfirm(false);
    }
  };

  const onSubmit = async (payload: CreateJudicialProcessDto) => {
    if (judicialProcess) {
      const { data } = await editJudicialProcess(
        {
          ...(payload as EditJudicialProcessDto),
          id: judicialProcess.id,
        },
        slug,
      );

      setJudicialProcess(undefined);

      onOpenChange();

      return data;
    }

    const { data } = await createJudicialProcess(payload, slug);

    onOpenChange();

    return data;
  };

  const handleClose = () => {
    setSelectedItem(undefined);
    onOpenChange();
  };

  const handleConfirmModalClose = () => {
    setJudicialProcess(undefined);
    setConfirm(false);
  };

  const { data, error, isLoading } = useSWR<GetJudicialProcessDto[]>(
    `${environment.baseUrl}/judicial_processes?slug=${mappingRevertSubmodules[slug]}`,
    fetcher,
  );

  return (
    data && (
      <>
        <ConfirmModal
          title={`${judicialProcess ? `¿Deseas ${judicialProcess.isActive ? "desactivar" : "activar"} el expediente?` : ""}`}
          description={{
            __html: `Estás seguro de realizar esta acción, este expediente no será eliminado y tampoco podrá utilizarse como medio de extracción para la plataforma <b>CEJ</b>.`,
          }}
          isOpen={confirm}
          onClose={handleConfirmModalClose}
          onConfirm={toggleJudicialProcessHelper}
        />
        <JudicialProcessModal
          isOpen={isOpen}
          onClose={handleClose}
          title={judicialProcess ? `Editar expediente` : "Nuevo expediente"}
          handleSubmit={onSubmit}
          judicialProcess={judicialProcess}
        />
        <JudicialProcessDataGrid
          judicialProcesses={data}
          onOpenChange={onOpenChange}
          setSelectedItem={setSelectedItem}
          toggleSelectedItem={toggleSelectedItem}
        />
      </>
    )
  );
}
