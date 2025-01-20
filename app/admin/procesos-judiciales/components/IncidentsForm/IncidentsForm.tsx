import React, { FC, useEffect, useState } from "react";
import { Input, Textarea } from "@heroui/input";

import { GetInstanceDto } from "@/app/dto/instance/get-instance.dto";
import useStore from "@/lib/store";

export interface IncidentsFormProps {
  instance?: GetInstanceDto;
  initialValues?: Record<string, any>;
  entityReference?: string;
}

const IncidentsForm: FC<IncidentsFormProps> = ({
  instance,
  entityReference,
}) => {
  const findInstanceIncidence = instance?.incidences.find(
    (incidence) => incidence.instanceId === instance?.id,
  );

  const [formData, setFormData] = useState({
    comment:
      findInstanceIncidence.instanceIncidenceData.length > 0
        ? findInstanceIncidence.instanceIncidenceData[0].comment
        : "",
    fileCode:
      findInstanceIncidence.instanceIncidenceData.length > 0
        ? findInstanceIncidence.instanceIncidenceData[0].fileCode
        : "",
    headquarters:
      findInstanceIncidence.instanceIncidenceData.length > 0
        ? findInstanceIncidence.instanceIncidenceData[0].headquarters
        : "",
    entityReference: entityReference,
  });

  const { updateInstanceIncidenceData } = useStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    updateInstanceIncidenceData(findInstanceIncidence.id, entityReference, {
      [name]: value,
    });
  };

  useEffect(() => {
    if (findInstanceIncidence) {
      setFormData((prev) => ({
        ...prev,
        comment:
          findInstanceIncidence.instanceIncidenceData.length > 0
            ? findInstanceIncidence.instanceIncidenceData[0].comment
            : "",
        fileCode:
          findInstanceIncidence.instanceIncidenceData.length > 0
            ? findInstanceIncidence.instanceIncidenceData[0].fileCode
            : "",
        headquarters:
          findInstanceIncidence.instanceIncidenceData.length > 0
            ? findInstanceIncidence.instanceIncidenceData[0].headquarters
            : "",
        entityReference: entityReference,
      }));
    }
  }, [findInstanceIncidence]);

  const inputWrapper =
    "bg-white shadow-none border border-slate-200 data-[hover=true]:!bg-white";

  return (
    <div className="grid grid-cols-12 gap-6 p-2">
      <Input
        className="col-span-6"
        classNames={{
          inputWrapper: inputWrapper,
        }}
        label="Sede"
        name="headquarters"
        value={formData?.headquarters || ""}
        onChange={handleInputChange}
      />

      <Input
        className="col-span-6"
        classNames={{
          inputWrapper: inputWrapper,
        }}
        label="Código de expediente"
        name="fileCode"
        value={formData?.fileCode || ""}
        onChange={handleInputChange}
      />

      <Textarea
        className="col-span-12 nextui-textarea-nomodal"
        label="Comentarios"
        name="comment"
        value={formData?.comment || ""}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default IncidentsForm;
