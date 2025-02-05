"use client";


import useStore from "@/lib/store";
import ReportJudicialProcess from "@/app/admin/components/ReportJudicialProcess";

export default function Reportes() {
  const { filter } = useStore();

  return filter.queryReport && <ReportJudicialProcess filter={filter} />;
}
