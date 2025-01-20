import useSWR from "swr";
import React, { ChangeEvent, ReactNode, useCallback, useState } from "react";
import { Button } from "@heroui/button";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";

import { CustomDataGridPagination } from "@/app/admin/types/CustomDataGridPagination";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import useStore from "@/lib/store";

interface UseCustomDataGridProps<T extends object> {
  items: T[];
  topContent: ReactNode;
  onChangePage: (page: number) => void;
  page: number;
  totalPages: number;
  pageSize: number;
  total: number;
  onRowsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface UseCustomDataGridParams {
  endpointUrl: string;
  hasAddButton?: boolean;
  hasExcelButton?: boolean;
  addButtonText?: string;
  onAddChange?: () => void;
  onExportableExcel?: () => void;
  canUse?: boolean;
  canUseExportable?: boolean;
}

const useCustomDataGrid = <T extends object>(
  params: UseCustomDataGridParams,
): UseCustomDataGridProps<T> => {
  const { filter } = useStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const { data } = useSWR<CustomDataGridPagination<T>>(
    `${environment.baseUrl}/${params.endpointUrl}page=${page}&pageSize=${pageSize}${filter.queryReport ? filter.queryReport.replace("?", "&") : ""}`,
    fetcher,
  );

  const topContent = React.useMemo(() => {
    return (
      params.hasAddButton && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-3 items-end">
            <p />
            <div className="flex flex-row gap-3">
              {params.hasExcelButton && (
                <Button
                  className="excel-btn"
                  disabled={!params.canUseExportable}
                  startContent={<AiOutlineFileExcel />}
                  onClick={params.onExportableExcel}
                >
                  Exportar
                </Button>
              )}
              <Button
                className="standard-btn w-auto text-white"
                disabled={!params.canUse}
                startContent={<AiOutlinePlus />}
                onClick={params.onAddChange}
              >
                {params.addButtonText}
              </Button>
            </div>
          </div>
        </div>
      )
    );
  }, [data?.results?.length]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return {
    items: data ? data?.results : [],
    topContent,
    onChangePage: handlePageChange,
    page,
    totalPages: data ? data?.totalPages : 1,
    total: data ? data?.total : 0,
    pageSize,
    onRowsPerPageChange,
  };
};

export default useCustomDataGrid;
