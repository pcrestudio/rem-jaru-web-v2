"use client";

import { usePathname } from "next/navigation";

import useStore from "@/lib/store";
import FilterSidebar from "@/components/filter-sidebar/FilterSidebar";
import useLayoutSettings from "@/app/admin/hooks/useLayoutSettings";
import ReportEmptyState from "@/app/admin/components/ReportEmptyState/ReportEmptyState";
import ReportTabs from "@/app/admin/components/ReportTabs/ReportTabs";
import ReportJudicialProcess from "@/app/admin/components/ReportJudicialProcess";

export default function Admin() {
  const { filter } = useStore();
  const pathname = usePathname();
  const { showFilterSidebar } = useLayoutSettings(pathname);
  const isFilterEmpty = !filter.queryReport || filter.queryReport.trim() === "";
  const params = new URLSearchParams(filter.queryReport);
  const moduleId = params.get("moduleId");
  const submoduleId = params.get("submoduleId");
  const isModuleSelected = moduleId && !submoduleId;

  return (
    <div className="flex flex-row gap-2 h-screen overflow-hidden">
      {showFilterSidebar && <FilterSidebar pathname={pathname} />}
      <div
        className={`flex-grow page-settings h-[calc(100vh-72px)] overflow-y-auto ${showFilterSidebar ? "" : "max-w-[960px] mx-auto"}`}
      >
        {isFilterEmpty && <ReportEmptyState />}
        {!isFilterEmpty && isModuleSelected && (
          <ReportJudicialProcess filter={filter} />
        )}
        {!isFilterEmpty && submoduleId && <ReportTabs />}
      </div>
    </div>
  );
}
