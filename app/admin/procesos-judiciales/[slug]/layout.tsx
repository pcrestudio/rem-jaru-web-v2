"use client";

import { ReactNode } from "react";
import FilterSidebar from "@/components/filter-sidebar/FilterSidebar";
import { usePathname } from "next/navigation";
import useLayoutSettings from "@/app/admin/hooks/useLayoutSettings";

const ProcesosJudicialesLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { showFilterSidebar } = useLayoutSettings(pathname);

  return (
    <div className="flex flex-row gap-4">
      {showFilterSidebar && <FilterSidebar />}
      <div
        className={`flex-grow page-settings ${showFilterSidebar ? "" : "max-w-[960px] mx-auto"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ProcesosJudicialesLayout;
