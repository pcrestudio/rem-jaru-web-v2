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
import ReusableFields from "@/components/form/ReusableFields";
import useCustomForm from "@/components/states/useCustomForm";
import { FormEvent, useEffect, useState } from "react";
import { judicialProcessFields } from "@/app/admin/procesos-judiciales/constants/judicial-process-fields.constant";
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
  const [_, setJudicialProcess] = useState<GetJudicialProcessDto | null>(null);
  const {
    handleSubmit,
    inputValid,
    isFormValid,
    errors,
    onInputChange,
    onBlurChange,
    setFormData,
    resetFormData,
  } = useCustomForm(judicialProcessFields);

  const setSelectedItem = (judicialProcess: GetJudicialProcessDto) => {
    setJudicialProcess(judicialProcess);
    judicialProcessFields.forEach((field) => {
      if (judicialProcess[field.name]) {
        setFormData((prevData) => ({
          ...prevData,
          [field.name]: judicialProcess[field.name],
        }));
      }
    });
    setTimeout(() => onOpenChange(), 100);
  };

  const toggleSelectedItem = (judicialProcess: GetJudicialProcessDto) => {
    setJudicialProcess(judicialProcess);
    setConfirm(true);
  };

  const toggleJudicialProcessHelper = async () => {
    const { data } = await toggleJudicialProcess({
      id: _.id,
      isActive: Boolean(_.isActive),
    });

    if (data) {
      setConfirm(false);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    const payload = handleSubmit(event);

    if (_) {
      const { data } = await editJudicialProcess(
        {
          ...(payload as unknown as EditJudicialProcessDto),
          id: _.id,
        },
        slug,
      );

      onOpenChange();

      return data;
    }

    const { data } = await createJudicialProcess(
      payload as unknown as CreateJudicialProcessDto,
      slug,
    );

    onOpenChange();

    return data;
  };

  const handleClose = () => {
    setSelectedItem({
      fileCode: "",
      demanded: "",
      coDefendant: "",
      plaintiff: "",
    });
    resetFormData();
    onOpenChange();
  };

  const handleConfirmModalClose = () => {
    setJudicialProcess({
      fileCode: "",
      demanded: "",
      coDefendant: "",
      plaintiff: "",
    });
    resetFormData();
    setConfirm(false);
  };

  const { data, error, isLoading } = useSWR<GetJudicialProcessDto[]>(
    `${environment.baseUrl}/judicial_processes?slug=${mappingRevertSubmodules[slug]}`,
    fetcher,
  );

  useEffect(() => {
    if (_) {
      judicialProcessFields.forEach((field) => {
        field.value = _[field.name] || "";
      });
    }
  }, [_]);

  return (
    data && (
      <>
        <ConfirmModal
          title={`${_ ? `¿Deseas ${_.isActive ? "desactivar" : "activar"} el expediente?` : ""}`}
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
          title={_ ? `Editar expediente` : "Nuevo expediente"}
          judicialFields={
            <ReusableFields
              fields={judicialProcessFields}
              inputValid={inputValid}
              errors={errors}
              onInputChange={onInputChange}
              onBlurChange={onBlurChange}
            />
          }
          handleSubmit={onSubmit}
          isFormValid={isFormValid}
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
