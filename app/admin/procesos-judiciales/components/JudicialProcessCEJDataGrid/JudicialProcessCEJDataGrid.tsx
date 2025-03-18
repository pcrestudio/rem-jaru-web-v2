import { FC, useCallback } from "react";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetCEJHistoricalDto } from "@/app/dto/cej/get-cej-historical.dto";
import judicialProcessCEJColumns from "@/app/admin/procesos-judiciales/components/JudicialProcessCEJDataGrid/columns/judicialProcessCEJColumns";
import { exportCEJDossier } from "@/app/api/judicial-process/judicial-process";

export interface JudicialProcessDataGridProps {
  fileCode: string;
}

const JudicialProcessCEJDataGrid: FC<JudicialProcessDataGridProps> = ({
  fileCode,
}) => {
  const handleDownloadDossier = async (fileName: string) => {
    try {
      const response = await exportCEJDossier(fileName);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al descargar el archivo.";

      toast.error(errorMessage);
    }
  };

  const renderCell = useCallback(
    (historical: GetCEJHistoricalDto, columnKey: string | number) => {
      const cellValue = historical[columnKey];

      switch (columnKey) {
        case "resolucion":
          return (
            <p className="text-center">{cellValue !== "" ? cellValue : "-"}</p>
          );

        case "resolucion_archivo":
          return cellValue !== null && cellValue !== "error descarga" ? (
            <Button
              className="bg-transparent"
              color="primary"
              size="sm"
              variant="flat"
              onClick={() =>
                handleDownloadDossier(historical.resolucion_archivo)
              }
            >
              Descargar
            </Button>
          ) : (
            <p className="text-center">-</p>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <CustomDataGrid<GetCEJHistoricalDto>
      cells={renderCell}
      columns={judicialProcessCEJColumns}
      emptyContent="Sin actuaciones."
      endpointUrl={`cej/historical?fileCode=${fileCode}&`}
    />
  );
};

export default JudicialProcessCEJDataGrid;
