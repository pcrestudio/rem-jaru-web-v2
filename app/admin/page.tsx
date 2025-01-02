"use client";

import { usePathname } from "next/navigation";

import useStore from "@/lib/store";
import FilterSidebar from "@/components/filter-sidebar/FilterSidebar";
import useLayoutSettings from "@/app/admin/hooks/useLayoutSettings";
import ReportJudicialProcess from "@/app/admin/components/ReportJudicialProcess";
import ReportEmptyState from "@/app/admin/components/ReportEmptyState/ReportEmptyState";

export default function Admin() {
  const { filter } = useStore();
  const pathname = usePathname();
  const { showFilterSidebar } = useLayoutSettings(pathname);

  return (
    <div className="flex flex-row gap-2 h-screen overflow-hidden">
      {showFilterSidebar && <FilterSidebar pathname={pathname} />}
      <div
        className={`flex-grow page-settings h-[calc(100vh-72px)] overflow-y-auto ${showFilterSidebar ? "" : "max-w-[960px] mx-auto"}`}
      >
        {filter.queryReport ? (
          <ReportJudicialProcess filter={filter} />
        ) : (
          <ReportEmptyState />
        )}
      </div>
    </div>
  );
}
