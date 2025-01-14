import { Input } from "@nextui-org/input";
import { AiOutlineSearch } from "react-icons/ai";
import { FC, useEffect, useState } from "react";

import useStore from "@/lib/store";
import debounce from "@/utils/custom_debounce";
import FilterResponsibleAutocomplete from "@/components/filter-sidebar/components/FilterResponsibleAutocomplete";
import FilterModuleAutocomplete from "@/components/filter-sidebar/components/FilterModuleAutocomplete";
import FilterSubmoduleAutocomplete from "@/components/filter-sidebar/components/FilterSubmoduleAutocomplete";
import FilterProjectAutocomplete from "@/components/filter-sidebar/components/FilterProjectAutocomplete";
import FilterStudioAutocomplete from "@/components/filter-sidebar/components/FilterStudioAutocomplete";
import { usePathname } from "next/navigation";

export interface FilterSidebarProps {
  pathname: string;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ pathname }) => {
  const { updateFilter, filter } = useStore();
  const [moduleId, setModuleId] = useState<number>(0);
  const currentPath = usePathname();

  const handleFilter = (event: any) => {
    const { name, value } = event.target;

    const params = new URLSearchParams(filter.queryReport);

    if (value !== undefined && value !== null && value !== "") {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    const updatedQuery = params.toString() ? `?${params.toString()}` : "";

    updateFilter({
      queryReport: updatedQuery,
      search: name === "search" ? value : null,
    });

    if (name === "moduleId") {
      setModuleId(value);
    }
  };

  const isAdminPath: boolean = pathname === "/admin";

  const debouncedSearch = debounce(handleFilter, 700);

  useEffect(() => {
    updateFilter({ queryReport: "", search: null });
  }, [currentPath, updateFilter]);

  return (
    <div className="flex flex-col gap-6 shadow-lg p-6 bg-white w-full lg:max-w-[270px] max-h-screen overflow-y-auto">
      {!isAdminPath && (
        <Input
          className="nextui-input-filter bg-white"
          classNames={{
            inputWrapper: "bg-white shadow-none data-[focus=true]:!bg-white",
            base: "!bg-red-500",
          }}
          endContent={<AiOutlineSearch size={24} />}
          name="search"
          placeholder="Buscar coincidencias..."
          onChange={(event) => debouncedSearch(event)}
        />
      )}
      <div className="grid grid-cols-12 gap-4">
        <>
          <p className="text-base font-bold text-cerulean-950 col-span-12">
            Filtrar por
          </p>
          {isAdminPath && (
            <>
              <FilterModuleAutocomplete
                className="col-span-12 nextui-input-nomodal"
                label="Módulo"
                name="moduleId"
                onChange={handleFilter}
              />

              <FilterSubmoduleAutocomplete
                className="col-span-12 nextui-input-nomodal"
                disabled={moduleId === 0}
                label="Submódulo"
                moduleId={moduleId}
                name="submoduleId"
                onChange={handleFilter}
              />
            </>
          )}
        </>

        <FilterProjectAutocomplete
          className="col-span-12 nextui-input-nomodal"
          label="Proyecto"
          name="projectId"
          onChange={handleFilter}
        />

        <FilterStudioAutocomplete
          className="col-span-12 nextui-input-nomodal"
          label="Estudio a cargo"
          name="cargoStudioId"
          onChange={handleFilter}
        />

        <FilterResponsibleAutocomplete
          className="col-span-12 nextui-input-nomodal"
          label="Responsable"
          name="responsibleId"
          onChange={handleFilter}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
