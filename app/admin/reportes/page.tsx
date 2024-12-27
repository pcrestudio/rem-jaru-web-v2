"use client";

import ReportJudicialProcess from "@/app/admin/reportes/components/ReportJudicialProcess";
import useStore from "@/lib/store";

export default function Reportes() {
  const { filter } = useStore();

  return filter.queryReport && <ReportJudicialProcess filter={filter} />;
}
