"use client";

import { ReactNode, useCallback } from "react";
import { Tooltip } from "@heroui/react";
import { DeleteIcon, EditIcon } from "@heroui/shared-icons";
import { Chip } from "@heroui/chip";
import { useRouter } from "next/navigation";

import { GetJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/get-judicial-process.dto";
import { GetSectionAttributesValuesDto } from "@/app/dto/attribute-values/get-section-attributes-values.dto";
import { DataType } from "@/app/dto/attribute-values/get-section-attributes.dto";
import format_date from "@/utils/format_date";
import { DataGridKey } from "@/config/datagrid-key.config";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";
import { ModelType } from "@/config/model-type.config";
import capitalizeFirstLetter from "@/utils/capitalize";
import { Role } from "@/config/mapping_role";
import useStore from "@/lib/store";

interface UseCommonDossierProps {
  renderCell: (
    item: GetJudicialProcessDto | GetSupervisionDto,
    columnKey: string | number,
  ) => ReactNode;
  filterByStudio: string;
}

interface UseCommonDossierParams {
  toggleSelectedItem?: (
    dossier: GetJudicialProcessDto | GetSupervisionDto,
  ) => void;
  modelType?: string;
}

const useCommonDossier = (
  params?: UseCommonDossierParams,
): UseCommonDossierProps => {
  const router = useRouter();
  const { user } = useStore();

  const filterByStudio =
    user.role === Role["super-admin"] || user.role === Role["admin"]
      ? null
      : user.studioId
        ? `cargoStudioId=${user.studioId}&`
        : `cargoStudioId=0&`;

  const getDataGridLabel = (
    dossier: GetJudicialProcessDto | GetSupervisionDto,
    slug: string,
  ) => {
    const slugConversion =
      params?.modelType === ModelType.Supervision
        ? `${params?.modelType.toLowerCase()}${capitalizeFirstLetter(slug)}`
        : slug;

    const data: GetSectionAttributesValuesDto =
      dossier.sectionAttributeValues.find(
        (v) => v.attribute.slug === slugConversion,
      );

    if (!data) {
      return "N/A.";
    }

    if (data?.attribute.dataType === DataType.DATE) {
      return format_date(new Date(data?.value));
    }

    if (data && data.attribute.dataType === DataType.LIST) {
      const convertedValue = data?.value.includes(", ")
        ? data?.value.split(", ")
        : data?.value;
      const labels: string[] = [];

      if (Array.isArray(convertedValue)) {
        for (const converted of convertedValue) {
          const option = data?.attribute.options.find(
            (v) => v.optionValue === converted,
          );

          labels.push(option.optionLabel);
        }

        return labels.join(", ");
      }

      const option = data?.attribute.options.find(
        (v) => v.optionValue === data?.value,
      );

      if (option) {
        return option.optionLabel;
      }

      return "N/A.";
    }

    return data?.value;
  };

  const renderCell = useCallback(
    (
      dossier: GetJudicialProcessDto | GetSupervisionDto,
      columnKey: string | number,
    ) => {
      const cellValue = dossier[columnKey];

      let selectedInstance = dossier.stepData.reduce(
        (latestInstance, currentStep) => {
          const currentInstance = currentStep.step.instance;

          if (!latestInstance || currentInstance.id > latestInstance.id) {
            return currentInstance;
          }

          return latestInstance;
        },
        null,
      );

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar expediente">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 action-button"
                  role="presentation"
                  onClick={() => {
                    const currentPath = window.location.pathname;

                    router.push(`${currentPath}/edit/${dossier?.id}`);
                  }}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar expediente">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50 action-button"
                  role="presentation"
                  onClick={() => params?.toggleSelectedItem(dossier)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );

        case DataGridKey.connectLegal:
          return <p>{getDataGridLabel(dossier, DataGridKey.connectLegal)}</p>;

        case DataGridKey.sede:
          return <p>{getDataGridLabel(dossier, DataGridKey.sede)}</p>;

        case DataGridKey.cause:
          return <p>{getDataGridLabel(dossier, DataGridKey.cause)}</p>;

        case DataGridKey.startDate:
          return <p>{getDataGridLabel(dossier, DataGridKey.startDate)}</p>;

        case DataGridKey.resume:
          return (
            <p className="overflow-hidden truncate w-56">
              {getDataGridLabel(dossier, DataGridKey.resume)}
            </p>
          );

        case DataGridKey.risks:
          return <p>{getDataGridLabel(dossier, DataGridKey.risks)}</p>;

        case DataGridKey.saving:
          return <p>{getDataGridLabel(dossier, DataGridKey.saving)}</p>;

        case DataGridKey.criticalProcess:
          return (
            <p>{getDataGridLabel(dossier, DataGridKey.criticalProcess)}</p>
          );

        case DataGridKey.principalLawyer:
          return (
            <p>{getDataGridLabel(dossier, DataGridKey.principalLawyer)}</p>
          );

        case DataGridKey.lawyerEmail:
          return <p>{getDataGridLabel(dossier, DataGridKey.lawyerEmail)}</p>;

        case DataGridKey.internalSpecialist:
          return (
            <p>{getDataGridLabel(dossier, DataGridKey.internalSpecialist)}</p>
          );

        case DataGridKey.lastSituation:
          return (
            <p className="overflow-hidden truncate w-56">
              {getDataGridLabel(dossier, DataGridKey.lastSituation)}
            </p>
          );

        case DataGridKey.nextSituation:
          return (
            <p className="overflow-hidden truncate w-56">
              {getDataGridLabel(dossier, DataGridKey.nextSituation)}
            </p>
          );

        case "cargoStudioId":
          return <p>{dossier.studio ? `${dossier.studio.name}` : "-"}</p>;

        case "instance":
          return (
            <p>{selectedInstance ? `${selectedInstance["name"]}` : "-"}</p>
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

  return {
    renderCell,
    filterByStudio,
  };
};

export default useCommonDossier;
