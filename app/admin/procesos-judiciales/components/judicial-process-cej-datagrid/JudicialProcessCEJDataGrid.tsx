import { FC, useCallback } from "react";
import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetCEJHistoricalDto } from "@/app/dto/cej/get-cej-historical.dto";
import judicialProcessCEJColumns from "@/app/admin/procesos-judiciales/components/judicial-process-cej-datagrid/columns/judicialProcessCEJColumns";
import { Button } from "@nextui-org/button";
import { exportCEJDossier } from "@/app/api/judicial-process/judicial-process";

export interface JudicialProcessDataGridProps {
  fileCode: string;
}

const JudicialProcessCEJDataGrid: FC<JudicialProcessDataGridProps> = ({
  fileCode,
}) => {
  const handleDownloadDossier = async (fileName: string) => {
    const response = await exportCEJDossier(fileName);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
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
          return cellValue !== null ? (
            <Button
              color="primary"
              size="sm"
              className="bg-transparent"
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
      endpointUrl={`cej/historical?fileCode=${fileCode}&`}
      columns={judicialProcessCEJColumns}
      cells={renderCell}
      emptyContent="Sin actuaciones."
    />
  );
};

export default JudicialProcessCEJDataGrid;
