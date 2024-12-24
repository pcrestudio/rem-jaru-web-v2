"use client";

import { usePathname } from "next/navigation";

import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import JudicialProcessCEJDataGrid from "@/app/admin/procesos-judiciales/components/judicial-process-cej-datagrid/JudicialProcessCEJDataGrid";

export default function ProcesosJudicialesSlugEdit() {
  const pathname = usePathname();
  const fileCode: string = pathname.split("/")[5];

  return (
    <>
      <BreadcrumbsPath pathname={pathname} />

      <JudicialProcessCEJDataGrid fileCode={fileCode} />
    </>
  );
}
