"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import FilterSidebar from "@/components/filter-sidebar/FilterSidebar";
import useLayoutSettings from "@/app/admin/hooks/useLayoutSettings";

const ReportesLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { showFilterSidebar } = useLayoutSettings(pathname);

  return (
    <div className="flex flex-row gap-2 h-screen overflow-hidden">
      {showFilterSidebar && <FilterSidebar pathname={pathname} />}
      <div
        className={`flex-grow page-settings h-[calc(100vh-72px)] overflow-y-auto ${showFilterSidebar ? "" : "max-w-[960px] mx-auto"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ReportesLayout;
