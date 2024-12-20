import useSWR from "swr";
import { CustomDataGridPagination } from "@/app/admin/types/CustomDataGridPagination";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import useStore from "@/lib/store";
import React, { ChangeEvent, ReactNode, useCallback, useState } from "react";
import { Button } from "@nextui-org/button";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";

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
    `${environment.baseUrl}/${params.endpointUrl}page=${page}&pageSize=${pageSize}${filter.search ? `&search=${filter.search}` : ""}`,
    fetcher,
  );

  const topContent = React.useMemo(() => {
    return (
      params.hasAddButton && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-3 items-end">
            <p></p>
            <div className="flex flex-row gap-4">
              {params.hasExcelButton && (
                <Button
                  className="excel-btn"
                  startContent={<AiOutlineFileExcel />}
                  onClick={params.onExportableExcel}
                >
                  Exportar excel
                </Button>
              )}
              <Button
                className="standard-btn w-auto text-white"
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
