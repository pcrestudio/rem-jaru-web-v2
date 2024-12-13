"use client";

import { ReactNode } from "react";
import FilterSidebar from "@/components/filter-sidebar/FilterSidebar";

const ProcesosJudicialesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-row gap-4">
      <FilterSidebar />
      <div className="flex-grow flex flex-col p-6">{children}</div>
    </div>
  );
};

export default ProcesosJudicialesLayout;
