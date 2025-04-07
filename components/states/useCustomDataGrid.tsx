import useSWR from "swr";
import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Button } from "@heroui/button";
import {
  AiOutlineFileExcel,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { ChevronDownIcon } from "@heroui/shared-icons";
import { SharedSelection } from "@heroui/system";
import { Input } from "@heroui/input";

import { CustomDataGridPagination } from "@/app/admin/types/CustomDataGridPagination";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import useStore from "@/lib/store";
import { ICustomColumnDataGrid } from "@/app/admin/types/CustomColumnDataGrid";
import debounce from "@/utils/custom_debounce";

interface UseCustomDataGridProps<T extends object> {
  items: T[];
  topContent: ReactNode;
  onChangePage: (page: number) => void;
  page: number;
  totalPages: number;
  pageSize: number;
  total: number;
  headerColumns: ICustomColumnDataGrid[];
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
  columns?: ICustomColumnDataGrid[];
  initialVisibleColumns?: string[];
  searchTitle?: string;
  showSearch?: boolean;
}

const useCustomDataGrid = <T extends object>(
  params: UseCustomDataGridParams,
): UseCustomDataGridProps<T> => {
  const { filter, updateFilter } = useStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const [visibleColumns, setVisibleColumns] = useState(
    new Set(params?.columns.map((column) => column.key)),
  );

  const headerColumns = useMemo(() => {
    // @ts-ignore
    if (visibleColumns === "all") return params?.columns;

    return params?.columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key),
    );
  }, [visibleColumns]);

  const { data } = useSWR<CustomDataGridPagination<T>>(
    `${environment.baseUrl}/${params.endpointUrl}page=${page}&pageSize=${pageSize}${filter.queryReport ? filter.queryReport.replace("?", "&") : ""}`,
    fetcher,
  );

  const handleVisibleColumns = (key: SharedSelection) => {
    if (key === "all") {
      setVisibleColumns(new Set(params.columns.map((column) => column.key)));
    } else if (key instanceof Set) {
      setVisibleColumns(new Set(Array.from(key).map(String)));
    }
  };

  const handleFilter = (event: any) => {
    const { name, value } = event.target;

    updateFilter({
      search: name === "search" ? value : null,
    });
  };

  const debouncedSearch = debounce(handleFilter, 700);

  const topContent = useMemo(() => {
    return (
      params.hasAddButton && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-3 items-end">
            {params.showSearch ? (
              <Input
                classNames={{
                  inputWrapper:
                    "bg-white data-[focus=true]:!bg-white data-[hover=true]:bg-white",
                  base: "!bg-transparent",
                }}
                endContent={<AiOutlineSearch size={24} />}
                name="search"
                placeholder={params.searchTitle ?? "Buscar coincidencias..."}
                onChange={(event) => debouncedSearch(event)}
              />
            ) : (
              <p />
            )}
            <div className="flex flex-row gap-3">
              {params.hasExcelButton && (
                <Button
                  className="excel-btn"
                  isDisabled={!params.canUseExportable}
                  startContent={<AiOutlineFileExcel />}
                  onPress={params.onExportableExcel}
                >
                  Exportar
                </Button>
              )}
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    className="border border-cerulean-950 bg-transparent"
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Columnas
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  classNames={{
                    base: "max-h-[calc(100vh-250px)] overflow-y-auto",
                  }}
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={handleVisibleColumns}
                >
                  {params?.columns.map((column) => (
                    <DropdownItem key={column.key}>{column.label}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button
                className="standard-btn w-auto text-white"
                isDisabled={!params.canUse}
                startContent={<AiOutlinePlus />}
                onPress={params.onAddChange}
              >
                {params.addButtonText}
              </Button>
            </div>
          </div>
        </div>
      )
    );
  }, [data?.results?.length, visibleColumns]);

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
    headerColumns,
  };
};

export default useCustomDataGrid;
