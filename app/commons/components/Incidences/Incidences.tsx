import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { AiOutlinePlus } from "react-icons/ai";

import IncidencesForm from "@/app/commons/components/IncidencesForm/IncidencesForm";
import { UpsertIncidenceDto } from "@/app/dto/incidences/upsert-incidence.dto";
import { upsertIncidenceDto } from "@/app/api/incidences/incidences";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";

export interface IncidencesProps {
  entityReference?: string;
  modelType?: string;
}

const Incidences: FC<IncidencesProps> = ({ entityReference, modelType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [incidence, setIncidence] = useState<UpsertIncidenceDto | null>(null);
  const router = useRouter();

  const navigateIfIncidenceExists = async (concatId?: string) => {
    const currentPath = window.location.pathname;
    const incidences_route = currentPath.replace(/edit\/\d+/, "incidencias");

    if (id) {
      return router.push(`${incidences_route}/${id}`);
    } else {
      return router.push(`${incidences_route}/${concatId}`);
    }
  };

  const selectItem = (incidence: UpsertIncidenceDto) => {
    setIncidence(incidence);
    setIsOpen(true);
  };

  const handleIncidenceClose = () => {
    setIncidence(incidence);
    setIsOpen(false);
  };

  const handleConfirmModalClose = () => {
    setIncidence(null);
    setConfirm(false);
  };

  const handleSubmit = async (payload: UpsertIncidenceDto) => {
    const { data } = await upsertIncidenceDto({
      name: payload.title,
      entityReference,
      modelType,
    });

    if (data) {
      setIsOpen(false);
      setId(`${data?.id}-${entityReference}`);
      toast.success("Incidencia creada");
    } else {
      toast.error("La incidencia no se pudo crear.");
    }
  };

  return (
    <>
      <ConfirmModal
        description={{
          __html: `Puedes cancelar este paso si aún no necesitas configurar esta incidencia.`,
        }}
        isOpen={confirm}
        title="¿Deseas configurar esta incidencia?"
        onClose={handleConfirmModalClose}
        onConfirm={navigateIfIncidenceExists}
      />

      <IncidencesForm
        handleSubmit={handleSubmit}
        incidence={incidence}
        isOpen={isOpen}
        title="Nueva incidencia"
        onCloseChange={handleIncidenceClose}
      />

      <div className="col-span-12 self-end">
        <Button
          className="standard-btn w-auto text-white"
          startContent={<AiOutlinePlus />}
          onPress={() => setIsOpen(true)}
        >
          Agregar incidencia
        </Button>
      </div>
    </>
  );
};

export default Incidences;
