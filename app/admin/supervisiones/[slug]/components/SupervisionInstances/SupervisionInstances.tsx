import { FC, ReactElement } from "react";

import ResumeDateOptionForm from "./forms/ResumeDateOptionForm";

import GenericForm, {
  GenericFormProps,
} from "@/app/admin/supervisiones/[slug]/components/SupervisionInstances/forms/GenericForm";
import { InstanceConfig } from "@/config/instance.config";
import ResumeDateForm from "@/app/admin/supervisiones/[slug]/components/SupervisionInstances/forms/ResumeDateForm";
import PreliminarForm from "@/app/admin/supervisiones/[slug]/components/SupervisionInstances/forms/PreliminarForm";
import EtapaSupervisionForm from "@/app/admin/supervisiones/[slug]/components/SupervisionInstances/forms/EtapaSupervisionForm";

interface SupervisionInstancesProps extends GenericFormProps {
  stepName: string;
  instanceName: string;
}

const renderInstanceStepComponent = (
  instanceName: string,
  stepName: string,
  payload: SupervisionInstancesProps,
): ReactElement => {
  switch (instanceName) {
    case InstanceConfig.SUPERVISION:
      return <EtapaSupervisionForm {...payload} />;

    case InstanceConfig.SANCIONADORA:
      return renderStepSupervisionForm(payload.stepName, payload);

    default:
      return <PreliminarForm {...payload} />;
  }
};

const renderStepSupervisionForm = (
  stepName: string,
  payload: SupervisionInstancesProps,
) => {
  switch (stepName) {
    case InstanceConfig.PAS:
      return (
        <ResumeDateForm
          {...payload}
          datePickerLabel="Fecha de recepción"
          fileLabel="Adjunto de resolución de inicio de PAS"
          textAreaLabel="Resumen de la resolución de archivo"
        />
      );

    case InstanceConfig.INSTRUCCION:
      return (
        <ResumeDateForm
          {...payload}
          datePickerLabel="Informe final de instrucción"
          fileLabel="Informe final de instrucción"
          textAreaLabel="Resumen de resolución de sanción"
        />
      );

    case InstanceConfig.ORAL:
      return (
        <ResumeDateForm
          {...payload}
          withTodos
          datePickerLabel="Fecha de informe oral"
          fileLabel="Notificación de informe oral"
        />
      );

    case InstanceConfig.RESOL_PRIMERA_INSTANCIA:
      return (
        <ResumeDateOptionForm
          {...payload}
          fileLabel="Adjunto de resolución de primera instancia"
          radioGroupLabel="Resultado de resolución de primera instancia"
          textAreaLabel="Resumen de la resolución de primera instancia"
        />
      );

    case InstanceConfig.RESOL_SEGUNDA_INSTANCIA:
      return (
        <ResumeDateOptionForm
          {...payload}
          fileLabel="Adjunto de resolución de segunda instancia"
          radioGroupLabel="Resultado de resolución de segunda instancia"
          textAreaLabel="Resumen de la resolución de segunda instancia"
        />
      );

    default:
      return <GenericForm {...payload} />;
  }
};

const SupervisionInstances: FC<SupervisionInstancesProps> = (payload) => {
  return renderInstanceStepComponent(
    payload.instanceName,
    payload.stepName,
    payload,
  );
};

export default SupervisionInstances;
