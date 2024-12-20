import { FC, useCallback } from "react";
import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetCEJHistoricalDto } from "@/app/dto/cej/get-cej-historical.dto";
import judicialProcessCEJColumns from "@/app/admin/procesos-judiciales/components/judicial-process-cej-datagrid/columns/judicialProcessCEJColumns";

export interface JudicialProcessDataGridProps {
  fileCode: string;
}

const JudicialProcessCEJDataGrid: FC<JudicialProcessDataGridProps> = ({
  fileCode,
}) => {
  const renderCell = useCallback(
    (judicialProcess: GetCEJHistoricalDto, columnKey: string | number) => {
      const cellValue = judicialProcess[columnKey];

      switch (columnKey) {
        case "resolucion":
          return (
            <p className="text-center">{cellValue !== "" ? cellValue : "-"}</p>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <CustomDataGrid<GetCEJHistoricalDto>
      endpointUrl={`cej/historical?fileCode=${fileCode}`}
      columns={judicialProcessCEJColumns}
      cells={renderCell}
      emptyContent="Sin actuaciones."
    />
  );
};

export default JudicialProcessCEJDataGrid;
