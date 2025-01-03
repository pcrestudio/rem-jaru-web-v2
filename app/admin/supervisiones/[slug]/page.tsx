"use client";

import { usePathname } from "next/navigation";
import React from "react";

import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import SupervisionDataGrid from "@/app/admin/supervisiones/[slug]/components/supervision-datagrid/SupervisionDataGrid";

export default function SupervisionSlug() {
  const pathname: string = usePathname();
  const slug: string = pathname.split("/")[3];

  return (
    <div className="page min-w-[70%] max-w-[80%]">
      <BreadcrumbsPath pathname={pathname} />
      <SupervisionDataGrid slug={slug} />
    </div>
  );
}
