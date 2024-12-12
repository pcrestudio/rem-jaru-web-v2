"use client";

import { usePathname } from "next/navigation";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import SupervisionForm from "@/app/admin/supervisiones/[slug]/components/supervision-form/SupervisionForm";
import React from "react";
import { CreateSupervisionDto } from "@/app/dto/supervision/create-supervision.dto";

export default function SupervisionesSlugEdit() {
  const pathname = usePathname();
  const slug: string = pathname.split("/")[3];
  const id: string = pathname.split("/")[5];

  const { data } = useSWR<GetSupervisionDto>(
    `${environment.baseUrl}/supervisions/${id}`,
    fetcher,
  );

  const handleSubmit = async (payload: CreateSupervisionDto) => {
    console.log(payload);
  };

  return (
    <div className="short-form-layout">
      <h1 className="text-2xl font-bold">Editar Supervisión</h1>

      <BreadcrumbsPath pathname={pathname} />

      <SupervisionForm
        handleSubmit={handleSubmit}
        supervision={data}
        slugSubmodule={slug}
        pathname={pathname}
      />
    </div>
  );
}
