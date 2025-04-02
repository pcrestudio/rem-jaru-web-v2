import { Input } from "@heroui/input";
import { AiOutlineSearch } from "react-icons/ai";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import useStore from "@/lib/store";
import debounce from "@/utils/custom_debounce";
import FilterResponsibleAutocomplete from "@/components/filter-sidebar/components/FilterResponsibleAutocomplete";
import FilterModuleAutocomplete from "@/components/filter-sidebar/components/FilterModuleAutocomplete";
import FilterSubmoduleAutocomplete from "@/components/filter-sidebar/components/FilterSubmoduleAutocomplete";
import FilterProjectAutocomplete from "@/components/filter-sidebar/components/FilterProjectAutocomplete";
import FilterStudioAutocomplete from "@/components/filter-sidebar/components/FilterStudioAutocomplete";
import FilterTodoStateAutocomplete from "@/components/filter-sidebar/components/FilterTodoStateAutocomplete";
import FilterTodoCheckAutocomplete from "@/components/filter-sidebar/components/FilterTodoCheckAutocomplete";
import {
  alertOptions,
  checkOptions,
} from "@/config/attribute_local_autocompletes";
import { Role } from "@/config/mapping_role";
import FilterStatusAutocomplete from "@/components/filter-sidebar/components/FilterStatusAutocomplete";
import { showAllDossiers } from "@/config/menu-options";

export interface FilterSidebarProps {
  pathname: string;
  searchTitle?: string;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ pathname, searchTitle }) => {
  const { updateFilter, filter } = useStore();
  const [modelType, setModelType] = useState<string | null>(null);
  const currentPath = usePathname();
  const { user } = useStore();

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
      modelType: name === "moduleId" ? value : filter.modelType,
    });

    if (name === "moduleId") {
      setModelType(value);
    }
  };

  const isAdminPath: boolean = pathname === "/admin";
  const isTodoPath: boolean = pathname === "/admin/todos";
  const isSubmodulePath: boolean =
    pathname.includes("/admin/procesos-judiciales") ||
    pathname.includes("/admin/supervisiones");

  const debouncedSearch = debounce(handleFilter, 700);

  useEffect(() => {
    updateFilter({ queryReport: "", search: null });
  }, [currentPath, updateFilter]);

  useEffect(() => {
    if (
      user.studio &&
      isAdminPath &&
      user.role !== Role["super-admin"] &&
      user.role !== Role.admin
    ) {
      updateFilter({
        queryReport: `?cargoStudioId=${user.studioId}`,
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-6 shadow-lg p-6 bg-white w-full lg:max-w-[270px] md:max-h-screen overflow-y-auto">
      {!isAdminPath && (
        <Input
          className="nextui-input-filter "
          classNames={{
            inputWrapper:
              "bg-white shadow-none data-[focus=true]:!bg-white data-[hover=true]:bg-transparent",
            base: "!bg-red-500",
          }}
          endContent={<AiOutlineSearch size={24} />}
          name="search"
          placeholder={searchTitle ?? "Buscar coincidencias..."}
          onChange={(event) => debouncedSearch(event)}
        />
      )}
      <div className="grid grid-cols-12 gap-4">
        <>
          <p className="text-base font-bold text-cerulean-950 col-span-12">
            Filtrar por
          </p>
          {(isAdminPath || isTodoPath) && (
            <>
              <FilterModuleAutocomplete
                className="col-span-12 nextui-input-nomodal"
                label="Módulo"
                name="moduleId"
                onChange={handleFilter}
              />

              <FilterSubmoduleAutocomplete
                className="col-span-12 nextui-input-nomodal"
                disabled={modelType === null}
                label="Submódulo"
                modelName={modelType}
                name="submoduleId"
                onChange={handleFilter}
              />
            </>
          )}
        </>

        {(isAdminPath || isSubmodulePath) && (
          <>
            <FilterProjectAutocomplete
              className="col-span-12 nextui-input-nomodal"
              label="Proyecto"
              name="projectId"
              onChange={handleFilter}
            />

            {showAllDossiers.includes(user?.role) && user.studioId === 0 && (
              <FilterStudioAutocomplete
                className="col-span-12 nextui-input-nomodal"
                label="Estudio a cargo"
                name="cargoStudioId"
                onChange={handleFilter}
              />
            )}
          </>
        )}

        {!user.studio && !isSubmodulePath && !isAdminPath && isTodoPath && (
          <FilterResponsibleAutocomplete
            className="col-span-12 nextui-input-nomodal"
            label="Responsable"
            name="responsibleId"
            filter="&isSpecialist=no"
            onChange={handleFilter}
          />
        )}

        {!isTodoPath && (
          <FilterResponsibleAutocomplete
            className="col-span-12 nextui-input-nomodal"
            label="Por especialista"
            name="responsibleId"
            filter="&isSpecialist=yes"
            onChange={handleFilter}
          />
        )}

        {!isTodoPath && (
          <FilterStatusAutocomplete
            className="col-span-12 nextui-input-nomodal"
            label="Status"
            name="statusId"
            onChange={handleFilter}
          />
        )}

        {isTodoPath && (
          <>
            <FilterTodoStateAutocomplete
              className="col-span-12 nextui-input-nomodal"
              label="Tiempo transcurrido"
              name="state"
              onChange={handleFilter}
            />

            <FilterTodoCheckAutocomplete
              className="col-span-12 nextui-input-nomodal"
              label="Alerta"
              name="alert"
              options={alertOptions}
              onChange={handleFilter}
            />

            <FilterTodoCheckAutocomplete
              className="col-span-12 nextui-input-nomodal"
              label="Estado"
              name="check"
              options={checkOptions}
              onChange={handleFilter}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
