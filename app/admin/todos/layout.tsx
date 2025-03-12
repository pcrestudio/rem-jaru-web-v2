"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import FilterSidebar from "@/components/filter-sidebar/FilterSidebar";
import useLayoutSettings from "@/app/admin/hooks/useLayoutSettings";

const TodosLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { showFilterSidebar } = useLayoutSettings(pathname);

  return (
    <div className="flex flex-col gap-2 h-screen lg:overflow-hidden lg:flex-row">
      {showFilterSidebar && <FilterSidebar pathname={pathname} />}
      <div
        className={`flex-grow page-settings ${showFilterSidebar ? "" : "max-w-[960px] mx-auto"} md:h-[calc(100vh-72px)] md:overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default TodosLayout;
