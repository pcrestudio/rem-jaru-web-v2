"use client";

import { usePathname } from "next/navigation";
import useSWR from "swr";
import { GetCejDossierDetailDto } from "@/app/dto/cej/get-cej-dossier-detail.dto";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import JudicialProcessCEJDataGrid from "@/app/admin/procesos-judiciales/components/judicial-process-cej-datagrid/JudicialProcessCEJDataGrid";

export default function ProcesosJudicialesSlugEdit() {
  const pathname = usePathname();
  const fileCode: string = pathname.split("/")[5];

  const { data } = useSWR<GetCejDossierDetailDto>(
    `${environment.baseUrl}/cej/detail?fileCode=${fileCode}`,
    fetcher,
  );

  return (
    <>
      <BreadcrumbsPath pathname={pathname} />

      <JudicialProcessCEJDataGrid fileCode={fileCode} />
    </>
  );
}
